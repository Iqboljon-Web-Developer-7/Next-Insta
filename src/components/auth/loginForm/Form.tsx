"use client";

import "../styles/loader.scss";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
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
import { toast } from "react-toastify";
import { useLoginUserMutation } from "@/redux/api/auth/login";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/check";

export function ProfileForm() {
  const dispatch = useDispatch();

  const router = useRouter();

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser({ body: values })
      .unwrap()
      .then((data) => {
        toast.success("Successfully Logged In!");
        dispatch(login({ token: data.accessToken }));
        localStorage.setItem("insta-x-token", data.accessToken);
        localStorage.setItem(
          "insta-x-refreshToken",
          JSON.stringify(data.refreshToken)
        );
        router.push("/");
      })
      .catch((error) => {
        if (typeof error.data.message == "object") {
          toast.error(error.data.message[0]);
        } else {
          toast.error(error.data.message);
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
                  placeholder="username"
                  {...field}
                  className="border-none bg-[#1F1F22] placeholder:text-slate-300 rounded-sm py-6 ps-4"
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
                <Input
                  type="password"
                  placeholder="password"
                  {...field}
                  className="border-none bg-[#1F1F22] placeholder:text-slate-300 rounded-sm py-6 ps-4"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-[#877EFF] w-full py-5 rounded-[.3rem]"
        >
          {isLoading ? <div className="loader"></div> : "Login"}
        </Button>
      </form>
    </Form>
  );
}
