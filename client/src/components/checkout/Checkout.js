import React from 'react'
import { Link } from 'react-router-dom'

function Checkout() {
  return (
    <div className="checkout-window abs-window">
      <h3>You have successfully checked out!</h3>
      <p>Thank you for participating in the Recipe Buyer demo.</p>
      <p>I hope you enjoyed yourself.</p>
      <p>Please note that this project is incomplete, so stay tuned for more changes!</p>
      <Link to='/'>Back to the Home Page</Link>
    </div>
  )
}

export default Checkout