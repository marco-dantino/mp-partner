import {Button} from "@/components/ui/button";

// Server Component por default, no necesita 'use client'
import CheckoutButton from "@/components/ui/CheckoutButton";

export default function HomePage() {
  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl border p-6 shadow-md">
      <h1 className="mb-2 text-xl font-bold">Zapatillas Nike Air</h1>
      <p className="mb-6 text-2xl font-bold text-blue-700">$10</p>

      {/* CheckoutButton es client, pero puede vivir dentro de un Server Component */}
      <CheckoutButton
        description="Zapa Nike PARtner"
        price={10}
        quantity={1}
        title="Zapatillas Nike Air Max"
      />
    </div>
  );
}
