"use client";

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

import useSWR from "swr";
import { useRouter } from "@/i18n/routing";

type ChangedData = {
  username: string;
  password: string;
};

export function ProfileForm() {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const fetcher = (url: string, data: ChangedData) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem(
            "insta-x-token",
            JSON.stringify(data.accessToken)
          );
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    let changedData: ChangedData = {
      username: values.username,
      password: values.password,
    };
    fetcher(`${API_URL}/api/auth/login`, changedData);
    console.log(1);
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
                  type="text"
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
          Login
        </Button>
      </form>
    </Form>
  );
}
