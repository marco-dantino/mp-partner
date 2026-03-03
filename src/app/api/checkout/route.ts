import {NextRequest, NextResponse} from "next/server";
import {Preference} from "mercadopago";

import client from "@/lib/mercadopago";

// Next.js exporta funciones con el nombre del método HTTP.
// Esta función maneja POST /api/checkout
export async function POST(request: NextRequest) {
  // Leemos el body de la request (lo que mandó el frontend)
  const {title, quantity, price} = await request.json();

  try {
    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            id: "1",
            title,
            description: "Descripcion PARTner",
            category_id: "others",
            quantity,
            unit_price: price,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          // En Next.js, NEXT_PUBLIC_APP_URL es la URL de tu propio sitio
          success: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
          failure: `${process.env.NEXT_PUBLIC_APP_URL}/payment/failure`,
          pending: `${process.env.NEXT_PUBLIC_APP_URL}/payment/pending`,
        },
        auto_return: "approved",

        // Mercado Pago va a llamar a esta URL cada vez que
        // cambie el estado del pago. Debe ser una URL pública,
        // no localhost.
        notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mp`,

        // external_reference: tu propio ID de orden.
        // Te sirve para saber qué orden actualizar cuando llega el Webhook.
        // Puede ser el ID de tu base de datos.
        external_reference: "dantinomarco2005@hotmail.com",
        payment_methods: {
          installments: 6, // ← máximo 6 cuotas
          excluded_payment_methods: [
            {id: "visa"}, // ← excluir Visa
          ],
        },
      },
    });

    // Devolvemos solo el ID al frontend
    return NextResponse.json({preferenceId: response.id});
  } catch (error) {
    console.error("Error creando preferencia:", error);

    return NextResponse.json({error: "No se pudo crear la preferencia"}, {status: 500});
  }
}
