import TambahPengurus from "@/components/main/dashboard/pengurus/tambah-pengurus";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const TambahPengurusDashboard = () => {
  useAuthRedirect("admin");

  return (
    <div>
      <Navbar />
      <TambahPengurus />
      <Footer />
    </div>
  );
};

export default TambahPengurusDashboard;
