You are the lead full-stack engineer for LOOPDATA.

I have provided the React frontend design and implementation for the LOOPDATA SaaS landing page in [prject path] "I:\loopdata - creating website in 10 minutes\loopdata-nextjs" please use them carefully .

Your mission is to turn this frontend into a fully functional Next.js application.

IMPORTANT: Preserve the original UI/UX design. Do not redesign the website or replace the supplied components with generic templates.

TECH STACK:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Zod for validation
- Lucide React
TASKS:

1. Inspect the existing project and organize the provided code into reusable components.
2. Create the following API endpoints:
POST /api/contact
For receiving contact form submissions.

POST /api/demo
For receiving demo requests.

POST /api/newsletter
For newsletter subscriptions.

GET /api/health
For checking backend availability.

1. Implement request validation using Zod.
2. Connect all forms and interactive buttons to their appropriate frontend behavior and API endpoints.
3. Implement loading indicators, success messages, validation errors, and API error handling.
4. Use mock persistence for the initial prototype if no database is configured. Keep backend logic structured so PostgreSQL can be integrated later.
5. Ensure all components are responsive and functional.
6. Do not invent external API credentials or expose secrets in client-side code.
7. Run TypeScript checks and fix all implementation errors.
8. Provide a final summary of:

- All created and modified files
- All available API endpoints
- Example API requests and responses
- Commands required to run the application
Work directly inside the existing project. Avoid unnecessary dependencies and overengineering.