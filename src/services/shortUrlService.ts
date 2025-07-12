import type { ShortUrlResponse } from "@/types/ShortUrlResponse";

export type fooRequestDTO = {
  url: string
  expires_in?: string
  expires?: boolean
  redirect_type?: string
  title?: string
}

export async function shortUrlRequest(fooRequestDTO:fooRequestDTO): Promise<ShortUrlResponse> {
  try {
    const response = await fetch("http://192.168.0.27:8073/api/create-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "XAuthorization": "Bearer MyAuthToken",
      },
      body: JSON.stringify(fooRequestDTO),
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar URL: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erro ao obter exercícios por grupo:", error);
    throw error;

  }
}

export const ShortenUrlService = Object.freeze({
  shortUrlRequest
})
