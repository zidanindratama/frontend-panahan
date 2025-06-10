import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import Login from "./(main)/auth/login/login.tsx";
import Register from "./(main)/auth/register/register.tsx";
import NotFound from "./(main)/error/not-found.tsx";
import { Toaster } from "react-hot-toast";
import HomeDashboard from "./(main)/dashboard/home.tsx";
import AbsenAdminDashboard from "./(main)/dashboard/absen-admin/absen.tsx";
import AbsenMemberDashboard from "./(main)/dashboard/absen-member/absen.tsx";
import ProfileDashboard from "./(main)/dashboard/profile/profile.tsx";
import BeritaDashboard from "./(main)/dashboard/berita/berita.tsx";
import TambahBeritaDashboard from "./(main)/dashboard/berita/tambah/tambah-berita.tsx";
import UbahBeritaDashboard from "./(main)/dashboard/berita/ubah/ubah-berita.tsx";
import HalamanListBerita from "./(main)/berita/berita.tsx";
import HalamanDetailBerita from "./(main)/berita/detail/detail-berita.tsx";
import PengurusDashboard from "./(main)/dashboard/pengurus/pengurus.tsx";
import TambahPengurusDashboard from "./(main)/dashboard/pengurus/tambah/tambah-pengurus.tsx";
import UbahPengurusDashboard from "./(main)/dashboard/pengurus/ubah/ubah-pengurus.tsx";
import HalamanListPengurus from "./(main)/pengurus/pengurus.tsx";
import LupaPassword from "./(main)/auth/lupa-password/lupa-password.tsx";
import ResetPassword from "./(main)/auth/reset-password/lupa-password-verifikasi.tsx";
import KontakDashboard from "./(main)/dashboard/kontak/kontak.tsx";
import KontakFormulirDashboard from "./(main)/dashboard/kontak/form/formulir-kontak.tsx";
import GalleryDashboard from "./(main)/dashboard/gallery/gallery.tsx";
import TambahGalleryDashboard from "./(main)/dashboard/gallery/tambah/tambah-gallery.tsx";
import UbahGalleryDashboard from "./(main)/dashboard/gallery/ubah/ubah-gallery.tsx";
import HalamanListGallery from "./(main)/gallery/gallery.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/pengurus", element: <HalamanListPengurus /> },
  { path: "/gallery", element: <HalamanListGallery /> },
  { path: "/berita", element: <HalamanListBerita /> },
  { path: "/berita/:id", element: <HalamanDetailBerita /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/lupa-password", element: <LupaPassword /> },
  {
    path: "/auth/reset-password/:id",
    element: <ResetPassword />,
  },
  { path: "/dashboard", element: <HomeDashboard /> },
  { path: "/dashboard/profile", element: <ProfileDashboard /> },
  { path: "/dashboard/kontak", element: <KontakDashboard /> },
  { path: "/dashboard/kontak-form", element: <KontakFormulirDashboard /> },
  { path: "/dashboard/berita", element: <BeritaDashboard /> },
  { path: "/dashboard/berita/tambah", element: <TambahBeritaDashboard /> },
  {
    path: "/dashboard/berita/ubah/:id",
    element: <UbahBeritaDashboard />,
  },
  { path: "/dashboard/pengurus", element: <PengurusDashboard /> },
  { path: "/dashboard/pengurus/tambah", element: <TambahPengurusDashboard /> },
  {
    path: "/dashboard/pengurus/ubah/:id",
    element: <UbahPengurusDashboard />,
  },
  { path: "/dashboard/gallery", element: <GalleryDashboard /> },
  { path: "/dashboard/gallery/tambah", element: <TambahGalleryDashboard /> },
  { path: "/dashboard/gallery/ubah/:id", element: <UbahGalleryDashboard /> },
  { path: "/dashboard/absen-admin", element: <AbsenAdminDashboard /> },
  { path: "/dashboard/absen-member", element: <AbsenMemberDashboard /> },
  { path: "*", element: <NotFound /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </ThemeProvider>
  </StrictMode>
);
