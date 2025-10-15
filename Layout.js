import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRightLeft, Droplets, Wallet, BarChart3, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children }) {
  const location = useLocation();
  const [isWalletConnected, setIsWalletConnected] = React.useState(false);

  const navigationItems = [
    { title: "Swap", url: createPageUrl("Swap"), icon: ArrowRightLeft },
    { title: "Pools", url: createPageUrl("Pools"), icon: Droplets },
    { title: "Portfolio", url: createPageUrl("Portfolio"), icon: Wallet },
    { title: "Analytics", url: createPageUrl("Analytics"), icon: BarChart3 },
  ];

  const isActive = (url) => location.pathname === url;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <style>{`
        :root {
          --base-blue: #0052FF;
          --base-blue-light: #3D7FFF;
          --base-purple: #8B5CF6;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, var(--base-blue-light) 0%, var(--base-purple) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .glow-effect {
          box-shadow: 0 0 40px rgba(61, 127, 255, 0.3);
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={createPageUrl("Swap")} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center glow-effect">
                <ArrowRightLeft className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">BaseDEX</h1>
                <p className="text-xs text-blue-300">Trade on Base</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    isActive(item.url)
                      ? "bg-white/10 text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            </nav>

            {/* Wallet & Settings */}
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                    <Settings className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="glass-effect border-white/10">
                  <DropdownMenuItem className="text-white">Settings</DropdownMenuItem>
                  <DropdownMenuItem className="text-white">Language</DropdownMenuItem>
                  <DropdownMenuItem className="text-white">Theme</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {isWalletConnected ? (
                <Button
                  onClick={() => setIsWalletConnected(false)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">0x7a3d...8f2c</span>
                  <span className="sm:hidden">Connected</span>
                </Button>
              ) : (
                <Button
                  onClick={() => setIsWalletConnected(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 glow-effect"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex gap-1 pb-3 overflow-x-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  isActive(item.url)
                    ? "bg-white/10 text-white"
                    : "text-gray-300"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ArrowRightLeft className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-400 text-sm">
                BaseDEX - Decentralized Trading on Base Network
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Docs</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
