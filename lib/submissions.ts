import type { z } from "zod";
import {
  contactSchema,
  demoSchema,
  newsletterSchema,
} from "@/lib/validation";

type SubmissionData = {
  contact: z.infer<typeof contactSchema>;
  demo: z.infer<typeof demoSchema>;
  newsletter: z.infer<typeof newsletterSchema>;
};

type SubmissionType = keyof SubmissionData;

type SubmissionInput = {
  [T in SubmissionType]: {
    type: T;
    data: SubmissionData[T];
  };
}[SubmissionType];

type StoredSubmission = SubmissionInput & {
  id: string;
  createdAt: string;
};

declare global {
  var loopdataSubmissionStore: StoredSubmission[] | undefined;
}

function getStore(): StoredSubmission[] {
  globalThis.loopdataSubmissionStore ??= [];
  return globalThis.loopdataSubmissionStore;
}

export function saveSubmission(input: SubmissionInput): { id: string } {
  const id = crypto.randomUUID();
  getStore().push({
    ...input,
    id,
    createdAt: new Date().toISOString(),
  });

  return { id };
}
