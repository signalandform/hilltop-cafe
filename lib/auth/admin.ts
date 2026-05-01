import { redirect } from "next/navigation";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminUser = {
  id: string;
  email: string | null;
};

export async function getAdminUser(): Promise<AdminUser | null> {
  if (!hasSupabaseEnv()) {
    return null;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const adminQuery = supabase
    .from("admin_users")
    .select("user_id,email")
    .limit(1);

  const { data, error } = await (user.email
    ? adminQuery.or(`user_id.eq.${user.id},email.eq.${user.email.toLowerCase()}`)
    : adminQuery.eq("user_id", user.id)
  ).maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    id: user.id,
    email: user.email ?? null,
  };
}

export async function requireAdmin() {
  const admin = await getAdminUser();
  if (!admin) {
    redirect("/admin/login");
  }
  return admin;
}
