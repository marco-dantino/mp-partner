// src/app/payment/pending/page.tsx
"use client";

import {Suspense} from "react";
import {useSearchParams} from "next/navigation";

function PaymentPendingContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="text-6xl">⏳</div>
      <h1 className="text-2xl font-bold text-yellow-600">Pago pendiente</h1>
      <p className="text-gray-500">Tu pago está siendo procesado. ID: {paymentId}</p>
      <a className="text-blue-500 underline" href="/">
        Volver al inicio
      </a>
    </div>
  );
}

export default function PaymentPending() {
  return (
    <Suspense
      fallback={<div className="flex min-h-screen items-center justify-center">Cargando...</div>}
    >
      <PaymentPendingContent />
    </Suspense>
  );
}

// ## Por qué funciona esto

// El `<Suspense>` le dice a Next.js: *"esta parte del árbol depende de algo dinámico, no la pre-rendericés en el build, esperá al navegador"*.
// Sin Suspense:
//   Build de Vercel → intenta renderizar → busca window/URL → no existe → 💥

// Con Suspense:
//   Build de Vercel → renderiza el fallback ("Cargando...") → ✅
//   Usuario abre la página → React hidrata → lee la URL → renderiza el contenido real → ✅
