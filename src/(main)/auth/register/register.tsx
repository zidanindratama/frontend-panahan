"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z
  .object({
    fullName: z.string().min(2, "Nama lengkap wajib diisi"),
    nik: z.string().length(16, "NIK harus terdiri dari 16 digit"),
    username: z.string().min(3, "Username minimal 3 karakter"),
    phone: z.string().min(10, "Nomor telepon tidak valid"),
    dob: z.date({ required_error: "Tanggal lahir wajib diisi" }),
    occupation: z.string().min(3, "Asal sekolah/kampus/pekerjaan wajib diisi"),
    address: z.string().min(5, "Alamat wajib diisi"),
    password: z.string().min(8, "Kata sandi minimal 8 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi kata sandi tidak cocok",
    path: ["confirmPassword"],
  });

export default function Register() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      nik: "",
      username: "",
      phone: "",
      dob: undefined,
      occupation: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        namaLengkap: data.fullName,
        nik: data.nik,
        username: data.username,
        noHp: data.phone,
        tglLahir: data.dob,
        asal: data.occupation,
        alamat: data.address,
        password: data.password,
      };

      await axios.post("http://localhost:5000/api/auth/register", payload);
      toast.success("Registrasi berhasil! Silakan login.");
      navigate("/auth/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal registrasi");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Fatahilah Archery
          </CardTitle>
          <CardDescription className="text-center">
            Silakan isi data diri dengan lengkap
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lengkap</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nik"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIK</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan NIK" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Buat username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="08xxxxxxxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal Lahir</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? format(field.value, "dd MMMM yyyy")
                              : "Pilih tanggal"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asal Sekolah/Kampus/Pekerjaan</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Contoh: SMA 1 Jakarta / Universitas ABC / PT XYZ"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Lengkap</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan alamat lengkap"
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
                        placeholder="Buat kata sandi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi Kata Sandi</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Ulangi kata sandi"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Daftar Sekarang
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="mt-2 justify-center">
          <p className="text-sm text-center">
            Sudah punya akun?{" "}
            <Link to="/auth/login" className="underline text-muted-foreground">
              Masuk di sini
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
