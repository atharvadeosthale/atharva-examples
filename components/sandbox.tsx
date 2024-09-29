"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Settings, Laptop } from "lucide-react";

type SandboxConfig = {
  type: "url" | "component" | string;
  content: string | ReactNode;
  defaultDarkMode?: boolean;
  defaultZoom?: number;
  title?: string;
};

type SandboxProps = {
  config: SandboxConfig;
  configSection: ReactNode;
};

export function SandboxComponent({ config, configSection }: SandboxProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(config.defaultDarkMode ?? false);
  const [zoom, setZoom] = useState(config.defaultZoom ?? 100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const renderContent = () => {
    if (config.type === "url") {
      return (
        <iframe
          src={config.content as string}
          className="w-full h-full"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top left",
          }}
          title="Sandbox Preview"
        />
      );
    } else {
      return (
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top left",
          }}
        >
          {config.content}
        </div>
      );
    }
  };

  const ConfigPanel = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      {configSection}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Loading..." : "Apply Changes"}
      </Button>
    </form>
  );

  return (
    <div
      className={`flex flex-col h-screen bg-background ${
        darkMode ? "dark" : ""
      }`}
    >
      <header className="flex items-center justify-between p-4 bg-background border-b">
        <div className="flex items-center space-x-2">
          <Laptop className="w-6 h-6" />
          <span className="font-semibold">{config.title || "Sandbox"}</span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Open settings</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <ConfigPanel />
          </SheetContent>
        </Sheet>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 p-6 bg-background border-r hidden lg:block overflow-y-auto">
          <ConfigPanel />
        </aside>
        <main className="flex-1 p-6 overflow-auto">
          <div
            className={`w-full h-full rounded-lg overflow-hidden border ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
