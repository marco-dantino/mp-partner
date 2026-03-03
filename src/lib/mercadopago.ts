// SDK de Mercado Pago
import {MercadoPagoConfig, Preference} from "mercadopago";
// Agrega credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
  options: {
    integratorId: "dev_24c65fb163bf11ea96500242ac130004",
  },
});

export default client;
