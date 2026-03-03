import {Button} from "@/components/ui/button";

// Server Component por default, no necesita 'use client'
import CheckoutButton from "@/components/ui/CheckoutButton";

export default function HomePage() {
  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl border p-6 shadow-md">
      <h1 className="mb-2 text-xl font-bold">Zapatillas Nike Air Max</h1>
      <p className="mb-6 text-2xl font-bold text-blue-700">$100</p>

      {/* CheckoutButton es client, pero puede vivir dentro de un Server Component */}
      <CheckoutButton price={100} quantity={1} title="Zapatillas Nike Air Max" />
    </div>
  );
}
