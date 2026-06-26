import { Input, Button } from "@/components/ui/index";
import { API_ROUTES } from "@/lib/apiList";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="d-flex min-vh-100 justify-content-center align-items-center">
      <div className="card w-25 h-50 p-4 rounded-4">
        <Input
          inputWrapperClass="w-100"
          labelText="Email"
          type="email"
          placeholder="Enter your email"
        />
        <Input
          inputWrapperClass="w-100"
          labelText="Password"
          type="password"
          placeholder="Enter your password"
          inputId={""}
        />
        <Input
          inputWrapperClass="w-100"
          labelText="Password"
          type="password"
          placeholder="Re-enter your password"
          inputId={""}
        />
        <Button buttonType="primary" text="Sign Up" buttonStyle="w-100 py-2" />
        <div className="text-center mt-2 d-flex justify-content-center gap-1">
          <span>Already have an account?</span>
          <Link href={API_ROUTES.AUTH.LOGIN} className="text-decoration-none">Login</Link>
        </div>
      </div>
    </div>
  );
}
