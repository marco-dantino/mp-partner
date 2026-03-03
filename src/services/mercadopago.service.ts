// Este service corre en el cliente (navegador).
// Llama a tu propia API de Next.js, no a Mercado Pago directamente.

export const createPreference = async ({
  title,
  quantity,
  price,
}: {
  title: string;
  quantity: number;
  price: number;
}) => {
  // No necesitás una URL base porque la API vive en el mismo dominio.
  // /api/checkout funciona tanto en localhost como en producción.
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({title, quantity, price}),
  });

  if (!response.ok) {
    throw new Error("Error al crear la preferencia");
  }

  const data = await response.json();

  return data.preferenceId as string;
};
