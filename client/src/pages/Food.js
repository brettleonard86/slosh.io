import React, { Component } from "react";
import Modal from "./Modal";
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { Link } from "react-router-dom";
import API from "../utils/API";

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
let userLogin ='' ;

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
const imageStyle = {
  width: "30%",
  height: "30%",
  borderRadius: "50%"
}
const logoutButton = {

}
const buttonCenter = {
  textAlign: "center",
}


class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: "",
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
    //if({ choice } === API.getWineList.name){
    //res.getWineList.wines[0];
   //}

 }

  //foodResult(response) {
    //if(onSubmit.choice === API.getWineList.name){
    //response.getWineList.wines[0];
   //}
   //console.log(response)
 //}

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

    API.createUser(user)
      .then(function (response) {
        console.log("createUser", response);
      })
      .catch(function (error) {
        console.log("createUser", error);
      });

    console.log({accessToken: id_token});
    //console.log(response);
    console.log("The user's name is " + userName);
    console.log("The user email is " + userEmail);
    this.setState({ isModalOpen: false });
    userLogin = response.profileObj.imageUrl;
    this.setState({ userLogin: true })

   }
  logout() {
    this.setState({ isModalOpen: true });
    userLogin = "Not logged in";
    this.setState({userLogin: false})
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
            <img style={imageStyle} src={userLogin}/>
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
        <GoogleLogout style={logoutButton}
          onLogoutSuccess={this.logout.bind(this)}
        >
        </GoogleLogout>
        <div>

          <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
                      mdl-layout--fixed-header">
            <header class="mdl-layout__header">
              <div class="mdl-layout__header-row">
                <div class="mdl-layout-spacer"></div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                            mdl-textfield--floating-label mdl-textfield--align-right">
                  <label class="mdl-button mdl-js-button mdl-button--icon"
                         for="fixed-header-drawer-exp">
                    <i class="material-icons">search</i>
                  </label>
                  <div class="mdl-textfield__expandable-holder">

                  </div>
                </div>
              </div>
            </header>
            <div class="mdl-layout__drawer">
              <span class="mdl-layout-title">Title</span>
              <span class="mdl-layout-title">What's Cooking?</span>
            <form style={formStyle} onSubmit={this.onSubmit}>
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
            <main class="mdl-layout__content">
              <div class="page-content"></div>
            </main>
          </div>


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
