import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  History,
  Loader2,
  SmilePlus,
  CalendarIcon,
  Search,
  CalendarRange,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  absenSekarang,
  cekAbsen,
  getRiwayatAbsen,
  type RiwayatAbsen,
} from "@/services/absen";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const AbsenMember = () => {
  const [loading, setLoading] = useState(false);
  const [sudahAbsen, setSudahAbsen] = useState(false);
  const [riwayat, setRiwayat] = useState<RiwayatAbsen[]>([]);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStatusDanRiwayat = async (
    start?: string,
    end?: string,
    selectedPage: number = 1
  ) => {
    setLoading(true);
    try {
      const status = await cekAbsen();
      const riwayatRes = await getRiwayatAbsen(start, end, selectedPage);
      setSudahAbsen(status.sudahAbsen);
      setRiwayat(riwayatRes.data);
      setPage(riwayatRes.currentPage);
      setTotalPages(riwayatRes.totalPages);
    } catch {
      toast.error("Gagal memuat data absensi");
    } finally {
      setLoading(false);
    }
  };

  const handleAbsen = async () => {
    try {
      setLoading(true);
      const res = await absenSekarang();
      toast.success(res.message);
      fetchStatusDanRiwayat();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Gagal absen");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    if (!startDate || !endDate) {
      toast.error("Pilih kedua tanggal terlebih dahulu");
      return;
    }
    fetchStatusDanRiwayat(startDate.toISOString(), endDate.toISOString());
  };

  useEffect(() => {
    fetchStatusDanRiwayat();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-screen-xl space-y-6">
        {/* Kartu Status Absen */}
        <Card className="shadow-md">
          <CardContent className="p-6 text-center space-y-4">
            <CalendarRange className="w-10 h-10 mx-auto text-yellow-500" />
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            ) : sudahAbsen ? (
              <>
                <p className="text-green-600 font-semibold text-lg">
                  Anda sudah absen hari ini
                </p>
              </>
            ) : (
              <Button size="lg" onClick={handleAbsen} disabled={loading}>
                <SmilePlus className="w-4 h-4 mr-2" />
                Absen Sekarang
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Filter Tanggal */}
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Dari Tanggal"}
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

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Sampai Tanggal"}
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

          <Button variant="outline" onClick={handleFilter}>
            <Search className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>

        {/* Riwayat Absensi */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <History className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Riwayat Absensi</h2>
            </div>
            {riwayat.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                Belum ada riwayat absen.
              </p>
            ) : (
              <ul className="space-y-3">
                {riwayat.map((item) => (
                  <li
                    key={item._id}
                    className="flex justify-between items-center p-3 border rounded-md"
                  >
                    <div>
                      <p className="font-medium">
                        {format(new Date(item.waktu), "PPpp")}
                      </p>
                    </div>
                    <span className="text-yellow-500 capitalize font-semibold text-sm">
                      {item.keterangan}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  fetchStatusDanRiwayat(
                    startDate?.toISOString(),
                    endDate?.toISOString(),
                    page - 1
                  )
                }
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() =>
                    fetchStatusDanRiwayat(
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
                  fetchStatusDanRiwayat(
                    startDate?.toISOString(),
                    endDate?.toISOString(),
                    page + 1
                  )
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

export default AbsenMember;
