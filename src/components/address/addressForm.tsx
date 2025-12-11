"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Address, AddressType } from "@/lib/redux/types/address.types";

/* ================================
   ✅ VALIDATION
================================ */
const addressSchema = z.object({
  addressType: z.nativeEnum(AddressType),
  lineOne: z.string().min(5, "Address is too short"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zip: z.string().min(5, "ZIP is required"),
  country: z.string().min(2, "Country is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

/* ================================
   ✅ COMPONENT
================================ */
interface AddressFormProps {
  address?: Address; // edit mode
  onSave: any;
  closeDialog: () => void;
}

export const AddressForm = ({
  address,
  onSave,
  closeDialog,
}: AddressFormProps) => {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: address || {
      addressType: AddressType.home,
      lineOne: "",
      city: "",
      state: "",
      zip: "",
      country: "India",
    },
  });

  const onSubmit = (data: AddressFormValues) => {
    if (address) {
      // ✅ UPDATE
      onSave({ ...address, ...data });
    } else {
      // ✅ CREATE
      onSave(data);
    }
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* ✅ ADDRESS TYPE */}
        <FormField
          control={form.control}
          name="addressType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={AddressType.home}>Home</SelectItem>
                  <SelectItem value={AddressType.office}>Office</SelectItem>
                  <SelectItem value={AddressType.other}>Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ✅ LINE ONE */}
        <FormField
          control={form.control}
          name="lineOne"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Line</FormLabel>
              <FormControl>
                <Input {...field} placeholder="House no, street, area" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ✅ CITY */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ✅ STATE + ZIP */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* ✅ COUNTRY */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ✅ SUBMIT */}
        <Button type="submit" className="w-full">
          {address ? "Update Address" : "Save Address"}
        </Button>
      </form>
    </Form>
  );
};
