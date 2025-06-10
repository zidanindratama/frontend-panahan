"use client";

import { useEffect, useState } from "react";
import { PhoneIcon, InstagramIcon } from "lucide-react";
import { getKontak, type TKontak } from "@/services/kontak";
import { Loader2 } from "lucide-react";

const Contact = () => {
  const [kontak, setKontak] = useState<TKontak | null>(null);
  const [loading, setLoading] = useState(true);

  const formatPhone = (phone: string) => {
    if (!phone.startsWith("62")) return phone;
    const raw = phone.replace(/^62/, "");
    const parts = raw.match(/(\d{3})(\d{4})(\d{4})/);
    return parts ? `+62 ${parts[1]}-${parts[2]}-${parts[3]}` : phone;
  };

  useEffect(() => {
    const fetchKontak = async () => {
      try {
        const res = await getKontak();
        setKontak(res);
      } catch (err) {
        console.error("Gagal mengambil data kontak", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKontak();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-24">
      <div className="text-center w-full max-w-4xl">
        <p className="text-muted-foreground font-semibold">Hubungi Kami</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
          Tetap Terhubung dengan Fatahillah Archery
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground">
          Tim kami siap membantu jika Anda memiliki pertanyaan atau ingin
          bergabung.
        </p>

        {loading ? (
          <div className="mt-12 flex justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-primary" />
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-12">
            {/* Instagram */}
            <div className="text-center flex flex-col items-center">
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <InstagramIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Instagram</h3>
              <p className="mt-2 text-muted-foreground">
                Ikuti kami untuk berita dan kegiatan terbaru.
              </p>
              <a
                href={`https://instagram.com/${kontak?.instagram.replace(
                  "@",
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 font-medium text-primary"
              >
                {kontak?.instagram}
              </a>
            </div>

            {/* WhatsApp */}
            <div className="text-center flex flex-col items-center">
              <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                <PhoneIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 font-semibold text-xl">WhatsApp</h3>
              <p className="mt-2 text-muted-foreground">
                Kontak langsung via WhatsApp:
              </p>
              <a
                href={`https://wa.me/${kontak?.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 font-medium text-primary"
              >
                {kontak?.whatsapp ? formatPhone(kontak.whatsapp) : ""}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
