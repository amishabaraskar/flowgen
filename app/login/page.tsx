"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import NavBar from "@/components/NavBar";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // handle redirect manually
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    // const loginSchema = z.object({
    //   email: z.email("Invalid email format").min(1, "Email is required"),
    //   password: z
    //     .string()
    //     .min(8, "Password must be at least 8 characters")
    //     .max(20, "Password cannot exceed 20 characters"),
    // });
    // const validation = loginSchema.safeParse({ email, password });
    // if (validation.success === false) {
    //   console.log("Validation errors:");

    //   const firstError =
    //     validation.error.flatten().fieldErrors.email?.[0] ||
    //     validation.error.flatten().fieldErrors.password?.[0] ||
    //     "Invalid input";
    //   setError(firstError);
    //   setLoading(false);
    //   return;
    // }
    // const res = await fetch("/api/auth/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });

    // const data = await res.json();
    // console.log("Login response:", data);
    // if (!res.ok) {
    //   setError(data.error || "Login failed");
    //   setLoading(false);
    //   return;
    // }

    router.push("/dashboard");
  };
  const handleGoogle = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center ">
      <NavBar page="login" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-blob animation-delay-2000 absolute top-[-100px] left-[-80px] w-[500px] h-[500px] rounded-full bg-sky-400 opacity-30 blur-3xl" />
        <div className="animate-blob animation-delay-4000 absolute top-[100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-blue-400 opacity-25 blur-3xl" />
        <div className="animate-blob absolute bottom-[-80px] left-[30%] w-[350px] h-[350px] rounded-full bg-cyan-200 opacity-30 blur-3xl" />
      </div>

      <div className=" p-8 rounded-xl shadow-sm border border-gray-400 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Sign in</h1>
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition mb-4"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path
              fill="#FFC107"
              d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.5 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 9.9-1.9 13.5-5l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.2 0-9.6-2.9-11.3-7.1l-6.6 4.8C9.8 39.6 16.4 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.8l6.2 5.2C41 35.8 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"
            />
          </svg>
          Continue with Google
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !email.trim() || !password.trim()}
            className="btn-primary  w-full rounded-lg py-2 font-semibold disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          No account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
