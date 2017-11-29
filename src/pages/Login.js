import React from "react";
import Hero from "../components/Hero";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
import ReactDOM from 'react-dom';
// import GoogleLogin from 'react-google-login';
// import { GoogleLogout } from 'react-google-login';
// import { GoogleLogin } from 'react-google-login';


const loginStyle = {
    textAlign: "center",
    marginTop: '70%',
    //backgroundImage: "url(" + require("../images/wine-background.jpg") + ")",
}
var name = 'Please log in'
const responseGoogle = (response) => {
  console.log(response);
  console.log("The user's name is " + response.w3.ig)
  console.log("The user email is " + response.w3.U3)
  name = response.w3.ig;
  console.log(name)
}

var Login = (props) => {
  return (
    <div style={loginStyle}>
      <p>{(name)}</p>
    <GoogleLogin
      clientId="1063825968337-jlrfit23tiqrc36i9rkkbhmgstbdrslm.apps.googleusercontent.com"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      width={240}
      height={50}
      longtitle={true}
      isSignedIn={true}
    />
<<<<<<< HEAD
    //document.getElementById('googleButton')
=======
    </div>
>>>>>>> 091e8e3d9d584d631ce159e590dc49fbdd1d0623
  )
}




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



export default Login;
