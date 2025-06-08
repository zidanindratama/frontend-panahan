import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { getBerita, type TBerita } from "@/services/berita";

const Blog = () => {
  const [beritaList, setBeritaList] = useState<TBerita[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const response = await getBerita("", "desc", 1, 6);
        setBeritaList(response.data);
      } catch (error) {
        console.error("Gagal mengambil data berita:", error);
      }
    };

    fetchBerita();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Berita Terbaru</h2>
      </div>

      <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {beritaList.length === 0 ? (
          <p className="text-muted-foreground">
            Tidak ada berita yang tersedia.
          </p>
        ) : (
          beritaList.map((item) => (
            <Card
              key={item._id}
              className="shadow-none overflow-hidden rounded-md"
            >
              <CardHeader className="p-0">
                <img
                  src={item.foto || "/placeholder.svg"}
                  alt={item.judul}
                  className="w-full h-56 object-cover"
                />
              </CardHeader>
              <CardContent className="py-6">
                <div className="flex items-center gap-3">
                  <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
                    {item.penulis}
                  </Badge>
                  <span className="font-medium text-xs text-muted-foreground">
                    {new Date(item.tanggal).toLocaleDateString("id-ID")}
                  </span>
                </div>

                <h3 className="mt-4 text-[1.35rem] font-semibold tracking-tight truncate">
                  {item.judul}
                </h3>
                <p className="mt-2 text-muted-foreground line-clamp-3">
                  {item.deskripsi}
                </p>

                <Button
                  className="mt-6 shadow-none cursor-pointer"
                  onClick={() => navigate(`/berita/${item._id}`)}
                >
                  Lihat Selengkapnya <ChevronRight />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
export default Blog;
