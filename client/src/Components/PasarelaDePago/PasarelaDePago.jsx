import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToWishlist,
  postHistorial,
} from "../../Redux/Actions/Actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../Styles/components/_Pasarela.scss";
import "../../Styles/components/_TarjetaDeCredito.scss"

const stripePromise = loadStripe(
  "pk_test_51LTGaXLAMID6zp4FN23yqliUFRecPc1GmqazMXb4525foqI6x0vjAdYsIeCw3ovTIId4tj0WthzhKIhyJyaSCBjp00WA0Mdadg"
);

const CheckoutForm = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  let navigate = useNavigate();
  let dispatch = useDispatch();

  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state);

  var titulosAComprar = [];
  var precioTotal = 0;

  for (let i = 0; i < cart.length; i++) {
    titulosAComprar.push(cart[i].name);
    precioTotal = precioTotal + cart[i].price;
  }

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#ffffff",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "15px",
        "::placeholder": {
          color: "#ffffff",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  // const handleSubmit = async (ev) => {
  //   ev.preventDefault();
  //   setProcessing(true);

  //   const payload = await stripe.confirmCardPayment(clientSecret, {
  //     payment_method: {
  //       card: elements.getElement(CardElement),
  //     },
  //   });

  //   if (payload.error) {
  //     setError(`Payment failed ${payload.error.message}`);
  //     setProcessing(false);
  //     console.log("error")
  //   } else {
  //     setError(null);
  //     setProcessing(false);
  //     setSucceeded(true);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log(error);
    if (error) {
      console.log(paymentMethod);
      const { id } = paymentMethod;
      try {
        console.log("Holis");
        const { data } = await axios.post("/pagos/api/checkout", {
          id,
          amount: precioTotal * 100,
        });
        console.log("La data", data);
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
    }
    localStorage.setItem("cart", JSON.stringify([]));
    alert("Compra realizada con exito");
    var arrAux = [cart, user];
    dispatch(postHistorial(arrAux));

    navigate("/home", { replace: true });
  };

  return (
    <div>
      <div className="pasarela">
        <h3>Cantidad de articulos: {cart.length}</h3>
        <br />
        <div className="pasarelaCont">
          {cart &&
            cart.map((e) => {
              return (
                <div className="compras">
                  <img
                    src={e.posterImagen}
                    alt="img"
                    height="200px"
                    width="140px"
                  />
                </div>
              );
            })}
        </div>
        <p>Total de la compra: USD$ {precioTotal}.00</p>
        <div className="containerElement">
          <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
            />
            <button className="card-button" disabled={processing || disabled || succeeded} id="submit">
              <span id="button-text">
                {processing ? (
                  <div className="spinner" id="spinner"></div>
                ) : (
                  "Realizar pago"
                )}
              </span>
            </button>
            {error && (
              <div className="card-error" role="alert">
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

function PasarelaDePago() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm id="checkId" />
      </Elements>
    </div>
  );
}

export default PasarelaDePago;
