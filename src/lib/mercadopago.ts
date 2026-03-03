// SDK de Mercado Pago
import {MercadoPagoConfig, Preference} from "mercadopago";
// Agrega credenciales
const client = new MercadoPagoConfig({accessToken: process.env.MP_ACCESS_TOKEN!});

export default client;
