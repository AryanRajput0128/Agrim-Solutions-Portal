import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Trophy, Scale } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <div className="container relative z-10 px-4 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">About Agrim Solutions</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Your trusted bridge between complex legal property frameworks and successful, stress-free registrations.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-primary">Establishing Trust in Property Transactions</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Founded on the principles of transparency and legal diligence, Agrim Solutions was established to solve a critical problem: the opaque, often frustrating process of property registration in India.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                For years, individuals and businesses have struggled with bureaucratic red tape, hidden fees, and legal ambiguities when trying to secure their property titles. We built this office to be the antidote.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we serve as an authoritative liaison office. Our team comprises former revenue officials, seasoned property lawyers, and meticulous documentation experts who ensure that when a file leaves our desk, it is flawless.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/about.png" 
                  alt="Official property documentation" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-card border border-border p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                <ShieldCheck className="w-10 h-10 text-secondary mb-3" />
                <p className="font-bold text-primary text-lg">100% Compliant</p>
                <p className="text-sm text-muted-foreground">Every registration meets strict government regulations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30 border-y border-border">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide every document we review, every deed we draft, and every registration we facilitate.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Uncompromising Integrity",
                description: "We never cut corners. We believe that a legally sound registration is the only kind worth doing. Your security is our priority."
              },
              {
                icon: Scale,
                title: "Legal Precision",
                description: "Property law is unforgiving to errors. Our meticulous attention to detail ensures your documents withstand the test of time."
              },
              {
                icon: Users,
                title: "Client-Centric Process",
                description: "We demystify the bureaucratic jargon, keeping you informed and confident throughout the entire registration journey."
              }
            ].map((value, i) => (
              <div key={i} className="bg-card p-8 rounded-xl border border-border shadow-sm text-center">
                <div className="mx-auto w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-serif text-primary mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-center">
         <div className="container px-4 mx-auto max-w-3xl">
          <Trophy className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Experience You Can Rely On</h2>
          <p className="text-lg text-primary-foreground/80 mb-10">
            When you choose Agrim Solutions, you're not just hiring a service; you're partnering with decades of collective experience in property law and revenue department procedures.
          </p>
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-white hover:text-primary font-bold">
            <Link href="/book-appointment">Book an Appointment Today</Link>
          </Button>
         </div>
      </section>
    </div>
  );
}
