import { Separator } from "@radix-ui/react-separator";
import { footerData } from "@/lib/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Footer() {
  const { brand, links, social } = footerData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="">
      {/* Newsletter Section */}
      <div className="border-t border-muted-foreground/20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Stay in the loop
              </h3>
              <p className="text-gray-400">
                Subscribe to get special offers, free giveaways, and updates.
              </p>
            </div>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="text-white placeholder:text-gray-500 focus:border-indigo-500"
              />
              <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent w-fit mb-4">
              {brand.name}
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              {brand.tagline}
            </p>
            <div className="flex gap-3">
              {social.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="w-10 h-10 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  aria-label={item.name}
                >
                  <span className="text-lg">{item.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              {links.shop.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {links.support.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-800" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>© {currentYear} ivusc. All rights reserved.</p>
          <div className="flex gap-6">
            <span>🔒 Secure Payment</span>
            <span>🚚 Fast Delivery</span>
            <span>💯 Money Back Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}