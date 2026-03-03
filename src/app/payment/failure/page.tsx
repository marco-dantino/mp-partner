"use client";

import {useSearchParams} from "next/navigation";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="text-6xl">🚫</div>
      <h1 className="text-2xl font-bold text-green-600">¡Pago no aprobado!</h1>
      <p className="text-gray-500">ID de pago: {paymentId}</p>
      <a className="text-blue-500 underline" href="/">
        Volver al inicio
      </a>
    </div>
  );
}
