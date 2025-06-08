import Pengurus from "@/components/main/dashboard/pengurus/pengurus";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const PengurusDashboard = () => {
  useAuthRedirect("admin");

  return (
    <div>
      <Navbar />
      <Pengurus />
      <Footer />
    </div>
  );
};

export default PengurusDashboard;
