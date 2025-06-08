"use client";

import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Halaman Tidak Ditemukan</h1>
      <p className="text-muted-foreground mb-6">
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link to="/">
        <Button variant="outline">Kembali ke Beranda</Button>
      </Link>
    </div>
  );
};

export default NotFound;
