import Absen from "@/components/main/dashboard/absen-admin/absen";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const AbsenAdminDashboard = () => {
  useAuthRedirect("admin");

  return (
    <div>
      <Navbar />
      <Absen />
      <Footer />
    </div>
  );
};

export default AbsenAdminDashboard;
