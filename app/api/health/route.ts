export function GET() {
  return Response.json({
    status: "ok",
    service: "loopdata-api",
    persistence: "memory",
    timestamp: new Date().toISOString(),
  });
}
