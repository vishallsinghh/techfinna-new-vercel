import { NextResponse } from "next/server";
import Stripe from "stripe";
import products from "../../../data/products.json";

export const runtime = "nodejs"; // important for stripe sdk in some deployments

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  // apiVersion can be omitted; Stripe SDK defaults safely
});

function toCents(amountDollars: number | string) {
  const n =
    typeof amountDollars === "string"
      ? Number.parseFloat(amountDollars)
      : amountDollars;

  if (!Number.isFinite(n)) return 0;

  return Math.round(n * 100);
}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      amount,
      currency = "usd",
      prodName,
      prodVersion,
      name,
      email,
      companyName,
    } = body || {};

    // Safety: validate
    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Convert dollars -> cents
    const amountInCents = Math.round(parsedAmount * 100);

    // Stripe minimum is usually $0.50 for USD (depends on method)
    if (amountInCents < 50) {
      return NextResponse.json(
        { error: "Amount too small" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe secret key not configured" },
        { status: 500 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        customer_name: String(name || ""),
        customer_email: String(email || ""),
        companyName: String(companyName || ""),
        product_name: String(prodName || ""),
        odoo_version: String(prodVersion || ""),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error: any) {
    console.error("create-payment-intent error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

