import { useEffect, useState } from "react";
import { getAllPengurus, type TPengurus } from "@/services/pengurus";

// Urutan jabatan yang diinginkan
const ORDERED_JABATAN = [
  "Pembina",
  "Ketua",
  "Sekretaris",
  "Bendahara",
  "Kepelatihan",
  "Bidang Humas",
  "Bidang Peralatan",
  "Bidang Kegiatan",
  "Bidang Media Sosial",
];

// Deskripsi tiap jabatan
const JABATAN_DESC: Record<string, string> = {
  Ketua: "Bertanggung jawab atas seluruh kegiatan dan pengambilan keputusan.",
  Sekretaris: "Mengelola administrasi dan dokumentasi organisasi.",
  Bendahara: "Mengatur keuangan dan laporan kas organisasi.",
  Kepelatihan: "Mengelola kegiatan pelatihan dan pengembangan anggota.",
  "Bidang Humas": "Menjalin hubungan eksternal dan komunikasi publik.",
  "Bidang Peralatan": "Mengelola inventaris dan logistik peralatan.",
  "Bidang Kegiatan": "Merancang dan melaksanakan program kerja organisasi.",
  "Bidang Media Sosial": "Mengelola konten dan akun media sosial organisasi.",
  Pembina: "Memberikan arahan dan pembinaan terhadap organisasi.",
};

const ListPengurus = () => {
  const [data, setData] = useState<Record<string, TPengurus[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPengurus = async () => {
      try {
        const all = await getAllPengurus();
        const grouped = all.reduce((acc, curr) => {
          if (!acc[curr.jabatan]) acc[curr.jabatan] = [];
          acc[curr.jabatan].push(curr);
          return acc;
        }, {} as Record<string, TPengurus[]>);
        setData(grouped);
      } catch (err) {
        console.error("Gagal mengambil data pengurus", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPengurus();
  }, []);

  if (loading) return <p className="text-center">Memuat data pengurus...</p>;

  return (
    <div className="flex flex-col justify-center py-8 sm:pt-12 sm:pb-20 px-6 lg:px-8 max-w-screen-xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-muted-foreground font-semibold">
          Struktur Kepengurusan
        </p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
          Daftar Pengurus Berdasarkan Jabatan
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground">
          Berikut adalah susunan kepengurusan Fatahillah Archery yang terbagi
          berdasarkan tanggung jawab dan jabatan masing-masing.
        </p>
      </div>

      <div className="mt-10 space-y-16">
        {ORDERED_JABATAN.filter((jab) => data[jab]).map((jabatan) => (
          <div key={jabatan}>
            <div className="mb-8">
              <h2 className="mb-1 text-xl md:text-3xl font-bold tracking-tighter">
                {jabatan}
              </h2>
              <b className="text-muted-foreground font-semibold">
                {JABATAN_DESC[jabatan] || "Deskripsi belum tersedia"}
              </b>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {data[jabatan].map((person) => (
                <div key={person._id} className="text-center">
                  <img
                    src={person.foto}
                    alt={person.nama}
                    className="h-24 w-24 mx-auto rounded-full object-cover bg-secondary"
                  />
                  <h4 className="mt-3 text-lg font-semibold">{person.nama}</h4>
                  <p className="text-muted-foreground text-sm">
                    {person.jabatan}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPengurus;
