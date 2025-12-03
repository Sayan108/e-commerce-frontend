import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Logo } from '../shared/logo';

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3.3 4.9s-5.2-.8-5.2-.8l-.5 2.2s-2.6 1.4-4.4 1.4-4.4-1.4-4.4-1.4l-.5-2.2s-5.2.8-5.2.8 1.7-3.5 3.3-4.9c-1.3-1.3-2-3.4-2-3.4s2.1.8 4.2 2.2c2.1-1.4 4.2-2.2 4.2-2.2z" /></svg>
);
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);


export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-12">
      <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="text-sm">
            An elegant online boutique with a blast of style.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/categories" className="hover:text-primary">Shop</Link></li>
            <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
            <li><Link href="/profile" className="hover:text-primary">My Account</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-foreground">Follow Us</h3>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-primary"><TwitterIcon className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-primary"><FacebookIcon className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-primary"><InstagramIcon className="h-5 w-5" /></Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold text-foreground">Newsletter</h3>
          <p className="mb-4 text-sm">Subscribe to get the latest on sales, new releases and more.</p>
          <form className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="bg-background"/>
            <Button type="submit" variant="default">Subscribe</Button>
          </form>
        </div>
      </div>
      <div className="container mx-auto mt-8 max-w-7xl border-t pt-8 px-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} BoutiqueBlast. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
