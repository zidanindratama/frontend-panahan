import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12 items-center">
        <div>
          <Badge className="bg-gradient-to-br from-yellow-600 via-red-200 to-yellow-600 rounded-full py-1 px-3 border-none text-sm">
            WELCOME TO
          </Badge>
          <h1 className="mt-4 text-4xl md:text-5xl lg:text-[2.75rem] xl:text-5xl font-bold leading-tight">
            FATAHILLAH ARCHERY
          </h1>

          <p className="mt-6 text-lg text-muted-foreground text-justify">
            Bergabunglah bersama <strong>Fatahillah Archery</strong>, klub
            panahan tradisional yang berdedikasi membentuk karakter unggul
            generasi muda melalui olahraga yang sarat nilai—
            <em>sportivitas, disiplin, dan integritas</em>.
            <br />
            <br />
            Kami menyediakan pelatihan sistematis dan terstruktur untuk pelajar
            tingkat dasar hingga menengah, dipandu pelatih profesional dengan
            perlengkapan berstandar nasional.
            <br />
            <br />
            Terakreditasi resmi oleh <strong>FESPATI</strong>, di bawah naungan{" "}
            <strong>KORMI</strong> dan <strong>KEMENPORA RI</strong>, Fatahillah
            Archery hadir sebagai wadah pembinaan prestasi sekaligus pelestarian
            budaya olahraga panahan Indonesia.
          </p>

          <div className="mt-10 flex items-center gap-4">
            <Link to="/auth/register">
              <Button
                size="lg"
                className="rounded-full text-base cursor-pointer"
              >
                Daftar Sekarang <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full rounded-xl flex items-center justify-center">
          <img
            src="logo.png"
            alt="Fatahillah Archery Logo"
            className="h-96 w-96 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
