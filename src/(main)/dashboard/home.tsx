import Home from "@/components/main/dashboard/home";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const HomeDashboard = () => {
  useAuthRedirect("admin");

  return (
    <div>
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default HomeDashboard;
