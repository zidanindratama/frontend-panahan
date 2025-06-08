import UbahPengurus from "@/components/main/dashboard/pengurus/ubah-pengurus";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const UbahPengurusDashboard = () => {
  useAuthRedirect("admin");

  return (
    <div>
      <Navbar />
      <UbahPengurus />
      <Footer />
    </div>
  );
};

export default UbahPengurusDashboard;
