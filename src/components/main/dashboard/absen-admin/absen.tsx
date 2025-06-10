// src/pages/absen-admin.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";
import { CalendarIcon, FileDown, Loader2, Search } from "lucide-react";
import { format } from "date-fns";
import {
  getRiwayatKehadiranAdmin,
  type KehadiranAdmin,
} from "@/services/absen";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Calendar } from "@/components/ui/calendar";
import { exportAbsensi } from "@/services/admin";

const AbsenAdmin = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<KehadiranAdmin[]>([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (
    start?: string,
    end?: string,
    selectedPage: number = 1
  ) => {
    try {
      setLoading(true);
      const res = await getRiwayatKehadiranAdmin(start, end, selectedPage);
      setData(res.data);
      setTotalPages(res.totalPages);
      setPage(res.currentPage);
    } catch {
      toast.error("Gagal memuat data kehadiran");
    } finally {
      setLoading(false);
    }
  };

  const handlePreset = (days: number) => {
    const end = new Date(); // Hari ini
    const start = new Date();
    start.setDate(end.getDate() - days + 1); // Mundur x hari

    setStartDate(start);
    setEndDate(end);
    fetchData(start.toISOString(), end.toISOString(), 1);
  };

  const handleFilter = () => {
    if (!startDate || !endDate) {
      toast.error("Pilih kedua tanggal terlebih dahulu");
      return;
    }
    fetchData(startDate.toISOString(), endDate.toISOString());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-screen-xl w-full space-y-6">
        {/* Filter Atas */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          {/* Kiri: Tombol preset */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-medium">Filter Preset:</span>
            <Button variant="outline" onClick={() => handlePreset(7)}>
              7 Hari
            </Button>
            <Button variant="outline" onClick={() => handlePreset(30)}>
              30 Hari
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setStartDate(undefined);
                setEndDate(undefined);
                fetchData();
              }}
            >
              Reset
            </Button>
          </div>

          {/* Kanan: Filter tanggal & Export */}
          <div className="flex flex-wrap items-end gap-2">
            <div className="flex flex-col gap-1 min-w-[160px]">
              <span className="text-sm text-muted-foreground">
                Dari Tanggal
              </span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col gap-1 min-w-[160px]">
              <span className="text-sm text-muted-foreground">
                Sampai Tanggal
              </span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pilih tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button variant="outline" onClick={handleFilter}>
              <Search className="w-4 h-4 mr-1" />
              Filter
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                exportAbsensi(startDate?.toISOString(), endDate?.toISOString())
              }
            >
              <FileDown className="w-4 h-4 mr-1" />
              Excel
            </Button>
          </div>
        </div>

        {/* Tabel Kehadiran */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Keterangan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      <Loader2 className="animate-spin inline-block" />
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4">
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.user?.namaLengkap || "-"}</TableCell>
                      <TableCell>{item.user?.username || "-"}</TableCell>
                      <TableCell>
                        {format(new Date(item.waktu), "Pp")}
                      </TableCell>
                      <TableCell className="text-yellow-500">
                        {item.keterangan}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
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
                  onClick={() =>
                    fetchData(
                      startDate?.toISOString(),
                      endDate?.toISOString(),
                      i + 1
                    )
                  }
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
      </div>
    </div>
  );
};

export default AbsenAdmin;
