import { Separator } from "@/components/ui/separator";
import { InstagramIcon, PhoneIcon } from "lucide-react";
import { Link } from "react-router";
import { NAV_LINKS } from "@/constants/navigation-links";

const Footer = () => {
  return (
    <div className="flex flex-col">
      <Separator />
      <footer>
        <div className="max-w-screen-xl mx-auto">
          <div className="py-12 flex flex-col justify-start items-center">
            <Link to="/" className="hover:underline font-bold text-xl">
              Fatahilah Archery
            </Link>
            {/* Navigasi */}
            <ul className="mt-6 flex items-center gap-4 flex-wrap">
              {NAV_LINKS.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-muted-foreground hover:text-foreground font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Bawah footer */}
          <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
            <span className="text-muted-foreground text-center sm:text-left">
              &copy; {new Date().getFullYear()} Fatahillah Archery. Seluruh hak
              cipta dilindungi.
            </span>

            <div className="flex items-center gap-5 text-muted-foreground">
              <a
                href="https://instagram.com/fatahillah.archery"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href="https://wa.me/6287878325800"
                target="_blank"
                rel="noopener noreferrer"
              >
                <PhoneIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
