"use client";

import "@/scss/util/_loader.scss";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { toast } from "react-toastify"; // Assuming you want to show notifications
import { useRegisterUserMutation } from "@/redux/api/auth/register"; // Adjust this import based on your setup

import { ChangeEvent, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useUploadFilesMutation } from "@/redux/api/Post";

const nameSchema = z.string().min(6).max(22);
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(32, "Password cannot exceed 32 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(
    /[@$!%*?&]/,
    "Password must contain at least one special character (@, $, !, %, *, ?, &)"
  )
  .regex(/^\S*$/, "Password cannot contain spaces"); // Check for no spaces

const formSchema = z.object({
  fullName: nameSchema,
  username: z.string().min(4).max(22),
  email: z.string().min(4).max(22),
  photo: z.instanceof(Image).optional(),
  password: passwordSchema,
});

import { useToast } from "@/components/ui/useToast";

export function ProfileForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [uploadFiles, { isLoading: isUploading }] = useUploadFilesMutation();
  const [uploadedPhoto, setUploadedPhoto] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((p) => !p);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const changedData = {
      full_name: values.fullName,
      username: values.username,
      email: values.email,
      password: values.password,
      photo: uploadedPhoto,
    };

    registerUser({ body: changedData })
      .unwrap()
      .then(() => {
        toast({
          title: "Registered successfully!",
          duration: 1400,
          style: {
            color: "#ffffff",
            border: "none",
            background: "#c7f9cc",
          },
        });
        router.push("/auth/login");
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

  const photoUploader = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;

    const formData = new FormData();

    formData.append("files", files[0]);

    uploadFiles({ files: formData })
      .unwrap()
      .then((data) => {
        setIsDisabled(false);
        setUploadedPhoto(data.files[0][0].url);
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control as any}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#EFEFEF]">Full name</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#EFEFEF]">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  className="border-none bg-[#1F1F22]  rounded-sm py-6 ps-4"
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
        <FormField
          control={form.control}
          name="photo"
          render={() => (
            <FormItem>
              <FormLabel className="text-[#EFEFEF]">Profile Photo</FormLabel>
              <FormControl className="flex items-center justify-center">
                <Input
                  required
                  type="file"
                  accept="image/*"
                  onChange={(event) => photoUploader(event)}
                  className="pt-[.4rem] border-none text-slate-700 bg-slate-200 rounded-sm"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <Button
          disabled={isDisabled}
          type="submit"
          className="bg-[#877EFF] hover:bg-[#756bff] active:bg-[#8f87ff] w-full py-5 rounded-[.3rem] font-semibold"
        >
          {isUploading ? (
            "Photo is uploading..."
          ) : isLoading ? (
            <div className="loader"></div>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
  );
}
