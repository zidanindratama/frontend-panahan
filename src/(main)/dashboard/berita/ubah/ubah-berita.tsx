import UbahBerita from "@/components/main/dashboard/berita/ubah-berita";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const UbahBeritaDashboard = () => {
  useAuthRedirect("admin");

  return (
    <div>
      <Navbar />
      <UbahBerita />
      <Footer />
    </div>
  );
};

export default UbahBeritaDashboard;
