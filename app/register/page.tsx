"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/NavBar";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Registration failed");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center ">
      <NavBar page="register" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="animate-blob animation-delay-2000 absolute top-[-100px] left-[-80px] w-[500px] h-[500px] rounded-full bg-sky-400 opacity-30 blur-3xl" />
        <div className="animate-blob animation-delay-4000 absolute top-[100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-blue-400 opacity-25 blur-3xl" />
        <div className="animate-blob absolute bottom-[-80px] left-[30%] w-[350px] h-[350px] rounded-full bg-cyan-200 opacity-30 blur-3xl" />
      </div>

      <div className=" p-8 rounded-xl shadow-sm border border-gray-400 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Create account</h1>

        {error && (
          <div className=" text-red-600 text-sm  mb-4">
            {error && "User already exists. Please log in."}
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
            disabled={loading}
            className="btn-primary w-full rounded-lg py-2 font-semibold disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-500">
          Have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
