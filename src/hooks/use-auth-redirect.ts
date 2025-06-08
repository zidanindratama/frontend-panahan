import { useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useAuthRedirect(role?: "admin") {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Silakan login terlebih dahulu");
      navigate("/auth/login");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      // Jika role = 'admin' tapi token bukan admin
      if (role === "admin" && payload.role !== "admin") {
        toast.error("Akses hanya untuk admin");
        navigate("/");
      }
    } catch (err) {
      console.error("Token tidak valid:", err);
      toast.error("Token tidak valid, silakan login ulang");
      localStorage.removeItem("token");
      navigate("/auth/login");
    }
  }, [navigate, role]);
}
