import { Link, useLocation } from "wouter";
import { Menu, X, ShieldCheck, MapPin, Phone, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-secondary selection:text-secondary-foreground">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 sm:px-6 lg:px-8 text-sm hidden sm:flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 opacity-80" />
            <span>+91 91315 27745</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 opacity-80" />
            <span>solutionsagrim@gmail.com</span>
          </div>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2 opacity-80" />
          <span>Biaora, Rajgarh, Madhya Pradesh</span>
        </div>
      </div>

      {/* Main Nav */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-primary p-2 rounded-lg group-hover:bg-secondary transition-colors duration-300">
                  <ShieldCheck className="h-8 w-8 text-primary-foreground group-hover:text-primary transition-colors duration-300" />
                </div>
                <span className="text-2xl font-serif font-bold text-primary tracking-tight">
                  Agrim Solutions
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium transition-colors hover:text-secondary ${
                    location === link.href ? "text-primary font-bold" : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-md">
                <Link href="/book-appointment">Book Appointment</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="text-muted-foreground hover:text-primary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white absolute w-full shadow-lg">
            <div className="space-y-1 px-4 pb-6 pt-2">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-4 text-base font-medium rounded-md ${
                    location === link.href
                      ? "bg-primary/5 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4">
                <Button asChild className="w-full bg-secondary text-secondary-foreground font-bold" size="lg">
                  <Link href="/book-appointment" onClick={() => setMobileMenuOpen(false)}>
                    Book Appointment
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground border-t-4 border-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <ShieldCheck className="h-8 w-8 text-secondary" />
                <span className="text-2xl font-serif font-bold text-white">Agrim</span>
              </Link>
              <p className="text-primary-foreground/80 text-sm leading-relaxed">
                Your trusted partner for all property registration services in India. Official paperwork, handled with absolute precision and integrity.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Services</h3>
              <ul className="space-y-3">
                <li><Link href="/services" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Land Registration</Link></li>
                <li><Link href="/services" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">House Registration</Link></li>
                <li><Link href="/services" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Property Verification</Link></li>
                <li><Link href="/services" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Document Consultation</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">About Us</Link></li>
                <li><Link href="/contact" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Contact</Link></li>
                <li><Link href="/book-appointment" className="text-primary-foreground/80 hover:text-white transition-colors text-sm">Book Appointment</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-4">Visit Us</h3>
              <ul className="space-y-3 text-primary-foreground/80 text-sm">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-secondary shrink-0" />
                  <span>Akbar Building, Ground Floor,<br />Biaora, Rajgarh 465674<br />Madhya Pradesh</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-secondary shrink-0" />
                  <span>+91 91315 27745</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              &copy; {new Date().getFullYear()} Agrim Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-primary-foreground/60 text-sm flex items-center">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Authorized Property Registration Consultant
              </p>
              <Link
                href="/admin-login"
                className="text-primary-foreground/30 hover:text-primary-foreground/60 text-xs transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
