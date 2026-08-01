import { Bell, Search, User, Menu } from "lucide-react";

export default function Header({ setIsMobileOpen }) {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background px-4 sm:px-6 shadow-sm">
      <button 
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden p-2 -ml-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors cursor-pointer"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex flex-1 items-center gap-4">
        <form className="relative w-full max-w-md hidden sm:block" onSubmit={(e) => e.preventDefault()}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full border border-border bg-card pl-9 pr-4 py-2 text-sm focus:border-brand focus:outline-none"
          />
        </form>
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="lg:hidden relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary cursor-pointer">
           <Search className="h-5 w-5" />
        </button>
        <button className="relative rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary cursor-pointer">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive"></span>
        </button>
        <div className="h-8 w-8 overflow-hidden rounded-full border border-border bg-secondary flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60" alt="John Doe" className="w-full h-full object-cover" />
        </div>
      </div>
    </header>
  );
}
