import { handleSubmission } from "@/lib/api";
import { saveSubmission } from "@/lib/submissions";
import { contactSchema } from "@/lib/validation";

export function POST(request: Request) {
  return handleSubmission(
    request,
    contactSchema,
    (data) => saveSubmission({ type: "contact", data }),
    "Your message has been received.",
  );
}
