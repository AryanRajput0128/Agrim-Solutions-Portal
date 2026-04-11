import { BookingForm } from "@/components/booking-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header */}
      <section className="bg-primary py-16">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Contact Us</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
            Get in touch with our office for inquiries, or book an appointment directly for registration services.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background flex-1">
        <div className="container px-4 md:px-6 mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary mb-6">Office Details</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Visit Us</h3>
                      <p className="text-muted-foreground mt-1">
                        Akbar Building, Ground Floor,<br />
                        Biaora, Rajgarh 465674<br />
                        Madhya Pradesh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Call Us</h3>
                      <p className="text-muted-foreground mt-1">
                        +91 91315 27745<br />
                        +91 98935 88175
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Email Us</h3>
                      <p className="text-muted-foreground mt-1">
                        solutionsagrim@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">Business Hours</h3>
                      <p className="text-muted-foreground mt-1">
                        Monday - Friday: 9:30 AM - 5:30 PM<br />
                        Saturday: 9:30 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Maps Placeholder */}
              <div className="bg-muted rounded-xl h-64 border border-border flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-30 grayscale"></div>
                <div className="relative z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-md border border-border shadow-sm text-sm font-medium text-primary flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> View on Map
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <BookingForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
