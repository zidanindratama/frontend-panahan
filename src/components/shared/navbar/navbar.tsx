import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./nav-sheet";
import { Link, useNavigate } from "react-router";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { jwtDecode } from "jwt-decode";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { OctagonAlert } from "lucide-react";

interface DecodedToken {
  id: string;
  role: "admin" | "user";
  exp: number;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [fotoProfil, setFotoProfil] = useState<string | null>(null);
  const [openLogout, setOpenLogout] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUser(decoded);

        fetch("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            setUsername(data.username);
            setFotoProfil(data.fotoProfil);
          });
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="hover:underline font-bold text-xl">
            Fatahilah Archery
          </Link>

          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            <ModeToggle />

            {!user ? (
              <>
                <Button
                  variant="outline"
                  className="hidden sm:inline-flex"
                  asChild
                >
                  <Link to="/auth/login">Masuk</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth/register">Daftar</Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      className="object-cover"
                      src={
                        fotoProfil ??
                        "https://ui-avatars.com/api/?name=F+A&background=random"
                      }
                    />
                    <AvatarFallback>FA</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="mt-5">
                  <DropdownMenuLabel>
                    {username ? `Halo, ${username}` : "Menu"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.role === "admin" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard/absen-admin">Absen</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard/berita">Berita</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard/pengurus">Pengurus</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard/kontak">Kontak</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard/gallery">Gallery</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user.role !== "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard/absen-member">Absen</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">Profil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setOpenLogout(true)}
                    className="text-red-500"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>

      <AlertDialog open={openLogout} onOpenChange={setOpenLogout}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <div className="mx-auto sm:mx-0 mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
                <OctagonAlert className="h-5 w-5 text-destructive" />
              </div>
              Keluar dari akun?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Anda akan keluar dari akun dan kembali ke halaman utama.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Navbar;
