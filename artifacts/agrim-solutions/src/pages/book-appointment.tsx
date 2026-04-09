import { BookingForm } from "@/components/booking-form";
import { Clock, MapPin, Phone, Mail } from "lucide-react";

export default function BookAppointment() {
  return (
    <div className="py-12 md:py-24 bg-muted/10 min-h-[calc(100vh-200px)]">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-12">
          
          <div className="lg:col-span-2 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div>
              <h1 className="text-4xl font-serif font-bold text-primary mb-4">Schedule Your Visit</h1>
              <p className="text-lg text-muted-foreground">
                Reserving a time slot ensures our registration experts can review your specific case requirements and prepare the necessary preliminary paperwork before you arrive.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
              <h3 className="text-lg font-bold font-serif text-primary border-b border-border pb-4">Office Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Agrim Solutions HQ</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      123 Registration Enclave,<br />
                      Sector 4, New Delhi<br />
                      110001, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Working Hours</p>
                    <p className="text-muted-foreground text-sm">
                      Monday - Friday: 9:30 AM - 5:30 PM<br />
                      Saturday: 9:30 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Contact</p>
                    <p className="text-muted-foreground text-sm">
                      +91 98765 43210
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground text-sm">
                      appointments@agrimsolutions.in
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
              <h4 className="font-bold text-primary mb-2">What to bring?</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Original property deeds</li>
                <li>Valid ID proof (Aadhar/PAN)</li>
                <li>Recent passport size photographs</li>
                <li>Previous chain of documents (if any)</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3 animate-in fade-in slide-in-from-right-8 duration-700">
            <BookingForm />
          </div>

        </div>
      </div>
    </div>
  );
}
