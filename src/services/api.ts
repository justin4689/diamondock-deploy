import { useSession } from "next-auth/react";

interface CreateOrderPayload {
  products: Array<{
    id: number;
    quantity: number;
  }>;
  coupon_id?: number;
}

interface PaymentResponse {
  status: string;
  amount: number;
  charge_id: string;
}

interface PaymentError {
  error: string;
}

export const createOrder = async (
  orderData: CreateOrderPayload,
  accessToken: string
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/orders`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderData),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
};

export const createPaymentIntent = async (
  paymentData: { order_id: number },
  accessToken: string
): Promise<{ clientSecret: string }> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/payments/create-payment-intent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(paymentData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.error ||
        "Une erreur est survenue lors de la création du PaymentIntent."
    );
  }

  return data;
};
