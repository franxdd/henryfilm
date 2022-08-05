import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LTGaXLAMID6zp4FN23yqliUFRecPc1GmqazMXb4525foqI6x0vjAdYsIeCw3ovTIId4tj0WthzhKIhyJyaSCBjp00WA0Mdadg"
);
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      console.log(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button>Buy</button>
    </form>
  );
};

function PasarelaDePago() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default PasarelaDePago;
