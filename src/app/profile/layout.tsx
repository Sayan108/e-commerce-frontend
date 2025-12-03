'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { User, ShoppingBag, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

const navItems = [
    { href: '/profile', icon: User, label: 'My Profile' },
    { href: '/profile/orders', icon: ShoppingBag, label: 'My Orders' },
    { href: '/profile/addresses', icon: MapPin, label: 'My Addresses' },
];

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    
    return (
        <div className="container mx-auto max-w-7xl px-4 py-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight font-headline">My Account</h1>
                <p className="mt-2 text-lg text-muted-foreground">Welcome back, {user?.name}!</p>
            </header>
            <div className="grid md:grid-cols-4 gap-8">
                <aside className="md:col-span-1">
                    <nav className="flex flex-col space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                                    (pathname === item.href || (item.href !== '/profile' && pathname.startsWith(item.href))) && 'bg-muted text-primary font-semibold',
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.label}
                            </Link>
                        ))}
                         <button
                            onClick={() => logout()}
                            className={cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-left',
                            )}
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    </nav>
                </aside>
                <main className="md:col-span-3">
                    {children}
                </main>
            </div>
        </div>
    );
}
