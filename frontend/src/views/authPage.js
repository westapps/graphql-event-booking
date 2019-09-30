import React, { Component } from 'react';
import AuthContext from '../context/authContext';

import './authPage.css';

class AuthPage extends Component {
  constructor(props){
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();

    this.state = {
      isLogin: true
    };
  }

  static contextType = AuthContext;


  switchModeHandler = () => {
    this.setState(prevState => {
      return {isLogin: !prevState.isLogin};
    });
  }

  loginHandler = (event) => {
    event.preventDefault();

    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if(email.trim().length === 0 || password.trim().length === 0){
      return;
    }

    console.log(email, password);
    // ...
    let requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: email,
        password: password
      }
    }

    if(!this.state.isLogin){
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!) {
            createUser(userInput: {email: $email, password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      };
    };



    fetch('http://localhost:3008/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(res => {
      if(res.status !== 200 && res.status !== 201 ){
        throw new Error('failed');
      }
      return res.json();
    })
    .then(resData => {
      console.log(resData);
      if(resData.data.login.token){
        this.context.login(
          resData.data.login.token,
          resData.data.login.userId,
          resData.data.login.tokenExpiration
        );
      }
    })
    .catch(err => {
      console.log(err);
    })

  }


  render(){
    return (
      <form className="auth-form" onSubmit={this.loginHandler}>
        <div className="form-control">
          <label htmlFor="email" >Email</label>
          <input type="email" id="email" ref={this.emailEl}/>
        </div>
        <div className="form-control">
          <label htmlFor="password" >Password</label>
          <input type="password" id="password" ref={this.passwordEl}/>
        </div>
        <div className="form-actions">
          <button type="submit" >{this.state.isLogin ? 'Login' : 'Signup'}</button>
          <button type="button" onClick={this.switchModeHandler}>Switch to {this.state.isLogin ? 'Signup' : 'Login'}</button>
        </div>
      </form>
    )
  }
};

export default AuthPage;
