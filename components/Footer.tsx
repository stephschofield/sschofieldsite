import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {[
            { name: "Home", href: "/" },
            { name: "About", href: "#about" },
            { name: "Services", href: "#services" },
            { name: "Projects", href: "/projects" },
            { name: "Contact", href: "#contact" },
            { name: "Feedback", href: "/feedback" },
            { name: "Privacy", href: "#" },
            { name: "Terms", href: "#" },
          ].map((item) => (
            <div key={item.name} className="pb-6">
              <Link href={item.href} className="text-sm leading-6 text-muted-foreground hover:text-foreground">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-10 text-center text-sm leading-5 text-muted-foreground">
          &copy; {new Date().getFullYear()} Stephanie Schofield. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
