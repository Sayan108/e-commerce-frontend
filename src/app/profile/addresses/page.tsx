'use client';
import { useAuth } from '@/context/auth-context';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Address } from '@/lib/types';
import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const addressSchema = z.object({
  type: z.enum(['Home', 'Work']),
  line1: z.string().min(5, 'Address is too short'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(5, 'Valid ZIP code is required'),
  country: z.string().min(2, 'Country is required'),
});

type AddressFormValues = z.infer<typeof addressSchema>;

const AddressForm = ({ address, onSave, closeDialog }: { address?: Address; onSave: (data: Address | Omit<Address, 'id'>) => void, closeDialog: () => void }) => {
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: address || { type: 'Home', line1: '', city: '', state: '', zip: '', country: 'USA' },
  });

  const onSubmit = (data: AddressFormValues) => {
    if (address) {
        onSave({ ...data, id: address.id });
    } else {
        onSave(data);
    }
    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField name="line1" control={form.control} render={({ field }) => (
            <FormItem><FormLabel>Address Line 1</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <FormField name="city" control={form.control} render={({ field }) => (
            <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
         <div className="grid grid-cols-2 gap-4">
            <FormField name="state" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField name="zip" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
        </div>
        <Button type="submit">Save Address</Button>
      </form>
    </Form>
  );
};


export default function AddressesPage() {
    const { user, addAddress, updateAddress, deleteAddress } = useAuth();
    const [dialogOpen, setDialogOpen] = useState(false);

    if (!user) return (
      <Card>
          <CardHeader>
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
          </CardContent>
      </Card>
  );

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>My Addresses</CardTitle>
                    <CardDescription>Manage your saved shipping addresses.</CardDescription>
                </div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader><DialogTitle>Add New Address</DialogTitle></DialogHeader>
                        <AddressForm onSave={addAddress} closeDialog={() => setDialogOpen(false)} />
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {user.addresses.length > 0 ? user.addresses.map((address) => (
                        <div key={address.id} className="border p-4 rounded-md flex justify-between items-start">
                            <div>
                                <p className="font-semibold">{address.type}</p>
                                <p className="text-muted-foreground">{address.line1}, {address.city}, {address.state} {address.zip}</p>
                            </div>
                            <div className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger asChild><Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>Edit Address</DialogTitle></DialogHeader>
                                        <AddressForm address={address} onSave={updateAddress} closeDialog={() => {}} />
                                    </DialogContent>
                                </Dialog>
                                <Button variant="ghost" size="icon" onClick={() => deleteAddress(address.id)}><Trash className="h-4 w-4 text-destructive"/></Button>
                            </div>
                        </div>
                    )) : (
                        <p className="text-muted-foreground text-center py-4">You have no saved addresses.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
