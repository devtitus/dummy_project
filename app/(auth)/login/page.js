"use client";
import { Input, Button } from "@/components/ui/index";
import { API_ROUTES } from "@/lib/apiList";
import { loginSchema } from "@/lib/validation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
      validation.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setError(data.errors);
        } else if (data.error) {
          setError({ global: data.error });
        } else {
          setError({ global: "An unexpected error occurred." });
        }
        return;
      }

      alert("Login Successful.");
    } catch (err) {
      setError({ global: "Network error. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex min-vh-100 justify-content-center align-items-center">
      <form
        className="card w-100 h-50 p-4 rounded-4"
        style={{ maxWidth: "400px" }}
        onSubmit={handleSubmit}
        noValidate
      >
        {error.global && (
          <div className="alert alert-danger p-2 small">{error.global}</div>
        )}
        <div className="mb-1">
          <Input
            inputWrapperClass="w-100"
            labelText="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error.email) setError({ ...error, email: null });
            }}
          />
          {error.email && (
            <div className="alert alert-danger p-2 small">{error.email}</div>
          )}
        </div>
        <div className="mb-1">
          <Input
            inputWrapperClass="w-100"
            labelText="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error.password) setError({ ...error, password: null });
            }}
          />
          {error.password && (
            <div className="alert alert-danger p-2 small">{error.password}</div>
          )}
        </div>
        <div className="d-inline-flex w-100 justify-content-end mb-3">
          <Link href={""} className="text-decoration-none">
            Forgot Password?
          </Link>
        </div>
        <Button type="submit" buttonType="primary" text={loading ? "Logging in..." : "Login"} buttonStyle="w-100 py-2" disabled={loading}/>
        <div className="text-center mt-2 d-flex justify-content-center gap-1">
          <span>Don't have an account?</span>
          <Link href={API_ROUTES.AUTH.SIGNUP} className="text-decoration-none">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
