import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth/admin";
import { hasSupabaseEnv } from "@/lib/supabase/config";
import { sendMagicLink, signInWithPassword } from "@/lib/cms/actions";

export const metadata: Metadata = {
  title: "Admin Login",
};

type PageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const admin = await getAdminUser();
  const params = await searchParams;

  if (admin) {
    redirect("/admin");
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-card">
        <Link className="brand admin-login-brand" href="/">
          <img className="brand-logo" src="/assets/logo-primary.png" alt="Hilltop Coffee Shop logo" width="56" height="56" />
          <div className="brand-stack">
            <span className="brand-text">Hilltop CMS</span>
            <span className="brand-tagline">Admin Access</span>
          </div>
        </Link>

        <h1>Sign in to manage content</h1>
        {!hasSupabaseEnv() ? (
          <p className="admin-alert">
            Supabase environment variables are missing. Add NEXT_PUBLIC_SUPABASE_URL and
            NEXT_PUBLIC_SUPABASE_ANON_KEY before using admin auth.
          </p>
        ) : null}
        {params.error ? <p className="admin-alert">{decodeURIComponent(params.error)}</p> : null}
        {params.message === "check-email" ? (
          <p className="admin-success">Check your email for a secure login link.</p>
        ) : null}

        <form className="admin-form" action={signInWithPassword}>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <label>
            Password
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
          <button className="btn" type="submit">
            Sign In
          </button>
        </form>

        <form className="admin-form admin-form-secondary" action={sendMagicLink}>
          <label>
            Email magic link
            <input name="email" type="email" autoComplete="email" required />
          </label>
          <button className="btn btn-secondary" type="submit">
            Send Magic Link
          </button>
        </form>
      </section>
    </main>
  );
}
