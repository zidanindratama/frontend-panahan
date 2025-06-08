import AbsenMember from "@/components/main/dashboard/absen-member/absen";
import Footer from "@/components/main/footer";
import Navbar from "@/components/shared/navbar/navbar";
import { useAuthRedirect } from "@/hooks/use-auth-redirect";

const AbsenMemberDashboard = () => {
  useAuthRedirect();

  return (
    <div>
      <Navbar />
      <AbsenMember />
      <Footer />
    </div>
  );
};

export default AbsenMemberDashboard;
