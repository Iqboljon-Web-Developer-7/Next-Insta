"use client";

import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Eye, EyeClosed } from "lucide-react";

import "@/scss/util/_loader.scss";

const formSchema = z.object({
  username: z.string().min(4).max(50),
  password: z.string().min(4).max(50),
});

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/useToast";
import { useLoginUserMutation } from "@/redux/api/auth/login";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/check";

export function ProfileForm() {
  const { toast } = useToast();

  const dispatch = useDispatch();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((p) => !p);

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser({ body: values })
      .unwrap()
      .then((data) => {
        dispatch(login({ token: data.accessToken }));
        localStorage.setItem("insta-x-token", data.accessToken);
        localStorage.setItem(
          "insta-x-refreshToken",
          JSON.stringify(data.refreshToken)
        );
        localStorage.setItem("insta-isLogged", JSON.stringify(true));
        router.push("/");
      })
      .catch((error) => {
        if (typeof error.data.message === "object") {
          toast({
            title: error.data.message[0],
            duration: 1400,
            style: {
              color: "#EF4444",
              background: "#000000",
              borderColor: "#000000",
            },
          });
        } else {
          toast({
            title: error.data.message,
            duration: 1400,
            style: {
              color: "#EF4444",
              background: "#000000",
              borderColor: "#000000",
            },
          });
        }
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#EFEFEF]">Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-none bg-[#1F1F22] rounded-sm py-6 ps-4"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#EFEFEF]">Password</FormLabel>
              <FormControl>
                <div className="flex items-center justify-between relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                    className="border-none bg-[#1F1F22] rounded-sm py-6 ps-4"
                  />
                  {showPassword ? (
                    <EyeClosed
                      onClick={toggleShowPassword}
                      className="absolute right-3"
                    />
                  ) : (
                    <Eye
                      onClick={toggleShowPassword}
                      className="absolute right-3"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-[#877EFF] w-full py-5 rounded-[.3rem] font-semibold"
        >
          {isLoading ? <div className="loader"></div> : "Login"}
        </Button>
      </form>
    </Form>
  );
}
