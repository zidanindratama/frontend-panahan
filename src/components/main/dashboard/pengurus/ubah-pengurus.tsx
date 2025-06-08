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
import { z } from "zod";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { getPengurusById, updatePengurus } from "@/services/pengurus";

const JABATAN_OPTIONS = [
  "Pembina",
  "Ketua",
  "Sekretaris",
  "Bendahara",
  "Kepelatihan",
  "Bidang Humas",
  "Bidang Peralatan",
  "Bidang Kegiatan",
  "Bidang Media Sosial",
];

const schema = z.object({
  nama: z.string().min(3, "Nama wajib diisi"),
  jabatan: z.string().min(3, "Jabatan wajib dipilih"),
  foto: z.any().optional(),
});

const UbahPengurus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string>("");

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      nama: "",
      jabatan: "",
      foto: undefined,
    },
  });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const data = await getPengurusById(id);
        form.reset({
          nama: data.nama,
          jabatan: data.jabatan,
        });
        setPreview(data.foto || "");
      } catch (err) {
        toast.error("Gagal mengambil data pengurus");
      }
    };

    fetchData();
  }, [id, form]);

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      const formData = new FormData();
      formData.append("nama", values.nama);
      formData.append("jabatan", values.jabatan);
      if (values.foto instanceof File) {
        formData.append("foto", values.foto);
      }

      if (!id) return;
      await updatePengurus(id, formData);
      toast.success("Data pengurus berhasil diperbarui");
      navigate("/dashboard/pengurus");
    } catch (err) {
      toast.error("Gagal memperbarui data");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Ubah Pengurus</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama lengkap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jabatan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih jabatan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {JABATAN_OPTIONS.map((jab) => (
                          <SelectItem key={jab} value={jab}>
                            {jab}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="foto"
                render={() => (
                  <FormItem>
                    <FormLabel>Foto Pengurus</FormLabel>
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
                          className="max-h-72 object-contain rounded-md"
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
                  "Perbarui Pengurus"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UbahPengurus;
