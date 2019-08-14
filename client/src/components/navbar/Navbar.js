import React from 'react';
import './navbar.css'
import { NavLink, Redirect } from 'react-router-dom'

function Navbar(props) {

  const doTheLogout = () => {
    props.pleaseLogOut()
      .then(() => {
        props.getUser();
      })

  }

  return (
    <div className="Navbar">
      <div>
        <span>
          <NavLink className="button is-small" to="/">Home</NavLink>
          {props.theUser &&
            <NavLink className="button is-small" to="/cart">Cart</NavLink>
          }
        </span>
      </div>

      <div>
        {!props.theUser &&
          <span>
            <button className="button is-small" onClick={() => props.toggleForm('login')} > Login </button>
            <button className="button is-small" onClick={() => props.toggleForm('signup')}>Sign Up</button>
          </span>
        }

        {props.theUser &&
          <span>
            <span>{props.theUser.username}</span>
            <button className="button is-small" onClick={doTheLogout} >Log Out </button>
          </span>
        }
      </div>
    </div>
  );

}

export default Navbar;