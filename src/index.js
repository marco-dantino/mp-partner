import express from "express";
import cors from "cors";

import checkoutRoutes from "./routes/checkout.routes.js";

const app = express();

// Permitimos que el frontend (en otro puerto/dominio) llame a nuestra API.
// Sin esto, el navegador bloquea las requests por política de seguridad (CORS).
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Solo permitimos nuestro frontend
  }),
);

// Le decimos a Express que entienda JSON en el body de las requests.
// Sin esto, req.body sería undefined.
app.use(express.json());

// Registramos todas las rutas de checkout bajo el prefijo /api
// Entonces la URL completa queda: POST /api/create-preference
app.use("/api", checkoutRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
```

---

## El flujo completo de una compra
Usuario hace click en "Pagar"
        │
        ▼
Frontend (React)
  → POST /api/create-preference
    { title: "Zapatillas", quantity: 1, price: 5000 }
        │
        ▼
Backend (Node.js)
  → Recibe el pedido
  → Llama a la API de Mercado Pago con el token secreto
  → Mercado Pago devuelve un preferenceId
  → Backend le manda el preferenceId al frontend
        │
        ▼
Frontend (React)
  → Recibe el preferenceId
  → Usa el SDK de frontend para abrir el checkout
        │
        ▼
Usuario
  → Es redirigido al formulario de Mercado Pago
  → Paga
  → Es redirigido de vuelta a tu sitio (back_urls)
```;
