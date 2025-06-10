import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getGallery, deleteGallery, type TGallery } from "@/services/gallery";
import { Loader2, Pencil, Trash, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import toast from "react-hot-toast";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Gallery = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [data, setData] = useState<TGallery[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const truncateWords = (text: string, maxWords = 60): string => {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getGallery(search, sort, page, 5);

      if (res.data.length === 0 && page > 1) {
        setPage((prev) => prev - 1);
        return;
      }

      setData(res.data);
      setTotalPages(res.totalPages);
    } catch {
      toast.error("Gagal memuat data galeri");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGallery(id);
      toast.success("Galeri berhasil dihapus");
      fetchData();
    } catch {
      toast.error("Gagal menghapus galeri");
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, sort, page]);

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-screen-xl w-full space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Galeri</h1>
          <Button
            onClick={() => navigate("/dashboard/gallery/tambah")}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Gambar
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Input
            placeholder="Cari judul gambar..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="md:w-64"
          />
          <Select
            value={sort}
            onValueChange={(val: "asc" | "desc") => {
              setPage(1);
              setSort(val);
            }}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Terbaru</SelectItem>
              <SelectItem value="asc">Terlama</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="secondary"
            onClick={() => {
              setSearch("");
              setSort("desc");
              setPage(1);
            }}
            className="w-full md:w-fit"
          >
            Reset Filter
          </Button>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-4">
            <ScrollArea className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Gambar</TableHead>
                    <TableHead className="w-[200px]">Judul</TableHead>
                    <TableHead className="w-[100px] text-center">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6">
                        <Loader2 className="animate-spin h-6 w-6 mx-auto text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ) : data.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center py-6 text-muted-foreground"
                      >
                        Tidak ada data galeri
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          {item.gambar ? (
                            <img
                              src={item.gambar}
                              alt={item.judul}
                              className="max-w-[120px] aspect-video object-cover rounded border"
                            />
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {item.judul}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {item.deskripsi
                            ? truncateWords(item.deskripsi, 60)
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                navigate(`/dashboard/gallery/ubah/${item._id}`)
                              }
                              title="Edit"
                              className="cursor-pointer"
                            >
                              <Pencil size={18} className="text-yellow-600" />
                            </Button>
                            <ConfirmDialog
                              onConfirm={() => handleDelete(item._id)}
                              trigger={
                                <Button
                                  variant="outline"
                                  size="icon"
                                  title="Hapus"
                                  className="cursor-pointer"
                                >
                                  <Trash size={18} className="text-red-600" />
                                </Button>
                              }
                              title="Hapus gambar ini?"
                              description="Gambar akan dihapus secara permanen dan tidak bisa dikembalikan."
                              confirmText="Hapus"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>

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
                onClick={() => {
                  if (page < totalPages) setPage(page + 1);
                }}
                className={
                  page >= totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Gallery;
