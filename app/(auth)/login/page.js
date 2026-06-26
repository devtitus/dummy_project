import { Input, Button } from "@/components/ui/index";
import { API_ROUTES } from "@/lib/apiList";
import Link from "next/link";

export default function Login() {
  return (
    <div className="d-flex min-vh-100 justify-content-center align-items-center">
      <div className="card w-25 h-50 p-4 rounded-4">
        <Input
          inputWrapperClass="w-100"
          labelText="Email"
          type="email"
          inputId={""}
          placeholder="Enter your email"
        />
        <Input
          inputWrapperClass="w-100"
          labelText="Password"
          type="password"
          inputId={""}
          placeholder="Enter your password"
        />
        <div className="d-inline-flex w-100 justify-content-end mb-3">
          <Link href={""} className="text-decoration-none">Forgot Password?</Link>
        </div>
        <Button buttonType="primary" text="Login" buttonStyle="w-100 py-2" />
        <div className="text-center mt-2 d-flex justify-content-center gap-1">
          <span>Don't have an account?</span>
          <Link href={API_ROUTES.AUTH.SIGNUP} className="text-decoration-none">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
