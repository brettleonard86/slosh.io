import React, { Component } from "react";
import Modal from "./Modal";
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { Link } from "react-router-dom";
import API from "../utils/API";
import ReactFontFace from 'react-font-face';
import Radium, { Style } from 'radium';
import './index.css';
import wine1src from './winePictures/2009MartianGrenache.jpg';
import wine2src from './winePictures/2008ChateauBeausejourBordeauxSuperior.jpg';
import wine3src from './winePictures/2005LiberaliaCuatroCrianza.jpg';
import 'material-design-lite/material';
import 'mdl-ext';
import eqjs from 'eq.js';
window.eqjs = eqjs; // Put in global scope - for use with script in page


let userLogin ='' ;
let wine1 = '';
let wine2 = '';
let wine3 = '';
let wine1Description = '';
let wine2Description = '';
let wine3Description = '';
let wine1Image = null;
let wine2Image = null;
let wine3Image = null;

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

const modalStyle = {
  width: "26em",
  height: "36em",
  backgroundColor: "firebrick",
  color: "white"
}

const headerColor = {
  backgroundColor: "firebrick"
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
      wine3: "",
      wine1Description: "",
      wine2Description: "",
      wine3Description: "",
      wine1Image: "",
      wine2Image: "",
      wine3Image: ""
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
    const { choice } = this.state;

   API.getFood(this.state)
   .then( (response) => {
     console.log("API getFood", response.data);
     this.setState({wine1: response.data[0].wines[0].name});
     this.setState({wine1Description: response.data[0].wines[0].longDescription})
     this.setState({wine1Image:  wine1src})
     this.setState({wine2: response.data[0].wines[1].name});
     this.setState({wine2Description: response.data[0].wines[1].longDescription})
     this.setState({wine2Image:  wine2src})
     this.setState({wine3: response.data[0].wines[2].name});
     this.setState({wine3Description: response.data[0].wines[2].longDescription})
     this.setState({wine3Image:  wine3src})
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
  showLogout = () => {
    this.setState({showLogout: !this.state.showLogout})
  }
  render() {
    const { choice } = this.state;
    return (
      <div>
        <div>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
                      mdl-layout--fixed-header">
            <header style={headerColor} className="mdl-layout__header">
              <div className="mdl-layout__header-row">
                <div className="mdl-layout-spacer"></div>
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
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

                  <div className="mdl-textfield__expandable-holder"></div>
                </div>
              </div>
            </header>

          <div id="drawer" className="mdl-layout__drawer">
          <span id="appName" className="mdl-layout-title">slosh.io</span>

            <div className="mdl-tabs vertical-mdl-tabs mdl-js-tabs mdl-js-ripple-effect">
            <div className="mdl-grid mdl-grid--no-spacing">
            <div className="mdl-cell mdl-cell--2-col">
            <div className="mdl-tabs__tab-bar">

              <a href="#tab1-panel" className="mdl-tabs__tab is-active">
              Pairings
              </a>

            	<a href="#tab2-panel" className="mdl-tabs__tab">
            	About
            	</a>

              <a href="#tab3-panel" className="mdl-tabs__tab">
            	Favorite
            	</a>

              </div>
            </div>

            <div className="mdl-cell mdl-cell--10-col">
            <div className="mdl-tabs__panel is-active" id="tab1-panel">
            <form onSubmit={this.onSubmit}>
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

              <ul class="collapsible" data-collapsible="accordion">
              <hr class="list" />
                <li>
                  <div id="listHead" class="collapsible-header"><p class="material-icons">flare&nbsp;</p>Side</div>
                  <div class="collapsible-body">
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-1">
                    <input type="checkbox" id="checkbox-1" class="mdl-checkbox__input" />
                    <span class="mdl-checkbox__label">
                      <p>Cheese</p>
                    </span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-2">
                    <input type="checkbox" id="checkbox-2" class="mdl-checkbox__input" />
                    <span class="mdl-checkbox__label">
                      <p>Fruit</p>
                    </span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-3">
                    <input type="checkbox" id="checkbox-3" class="mdl-checkbox__input" />
                    <span class="mdl-checkbox__label">
                      <p>Soup</p>
                    </span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                    <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                    <span class="mdl-checkbox__label">
                      <p>Vegetables</p>
                    </span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-5">
                    <input type="checkbox" id="checkbox-5" class="mdl-checkbox__input" />
                    <span class="mdl-checkbox__label">
                      <p>Fries</p>
                    </span>
                    </label>
                    </div>
                <hr class="list"/>
              	</li>

              	<li>
              		<div id="listHead" class="collapsible-header"><i class="material-icons">whatshot&nbsp;</i>Entre</div>
                  <div class="collapsible-body">
                  <div class="collapsible popout" data-collapsible="accordion">
                  <li>
                  <div class="collapsible-header">
                  <br />
                  Type
                  </div>
                    <div class="collapsible-body">
                      <br />
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-1">
                      <input type="checkbox" id="checkbox-1" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Mexican</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Italian</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>American</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Thai</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Chinese</p>
                      </span>
                      </label>
                    </div>
                  </li>
                  </div>
                  <hr class="list"/>

                  <div class="collapsible popout" data-collapsible="accordion">
                  <li>
                  <div class="collapsible-header">
                  Meat
                  </div>
                    <div class="collapsible-body">
                      <br />
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Beef</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Chicken</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Seafood</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Poultry</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Pork</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Cured Meat</p>
                      </span>
                      </label>
                    </div>
                  </li>
                  </div>
                  <hr class="list"/>

                  <div class="collapsible popout" data-collapsible="accordion">
                  <li>
                  <div class="collapsible-header">
                  Dish
                  </div>
                    <div class="collapsible-body">
                      <br />
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Pizza</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>BBQ</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Burger</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Sushi</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Pasta Red Sauce</p>
                      </span>
                      </label>
                      <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                      <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                      <span class="mdl-checkbox__label">
                      <p>Pasta White Sauce</p>
                      </span>
                      </label>
                    </div>
                  </li>
                  </div>

                </div>
                <hr class="list"/>
                </li>


                <li>
                  <div id="listHead" class="collapsible-header"><i class="material-icons">filter_drama&nbsp;</i>Dessert</div>
                  <div class="collapsible-body">
                    <div class="collapsible-header">
                    <br />
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                    <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                    <span class="mdl-checkbox__label">
                    <p>Chocolate Cake</p>
                    </span>
                    </label>
                    <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="checkbox-4">
                    <input type="checkbox" id="checkbox-4" class="mdl-checkbox__input" />
                    <span class="mdl-checkbox__label">
                    <p>Fruit</p>
                    </span>
                    </label>
                  </div>
                <hr class="list"/>
                </div>
                </li>
                </ul>






            </div>
            </div>

            <div className="mdl-tabs__panel" id="tab2-panel">
            <div className="image"></div>​
              <p id="aboutUs">
                The only application that respects your food with proper alcohol.
                Simply tell slosh what’s cooking, filter through your current drinking
                preferences, and we’ll find the right companion for your meal. Ps : double-fist when necessary.
              </p>
              <p id="nameDevice">
                slurp + nosh
              </p>
              <p id="nameAnswer">
                = slosh
              </p>
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


    <p>{this.state.wine1}</p>
    <img src={this.state.wine1Image}/>
    <p>{this.state.wine1Description}</p>
    <p>{this.state.wine2}</p>
    <img src={this.state.wine2Image}/>
    <p>{this.state.wine2Description}</p>
    <p>{this.state.wine3}</p>
    <img src={this.state.wine3Image}/>
    <p>{this.state.wine3Description}</p>


    <div id="card" class="demo-card-square mdl-card mdl-shadow--2dp">
      <div class="mdl-card__title mdl-card--expand">
        <h2 class="mdl-card__title-text">2013 Akoya Chardonnay</h2>
      </div>
      <div class="mdl-card__supporting-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Aenan convallis.
      </div>
      <div class="mdl-card__actions mdl-card--border">
        <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          check it out
        </a>
      </div>
    </div>



    </div>
    </main>


    <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
      <div style={modalStyle}>
        <GoogleLogin
        clientId="1063825968337-jlrfit23tiqrc36i9rkkbhmgstbdrslm.apps.googleusercontent.com"
        onSuccess={this.responseGoogle.bind(this)}
        onFailure={() => console.log(this, arguments)}
        width={1000}
        height={1000}
        longtitle={true}
        isSignedIn
        />
        <div>
          slosh.io
        </div>​
      </div>
    </Modal>

  </div>
</div>
    );
  }
}

export default UserForm;
