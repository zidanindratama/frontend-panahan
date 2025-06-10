import Gallery from "@/components/main/dashboard/gallery/gallery";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const GalleryDashboard = () => {
  useAuthRedirect("admin");

  return (
    <div>
      <Navbar />
      <Gallery />
      <Footer />
    </div>
  );
};

export default GalleryDashboard;
