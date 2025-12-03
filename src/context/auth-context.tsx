
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { User, Address, Order } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/lib/data';
import { faker } from '@faker-js/faker';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, pass: string) => boolean;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => string | undefined;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (addressId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const createDummyData = () => {
    const dummyAddress: Address = {
        id: `addr-${faker.string.uuid()}`,
        type: 'Home',
        line1: '123 Fashion Street',
        city: 'Bengaluru',
        state: 'Karnataka',
        zip: '560001',
        country: 'India'
    };

    const dummyOrders: Order[] = Array.from({ length: 3 }).map((_, i) => {
        const orderItems = products.slice(i * 3, i * 3 + 3).map(p => ({ ...p, quantity: faker.number.int({ min: 1, max: 2 }) }));
        const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return {
            id: `order-${faker.string.uuid()}`,
            date: faker.date.past().toISOString(),
            items: orderItems,
            total: total,
            status: faker.helpers.arrayElement(['Delivered', 'Shipped', 'Pending']),
            shippingAddress: dummyAddress,
            paymentMethod: faker.helpers.arrayElement(['Online', 'COD']),
            trackingNumber: `TN${faker.string.alphanumeric(10).toUpperCase()}`
        }
    });

    return { dummyAddress, dummyOrders };
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const router = useRouter();
  const { toast } = useToast();

  const login = (email: string, name: string = 'Guest User') => {
    const existingUser = JSON.parse(localStorage.getItem('user') || 'null');
    
    if (existingUser) {
        setUser(existingUser);
        toast({ title: 'Login Successful', description: `Welcome back, ${existingUser.name}!` });
        return true;
    }

    const { dummyAddress, dummyOrders } = createDummyData();
    const mockUser: User = {
      id: `user-${faker.string.uuid()}`,
      name: name,
      email: email,
      addresses: [dummyAddress],
      orders: dummyOrders,
    };
    setUser(mockUser);
    toast({ title: 'Login Successful', description: `Welcome back, ${name}!` });
    return true;
  };
  
  const register = (name: string, email: string) => {
    const { dummyAddress, dummyOrders } = createDummyData();
    const newUser: User = {
        id: `user-${faker.string.uuid()}`,
        name,
        email,
        addresses: [dummyAddress],
        orders: dummyOrders,
    };
    setUser(newUser);
    toast({ title: 'Registration Successful', description: `Welcome, ${name}!` });
    return true;
  }

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
    }
    toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
    router.push('/');
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    if(!user) return;
    const orderId = `order-${faker.string.uuid()}`;
    const newOrder: Order = {
        ...orderData,
        id: orderId,
        date: new Date().toISOString(),
        trackingNumber: `TN${faker.string.alphanumeric(10).toUpperCase()}`
    };
    setUser(currentUser => {
        if (!currentUser) return null;
        return {
            ...currentUser,
            orders: [newOrder, ...currentUser.orders],
        }
    });
    return orderId;
  }

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    if (!user) return;
    const newAddress: Address = {
        ...addressData,
        id: `addr-${faker.string.uuid()}`,
    };
     setUser(u => u ? ({
        ...u,
        addresses: [...u.addresses, newAddress],
    }) : null);
    toast({ title: "Address Added", description: "Your new address has been saved." });
  };

  const updateAddress = (updatedAddress: Address) => {
    if (!user) return;
    setUser(u => u ? ({
        ...u,
        addresses: u.addresses.map(addr => addr.id === updatedAddress.id ? updatedAddress : addr),
    }) : null);
    toast({ title: "Address Updated", description: "Your address has been successfully updated." });
  };

  const deleteAddress = (addressId: string) => {
    if (!user) return;
    setUser(u => u ? ({
        ...u,
        addresses: u.addresses.filter(addr => addr.id !== addressId),
    }) : null);
    toast({ title: "Address Removed", description: "Your address has been removed." });
  }

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, addOrder, addAddress, updateAddress, deleteAddress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
