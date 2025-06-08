"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

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
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Type untuk respon user
export interface UserProfile {
  _id: string;
  namaLengkap: string;
  nik: string;
  noHp: string;
  username: string;
  asal: string;
  alamat: string;
  role: "admin" | "user";
  fotoProfil: string;
  isMember: boolean;
  tglLahir: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const schema = z.object({
  fullName: z.string().min(2),
  nik: z.string().length(16),
  username: z.string().min(3),
  phone: z.string().min(10),
  dob: z.date(),
  occupation: z.string().min(3),
  address: z.string().min(5),
  foto: z.any().optional(),
});

export default function Profile() {
  const [fotoProfilUrl, setFotoProfilUrl] = useState<string>("");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      nik: "",
      username: "",
      phone: "",
      dob: undefined,
      occupation: "",
      address: "",
      foto: undefined,
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const data = res.data;
        setFotoProfilUrl(data.fotoProfil);
        form.reset({
          fullName: data.namaLengkap,
          nik: data.nik,
          username: data.username,
          phone: data.noHp,
          dob: new Date(data.tglLahir),
          occupation: data.asal,
          address: data.alamat,
          foto: undefined,
        });
      });
  }, []);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const formData = new FormData();
      formData.append("namaLengkap", values.fullName);
      formData.append("nik", values.nik);
      formData.append("username", values.username);
      formData.append("noHp", values.phone);
      formData.append("tglLahir", values.dob.toISOString());
      formData.append("asal", values.occupation);
      formData.append("alamat", values.address);
      if (values.foto instanceof File) {
        formData.append("foto", values.foto);
      }

      await axios.put("http://localhost:5000/api/auth/profile", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profil berhasil diperbarui");
      window.dispatchEvent(new Event("user-updated"));
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Gagal update profil");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-2xl shadow-md">
        <div className="flex justify-center mt-6">
          <Avatar className="w-28 h-28 rounded-full border">
            <AvatarImage
              src={
                form.watch("foto") instanceof File
                  ? URL.createObjectURL(form.watch("foto"))
                  : fotoProfilUrl
              }
              alt="Foto Profil"
            />
            <AvatarFallback>FP</AvatarFallback>
          </Avatar>
        </div>

        <CardHeader>
          <CardTitle className="text-2xl text-center">Edit Profil</CardTitle>
          <CardDescription className="text-center">
            Perbarui data diri kamu agar tetap akurat.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Form Fields */}
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
                        placeholder="Contoh: SMA 1 / Universitas ABC"
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
                name="foto"
                render={() => (
                  <FormItem>
                    <FormLabel>Foto Profil</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          form.setValue("foto", e.target.files?.[0])
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Simpan Perubahan
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
