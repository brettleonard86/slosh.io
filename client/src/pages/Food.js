import React, { Component } from "react";
import Modal from "./Modal";
import GoogleLogin from 'react-google-login';
import { Link } from "react-router-dom";


const formStyle = {
  marginLeft: "5%",
  marginRight: "5%",
  marginTop: "70px"
}
const buttonStyle = {
  padding: "2% 5% 2% 5%",
  border: "solid 1px black",
  fontSize: "2em",
  backgroundColor: "black",
  color: "white",
  marginTop: "50px"
}
let userLogin = "Not Logged In";

const instructionsStyle = {
  textAlign: "center",
  fontSize: "2em",
  marginLeft: "5%",
  marginRight: "5%"
}
const welcomStyle = {
  fontSize: "3em",
}
const loggedStyle = {
  position: "fixed",
  top: "0",
  right: "0",
  marginTop: "15px"
}
const buttonCenter = {
  textAlign: "center",
}


class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: 'Stew',
      // userName: "",
      // userEmail: ""
      isModalOpen: true,
      userLogin: false
    };
  }
  
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    const { choice } = this.state;

  }

  openModal() {
    this.setState({ isModalOpen: true })
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
    this.setState({ isModalOpen: false });
    userLogin = "Logged in as " + response.w3.ig;
    this.setState({ userLogin: true })
   }

  closeModal() {
   this.setState({ isModalOpen: false })
  }



  render() {
    const { choice } = this.state;
    return (
      <div>
        <div>
          <div style={loggedStyle}>
            {userLogin}
          </div>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
            <GoogleLogin
              clientId="1063825968337-jlrfit23tiqrc36i9rkkbhmgstbdrslm.apps.googleusercontent.com"
              onSuccess={this.responseGoogle.bind(this)}
              onFailure={() => console.log(this, arguments)}
              width={240}
              height={50}
              longtitle={true}
              isSignedIn
            />
          </Modal>
        </div>
        <div style={instructionsStyle}>
          <div style={welcomStyle}>
            Slosh.io
          </div>
          <p>The app that pairs wine based on food</p>
        </div>
        <div>
          <form style={formStyle} onSubmit={this.onSubmit}>
            <label>Select your dish:</label>
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
            <div style={buttonCenter}>
              <button style={buttonStyle} type="Submit">
                Submit
              </button>
            </div>
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