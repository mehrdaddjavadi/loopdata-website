import { handleSubmission } from "@/lib/api";
import { saveSubmission } from "@/lib/submissions";
import { newsletterSchema } from "@/lib/validation";

export function POST(request: Request) {
  return handleSubmission(
    request,
    newsletterSchema,
    (data) => saveSubmission({ type: "newsletter", data }),
    "You're subscribed to the Loopdata newsletter.",
  );
}
