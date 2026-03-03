// src/app/payment/failure/page.tsx

import {Suspense} from "react";
import {useSearchParams} from "next/navigation";

function PaymentFailureContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="text-6xl">❌</div>
      <h1 className="text-2xl font-bold text-red-600">El pago no se completó</h1>
      <p className="text-sm text-gray-400">ID: {paymentId}</p>
      <a className="rounded bg-blue-600 px-4 py-2 text-white" href="/checkout">
        Intentar de nuevo
      </a>
    </div>
  );
}

export default function PaymentFailure() {
  return (
    <Suspense
      fallback={<div className="flex min-h-screen items-center justify-center">Cargando...</div>}
    >
      <PaymentFailureContent />
    </Suspense>
  );
}
