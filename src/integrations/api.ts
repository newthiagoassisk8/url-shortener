export const shortUrlRequest = async (url: string) => {
    const response = await fetch("http://192.168.0.27:8070/api/create-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "XAuthorization": "Bearer MyAuthToken",
      },
      body: JSON.stringify({
        url,
        expires_in: "",
        expires: false,
        redirect_type: "permanent",
        title: "video",
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar URL: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  };
