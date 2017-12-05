import React, { Component } from "react";
import Modal from "./Modal";
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { Link } from "react-router-dom";
import API from "../utils/API";
import ReactFontFace from 'react-font-face';
import Radium, { Style } from 'radium';
import './index.css';


<Style rules = {{
  body: {
    fontFamily: 'apercuMono'
  },
  title: {
    fontWeight: 'bold'
  },
  'h1, h2, h3': {
    fontWeight: 'bold'
  }
}} />


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
  borderRadius: "50%",
  marginRight: "15px",
  marginTop: "-3.5px"
}
const headerColor = {
  backgroundColor: "firebrick"
}
const buttonCenter = {
  textAlign: "center",
}
const tabsStyle = {
  flexDirection: "column",
  paddingBottom: "35px",
  height: "inherit",
  borderBottom: "none",
  borderRight: "1px solid rgba(10, 11, 49, 0.20)",
  background: "rgba(158, 158, 158, 0.34)",
  color: "black",
  content: "inherit",
  height: "0",
  padding: "0 30px",
  textAlign: "left"
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
      showLogout: false
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
   .then(function (response) {
     console.log("API getFood", response.data);
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

    console.log({accessToken: id_token});
    console.log(response);
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
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
                      mdl-layout--fixed-header">
            <header style={headerColor} class="mdl-layout__header">
              <div className="mdl-layout__header-row">
                <div className="mdl-layout-spacer"></div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                            mdl-textfield--floating-label mdl-textfield--align-right">
                            <div>
                              <div style={loggedStyle}>
                                <img style={imageStyle} src={userLogin}/>
                              </div>
                            </div>
                            <GoogleLogout
                              onLogoutSuccess={this.logout.bind(this)}
                              width={220}
                              height={30}
                            >
                            </GoogleLogout>
                  <div className="mdl-textfield__expandable-holder">

                  </div>
                </div>
              </div>
            </header>
            <div id="drawer" className="mdl-layout__drawer">
              <span id="appName" className="mdl-layout-title">Slosh.io</span>
              <div class="mdl-tabs vertical-mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
              										  <div className="mdl-grid mdl-grid--no-spacing">
              										    <div className="mdl-cell mdl-cell--2-col">
              											      <div className="mdl-tabs__tab-bar">
              											         <a href="#tab1-panel" class="mdl-tabs__tab is-active">
              											      	     <span class="hollow-circle"></span>
              											      	      Pairing
              											         </a>
              											         <a href="#tab2-panel" class="mdl-tabs__tab">
              											      	      <span class="hollow-circle"></span>
              											      	      About
              											          </a>
              											          <a href="#tab3-panel" class="mdl-tabs__tab">
              											      	      <span class="hollow-circle"></span>
              											            	Favorites
              											          </a>
              											     </div>
              											   </div>
              											   <div className="mdl-cell mdl-cell--10-col">
              												      <div className="mdl-tabs__panel is-active" id="tab1-panel">
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
                                                <button>Submit</button>
                                                </form>
              												      </div>
              												      <div className="mdl-tabs__panel" id="tab2-panel">
              													         About Slosh.io
                    												</div>
                    												<div className="mdl-tabs__panel" id="tab3-panel">
              													          Your Favorite Picks
              												      </div>
              											    </div>
              										  </div>
              									</div>
            </div>
            <main className="mdl-layout__content">
              <div className="page-content">


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
