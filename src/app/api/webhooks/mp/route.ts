// // src/app/api/webhooks/mp/route.ts
// import {NextRequest, NextResponse} from "next/server";
// import {Payment} from "mercadopago";

// import client from "@/lib/mercadopago";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     // Mercado Pago manda distintos tipos de notificaciones.
//     // Solo nos interesan las de tipo "payment".
//     // Otros tipos: "merchant_order", "plan", "subscription", etc.
//     if (body.type !== "payment") {
//       // Le respondemos 200 igual para que no reintente
//       return NextResponse.json({received: true});
//     }

//     // El body solo trae el ID del pago, no los detalles.
//     // Tenemos que consultarle a Mercado Pago por separado.
//     const paymentId = body.data?.id;

//     if (!paymentId) {
//       return NextResponse.json({error: "ID de pago faltante"}, {status: 400});
//     }

//     // Consultamos el pago real a la API de Mercado Pago
//     // para verificar que realmente existe y está aprobado.
//     // Nunca confíes en el cuerpo del Webhook sin verificar.
//     const payment = new Payment(client);
//     const paymentData = await payment.get({id: paymentId});

//     // paymentData.status puede ser:
//     // 'approved'  → cobrado exitosamente
//     // 'pending'   → esperando (ej: pago en efectivo no acreditado aún)
//     // 'rejected'  → rechazado por el banco
//     // 'refunded'  → devuelto
//     // 'cancelled' → cancelado
//     // 'in_process'→ en revisión por Mercado Pago
//     console.log("Estado del pago:", paymentData.status);
//     console.log("Monto:", paymentData.transaction_amount);
//     console.log("Email del comprador:", paymentData.payer?.email);

//     if (paymentData.status === "approved") {
//       // ACÁ va tu lógica de negocio:
//       // await actualizarOrden(paymentData.external_reference, 'pagado')
//       // await enviarEmailConfirmacion(paymentData.payer.email)
//       // await reducirStock(paymentData.external_reference)
//       console.log("✅ Pago aprobado, actualizar base de datos");
//     }

//     // SIEMPRE respondé 200, aunque el pago no esté aprobado.
//     // Si respondés 500 o 400, Mercado Pago reintenta y genera duplicados.
//     return NextResponse.json({received: true});
//   } catch (error) {
//     console.error("Error en webhook:", error);

//     // Ojo: si respondés 500, Mercado Pago va a reintentar.
//     // En muchos casos conviene responder 200 igual y logear el error aparte.
//     return NextResponse.json({received: true});
//   }
// }

// src/app/api/webhooks/mp/route.ts
import crypto from "crypto"; // Módulo nativo de Node.js

import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  // Mercado Pago manda estos headers en cada Webhook
  const xSignature = request.headers.get("x-signature");
  const xRequestId = request.headers.get("x-request-id");

  // Extraemos el timestamp y la firma del header x-signature
  // El formato es: ts=1234567890,v1=abc123def456...
  const parts = xSignature?.split(",");
  const ts = parts?.find((p) => p.startsWith("ts="))?.split("=")[1];
  const signature = parts?.find((p) => p.startsWith("v1="))?.split("=")[1];

  const body = await request.json();
  const dataId = body.data?.id;

  // Armamos el string que Mercado Pago usó para firmar
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;

  // Generamos nuestra propia firma con el secret del Webhook
  // y la comparamos con la que mandó Mercado Pago
  const expectedSignature = crypto
    .createHmac("sha256", process.env.MP_WEBHOOK_SECRET!)
    .update(manifest)
    .digest("hex");

  if (expectedSignature !== signature) {
    console.error("⚠️ Webhook con firma inválida, posible intento de fraude");

    return NextResponse.json({error: "Firma inválida"}, {status: 401});
  }

  // Si llegamos acá, el Webhook es legítimo
  // ... resto de la lógica
  return NextResponse.json({received: true});
}
