import { createServerFn } from "@tanstack/react-start";
import { users, type User } from "./mock-db";

/**
 * ⚠️ VULNERABLE-BY-DESIGN — Broken Object Level Authorization (BOLA / IDOR)
 * The caller passes any user id and we return that user's full record without
 * verifying that the authenticated session owns that id. Swap ?id=1001 to
 * ?id=1002 and you get someone else's billing notes.
 */
export const getUserById = createServerFn({ method: "GET" })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<User | null> => {
    // NOTE: no auth check, no ownership check — intentional flaw.
    return users[data.id] ?? null;
  });
