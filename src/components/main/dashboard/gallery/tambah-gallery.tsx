import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import toast from "react-hot-toast";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { createGallery } from "@/services/gallery";

const schema = z.object({
  judul: z.string().min(3, "Judul minimal 3 karakter"),
  deskripsi: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter")
    .max(100, "Deskripsi maksimal 100 karakter"),
  gambar: z.any().optional(),
});

const TambahGallery = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string>("");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      judul: "",
      deskripsi: "",
      gambar: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const formData = new FormData();
      formData.append("judul", values.judul);
      formData.append("deskripsi", values.deskripsi);
      if (values.gambar instanceof File) {
        formData.append("gambar", values.gambar);
      }

      await createGallery(formData);
      toast.success("Gambar galeri berhasil ditambahkan");
      navigate("/dashboard/gallery");
    } catch {
      toast.error("Gagal menambahkan gambar galeri");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-3xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Tambah Gambar Galeri
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="judul"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan judul gambar" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deskripsi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        placeholder="Masukkan deskripsi gambar"
                        className="w-full min-h-[120px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gambar"
                render={() => (
                  <FormItem>
                    <FormLabel>Upload Gambar</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            form.setValue("gambar", file);
                            setPreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </FormControl>
                    {preview && (
                      <div className="mt-3 w-full flex justify-center">
                        <img
                          src={preview}
                          alt="Preview"
                          className="max-h-96 object-contain rounded-md"
                        />
                      </div>
                    )}
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
                  "Simpan Gambar"
                )}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/dashboard/gallery")}
              >
                <ArrowLeft />
                Kembali
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TambahGallery;
