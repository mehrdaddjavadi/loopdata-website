import { handleSubmission } from "@/lib/api";
import { saveSubmission } from "@/lib/submissions";
import { demoSchema } from "@/lib/validation";

export function POST(request: Request) {
  return handleSubmission(
    request,
    demoSchema,
    (data) => saveSubmission({ type: "demo", data }),
    "Your demo request has been received.",
  );
}
