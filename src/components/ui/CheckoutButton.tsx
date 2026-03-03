"use client"; // ← OBLIGATORIO: usa hooks y el SDK de React

import {useState} from "react";
import {initMercadoPago, Wallet} from "@mercadopago/sdk-react";

import {createPreference} from "@/services/mercadopago.service";

// Inicializamos el SDK acá porque este componente siempre se monta
// antes de que se use el Wallet. Al estar en 'use client',
// corre en el navegador como corresponde.
initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, {
  locale: "es-AR",
});

interface Props {
  title: string;
  description: string;
  quantity: number;
  price: number;
}

function CheckoutButton({title, description, quantity, price}: Props) {
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuy = async () => {
    setLoading(true);
    setError(null);

    try {
      const id = await createPreference({title, description, quantity, price});

      setPreferenceId(id);
    } catch {
      setError("No se pudo iniciar el pago. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {!preferenceId && (
        <button
          className="rounded-lg bg-blue-600 px-6 py-3 text-white
                     transition-all hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
          type="button"
          onClick={handleBuy}
        >
          {loading ? "Procesando..." : "Comprar ahora"}
        </button>
      )}

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      {/* Wallet aparece cuando ya tenemos el preferenceId */}
      {preferenceId ? <Wallet initialization={{preferenceId}} /> : null}
    </div>
  );
}

export default CheckoutButton;
