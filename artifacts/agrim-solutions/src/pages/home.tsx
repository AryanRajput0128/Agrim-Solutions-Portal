import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, FileCheck, Landmark, CheckCircle, Clock, ShieldCheck, MapPin } from "lucide-react";
import { useGetAppointmentStats } from "@workspace/api-client-react";

export default function Home() {
  const { data: stats } = useGetAppointmentStats();

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-primary py-20 lg:py-32 flex items-center min-h-[85vh]">
        <div className="absolute inset-0 z-0 opacity-20 bg-black">
          <img 
            src="/images/hero.png" 
            alt="Agrim Solutions Office" 
            className="w-full h-full object-cover object-center grayscale mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-primary via-primary/90 to-primary/40"></div>
        
        <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/20 text-secondary border border-secondary/30 backdrop-blur-sm font-medium text-sm">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Authorized Registration Office
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                Official property <br/>
                <span className="text-secondary">registration, done right.</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 font-medium leading-relaxed max-w-xl">
                We handle the complex paperwork, verify your documents, and navigate the bureaucratic process so your property titles are legally secured without the hassle.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold h-14 px-8 text-lg">
                  <Link href="/book-appointment">
                    Book an Appointment <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 border-white/20 h-14 px-8 text-lg">
                  <Link href="/services">
                    Explore Services
                  </Link>
                </Button>
              </div>

              {stats && stats.total > 0 && (
                <div className="pt-8 border-t border-white/10 flex items-center gap-6">
                  <div>
                    <div className="text-3xl font-bold text-white">{stats.completed.toLocaleString()}+</div>
                    <div className="text-primary-foreground/70 text-sm font-medium">Registrations Completed</div>
                  </div>
                  <div className="w-px h-12 bg-white/20"></div>
                  <div>
                    <div className="text-3xl font-bold text-white">{stats.recentCount.toLocaleString()}</div>
                    <div className="text-primary-foreground/70 text-sm font-medium">Appointments This Week</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="hidden lg:block relative h-[600px] rounded-lg overflow-hidden shadow-2xl border-4 border-white/10 animate-in fade-in slide-in-from-right-12 duration-1000 delay-300">
              <img 
                src="/images/about.png" 
                alt="Property document with official stamp" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0">
                    <FileCheck className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold font-serif text-lg">100% Legal Validity</h3>
                    <p className="text-sm text-white/80">Every document meticulously verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary">Comprehensive Registration Services</h2>
            <p className="text-lg text-muted-foreground">
              From residential plots to large commercial colonies, our experts ensure your property titles are flawlessly transferred and legally binding.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Landmark,
                title: "Land Registration",
                description: "Complete legal transfer and registration of agricultural, commercial, and industrial land parcels."
              },
              {
                icon: FileText,
                title: "House Registration",
                description: "Seamless registration process for independent houses, villas, and apartments."
              },
              {
                icon: MapPin,
                title: "Plot & Colony",
                description: "Specialized services for newly developed plots and authorized colony registrations."
              }
            ].map((service, index) => (
              <div key={index} className="group bg-card border border-border rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                <service.icon className="w-12 h-12 text-secondary mb-6 relative z-10" />
                <h3 className="text-xl font-bold font-serif text-primary mb-3 relative z-10">{service.title}</h3>
                <p className="text-muted-foreground relative z-10 mb-6">{service.description}</p>
                <Link href="/services" className="text-primary font-semibold flex items-center hover:text-secondary transition-colors relative z-10">
                  Learn more <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">Why people trust Agrim Solutions</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Property registration in India requires navigating complex legal requirements, local regulations, and exhaustive paperwork. We serve as your reliable guide through this entire process.
              </p>
              
              <ul className="space-y-6">
                {[
                  {
                    title: "No Bureaucratic Delays",
                    description: "We know the process inside out, ensuring your files move smoothly through the system."
                  },
                  {
                    title: "Thorough Verification",
                    description: "We identify potential legal issues before they become expensive problems."
                  },
                  {
                    title: "Transparent Pricing",
                    description: "Clear, upfront fee structures with no hidden charges or surprises."
                  }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1">
                      <CheckCircle className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-primary">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-primary rounded-2xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <Clock className="w-12 h-12 text-secondary mb-6" />
                <h3 className="text-2xl font-serif font-bold mb-4">Ready to secure your property?</h3>
                <p className="text-primary-foreground/90 mb-8 text-lg">
                  Don't leave your most valuable assets to chance. Book an appointment today and let our experts handle the rest.
                </p>
                <div className="space-y-4">
                  <Button asChild size="lg" className="w-full bg-secondary text-secondary-foreground hover:bg-white hover:text-primary font-bold transition-colors">
                    <Link href="/book-appointment">Schedule Visit</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <Link href="/contact">Contact Office</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
