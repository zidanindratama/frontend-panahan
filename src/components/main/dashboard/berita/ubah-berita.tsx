import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { getBeritaById, updateBerita } from "@/services/berita";
import { MinimalTiptapEditor } from "@/components/minimal-tiptap";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

const schema = z.object({
  judul: z.string().min(3),
  deskripsi: z.string().min(5),
  isi: z.string().min(10),
  penulis: z.string().min(3),
  foto: z.any().optional(),
});

export default function UbahBerita() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBeritaById(id!);
        form.reset({
          judul: data.judul,
          deskripsi: data.deskripsi,
          isi: data.isi,
          penulis: data.penulis,
          foto: undefined,
        });
        if (data.foto) setPreview(data.foto);
      } catch {
        toast.error("Gagal mengambil data berita.");
        navigate("/dashboard/berita");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [form, id, navigate]);

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

      await updateBerita(id!, formData);
      toast.success("Berita berhasil diperbarui.");
      navigate("/dashboard/berita");
    } catch {
      toast.error("Gagal memperbarui berita.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full max-w-3xl bg-white dark:bg-zinc-900 p-8 shadow rounded"
        >
          <h1 className="text-2xl font-bold text-center">Ubah Berita</h1>

          <FormField
            control={form.control}
            name="judul"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Textarea {...field} />
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Foto */}
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
    </div>
  );
}
