// import { createEnv } from "@t3-oss/env-nextjs";
// import { z, ZodError } from "zod";

// export const env = createEnv({
//   server: {
//     NODE_ENV: z.enum(["development", "production"]),
//     // GOOGLE_CLIENT_ID: z.string(),
//     // GOOGLE_CLIENT_SECRET: z.string(),
//     SESSION_SECRET: z.string(),

//     DATABASE_URL: z.string(),
//     SMTP_HOST: z.string(),
//     SMTP_PORT: z.string(),
//     SMTP_SECURE: z.string(),
//     SMTP_USER: z.string(),
//     SMTP_PASS: z.string(),
//     SMTP_FROM: z.string(),
//   },
//   client: {
//     NODE_ENV: z.enum(["development", "production"]),
//   },
//   onValidationError: (error: ZodError) => {
//     console.error(
//       "❌ Invalid environment variables:",
//       error.flatten().fieldErrors
//     );
//     process.exit(1);
//   },
//   emptyStringAsUndefined: true,
//   // eslint-disable-next-line n/no-process-env
//   experimental__runtimeEnv: process.env
// });
