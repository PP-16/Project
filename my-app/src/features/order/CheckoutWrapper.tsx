import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch } from "../../app/redux/configureStore";
import { setBasket } from "../basket/basketSlice";
import CheckoutPage from "./CheckoutPage"

//public key from stripe
const stripePromise = loadStripe('pk_test_51Lq9sqGFkR0qYiz3ybXfKfdJ0mMIVMUpRt1q3vXsWgoZUjSjZPBRJ2UeRcGdhj2xJVPrnsPEe1NSO2XW4nwtlbcj00BdNuIjur')

export default function CheckoutWrapper() {
    const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  
  //สร้างหรืออัพเดทใบสั่งซื้อส่งไปยัง Stripe (incomplete)
  useEffect(() => {
      agent.Payments.createPaymentIntent()
          .then(basket => dispatch(setBasket(basket)))
          .catch(error => console.log(error))
          .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <LoadingComponent message='Loading checkout...' />


  return (
    <Elements stripe={stripePromise}>
      <CheckoutPage />
    </Elements>
  )
}
