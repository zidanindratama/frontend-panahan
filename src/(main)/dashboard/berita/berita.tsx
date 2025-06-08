import Berita from "@/components/main/dashboard/berita/berita";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const BeritaDashboard = () => {
  useAuthRedirect("admin");

  return (
    <div>
      <Navbar />
      <Berita />
      <Footer />
    </div>
  );
};

export default BeritaDashboard;
