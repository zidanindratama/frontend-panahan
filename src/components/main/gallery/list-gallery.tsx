import { useEffect, useState } from "react";
import { getGallery, type TGallery } from "@/services/gallery";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ListGallery = () => {
  const [galleryItems, setGalleryItems] = useState<TGallery[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await getGallery(search, sort, page, 6);
      setGalleryItems(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Gagal mengambil data galeri", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [search, sort, page]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-screen-lg px-6">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-center mb-10">
          Galeri Kegiatan
        </h2>

        {/* Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <Input
            placeholder="Cari berdasarkan judul..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
          <Select
            value={sort}
            onValueChange={(val) => {
              setPage(1);
              setSort(val as "asc" | "desc");
            }}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Terbaru</SelectItem>
              <SelectItem value="asc">Terlama</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <p className="text-center text-muted-foreground">Memuat...</p>
        ) : galleryItems.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Tidak ada hasil ditemukan.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item) => (
              <div key={item._id} className="flex flex-col text-start">
                <img
                  src={item.gambar}
                  alt={item.judul}
                  className="mb-4 w-full aspect-[5/5] object-cover rounded-xl"
                />
                <span className="text-xl font-semibold tracking-tight">
                  {item.judul}
                </span>
                <p className="text-muted-foreground text-[15px] mt-1">
                  {item.deskripsi.length > 100
                    ? item.deskripsi.slice(0, 100) + "..."
                    : item.deskripsi}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mt-10">
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
    </div>
  );
};

export default ListGallery;
