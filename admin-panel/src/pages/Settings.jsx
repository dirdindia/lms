export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-brand-deep font-display">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your platform configuration.</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-soft max-w-2xl">
        <h2 className="text-lg font-semibold text-foreground mb-4">General Settings</h2>
        
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-brand-deep mb-1.5">Platform Name</label>
            <input 
              type="text" 
              defaultValue="Nawdeep Mahila Sangh"
              className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-deep mb-1.5">Support Email</label>
            <input 
              type="email" 
              defaultValue="info@nawdeepmahilasangh.org"
              className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-border">
            <button 
              type="button"
              className="rounded-full bg-gradient-brand px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
