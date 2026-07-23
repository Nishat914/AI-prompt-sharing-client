"use client";

import { Card, Separator } from "@heroui/react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import Link from "next/link";
import { useEffect } from "react";

const LoginPage = () => {
  useEffect(() => {
    document.title = "AI-prompt | Login";
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    console.log({ data, error });

    if (data) {
      toast.success("login successfully");
      router.push(redirectTo);
    }

    if (error) {
      toast.error("Error");
    }
  };

//   const handleGoogleSignIn = async () => {
//     const data = await authClient.signIn.social({
//       provider: "google",
//     });
//     console.log(data);
//   };

  return (
    <div className="container mx-auto w-[80%] md:w-[70%] lg:w-[60%]  bg-linear-to-r from-[#FEFCF8] via-[#FBF6F0] to-[#F5EBDF] p-6 mt-20 rounded-2xl">
      <div className="text-center my-3">
        <h1 className="text-3xl font-bold text-[#5C4638]">
          Login
        </h1>

        <p className="font-semibold text-[#9B7B67] mt-4">
          Create • Share • Monetize AI Prompts
        </p>
      </div>

      <div>
        <Card className="bg-linear-to-r from-[#F8E6D7] via-[#F7E8D4] to-[#E7D0BA] p-6 mt-12 rounded-2xl">
          <Form onSubmit={onSubmit} className="flex flex-col gap-4">
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label>Email</Label>

              <Input
                placeholder="john@example.com"
                className="w-full bg-[#FCF8F4]"
              />

              <FieldError />
            </TextField>

            <TextField
              isRequired
              minLength={8}
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[a-z]/.test(value)) {
                  return "Password must contain at least one lowercase letter";
                }
                return null;
              }}
            >
              <Label>Password</Label>

              <Input
                placeholder="Enter your password"
                className="w-full bg-[#FCF8F4]"
              />

              <Description>
                Must be at least 6 characters with 1 uppercase and 1 lowercase
              </Description>

              <FieldError />
            </TextField>

            <div>
              <Button
                className="btn w-full bg-[#BE9878] hover:bg-[#AF8768] text-white mt-4 border-2 border-[#BE9878]"
                type="submit"
              >
                Login
              </Button>
            </div>
          </Form>

          <div className="mt-4">
            <span className="text-gray-500">
              Don't have any account?{" "}
            </span>

            <Link
              href={"/register"}
              className="text-[#CFA17B] text-[16px] font-semibold"
            >
              register
            </Link>
          </div>

          <div className="flex justify-center items-center gap-3">
            <div className="flex-1">
                <Separator />
            </div>
            <div className="whitespace-nowrap text-[#9B7B67] font-medium">
              Or sign up with
            </div>

            <div className="flex-1">
                <Separator />
            </div>
          </div>

          <div>
            <Button
            //   onClick={handleGoogleSignIn}
              className="w-full bg-[#F5E8DD] hover:bg-[#ECDCCF] text-[#5C4638] rounded-sm"
            >
              <FcGoogle /> Google
            </Button>
          </div>

          <div className="mt-4">
            <span className="text-gray-500">
              Forget passwaord?{" "}
            </span>

            <Link
              href={"/forget"}
              className="text-[#CFA17B] text-[16px] font-semibold"
            >
              change
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;