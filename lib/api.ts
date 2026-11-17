import type { z } from "zod";

export async function handleSubmission<T extends z.ZodType>(
  request: Request,
  schema: T,
  save: (data: z.infer<T>) => { id: string } | Promise<{ id: string }>,
  message: string,
): Promise<Response> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { error: { code: "INVALID_JSON", message: "Request body must be valid JSON." } },
      { status: 400 },
    );
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    const fields = result.error.issues.reduce<Record<string, string[]>>(
      (errors, issue) => {
        const field = issue.path[0];
        if (typeof field === "string") {
          errors[field] ??= [];
          errors[field].push(issue.message);
        }
        return errors;
      },
      {},
    );

    return Response.json(
      {
        error: {
          code: "VALIDATION_ERROR",
          message: "Please check the submitted information.",
          fields,
        },
      },
      { status: 400 },
    );
  }

  const submission = await save(result.data);
  return Response.json(
    { data: submission, message },
    { status: 201 },
  );
}
