"use client";

import { Input, Button } from "@/components/ui/index";
import { API_ROUTES } from "@/lib/apiList";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      alert("Registration Successfull.");
      router.push(API_ROUTES.AUTH.LOGIN);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex min-vh-100 justify-content-center align-items-center">
      <form className="card w-25 h-50 p-4 rounded-4" onSubmit={handleSubmit}>
        <Input
          inputWrapperClass="w-100"
          labelText="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          inputWrapperClass="w-100"
          labelText="Password"
          type="password"
          placeholder="Enter your password"
          inputId={""}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          inputWrapperClass="w-100"
          labelText="Password"
          type="password"
          placeholder="Re-enter your password"
          inputId={""}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit" buttonType="primary" text={loading ? "Registering..." : "Sign Up"} buttonStyle="w-100 py-2" disabled={loading} />
        <div className="text-center mt-2 d-flex justify-content-center gap-1">
          <span>Already have an account?</span>
          <Link href={API_ROUTES.AUTH.LOGIN} className="text-decoration-none">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
