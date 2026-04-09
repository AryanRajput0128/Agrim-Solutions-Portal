import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Landmark, FileText, MapPin, Building, Search, FileCheck, ArrowRight } from "lucide-react";

export default function Services() {
  const servicesList = [
    {
      id: "land-registration",
      icon: Landmark,
      title: "Land Registration",
      description: "Comprehensive end-to-end registration for agricultural, commercial, and industrial land parcels. We handle obtaining no-objection certificates, valuation assessments, and final deed registration.",
      features: ["Title search & verification", "Mutation entry processing", "Land valuation assessment", "Drafting of sale deeds"]
    },
    {
      id: "house-registration",
      icon: FileText,
      title: "House & Apartment Registration",
      description: "Secure the legal ownership of your residential property. We navigate the local municipal requirements and sub-registrar office procedures to ensure your home is legally yours.",
      features: ["Builder-buyer agreement review", "Occupancy certificate verification", "Stamp duty calculation & payment", "Registration at Sub-Registrar Office"]
    },
    {
      id: "plot-registration",
      icon: MapPin,
      title: "Plot Registration",
      description: "Specialized services for individual plots within city limits or newly developed areas. We ensure the layout approvals and subdivision rules are strictly adhered to.",
      features: ["Layout approval verification", "Encumbrance certificate retrieval", "Boundary verification documentation", "Final conveyance deed"]
    },
    {
      id: "colony-registration",
      icon: Building,
      title: "Colony Registration",
      description: "For developers and resident welfare associations. We handle the bulk registration processes required for new residential colonies and townships.",
      features: ["Town planning approvals", "Master layout registration", "Common area handover docs", "Individual unit sub-deeds"]
    },
    {
      id: "property-verification",
      icon: Search,
      title: "Property Verification",
      description: "Before you buy, let us verify. We conduct exhaustive legal scrutiny of property titles dating back up to 30 years to ensure you aren't buying into litigation.",
      features: ["30-year title search", "Pending litigation check", "Revenue record verification", "Comprehensive legal opinion report"]
    },
    {
      id: "document-consultation",
      icon: FileCheck,
      title: "Document Consultation",
      description: "Not sure what paperwork you need? Bring your files to our experts. We review existing documents, identify gaps, and provide a clear roadmap to regularization.",
      features: ["Document gap analysis", "Rectification deed drafting", "Lost document retrieval assistance", "Power of attorney drafting"]
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="bg-primary py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero.png')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
        <div className="container relative z-10 px-4 mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Professional, legally binding, and completely transparent property registration services tailored to your specific needs.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-background">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {servicesList.map((service, index) => (
              <div 
                key={service.id} 
                className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">{service.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Key Deliverables</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-sm text-muted-foreground">
                        <span className="text-secondary mr-2 mt-0.5">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/50 border-t border-border text-center">
        <div className="container px-4 mx-auto max-w-3xl">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Ready to proceed with your registration?</h2>
          <p className="text-lg text-muted-foreground mb-10">
            Book an appointment with our registration experts. We'll outline the exact process, required documents, and timeline for your specific property.
          </p>
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold h-14 px-8 text-lg">
            <Link href="/book-appointment">
              Schedule Consultation <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
