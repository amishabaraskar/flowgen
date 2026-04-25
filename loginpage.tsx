"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import NavBar from "@/components/NavBar";
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
    const loginSchema = z.object({
      email: z.email("Invalid email format").min(1, "Email is required"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password cannot exceed 20 characters"),
    });
    const validation = loginSchema.safeParse({ email, password });
    if (validation.success === false) {
      console.log("Validation errors:");

      const firstError =
        validation.error.flatten().fieldErrors.email?.[0] ||
        validation.error.flatten().fieldErrors.password?.[0] ||
        "Invalid input";
      setError(firstError);
      setLoading(false);
      return;
    }
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Login response:", data);
    if (!res.ok) {
      setError(data.error || "Login failed");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
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
            className="btn-primary w-full rounded-lg py-2 font-semibold disabled:opacity-50"
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
