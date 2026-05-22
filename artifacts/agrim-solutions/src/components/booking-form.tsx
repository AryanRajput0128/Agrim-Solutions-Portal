import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateAppointment } from "@workspace/api-client-react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "wouter";

const timeSlots = [
  "9:00 AM", "9:30 AM",
  "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM",
  "5:00 PM",
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Valid 10-digit phone number required").max(15),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  serviceType: z.string().min(1, "Please select a service type"),
  query: z.string().min(5, "Please provide some details about your work"),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const services = [
  "Land Registration",
  "House Registration",
  "Plot Registration",
  "Colony Registration",
  "Property Verification",
  "Document Consultation",
];

export function BookingForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const createAppointment = useCreateAppointment();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      query: "",
      preferredDate: "",
      preferredTime: "",
    },
  });

  function onSubmit(data: FormValues) {
    createAppointment.mutate(
      {
        data: {
          ...data,
          email: data.email || "",
          preferredDate: data.preferredDate || undefined,
          preferredTime: data.preferredTime || undefined,
        },
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
      }
    );
  }

  if (isSuccess) {
    return (
      <div className="bg-card p-8 rounded-xl shadow-lg border border-border text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-primary">Appointment Requested Successfully</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Thank you for choosing Agrim Solutions. One of our registration experts will contact you shortly on your provided phone number to confirm your time slot.
        </p>
        <div className="pt-4 border-t border-border flex justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/">Return to Home</Link>
          </Button>
          <Button onClick={() => { setIsSuccess(false); form.reset(); }}>
            Book Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card p-8 rounded-xl shadow-xl border border-border">
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-bold text-primary mb-2">Book an Appointment</h2>
        <p className="text-muted-foreground text-sm">
          Fill out the details below, and our experts will be ready with the right forms and guidance for your visit.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-semibold">Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-secondary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-semibold">Phone Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 98765 43210" {...field} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-secondary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Email + Service */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-semibold">Email Address (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-secondary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serviceType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-semibold">Service Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-muted/50 border-muted-foreground/20 focus:ring-secondary">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>{service}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Preferred Date + Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-semibold">Preferred Date (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      min={new Date().toISOString().split("T")[0]}
                      className="bg-muted/50 border-muted-foreground/20 focus-visible:ring-secondary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-semibold">Preferred Time (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-muted/50 border-muted-foreground/20 focus:ring-secondary">
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Query */}
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-semibold">Work Details / Query *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please briefly describe the property and what needs to be registered..."
                    className="min-h-[120px] resize-none bg-muted/50 border-muted-foreground/20 focus-visible:ring-secondary"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg h-14"
            disabled={createAppointment.isPending}
          >
            {createAppointment.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting Request...
              </>
            ) : (
              "Request Appointment"
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            By submitting this form, you agree to be contacted by Agrim Solutions regarding your query. Your data is kept secure and confidential.
          </p>
        </form>
      </Form>
    </div>
  );
}
