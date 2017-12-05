import React, { Component } from "react";
import Modal from "./Modal";
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { Link } from "react-router-dom";
import API from "../utils/API";
import ReactFontFace from 'react-font-face'

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
let wine1 = '';
let wine2 = '';
let wine3 = '';

const logoutStyle = {
  width: "50px",
}
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
  borderRadius: "50%",
  marginRight: "15px",
  marginTop: "-3.5px"
}
const headerColor = {
  backgroundColor: "#bd4747"
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
      userLogin: false,
      showLogout: false,
      showResult: false,
      wine1: "",
      wine2: "",
      wine3: ""
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log("submit choice line 71", this.state)
    //console.log(getFood({choice}))
    const { choice } = this.state;
    //if({ choice } === API.getFood({choice})){
    //console.log();

   //}

   API.getFood(this.state)
   .then( (response) => {
     console.log("API getFood", response.data);
     this.setState({wine1: response.data[0].wines[0].name});
     this.setState({wine2: response.data[0].wines[1].name});
     this.setState({wine3: response.data[0].wines[2].name});
     this.setState({showResult: true})
   })
   .catch(function (error) {
     console.log("getFood error", error);
   });
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

    API.createUser(user)
      .then(function (response) {
        console.log("createUser", response);
      })
      .catch(function (error) {
        console.log("createUser", error);
      });

    //console.log({accessToken: id_token});
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

  showLogout = () => {
    this.setState({showLogout: !this.state.showLogout})
  }

  render() {
    const { choice } = this.state;
    return (
      <div>
        <div>
          <div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
            <header style={headerColor} class="mdl-layout__header">
              <div class="mdl-layout__header-row">
                <div class="mdl-layout-spacer"></div>
                <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
                  <div>
                    <div style={loggedStyle}>
                      <img style={imageStyle} src={userLogin} onClick={this.showLogout}/>
                    </div>
                  </div>
                  {this.state.showLogout === true ? 
                    <GoogleLogout 
                      buttonText={"Logout"} 
                      onLogoutSuccess={this.logout.bind(this)}
                      >
                    </GoogleLogout> :
                    null
                  }
                  <div class="mdl-textfield__expandable-holder">
                  </div>
                </div>
              </div>
            </header>
            <div class="mdl-layout__drawer">
              <span class="mdl-layout-title">Slosh.io</span>
            <form style={formStyle} onSubmit={this.onSubmit}>
              <select name="choice" className="form-control" id="sel1" onChange={this.onChange}>
                <option>Stew</option>
                <option>Pasta (Red Sauce)</option>
                <option>Pasta (White Sauce)</option>
                <option>Cured Meats</option>
                <option>Poultry</option>
                <option>Pork</option>
                <option>Cheeses</option>
                <option>Fruits</option>
                <option>Chocolate Cake</option>
                <option>Burgers</option>
                <option>BBQ</option>
                <option>Ribs</option>
                <option>Vegetables</option>
                <option>Pizza</option>
                <option>Chili</option>
                <option>Fries</option>
                <option>Sushi</option>
                <option>Salad</option>
              </select>
              <button>Submit</button>
              </form>
              </div>
            <main class="mdl-layout__content">
              <div class="page-content">
                <p>{this.state.wine1}</p>
              </div>
            </main>
            <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
          <GoogleLogin
            clientId="1063825968337-jlrfit23tiqrc36i9rkkbhmgstbdrslm.apps.googleusercontent.com"
            onSuccess={this.responseGoogle.bind(this)}
            onFailure={() => console.log(this, arguments)}
            width={220}
            height={30}
            longtitle={true}
            isSignedIn
            />
          </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default UserForm;
