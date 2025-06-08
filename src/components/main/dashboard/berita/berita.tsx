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
import { getBerita, deleteBerita, type TBerita } from "@/services/berita";
import { Loader2, Eye, Pencil, Trash, Plus } from "lucide-react";
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

const Berita = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [data, setData] = useState<TBerita[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getBerita(search, sort, page, 5);

      if (res.data.length === 0 && page > 1) {
        setPage((prev) => prev - 1);
        return;
      }

      setData(res.data);
      setTotalPages(res.totalPages);
    } catch {
      toast.error("Gagal memuat data berita");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBerita(id);
      toast.success("Berita berhasil dihapus");
      fetchData();
    } catch {
      toast.error("Gagal menghapus berita");
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, sort, page]);

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-screen-xl w-full space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Berita</h1>
          <Button
            onClick={() => navigate("/dashboard/berita/tambah")}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Berita
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <Input
            placeholder="Cari judul berita..."
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
                    <TableHead className="w-[120px]">Foto</TableHead>
                    <TableHead className="w-[200px]">Judul</TableHead>
                    <TableHead className="w-[150px]">Penulis</TableHead>
                    <TableHead className="w-[250px]">Deskripsi</TableHead>
                    <TableHead className="w-[100px] text-center">
                      Aksi
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        <Loader2 className="animate-spin h-6 w-6 mx-auto text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ) : data.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-6 text-muted-foreground"
                      >
                        Tidak ada data berita
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          {item.foto ? (
                            <img
                              src={item.foto}
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
                        <TableCell>{item.penulis}</TableCell>
                        <TableCell>
                          {item.deskripsi.length > 60
                            ? item.deskripsi.slice(0, 60) + "..."
                            : item.deskripsi}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-center items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => navigate(`/berita/${item._id}`)}
                              title="Lihat"
                              className="cursor-pointer"
                            >
                              <Eye size={18} className="text-blue-600" />
                            </Button>

                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                navigate(`/dashboard/berita/ubah/${item._id}`)
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
                              title="Hapus berita ini?"
                              description="Berita akan dihapus secara permanen dan tidak bisa dikembalikan."
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

export default Berita;
