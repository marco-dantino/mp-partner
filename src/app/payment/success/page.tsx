// src/app/payment/success/page.tsx
// Necesita 'use client' para leer los searchParams del navegador
"use client";

import {useSearchParams} from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="text-6xl">✅</div>
      <h1 className="text-2xl font-bold text-green-600">¡Pago aprobado!</h1>
      <p className="text-gray-500">ID de pago: {paymentId}</p>
      <a className="text-blue-500 underline" href="/">
        Volver al inicio
      </a>
    </div>
  );
}

// Las páginas de failure y pending siguen la misma estructura, solo cambia el ícono y el mensaje

// ## El flujo completo
// app/checkout/page.tsx          (Server Component, no descarga nada secreto)
//     └── <CheckoutButton />     (Client Component, corre en el navegador)
//             │
//             │ click
//             ▼
//         fetch('/api/checkout') (misma app, no necesita URL externa)
//             │
//             ▼
// app/api/checkout/route.ts      (corre en el servidor de Next.js)
//     └── Mercado Pago SDK       (el token secreto nunca sale del servidor)
//             │
//             ▼
//         { preferenceId }       (solo el ID viaja al navegador)
//             │
//             ▼
//         <Wallet />             (SDK de React abre el checkout de MP)
//             │
//             ▼
// app/payment/success/page.tsx
