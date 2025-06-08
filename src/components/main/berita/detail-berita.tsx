import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getBeritaById, type TBerita } from "@/services/berita";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const DetailBerita = () => {
  const { id } = useParams();
  const [berita, setBerita] = useState<TBerita | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetch = async () => {
      try {
        const res = await getBeritaById(id);
        setBerita(res);
      } catch (err) {
        console.error("Gagal mengambil detail berita:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto py-16 px-6">
        <Skeleton className="w-full h-8 mb-4" />
        <Skeleton className="w-1/2 h-5 mb-2" />
        <Skeleton className="w-full h-80 mb-6" />
        <Skeleton className="w-full h-60" />
      </div>
    );
  }

  if (!berita) {
    return (
      <div className="max-w-screen-xl mx-auto py-16 px-6">
        <p className="text-muted-foreground">Berita tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto py-16 p-6 space-y-8">
      <img
        src={berita.foto}
        alt={berita.judul}
        className="h-auto rounded-lg mb-8"
      />

      <h1>{berita.judul}</h1>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <Badge className="bg-primary/5 text-primary">{berita.penulis}</Badge>
        <span>{new Date(berita.tanggal).toLocaleDateString("id-ID")}</span>
      </div>

      <p className="text-muted-foreground">{berita.deskripsi}</p>

      <div
        className="mt-6  prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: berita.isi }}
      />
    </div>
  );
};

export default DetailBerita;
