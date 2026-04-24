import { loginAction } from "@/lib/actions";

export default function LoginPage() {
  return (
    <section className="w-full rounded-xl border border-slate-200 bg-white p-6">
      <h1 className="mb-4 text-2xl font-semibold">Admin Login</h1>
      <form action={loginAction} className="space-y-3">
        <input name="email" type="email" required placeholder="Email" className="w-full rounded border p-2" />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          className="w-full rounded border p-2"
        />
        <button className="w-full rounded bg-brand-primary px-4 py-2 text-white">Sign in</button>
      </form>
    </section>
  );
}
