"use client";

import { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowUpRight, Bell, ChevronDown,
  CircleHelp, Command, Download, Ellipsis, Filter, LayoutDashboard,
  Plus, Search, Settings2, Sparkles, Users, Zap,
} from "lucide-react";

type Period = "7 days" | "30 days" | "90 days";

const chartSets: Record<Period, number[]> = {
  "7 days": [26, 35, 31, 49, 42, 58, 51, 67, 61, 75, 70, 88],
  "30 days": [22, 29, 26, 42, 36, 51, 48, 62, 56, 73, 67, 84],
  "90 days": [16, 24, 21, 33, 30, 43, 39, 55, 49, 65, 61, 79],
};

function Sparkline({ values, color = "#8D83FF" }: { values: number[]; color?: string }) {
  const points = values.map((value, index) => `${(index / (values.length - 1)) * 100},${36 - value * 0.34}`).join(" ");
  return (
    <svg className="sparkline" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GrowthChart({ period }: { period: Period }) {
  const values = chartSets[period];
  const points = useMemo(
    () => values.map((value, index) => `${48 + index * 51},${190 - value * 1.62}`).join(" "),
    [values],
  );
  const area = `M ${points.replaceAll(" ", " L ")} L 609 205 L 48 205 Z`;
  return (
    <svg className="growth-chart" viewBox="0 0 660 230" role="img" aria-label={`Revenue trend over the last ${period}`}>
      <defs>
        <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#8D83FF" stopOpacity=".27" />
          <stop offset="100%" stopColor="#8D83FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="chartStroke" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#6BDACB" />
          <stop offset="100%" stopColor="#9C83FF" />
        </linearGradient>
      </defs>
      {[36, 78, 120, 162, 204].map((y) => <line key={y} x1="48" x2="610" y1={y} y2={y} className="chart-grid-line" />)}
      {["$40k", "$30k", "$20k", "$10k", "$0"].map((label, index) => (
        <text key={label} x="0" y={40 + index * 42} className="chart-axis-label">{label}</text>
      ))}
      <path d={area} fill="url(#chartFill)" />
      <polyline points={points} fill="none" stroke="url(#chartStroke)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="456" x2="456" y1="28" y2="205" className="chart-hover-line" />
      <circle cx="456" cy={190 - values[8] * 1.62} r="6" fill="#0D1227" stroke="#75DBD1" strokeWidth="3" />
      <rect x="421" y="8" width="70" height="28" rx="7" className="chart-tooltip-bg" />
      <text x="456" y="26" textAnchor="middle" className="chart-tooltip-text">$28.4k</text>
      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
        <text key={day} x={48 + index * 93} y="224" className="chart-axis-label">{day}</text>
      ))}
    </svg>
  );
}

const sources = [
  { name: "Stripe", detail: "Payments", color: "source-stripe", mark: "S" },
  { name: "HubSpot", detail: "CRM", color: "source-hubspot", mark: "h" },
  { name: "Postgres", detail: "Database", color: "source-postgres", mark: "◉" },
];

export function DashboardPreview() {
  const [period, setPeriod] = useState<Period>("30 days");
  const [activeNav, setActiveNav] = useState("Overview");
  const [notice, setNotice] = useState<string | null>(null);

  function exportOverview() {
    const rows = [
      ["Metric", "Value", "Change"],
      ["Total revenue", "$84,254", "+12.8%"],
      ["Active customers", "2,420", "+8.2%"],
      ["Conversion rate", "4.86%", "+2.4%"],
      ["Average order value", "$128.50", "-1.2%"],
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "loopdata-overview.csv";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setNotice("Your overview CSV has been exported.");
  }

  return (
    <div className="dashboard-frame">
      <div className="dashboard-window-bar">
        <div className="window-dots"><i /><i /><i /></div>
        <div className="window-address"><span className="address-lock">⌑</span> app.loopdata.com / workspace / overview</div>
        <div className="window-actions"><span /><span /><span /></div>
      </div>
      <div className="dashboard-app">
        <aside className="dashboard-sidebar">
          <div className="dash-brand"><span className="dash-brand-icon"><Command size={16} /></span><b>loop<span>data</span></b></div>
          <div className="workspace-switch"><div className="workspace-avatar">N</div><span><b>Northstar Studio</b><small>Growth workspace</small></span><ChevronDown size={13} /></div>
          <div className="sidebar-label">WORKSPACE</div>
          <div className="dash-nav-list">
            {[
              { label: "Overview", icon: LayoutDashboard },
              { label: "Analytics", icon: Activity },
              { label: "Data sources", icon: Zap },
              { label: "Audience", icon: Users },
            ].map(({ label, icon: Icon }) => (
              <button key={label} className={`dash-nav-item${activeNav === label ? " active" : ""}`} onClick={() => setActiveNav(label)} type="button">
                <Icon size={15} /> {label}
                {label === "Data sources" && <span className="nav-count">8</span>}
              </button>
            ))}
          </div>
          <div className="sidebar-label sidebar-label--space">MANAGE</div>
          <button className="dash-nav-item" type="button" onClick={() => setActiveNav("Reports")}><Filter size={15} /> Reports</button>
          <button className="dash-nav-item" type="button" onClick={() => setActiveNav("Settings")}><Settings2 size={15} /> Settings</button>
          <div className="sidebar-bottom-card"><div className="sidebar-bottom-icon"><Sparkles size={15} /></div><b>Unlock more insights</b><span>Explore advanced analytics.</span><button type="button" onClick={() => setActiveNav("Upgrade")}>Explore plans <ArrowUpRight size={12} /></button></div>
          <div className="sidebar-user"><div className="user-avatar">JD</div><span><b>Jamie Davis</b><small>Admin</small></span><Ellipsis size={16} /></div>
        </aside>

        <div className="dashboard-main">
          <div className="dash-topbar">
            <div className="breadcrumb">Workspace <span>/</span> <b>{activeNav}</b></div>
            <div className="dash-top-actions"><button aria-label="Search" type="button" onClick={() => setNotice("Search is ready to connect to your workspace data.")}><Search size={15} /></button><button aria-label="Notifications" type="button" className="notification-button" onClick={() => setNotice("You are all caught up. No new alerts.")}><Bell size={15} /><i /></button><button aria-label="Help" type="button" onClick={() => setNotice("Help resources will be available in your Loopdata workspace.")}><CircleHelp size={15} /></button><div className="dash-top-avatar">JD</div></div>
          </div>
          <div className="dash-content">
            {notice && <div className="dash-notice" role="status"><span>{notice}</span><button type="button" onClick={() => setNotice(null)}>Dismiss</button></div>}
            <div className="dash-heading-row"><div><div className="dash-date">LIVE WORKSPACE SNAPSHOT</div><h3>Good morning, Jamie <span>✳</span></h3><p>Here&apos;s what&apos;s happening across your business.</p></div><button className="dash-export" type="button" onClick={exportOverview}><Download size={14} /> Export CSV <ChevronDown size={13} /></button></div>
            <div className="dash-kpi-grid">
              <div className="kpi-card"><div className="kpi-top"><span>Total revenue</span><span className="kpi-icon kpi-icon--violet">$</span></div><strong>$84,254</strong><div className="kpi-bottom"><span className="trend-up"><ArrowUpRight size={13} /> 12.8%</span><span>vs. last month</span><Sparkline values={[15, 22, 17, 28, 24, 33, 29, 37, 34, 39, 36, 40]} /></div></div>
              <div className="kpi-card"><div className="kpi-top"><span>Active customers</span><span className="kpi-icon kpi-icon--cyan"><Users size={15} /></span></div><strong>2,420</strong><div className="kpi-bottom"><span className="trend-up"><ArrowUpRight size={13} /> 8.2%</span><span>vs. last month</span><Sparkline color="#67D9CE" values={[18, 20, 17, 25, 27, 24, 32, 30, 36, 34, 38, 40]} /></div></div>
              <div className="kpi-card"><div className="kpi-top"><span>Conversion rate</span><span className="kpi-icon kpi-icon--blue"><Activity size={15} /></span></div><strong>4.86%</strong><div className="kpi-bottom"><span className="trend-up"><ArrowUpRight size={13} /> 2.4%</span><span>vs. last month</span><Sparkline color="#69A9FF" values={[12, 17, 15, 22, 20, 25, 23, 29, 27, 33, 31, 36]} /></div></div>
              <div className="kpi-card"><div className="kpi-top"><span>Avg. order value</span><span className="kpi-icon kpi-icon--orange">◈</span></div><strong>$128.50</strong><div className="kpi-bottom"><span className="trend-down"><ArrowDownRight size={13} /> 1.2%</span><span>vs. last month</span><Sparkline color="#E9A878" values={[36, 33, 35, 29, 32, 27, 29, 23, 25, 22, 24, 20]} /></div></div>
            </div>
            <div className="dash-middle-grid">
              <div className="dash-panel revenue-panel"><div className="panel-heading"><div><h4>Revenue overview</h4><p>Track your revenue performance over time</p></div><div className="period-switch">{(["7 days", "30 days", "90 days"] as Period[]).map((item) => <button key={item} type="button" className={period === item ? "selected" : ""} onClick={() => setPeriod(item)}>{item}</button>)}</div></div><div className="chart-legend"><span><i className="legend-dot legend-dot--violet" /> Revenue</span><span><i className="legend-dot legend-dot--cyan" /> Previous period</span></div><GrowthChart period={period} /></div>
              <div className="dash-panel sources-panel"><div className="panel-heading"><div><h4>Connected sources</h4><p>Your data ecosystem</p></div><button className="icon-button" aria-label="Add source" type="button" onClick={() => { setActiveNav("Data sources"); setNotice("Choose a connector to add it to your workspace."); }}><Plus size={15} /></button></div><div className="sources-total"><strong>08</strong><span>Active connections</span><i /></div><div className="source-list">{sources.map((source) => <div className="source-row" key={source.name}><div className={`source-mark ${source.color}`}>{source.mark}</div><span><b>{source.name}</b><small>{source.detail}</small></span><span className="source-status"><i /> Live</span></div>)}</div><button className="view-sources" type="button" onClick={() => setActiveNav("Data sources")}>View all sources <ArrowUpRight size={13} /></button></div>
            </div>
            <div className="dash-bottom-row"><div className="sync-status"><span className="sync-icon"><Zap size={14} /></span><span><b>All systems operational</b><small>Last synced 2 minutes ago</small></span><span className="sync-live"><i /> Live</span></div><div className="dash-insight"><span className="insight-spark"><Sparkles size={14} /></span><span><b>Quick insight</b><small>Revenue is up 12.8% — your strongest month this quarter.</small></span><ArrowUpRight size={15} /></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
