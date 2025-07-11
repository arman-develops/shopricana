import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Shopricana</h3>
            <p className="text-gray-300 mb-4">
              Your trusted online shopping destination for quality products at great prices.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 hover:text-blue-400 cursor-pointer" />
              <Twitter className="h-5 w-5 hover:text-blue-400 cursor-pointer" />
              <Instagram className="h-5 w-5 hover:text-pink-400 cursor-pointer" />
              <Mail className="h-5 w-5 hover:text-green-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-white">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Shopricana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
