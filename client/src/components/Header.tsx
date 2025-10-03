import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { ShieldCheck } from "lucide-react";

const Header: React.FC = () => {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const closeSheet = () => setIsOpen(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <ShieldCheck className="text-primary text-3xl mr-2" />
            <Link href="/">
              <a className="text-xl font-bold text-slate-800">Neo</a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <a
                  className={`transition duration-150 ${
                    location === item.path
                      ? "text-primary hover:text-primary/90"
                      : "text-slate-700 hover:text-primary"
                  }`}
                >
                  {item.name}
                </a>
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden focus:outline-none"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path}>
                    <a
                      onClick={closeSheet}
                      className={`px-2 py-1 rounded-md ${
                        location === item.path
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-slate-700 hover:text-primary"
                      }`}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
