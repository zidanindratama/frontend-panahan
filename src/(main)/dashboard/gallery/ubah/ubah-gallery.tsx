import UbahGallery from "@/components/main/dashboard/gallery/ubah-gallery";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const UbahGalleryDashboard = () => {
  useAuthRedirect("admin");

  return (
    <div>
      <Navbar />
      <UbahGallery />
      <Footer />
    </div>
  );
};

export default UbahGalleryDashboard;
