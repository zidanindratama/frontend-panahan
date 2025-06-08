import TambahBerita from "@/components/main/dashboard/berita/tambah-berita";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const TambahBeritaDashboard = () => {
  useAuthRedirect("admin");

  return (
    <div>
      <Navbar />
      <TambahBerita />
      <Footer />
    </div>
  );
};

export default TambahBeritaDashboard;
