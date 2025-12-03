import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '../shared/logo';
import { Separator } from '../ui/separator';

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
);
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z" /></svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2.315a4.425 4.425 0 0 1 4.425 4.425v.715a4.425 4.425 0 0 1-4.425 4.425a4.425 4.425 0 0 1-4.425-4.425V6.74a4.425 4.425 0 0 1 4.425-4.425Zm0 1.14a3.285 3.285 0 0 0-3.285 3.285v.715a3.285 3.285 0 0 0 3.285 3.285a3.285 3.285 0 0 0 3.285-3.285V6.74a3.285 3.285 0 0 0-3.285-3.285Z" clipRule="evenodd" /><path d="M10.893 2.25a.553.553 0 0 0-.447.199a.553.553 0 0 0-.199.447v4.256a.553.553 0 0 0 .199.447a.553.553 0 0 0 .447.199h4.256a.553.553 0 0 0 .447-.199a.553.553 0 0 0 .199-.447V2.896a.553.553 0 0 0-.199-.447a.553.553 0 0 0-.447-.199h-4.256Z" /><path fillRule="evenodd" d="M4.685 1.5h14.63a3.185 3.185 0 0 1 3.185 3.185v14.63a3.185 3.185 0 0 1-3.185 3.185H4.685A3.185 3.185 0 0 1 1.5 19.315V4.685A3.185 3.185 0 0 1 4.685 1.5Zm-1.14 3.185a1.14 1.14 0 0 1 1.14-1.14h14.63a1.14 1.14 0 0 1 1.14 1.14v14.63a1.14 1.14 0 0 1-1.14 1.14H4.685a1.14 1.14 0 0 1-1.14-1.14V4.685Z" clipRule="evenodd" /></svg>
);


export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 flex flex-col gap-4">
                <Logo />
                <p className="text-sm text-muted-foreground">
                    An elegant online boutique with a blast of style.
                </p>
                <div className="flex space-x-4 mt-2">
                    <Link href="#" className="text-muted-foreground hover:text-primary"><TwitterIcon className="h-5 w-5" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><FacebookIcon className="h-5 w-5" /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><InstagramIcon className="h-5 w-5" /></Link>
                </div>
            </div>
            <div className="md:col-span-2">
                <h3 className="mb-4 text-sm font-semibold text-foreground">Shop</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/categories" className="hover:text-primary">All Categories</Link></li>
                    <li><Link href="/#featured" className="hover:text-primary">Featured</Link></li>
                    <li><Link href="/#new-arrivals" className="hover:text-primary">New Arrivals</Link></li>
                </ul>
            </div>
            <div className="md:col-span-2">
                <h3 className="mb-4 text-sm font-semibold text-foreground">Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
                    <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
                    <li><Link href="/profile" className="hover:text-primary">My Account</Link></li>
                </ul>
            </div>
            <div className="md:col-span-4">
                <h3 className="mb-4 text-sm font-semibold text-foreground">Newsletter</h3>
                <p className="mb-4 text-sm text-muted-foreground">Subscribe to get the latest on sales, new releases and more.</p>
                <form className="flex gap-2">
                    <Input type="email" placeholder="Enter your email" className="bg-background"/>
                    <Button type="submit" variant="default">Subscribe</Button>
                </form>
            </div>
        </div>
        <Separator className="mt-12" />
        <div className="pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} BoutiqueBlast India. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
