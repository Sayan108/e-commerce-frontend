"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import useContactUsInfo from "@/hooks/useContactUsinfo";
import { Skeleton } from "@/components/ui/skeleton";
import { JSX } from "react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactPage() {
  const { toast } = useToast();
  const { loading, contactUsInfo } = useContactUsInfo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Contact form values:", values);

    toast({
      title: "Message Submitted",
      description:
        "Thank you for contacting us. We will get back to you shortly.",
    });

    form.reset();
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="mt-2 text-muted-foreground">
          We'd love to hear from you.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12">
        {/* CONTACT FORM */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Inquiry about an order"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message here..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Send Message</Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* CONTACT INFO */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold">Contact Information</h2>

          {loading && (
            <div className="space-y-4">
              <Skeleton className="h-5 w-64" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-5 w-80" />
            </div>
          )}

          {!loading && contactUsInfo && (
            <div className="space-y-6">
              <InfoItem
                icon={<Mail />}
                title="Email"
                value={contactUsInfo.email}
              />
              <InfoItem
                icon={<Phone />}
                title="Phone"
                value={contactUsInfo.phone}
              />
              <InfoItem
                icon={<MapPin />}
                title="Address"
                value={contactUsInfo.address}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  title,
  value,
}: {
  icon: JSX.Element;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-primary mt-1">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}
