import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import * as schema from "@uninus/api/models";
export const VSUser = z.object({
  sub: z.string(),
});

export const VSLogout = createInsertSchema(schema.users, {
  refreshToken: z.string().nonempty({
    message: "Refresh token tidak boleh kosong",
  }),
}).pick({
  refreshToken: true,
});

export type TVSUser = z.infer<typeof VSUser>;
export type TVSLogout = z.infer<typeof VSLogout>;
