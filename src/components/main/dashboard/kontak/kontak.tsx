"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { getKontak, type TKontak } from "@/services/kontak";

const Kontak = () => {
  const [data, setData] = useState<TKontak | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await getKontak();
      setData(result);
    } catch {
      toast.error("Gagal memuat data kontak");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <div className="max-w-screen-md w-full space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Kontak</h1>
          <Button
            onClick={() => navigate("/dashboard/kontak-form")}
            disabled={loading}
          >
            <Pencil className="mr-2 h-4 w-4" />
            {data ? "Ubah Kontak" : "Tambah Kontak"}
          </Button>
        </div>

        <Card className="shadow-md">
          <CardContent className="p-4">
            {loading ? (
              <div className="text-center py-10">
                <Loader2 className="animate-spin h-6 w-6 mx-auto" />
              </div>
            ) : !data ? (
              <div className="text-center py-10 text-muted-foreground">
                Kontak belum tersedia
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Instagram</TableHead>
                    <TableHead>WhatsApp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>{data.instagram}</TableCell>
                    <TableCell>{data.whatsapp}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Kontak;
