"use client";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(50),
  username: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
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

type ChangedData = {
  full_name: string;
  username: string;
  email: string;
  password: string;
  photo: string;
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
      .then(() => {
        router.push("/auth/login");
      })
      .catch((error) => {
        console.log(error);
      });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    let changedData: ChangedData = {
      full_name: `${values.firstname} ${values.lastname}`,
      username: values.username,
      email: values.email,
      password: values.password,
      photo: "999",
    };
    fetcher(`${API_URL}/api/auth/register`, changedData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#EFEFEF]">First name</FormLabel>
              <FormControl>
                <Input
                  placeholder="firstname"
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
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#EFEFEF]">Last name</FormLabel>
              <FormControl>
                <Input
                  placeholder="lastname"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#EFEFEF]">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
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
          Sign Up
        </Button>
      </form>
    </Form>
  );
}