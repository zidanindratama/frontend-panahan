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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { z } from "zod";
import { useNavigate } from "react-router";
import { postBerita } from "@/services/berita";
import { useState } from "react";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import { ArrowLeft } from "lucide-react";

const schema = z.object({
  judul: z.string().min(3),
  deskripsi: z.string().min(5),
  isi: z.string().min(10),
  penulis: z.string().min(3),
  foto: z.any().optional(),
});

const TambahBerita = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string>("");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      judul: "",
      deskripsi: "",
      isi: "",
      penulis: "",
      foto: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const formData = new FormData();
      formData.append("judul", values.judul);
      formData.append("deskripsi", values.deskripsi);
      formData.append("isi", values.isi);
      formData.append("penulis", values.penulis);
      if (values.foto instanceof File) {
        formData.append("foto", values.foto);
      }

      await postBerita(formData);
      toast.success("Berita berhasil ditambahkan");
      navigate("/dashboard/berita");
    } catch (err: any) {
      toast.error("Gagal menambahkan berita");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-3xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Tambah Berita Baru
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
                      <Input placeholder="Masukkan judul berita" {...field} />
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
                    <FormLabel>Deskripsi Singkat</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Masukkan deskripsi singkat berita"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Isi Berita</FormLabel>
                    <FormControl>
                      <MinimalTiptapEditor
                        value={field.value}
                        onChange={field.onChange}
                        className="w-full border rounded-md"
                        editorContentClassName="prose p-4 min-h-[250px]"
                        output="html"
                        placeholder="Tulis isi lengkap berita di sini..."
                        autofocus={true}
                        editable={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="penulis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Penulis</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama penulis" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Foto preview */}
              <FormField
                control={form.control}
                name="foto"
                render={() => (
                  <FormItem>
                    <FormLabel>Foto Thumbnail</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            form.setValue("foto", file);
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
                  "Simpan Berita"
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/dashboard/berita")}
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

export default TambahBerita;
