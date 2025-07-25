import GantiPassword from "@/components/main/dashboard/profile/ganti-password";
import Profile from "@/components/main/dashboard/profile/profile";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const ProfileDashboard = () => {
  useAuthRedirect();

  return (
    <div>
      <Navbar />
      <Profile />
      <GantiPassword />
      <Footer />
    </div>
  );
};

export default ProfileDashboard;
