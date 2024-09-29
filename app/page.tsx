import { SandboxComponent } from "@/components/sandbox";
// import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

const MyCustomComponent = () => (
  <div>
    <h1>Custom Component</h1>
    <p>This is a custom component rendered in the sandbox.</p>
  </div>
);

const MyApp = () => {
  // const [darkMode, setDarkMode] = useState(true);
  // const [zoom, setZoom] = useState(100);

  const sandboxConfig = {
    type: "component",
    content: <MyCustomComponent />,
    // defaultDarkMode: darkMode,
    // defaultZoom: zoom,
    title: "Atharva's Sandbox",
  };

  const customConfigSection = (
    <>
      <div className="flex items-center justify-between">
        <Label htmlFor="dark-mode">Light Mode</Label>
        <Switch
          id="dark-mode"
          // checked={!darkMode}
          // onCheckedChange={(checked) => setDarkMode(!checked)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="zoom">Zoom</Label>
        <Slider
          id="zoom"
          min={50}
          max={200}
          step={10}
          // value={[zoom]}
          // onValueChange={(value) => setZoom(value[0])}
        />
      </div>
      {/* Add any other custom configuration elements here */}
    </>
  );

  return (
    <SandboxComponent
      config={sandboxConfig}
      configSection={customConfigSection}
    />
  );
};

export default MyApp;
