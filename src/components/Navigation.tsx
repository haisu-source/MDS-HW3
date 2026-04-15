"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "🏡" },
  { href: "/reflect", label: "Reflect", icon: "🌱" },
  { href: "/books", label: "Books", icon: "📖" },
  { href: "/habits", label: "Habits", icon: "✨" },
  { href: "/harmony", label: "Harmony", icon: "💛" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 bg-sand/90 backdrop-blur-sm border-b border-sand-dark">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🌿</span>
          <span className="text-xl font-bold text-bark tracking-tight group-hover:text-terracotta transition-colors">
            LifeStyling
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {isSignedIn &&
            NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-terracotta text-white shadow-sm"
                    : "text-warm-brown hover:bg-peach-light"
                }`}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </Link>
            ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              />
              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-peach-light transition-colors"
                aria-label="Toggle navigation"
              >
                <span className="text-xl">{mobileOpen ? "✕" : "☰"}</span>
              </button>
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="text-sm font-semibold text-warm-brown hover:text-terracotta transition-colors">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="bg-terracotta text-white rounded-full px-5 py-2 text-sm font-semibold hover:bg-terracotta-dark transition-colors">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && isSignedIn && (
        <div className="md:hidden bg-sand border-t border-sand-dark px-4 pb-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-terracotta text-white"
                  : "text-warm-brown hover:bg-peach-light"
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
