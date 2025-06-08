import { PhoneIcon, InstagramIcon } from "lucide-react";
import { Link } from "react-router";

const Contact = () => (
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
          <Link
            to="https://instagram.com/fatahillah.archery"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 font-medium text-primary"
          >
            @fatahillah.archery
          </Link>
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
            href="https://wa.me/6287878325800"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 font-medium text-primary"
          >
            Lilis Setyowati – 0878 7832 5800
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
