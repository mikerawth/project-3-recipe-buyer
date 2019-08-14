import React, { Component } from 'react';
import AuthService from '../../services/AuthService';
import './signup.css'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { usernameInput: '', passwordInput: '' };
    this.service = new AuthService();
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  tryToSignUp = (e) => {
    e.preventDefault();
    const uName = this.state.usernameInput;
    const pWord = this.state.passwordInput;

    this.service.signup(uName, pWord)
      .then(() => {
        this.props.toggleForm('signup');
        this.props.getUser();
      })

  }



  render() {
    return (
      <form className="signup-form box" onSubmit={this.tryToSignUp}>


        <h3 className="title is-3 ">Sign Up</h3>

        <legend className="label">Username</legend>
        <input value={this.state.usernameInput}
          name="usernameInput"
          onChange={this.handleChange}
          className="input"
        />

        <legend className="label">Password</legend>
        <input value={this.state.passwordInput}
          name="passwordInput"
          onChange={this.handleChange}
          className="input"
          type="password"
        />



        <button className="button">Submit</button>

      </form>
    )
  }
}

export default Signup;