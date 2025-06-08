import { useEffect, useState } from "react";
import { getPengurus, type TPengurus } from "@/services/pengurus";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deletePengurus } from "@/services/pengurus";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useNavigate } from "react-router";
import { Loader2, Pencil, Plus, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

const Pengurus = () => {
  const [data, setData] = useState<TPengurus[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [jabatan, setJabatan] = useState("");

  const fetchData = async (selectedPage = 1) => {
    try {
      setLoading(true);
      const res = await getPengurus(search, jabatan, selectedPage, 10);
      setData(res.data);
      setTotalPages(res.totalPages);
      setPage(res.currentPage);
    } catch {
      toast.error("Gagal memuat data pengurus");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  const handleDelete = async (id: string) => {
    try {
      await deletePengurus(id);
      toast.success("Data berhasil dihapus");
      fetchData(page); // refresh
    } catch {
      toast.error("Gagal menghapus data");
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, jabatan]);

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-screen-xl w-full space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Pengurus</h1>
          <Button
            onClick={() => navigate("/dashboard/pengurus/tambah")}
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Tambah Pengurus
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-4 flex-wrap items-center">
            <Input
              placeholder="Cari nama..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="md:w-64"
            />
            <Select value={jabatan} onValueChange={setJabatan}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Pilih jabatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pembina">Pembina</SelectItem>
                <SelectItem value="Ketua">Ketua</SelectItem>
                <SelectItem value="Sekretaris">Sekretaris</SelectItem>
                <SelectItem value="Bendahara">Bendahara</SelectItem>
                <SelectItem value="Kepelatihan">Kepelatihan</SelectItem>
                <SelectItem value="Bidang Humas">Bidang Humas</SelectItem>
                <SelectItem value="Bidang Peralatan">
                  Bidang Peralatan
                </SelectItem>
                <SelectItem value="Bidang Kegiatan">Bidang Kegiatan</SelectItem>
                <SelectItem value="Bidang Media Sosial">
                  Bidang Media Sosial
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="w-full md:w-fit"
              variant="secondary"
              onClick={() => {
                setSearch("");
                setJabatan("");
                fetchData(1);
              }}
            >
              Reset Filter
            </Button>
          </div>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-4">
            <ScrollArea className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Foto</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Jabatan</TableHead>
                    <TableHead className="text-center">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6">
                        <Loader2 className="animate-spin h-6 w-6 mx-auto text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ) : data.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-6 text-muted-foreground"
                      >
                        Tidak ada data pengurus
                      </TableCell>
                    </TableRow>
                  ) : (
                    data.map((item) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          {item.foto ? (
                            <img
                              src={item.foto}
                              alt={item.nama}
                              className="w-16 h-16 rounded object-cover border"
                            />
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>{item.nama}</TableCell>
                        <TableCell>{item.jabatan}</TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() =>
                                navigate(`/dashboard/pengurus/ubah/${item._id}`)
                              }
                              title="Edit"
                            >
                              <Pencil size={18} className="text-yellow-600" />
                            </Button>
                            <ConfirmDialog
                              onConfirm={() => handleDelete(item._id)}
                              trigger={
                                <Button
                                  size="icon"
                                  variant="outline"
                                  title="Hapus"
                                  className="cursor-pointer"
                                >
                                  <Trash size={18} className="text-red-600" />
                                </Button>
                              }
                              title="Hapus pengurus ini?"
                              description="Data tidak bisa dikembalikan setelah dihapus."
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
                onClick={() => fetchData(page - 1)}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => fetchData(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (page < totalPages) fetchData(page + 1);
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

export default Pengurus;
