import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ShortenUrlService,
  type fooRequestDTO,
} from "./services/shortUrlService";
import type { ShortUrlResponse } from "./types/ShortUrlResponse";
import { Toaster } from "@/components/ui/sonner";
import { useToast } from "./customhooks/useToast";

function App() {
  const [payload, setPayload] = useState<fooRequestDTO>();
  const [shortenUrl, setshortenUrl] = useState<ShortUrlResponse>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { showInfoToast, showSuccessToast } = useToast();

  const handleShortenUrl = async () => {
    if (!payload?.url.trim()) {
      showInfoToast("Please enter a URL to shorten.");

      return;
    }

    try {
      const response = await ShortenUrlService.shortUrlRequest(payload);
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
          value={payload?.url}
          onChange={(e) => setPayload({ url: e.target.value })}
        />
        <Button
          className="w-full bg-gray-700 text-white py-2 rounded hover:bg-blue-600"
          onClick={() => handleShortenUrl()}
        >
          Shorten
        </Button>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="expires"
              className="text-white"
              onChange={() => setShowDatePicker(!showDatePicker)}
            />

            <label htmlFor="expires" className="text-white text-sm">
              Expira
            </label>
          </div>

          {showDatePicker && (
            <Input
              type="date"
              placeholder="mm / dd / yyyy"
              className="w-full text-white placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => console.log(e.target.value)}
            />
          )}

          <div className="flex flex-col gap-2">
            <label className="text-white text-sm">Redirecionamento:</label>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="permanent"
                name="redirectType"
                value="permanent"
                className="text-white"
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    url: prev?.url || "",
                    redirect_type: e.target.value,
                  }))
                }
              />
              <label htmlFor="permanent" className="text-white text-sm">
                Redirecionamento Permanente (301)
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="temporary"
                name="redirectType"
                value="temporary"
                className="text-white"
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    url: prev?.url || "",
                    redirect_type: e.target.value,
                  }))
                }
              />
              <label htmlFor="temporary" className="text-white text-sm">
                Redirecionamento Temporário (302)
              </label>
            </div>
          </div>
        </div>

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
