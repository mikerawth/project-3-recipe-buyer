import React from 'react'
import { Link } from 'react-router-dom'
import './checkout.css'

function Checkout() {
  return (
    <div className="checkout-window abs-window box">
      <h3>You have successfully checked out!</h3>
      <p>Unfortuntely, there is no actual product available</p>
      <p>Thank you for participating in the Recipe Buyer demo.</p>
      <p>I hope you enjoyed yourself.</p>
      <p>Please note that this project is incomplete, so stay tuned for more changes!</p>
      <Link className="button is-info" to='/'>Back Home</Link>
    </div>
  )
}

export default Checkout