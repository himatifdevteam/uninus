import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import * as schema from "@uninus/api/models";

export const VSLogin = createInsertSchema(schema.users, {
  email: z
    .string()
    .email({
      message: "Email tidak valid",
    })
    .nonempty({
      message: "Email tidak boleh kosong",
    }),
  password: z.string().nonempty({
    message: "Password tidak boleh kosong",
  }),
}).pick({
  email: true,
  password: true,
});

export type TVSLogin = z.infer<typeof VSLogin>;
