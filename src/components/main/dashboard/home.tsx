"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { File } from "lucide-react";
import toast from "react-hot-toast";
import {
  deleteUser,
  demoteUser,
  exportUsers,
  getUsers,
  promoteUser,
  toggleMember,
  getUserStats,
  type User,
} from "@/services/admin";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Link } from "react-router";
import { format } from "date-fns";

const Home = () => {
  useAuthRedirect();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [data, setData] = useState<User[]>([]);

  const [totalAdmin, setTotalAdmin] = useState(0);
  const [totalMember, setTotalMember] = useState(0);
  const [totalNonMember, setTotalNonMember] = useState(0);

  const fetchUsers = async () => {
    try {
      const res = await getUsers(page, limit, search);
      setData(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      toast.error("Gagal memuat data pengguna");
    }
  };

  const fetchStats = async () => {
    try {
      const stats = await getUserStats();
      setTotalAdmin(stats.totalAdmin);
      setTotalMember(stats.totalMember);
      setTotalNonMember(stats.totalNonMember);
    } catch {
      toast.error("Gagal memuat statistik pengguna");
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers();
      fetchStats(); // panggil stats juga saat page berubah
    }, 500);

    return () => clearTimeout(delay);
  }, [search, page]);

  const handlePromote = async (id: string) => {
    try {
      await promoteUser(id);
      toast.success("User diangkat jadi Admin");
      fetchUsers();
      fetchStats();
    } catch {
      toast.error("Gagal mengangkat user");
    }
  };

  const handleDemote = async (id: string) => {
    try {
      await demoteUser(id);
      toast.success("Admin diturunkan jadi User");
      fetchUsers();
      fetchStats();
    } catch {
      toast.error("Gagal menurunkan admin");
    }
  };

  const handleToggleMember = async (id: string) => {
    try {
      await toggleMember(id);
      toast.success("Status member diubah");
      fetchUsers();
      fetchStats();
    } catch {
      toast.error("Gagal mengubah status member");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      toast.success("User dihapus");
      fetchUsers();
      fetchStats();
    } catch {
      toast.error("Gagal menghapus user");
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto py-16 px-6 xl:px-0">
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Dashboard Admin</h2>

        {/* Kartu Total Admin, Member, dan Non-Member */}
        <div className="flex flex-col items-center justify-center gap-6 px-4 mb-10">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Card className="w-full sm:w-1/3 shadow-md">
              <CardContent className="py-6 text-center">
                <p className="text-sm text-yellow-700 dark:text-yellow-500">
                  Total Admin
                </p>
                <p className="text-3xl font-bold">{totalAdmin}</p>
              </CardContent>
            </Card>
            <Card className="w-full sm:w-1/3 shadow-md">
              <CardContent className="py-6 text-center">
                <p className="text-sm text-yellow-700 dark:text-yellow-500">
                  Total Member
                </p>
                <p className="text-3xl font-bold">{totalMember}</p>
              </CardContent>
            </Card>
            <Card className="w-full sm:w-1/3 shadow-md">
              <CardContent className="py-6 text-center">
                <p className="text-sm text-yellow-700 dark:text-yellow-500">
                  Total Non-Member
                </p>
                <p className="text-3xl font-bold">{totalNonMember}</p>
              </CardContent>
            </Card>
          </div>

          <Link to={"/dashboard/absen-admin"}>
            <Button variant="outline" className="cursor-pointer">
              Lihat Kehadiran Semua Anggota
            </Button>
          </Link>
        </div>

        {/* Pencarian & Export */}
        <div className="flex items-center justify-between gap-4">
          <Input
            placeholder="Cari username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Button
            variant="outline"
            className="cursor-pointer gap-2"
            onClick={exportUsers}
          >
            <File />
            Export Daftar Pengguna
          </Button>
        </div>

        {/* Tabel */}
        <Card className="shadow-md">
          <CardContent className="p-4">
            <ScrollArea className="w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[160px]">Nama</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>NIK</TableHead>
                    <TableHead>Tanggal Lahir</TableHead>
                    <TableHead>No HP</TableHead>
                    <TableHead className="w-[160px]">Asal</TableHead>
                    <TableHead className="w-[200px]">Alamat</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell className="truncate">
                        {user.namaLengkap}
                      </TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.nik}</TableCell>
                      <TableCell>{format(user.tglLahir, "PPP")}</TableCell>
                      <TableCell>{user.noHp}</TableCell>
                      <TableCell className="truncate">{user.asal}</TableCell>
                      <TableCell className="truncate">{user.alamat}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-2">
                          {user.role === "admin" ? (
                            <>
                              <ConfirmDialog
                                trigger={
                                  <Button
                                    size="sm"
                                    className="bg-yellow-500 hover:bg-yellow-600 text-yellow-700"
                                  >
                                    Turunkan
                                  </Button>
                                }
                                title="Yakin turunkan admin?"
                                description="User ini akan kehilangan hak akses admin."
                                confirmText="Turunkan Sekarang"
                                onConfirm={() => handleDemote(user._id)}
                              />
                              <Button
                                size="sm"
                                className="bg-green-800 hover:bg-green-600 text-white"
                                onClick={() => handleToggleMember(user._id)}
                              >
                                {user.isMember
                                  ? "Non-Member"
                                  : "Jadikan Member"}
                              </Button>
                            </>
                          ) : (
                            <>
                              <ConfirmDialog
                                trigger={
                                  <Button
                                    size="sm"
                                    className="bg-yellow-500 hover:bg-yellow-600 text-yellow-700"
                                  >
                                    Jadikan Admin
                                  </Button>
                                }
                                title="Yakin jadikan admin?"
                                description="User ini akan mendapatkan akses admin."
                                confirmText="Promosikan"
                                onConfirm={() => handlePromote(user._id)}
                              />
                              <Button
                                size="sm"
                                className="bg-green-800 hover:bg-green-600 text-white"
                                onClick={() => handleToggleMember(user._id)}
                              >
                                {user.isMember
                                  ? "Non-Member"
                                  : "Jadikan Member"}
                              </Button>
                            </>
                          )}
                          <ConfirmDialog
                            trigger={
                              <Button size="sm" variant="destructive">
                                Hapus
                              </Button>
                            }
                            title="Yakin ingin menghapus user?"
                            description="User akan dihapus secara permanen dari sistem."
                            confirmText="Hapus Sekarang"
                            onConfirm={() => handleDelete(user._id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Pagination */}
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
      </div>
    </div>
  );
};

export default Home;
