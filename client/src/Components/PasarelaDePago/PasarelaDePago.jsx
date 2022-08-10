// import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist, postHistorial } from "../../Redux/Actions/Actions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51LTGaXLAMID6zp4FN23yqliUFRecPc1GmqazMXb4525foqI6x0vjAdYsIeCw3ovTIId4tj0WthzhKIhyJyaSCBjp00WA0Mdadg"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();
  let dispatch = useDispatch()

  const { cart } = useSelector((state) => state);
  const { user } = useSelector((state) => state);

  var titulosAComprar = [];
  var precioTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    titulosAComprar.push(cart[i].name);
    precioTotal = precioTotal + cart[i].price;

    // console.log(titulosAComprar)
    // console.log(precioTotal)
    // console.log(cart);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    console.log(error);
    if (error) {
      // console.log(paymentMethod);
      const { id } = paymentMethod;
      try {
        // console.log("Holis");
        const { data } = await axios.post("/pagos/api/checkout", {
          id,
          amount: precioTotal * 100,
        });
        // console.log("La data", data);
        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
    }
    localStorage.setItem("cart", JSON.stringify([]));
    alert("Compra realizada con exito");
    var arrAux = [cart,user ]
    dispatch(postHistorial(arrAux))

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
                  <img src={e.posterImagen} alt="img" height="200px" width="140px" />
                </div>
              );
            })}
        </div>
        <p>Total de la compra: ${precioTotal}.00</p>
        <div className="containerElement">
          <form className="elementCard" onSubmit={handleSubmit}>
            <div>
              <input type="text" />
              <input type="text" />
            </div>
            <br />
            <CardElement />
            <button className="card-button">Buy</button>
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
