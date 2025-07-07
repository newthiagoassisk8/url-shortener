import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ShortenUrlService } from "./services/shortUrlService";
import type { ShortUrlResponse } from "./types/ShortUrlResponse";
import { Toaster } from "@/components/ui/sonner";
import { useToast } from "./customhooks/useToast";

function App() {
  const [url, setUrl] = useState("");
  const [shortenUrl, setshortenUrl] = useState<ShortUrlResponse>();
  const { showInfoToast, showSuccessToast } = useToast();

  const handleShortenUrl = async () => {
    if (!url.trim()) {
      showInfoToast("Please enter a URL to shorten.");
      return;
    }

    try {
      const response = await ShortenUrlService.shortUrlRequest({ url });
      setshortenUrl(response);
      showSuccessToast("URL shortened successfully!");
    } catch (error) {
      console.error("Error shortening URL:", error);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-black">
      <Toaster richColors className="text-grey  " />
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 p-4">
        <h1 className="text-2xl font-bold text-white">URL Shortener</h1>
        <label className="text-white w-full text-left text-sm">
          URL original:
        </label>

        <Input
          type="text"
          placeholder=""
          className="w-full colors-gray-700 text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          className="w-full bg-gray-700 text-white py-2 rounded hover:bg-blue-600"
          onClick={() => handleShortenUrl()}
        >
          Shorten
        </Button>
        {shortenUrl && (
          <>
            <label className="text-white w-full text-left text-sm">
              URL encurtada:
            </label>
            <Input
              type="text"
              value={shortenUrl.shortened_url}
              readOnly
              className="w-full text-white"
            />

            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={() => {
                if (shortenUrl?.shortened_url) {
                  navigator.clipboard.writeText(shortenUrl.shortened_url);
                  showSuccessToast("URL copied to clipboard!");
                }
              }}
            >
              Copiar
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
