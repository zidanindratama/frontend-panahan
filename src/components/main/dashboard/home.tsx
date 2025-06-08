import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { getBerita, type TBerita } from "@/services/berita";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ListBerita = () => {
  const navigate = useNavigate();
  const [beritaList, setBeritaList] = useState<TBerita[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(false);

  // debounce searchInput → search
  useEffect(() => {
    const delay = setTimeout(() => {
      setPage(1);
      setSearch(searchInput);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchInput]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getBerita(search, sort, page, 6);
      setBeritaList(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Gagal mengambil berita:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, sort, search]);

  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Input
          placeholder="Cari berita..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full md:max-w-sm"
        />

        <Select
          value={sort}
          onValueChange={(val) => {
            setPage(1);
            setSort(val as "asc" | "desc");
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Terbaru</SelectItem>
            <SelectItem value="asc">Terlama</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <p className="text-muted-foreground">Memuat berita...</p>
        ) : beritaList.length === 0 ? (
          <p className="text-muted-foreground">Tidak ada berita ditemukan.</p>
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
                  className="mt-6 shadow-none"
                  onClick={() => navigate(`/berita/${item._id}`)}
                >
                  Lihat Selengkapnya <ChevronRight />
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default ListBerita;
