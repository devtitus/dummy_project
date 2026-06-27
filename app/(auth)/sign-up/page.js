"use client";
import { Input, Button } from "@/components/ui/index";
import { API_ROUTES } from "@/lib/apiList";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUpSchema } from "@/lib/validation";
import { MESSAGES } from "@/lib/messages";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    const validation = signUpSchema.safeParse({ email, password });

    if (!validation.success) {
      validation.error.issues.forEach((issue) => {
        newErrors[issue.path[0]] = issue.message;
      });
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = MESSAGES.PASSWORD_DOES_NOT_MATCH;
    }

    return newErrors;
  };

  // Submit Data to Route
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
      const response = await fetch("/api/auth/sign-up", {
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

      alert("Registration Successful.");
      router.push(API_ROUTES.AUTH.LOGIN);
    } catch (error) {
      setError({ global: error.message });
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
        <div className="mb-2">
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
            required
          />
          {error.email && (
            <div className="text-danger small mt-1">{error.email}</div>
          )}
        </div>
        <div className="mb-2">
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
            required
          />
          {error.password && (
            <div className="text-danger small mt-1">{error.password}</div>
          )}
        </div>
        <div className="mb-2">
          <Input
            inputWrapperClass="w-100"
            labelText="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (error.confirmPassword)
                setError({ ...error, confirmPassword: null });
            }}
            required
          />
          {error.confirmPassword && (
            <div className="text-warning small mt-1">
              {error.confirmPassword}
            </div>
          )}
        </div>
        <Button
          type="submit"
          buttonType="primary"
          text={loading ? "Registering..." : "Sign Up"}
          buttonStyle="w-100 py-2"
          disabled={loading}
        />
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
