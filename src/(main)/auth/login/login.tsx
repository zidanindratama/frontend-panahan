"use client";

import { useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

const formSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  password: z.string().min(8, "Kata sandi minimal 8 karakter"),
});

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: data.username,
        password: data.password,
      });

      // Simpan token & info user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Berhasil masuk!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Fatahilah Archery
          </CardTitle>
          <CardDescription className="text-center">
            Masuk ke Akun Anda
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kata Sandi</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Masukkan kata sandi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full mt-2">
                Masuk
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2 text-sm">
          <Link to="#" className="underline text-muted-foreground text-center">
            Lupa kata sandi?
          </Link>
          <p className="text-center">
            Belum punya akun?{" "}
            <Link
              to="/auth/register"
              className="underline text-muted-foreground"
            >
              Daftar di sini
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
