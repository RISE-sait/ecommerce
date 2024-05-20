import express from "express";
import server from "./gqlServer";
import cors from "cors";
import { expressMiddleware } from '@apollo/server/express4';
import Stripe from "stripe";

const apiKey = process.env.KSPORTS_STRIPE_API_KEY;

// const domain = "https://k-sports.vercel.app";
const domain = "http://localhost:3000";

const stripe = new Stripe(apiKey!!);

const app = express();
app.use(express.json());

const startServer = async () => {
  await server.start();
  app.use('/graphql', expressMiddleware(server));
};

startServer();

app.get('/', (_, res) => res.send('Welcome to KLints under bunker'));

const allowedOrigins = [
  domain,
  "http://localhost:3000",
  "http://localhost:3001"
];

const corsOptions = {
  origin: (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors());

app.post("/checkout", async (req, res) => {
  const checkoutProducts = req.body;

  try {

    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 7)

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: checkoutProducts,
      success_url: `${domain}/paymentsuccess?orderID={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/paymentfailed`,
      metadata: {
        checkoutProducts: JSON.stringify(checkoutProducts),
        deliverDate: deliveryDate.toISOString()
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    res.json({ error: err });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}`);
});

export { stripe }
export default app;