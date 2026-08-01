import { useState } from "react";
import { User, Bell, Shield, CreditCard, Save, Upload } from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6">
      
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account preferences and personal information.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "profile" 
                ? "bg-brand text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <User className="w-4 h-4" /> Profile Information
          </button>
          
          <button 
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "notifications" 
                ? "bg-brand text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Bell className="w-4 h-4" /> Notifications
          </button>
          
          <button 
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "security" 
                ? "bg-brand text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <Shield className="w-4 h-4" /> Security
          </button>
          
          <button 
            onClick={() => setActiveTab("billing")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
              activeTab === "billing" 
                ? "bg-brand text-primary-foreground shadow-sm" 
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <CreditCard className="w-4 h-4" /> Billing & Plan
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          <div className="bg-card border border-border rounded-2xl shadow-soft">
            
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Profile Photo</h3>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-secondary overflow-hidden shrink-0">
                      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=60" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-2">
                      <button className="bg-brand/10 text-brand px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand/20 transition-colors flex items-center gap-2">
                        <Upload className="w-4 h-4" /> Upload New
                      </button>
                      <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-foreground mb-2">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">First Name</label>
                      <input type="text" defaultValue="John" className="w-full border border-border rounded-xl p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Last Name</label>
                      <input type="text" defaultValue="Doe" className="w-full border border-border rounded-xl p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <input type="email" defaultValue="john.doe@example.com" className="w-full border border-border rounded-xl p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Bio / Headline</label>
                    <textarea rows="3" defaultValue="Frontend Developer passionate about UI/UX" className="w-full border border-border rounded-xl p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand text-sm resize-none"></textarea>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-end">
                  <button className="bg-brand text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-brand-deep transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    
                    <label className="flex items-start gap-4 cursor-pointer">
                      <div className="relative flex items-center mt-1">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-brand transition-colors"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Course Updates</p>
                        <p className="text-xs text-muted-foreground">Get notified about new modules and resources.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-4 cursor-pointer">
                      <div className="relative flex items-center mt-1">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-brand transition-colors"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Live Class Reminders</p>
                        <p className="text-xs text-muted-foreground">Receive an email 30 minutes before a class starts.</p>
                      </div>
                    </label>
                    
                    <label className="flex items-start gap-4 cursor-pointer">
                      <div className="relative flex items-center mt-1">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-secondary rounded-full peer peer-checked:bg-brand transition-colors"></div>
                        <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5 shadow-sm"></div>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Marketing & Offers</p>
                        <p className="text-xs text-muted-foreground">Receive promotional emails and discounts.</p>
                      </div>
                    </label>

                  </div>
                </div>
                
                <div className="pt-4 border-t border-border flex justify-end">
                  <button className="bg-brand text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-brand-deep transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="p-6 md:p-8 space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full border border-border rounded-xl p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full border border-border rounded-xl p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full border border-border rounded-xl p-3 bg-transparent focus:outline-none focus:ring-2 focus:ring-brand text-sm" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex justify-start">
                  <button className="bg-brand text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-brand-deep transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === "billing" && (
              <div className="p-6 md:p-8 space-y-8">
                <div className="bg-brand/5 border border-brand/20 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1">Pro Plan</h3>
                    <p className="text-sm text-muted-foreground">You are currently on the Pro Annual Plan.</p>
                  </div>
                  <button className="bg-white border border-border text-foreground px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors">
                    Manage Subscription
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground mb-4">Payment Methods</h3>
                  <div className="border border-border rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-secondary rounded flex items-center justify-center shrink-0">
                         <span className="font-bold text-xs italic">VISA</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">Visa ending in 4242</p>
                        <p className="text-xs text-muted-foreground">Expires 12/2027</p>
                      </div>
                    </div>
                    <button className="text-sm text-brand font-medium hover:underline">Edit</button>
                  </div>
                  
                  <button className="mt-4 text-sm text-foreground font-medium flex items-center gap-2 hover:text-brand transition-colors">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary">+</span> Add new payment method
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
