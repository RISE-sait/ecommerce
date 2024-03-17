import schema from "./graphql";
import express from "express";

const { graphqlHTTP } = require("express-graphql");
const cors = require("cors");
const Stripe = require("stripe");

const apiKey = process.env.KSPORTS_STRIPE_API_KEY;

const stripe = new Stripe(apiKey);

const domain = "https://k-sports.vercel.app"

const app = express();

app.get('/', (req, res) => res.send('welcome to ksports backend'))

app.use(express.json());

const corsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) {
    if (
      origin == domain ||
      origin == "https://ksports-three.vercel.app" ||
      origin == "http://localhost:3000" ||
      origin == "http://localhost:3001"
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

app.post("/checkout", async (req, res) => {
  const checkoutProducts = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: checkoutProducts,
      success_url: domain + "/paymentsuccess?orderID={CHECKOUT_SESSION_ID}",
      cancel_url: domain + "/paymentfailed",
      metadata: { checkoutProducts: JSON.stringify(checkoutProducts) },
    });

    res.json({ url: session.url });
  } catch (err) {
    res.json({ error: err });
  }
});

app.post("/getPurchasedItems", (req, res) => {
  try {
    const { orderNumber } = req.body;

    stripe.checkout.sessions.retrieve(orderNumber).then((paymentInfo: any) => {
      res.json({ paymentInfo });
    });
  } catch (err) {
    res.json({ error: err });
  }
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(process.env.PORT || 3000);
