"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getKontak, saveKontak } from "@/services/kontak";
import { ArrowLeft } from "lucide-react";

const schema = z.object({
  instagram: z.string().min(1, "Instagram wajib diisi"),
  whatsapp: z
    .string()
    .min(10, "Nomor WhatsApp minimal 10 digit")
    .regex(
      /^6\d+$/,
      "Nomor WhatsApp harus dimulai dengan 6 dan hanya berisi angka"
    ),
});

const KontakForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      instagram: "",
      whatsapp: "",
    },
  });

  useEffect(() => {
    getKontak().then((data) => {
      if (data) {
        form.reset({
          instagram: data.instagram,
          whatsapp: data.whatsapp,
        });
      }
    });
  }, [form]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await saveKontak(values);
      toast.success("Kontak berhasil disimpan");
      navigate("/dashboard/kontak");
    } catch (err) {
      toast.error("Gagal menyimpan kontak");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Pengaturan Kontak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="contoh: @fatahillah.archery"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input placeholder="contoh: 6281234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-t-transparent border-white rounded-full" />
                    Menyimpan...
                  </div>
                ) : (
                  "Simpan Kontak"
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                type="button"
                onClick={() => navigate("/dashboard/kontak")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default KontakForm;
