import TambahGallery from "@/components/main/dashboard/gallery/tambah-gallery";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const TambahGalleryDashboard = () => {
  useAuthRedirect("admin");

  return (
    <div>
      <Navbar />
      <TambahGallery />
      <Footer />
    </div>
  );
};

export default TambahGalleryDashboard;
