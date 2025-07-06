import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { shortUrlRequest } from "./integrations/api";



function App() {
    const [url, setUrl] = useState("");

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-black">
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 p-4">
        <h1 className="text-2xl font-bold text-white">URL Shortener</h1>

        <Input
          type="text"
          placeholder="Enter URL to shorten"
          className="w-full colors-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          className="w-full bg-gray-700 text-white py-2 rounded hover:bg-blue-600"
          onClick={() => shortUrlRequest(url)}
        >
          Shorten
        </Button>
      </div>
    </div>
  );
}

export default App;
