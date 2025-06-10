import Kontak from "@/components/main/dashboard/kontak/kontak";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const KontakDashboard = () => {
  useAuthRedirect("admin");

  return (
    <div>
      <Navbar />
      <Kontak />
      <Footer />
    </div>
  );
};

export default KontakDashboard;
