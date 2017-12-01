import React, { Component } from "react";
import Modal from "./Modal";
import GoogleLogin from 'react-google-login';


class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: 'Stew',
      isModalOpen: false
      // userName: "",
      // userEmail: ""
    };
  }
  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    // get our form data out of state
    const { choice } = this.state;

  }

   openModal() {
     this.setState({ isModalOpen: true })
   }

   closeModal() {
     this.setState({ isModalOpen: false })
   }

   responseGoogle(response) {
    var userName = response.w3.ig;
    var userEmail =response.w3.U3;
    var id_token = response.getAuthResponse().id_token;
    var user = {
      name: userName,
      email: userEmail
    }
    console.log({accessToken: id_token});
    console.log(response);
    console.log("The user's name is " + userName);
    console.log("The user email is " + userEmail);
   }


  render() {
    const { choice } = this.state;
    return (
      <div>
        <div>
          <button onClick={() => this.openModal()}>LOGIN</button>
            <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
              <GoogleLogin
                clientId="1063825968337-jlrfit23tiqrc36i9rkkbhmgstbdrslm.apps.googleusercontent.com"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                width={240}
                height={50}
                longtitle={true}
                isSignedIn
              />
            </Modal>
        </div>
        <div>
          <form onSubmit={this.onSubmit}>
            <label>Select list:</label>
            <select name="choice" className="form-control" id="sel1" onChange={this.onChange}>
              <option>Stew</option>
              <option value="Pasta Red Sauce">Pasta (Red Sauce)</option>
              <option value="Pasta Cream Sauce">Pasta (White Sauce)</option>
              <option>Cured Meats</option>
              <option>Poultry</option>
              <option>Pork</option>
              <option>Cheeses</option>
              <option>Fruits</option>
              <option>Chocolate Cake</option>
              <option>Burgers</option>
              <option>BBQ</option>
              <option>Ribs</option>
              <option value="Veggies">Vegetables</option>
              <option>Pizza</option>
              <option value="Chilli">Chili</option>
              <option>Fries</option>
              <option>Sushi</option>
              <option>Salad</option>
            </select>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default UserForm;



// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   // console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }

// function onFailure(error) {
//   console.log(error);
// }

// function renderButton() {
//   gapi.signin2.render('my-signin2', {
//     'scope': 'profile email',
//     'width': 240,
//     'height': 50,
//     'longtitle': true,
//     'theme': 'dark',
//     'onsuccess': onSuccess,
//     'onfailure': onFailure
//   });
// }


// Sign out code from Google.
// function signOut() {
//   var auth2 = gapi.auth2.getAuthInstance();
//   auth2.signOut().then(function () {
//     console.log('User signed out.');
//   });
// }