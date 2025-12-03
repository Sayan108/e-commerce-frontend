'use client';

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

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function ContactPage() {
    const { toast } = useToast();
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
    console.log(values);
    toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    form.reset();
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Contact Us</h1>
        <p className="mt-2 text-lg text-muted-foreground">We'd love to hear from you. Here's how you can reach us.</p>
      </header>
      <div className="grid md:grid-cols-2 gap-12">
        <Card>
            <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                    <Input placeholder="Inquiry about an order" {...field} />
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
                                    <Textarea placeholder="Your message here..." {...field} />
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
        <div className="space-y-8">
            <h2 className="text-2xl font-bold font-headline">Contact Information</h2>
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1"/>
                    <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">support@boutiqueblast.co.in</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1"/>
                    <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1"/>
                    <div>
                        <h3 className="font-semibold">Address</h3>
                        <p className="text-muted-foreground">123 Fashion Street, Bengaluru, 560001, India</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
