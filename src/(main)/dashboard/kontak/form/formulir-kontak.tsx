import KontakForm from "@/components/main/dashboard/kontak/kontak-form";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const KontakFormulirDashboard = () => {
  useAuthRedirect("admin");

  return (
    <div>
      <Navbar />
      <KontakForm />
      <Footer />
    </div>
  );
};

export default KontakFormulirDashboard;
