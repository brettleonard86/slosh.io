import React, { Component } from "react";
import Modal from "./Modal";
import GoogleLogin from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { Link } from "react-router-dom";
import API from "../utils/API";
import ReactFontFace from 'react-font-face';
import Radium, { Style } from 'radium';
import './index.css';
// import wine1src from './winePictures/2009MartianGrenache.jpg';
// import wine2src from './winePictures/2008ChateauBeausejourBordeauxSuperior.jpg';
// import wine3src from './winePictures/2005LiberaliaCuatroCrianza.jpg';
import 'material-design-lite/material';
import 'mdl-ext';
import eqjs from 'eq.js';
// import MartianGrenache from './winePictures/2009MartianGrenache.jpg';
// import ChateauBeause from './winePictures/2008ChateauBeausejourBordeauxSuperior.jpg';
// import LiberaliaCuatro from './winePictures/2005LiberaliaCuatroCrianza.jpg';
// import ManifestoZinfandel from './winePictures/2009ManifestoZinfandel.jpg';
// import IndependentProducers from './winePictures/2010IndependentProducersMerlot.png';
// import QuintayPinot from './winePictures/2009QuintayPinotNoir.jpg';
// import LosClop from './winePictures/2010LosClopSurMalbec.jpg';
// import CasadelaCruz from './winePictures/2007CasadelaCruzPinotNoir.jpg';
// import BoscoDei from "./winePictures/BoscodeiCirmioliMontepulcianod'Abruzzo.jpg";
// import LoveLife from "./winePictures/LoveThisLifeWhite.jpg";
// import Vinum from "./winePictures/2011VinumChenin.jpg";
// import HouseRed from "./winePictures/2010HouseWineHouseRed.jpg";
// import BaosQuintas from "./winePictures/2010BAosQuintas.jpg";
// import MRLT from "./winePictures/MRLT.jpg";
// import LesHauts from "./winePictures/LesHautsDeLegarde.jpg";
// import SouthHill from "./winePictures/SouthHill.jpg";
// import TrieBaumer from "./winePictures/TrieBaumer.png";
// import LongueDog from "./winePictures/LongueDog.jpg";
// import ZullLust from "./winePictures/ZullLust.jpg";
// import Goddess from "./winePictures/GoddessSweet.jpg";
// import Ercavio from "./winePictures/ercavioblanco.jpg";
// import Casas from "./winePictures/Casas.jpg";
// import Akoya from "./winePictures/AkoyaChardonnay.jpg";
// import Score from "./winePictures/2011ScoreRedBlendClose.jpg";
// import Alcala from "./winePictures/Alcala.jpg";
// import Nugan from "./winePictures/Nugan.jpg";
// import Rambutan from "./winePictures/Rambutan.jpg";
window.eqjs = eqjs; // Put in global scope - for use with script in page

<Style rules={{
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


let userLogin = '';
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

const titleStyle = {
  marginTop: "1.3em",
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
      wine3Image: "",
      wines: [],
      fav: "nothing"
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  // $(document).ready(function() {
  //     $('select').material_select();
  //   });

  onSubmit = (e) => {
    e.preventDefault();
    console.log("submit choice line 71", this.state)
    const { choice } = this.state;

    API.getFood(this.state)
      .then((response) => {
        console.log("API getFood", response.data);
        // let matches = response.data[0].wines.find(obj => obj.image);
        this.setState({
          wines: [...response.data[0].wines]
        })
        
     
        this.setState({ showResult: true })
      })
      .catch(function (error) {
        console.log("getFood error", error);
      });
  }

  openModal() {
    this.setState({ isModalOpen: true })
  }



  addFavorite(wine) {
    console.log(wine.name);
    this.setState({ fav : wine.name }).bind(this);
    // var favorite = { data: fav }
    // console.log(favorite.data);
    // API request to save this wine to user's favorites
    console.log(this.state.fav, "hey")
      API.addFavorite()
        .then(function (response) {
            console.log("addFavorite", response);
        })
        .catch(function (error) {
            console.log("addFavorite", error);
        });

    if(this.state.userLogin === true){
      API.getFavorite(this.state.userLogin)
        .then(function (response) {
            console.log("getFavorite", response);
        })
        .catch(function (error) {
            console.log("getFavorite", error);
        });
    }
  }



  responseGoogle(response) {
    var userName = response.w3.ig;
    var userEmail = response.w3.U3;
    var id_token = response.getAuthResponse().id_token;
    var user = {
      name: userName,
      email: userEmail,
      wine:  this.state.fav
    }

    API.createUser(user)
      .then(function (response) {
        console.log("createUser", response);
      })
      .catch(function (error) {
        console.log("createUser", error);
      });

    console.log({ accessToken: id_token });
    console.log(response);
    console.log("The user's name is " + userName);
    console.log("The user email is " + userEmail);
    this.setState({ isModalOpen: false });
    userLogin = response.profileObj.imageUrl;
    this.setState({ userLogin: true })

    API.getFavorite(user.name)
    .then(function (response) {
        console.log("getFavorite", response);
    })
    .catch(function (error) {
        console.log("getFavorite", error);
    });
  }

  logout() {
    this.setState({ isModalOpen: true });
    userLogin = "Not logged in";
    this.setState({ userLogin: false })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }
  showLogout = () => {
    this.setState({ showLogout: !this.state.showLogout })
  }

  

  render() {
    const { choice } = this.state;
    return (
      <div>
        <div>
          <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
            <header style={headerColor} className="mdl-layout__header">
              <div className="mdl-layout__header-row">
                <div className="mdl-layout-spacer"></div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
                  <div>
                    <div style={loggedStyle}>
                      <img style={imageStyle} src={userLogin} onClick={this.showLogout} />
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
                          <option value="Chili">Chilli</option>
                          <option>Fries</option>
                          <option>Sushi</option>
                          <option>Salad</option>
                          <option>Poop</option>
                        </select>

                        <button>Submit</button>
                      </form>
                      </div>







                      <ul className="collapsible" data-collapsible="accordion">
                        <hr className="list" />
                        <li>
                          <div id="listHead" className="collapsible-header"><p className="material-icons">flare&nbsp;</p>Side</div>
                          <div className="collapsible-body">
                            <form onSubmit={this.onSubmit}>
                            <select name="choice" className="form-control" id="sel1" onChange={this.onChange}>
                              <option>Cheese</option>
                              <option>Fruit</option>
                              <option>Soup</option>
                              <option>Vegetables</option>
                              <option>Fries</option>
                            </select>
                          </form>

                            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-1">
                              <input type="checkbox" id="checkbox-1" className="mdl-checkbox__input" />
                              <span className="mdl-checkbox__label">
                                <p>Cheese</p>
                              </span>
                            </label>
                            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-2">
                              <input type="checkbox" id="checkbox-2" className="mdl-checkbox__input" />
                              <span className="mdl-checkbox__label">
                                <p>Fruit</p>
                              </span>
                            </label>
                            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-3">
                              <input type="checkbox" id="checkbox-3" className="mdl-checkbox__input" />
                              <span className="mdl-checkbox__label">
                                <p>Soup</p>
                              </span>
                            </label>
                            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-4">
                              <input type="checkbox" id="checkbox-4" className="mdl-checkbox__input" />
                              <span className="mdl-checkbox__label">
                                <p>Vegetables</p>
                              </span>
                            </label>
                            <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-5">
                              <input type="checkbox" id="checkbox-5" className="mdl-checkbox__input" />
                              <span className="mdl-checkbox__label">
                                <p>Fries</p>
                              </span>
                            </label>
                            <br />
                          </div>
                          <hr id="afterSide" className="list" />
                        </li>

                        <li>
                          <div id="listHead" className="collapsible-header"><i className="material-icons">whatshot&nbsp;</i>Entrée</div>
                          <div className="collapsible-body">
                            <div className="collapsible popout" data-collapsible="accordion">
                              <li>
                                <div className="collapsible-header">
                                  <br />
                                  Type
                              </div>
                                <div className="collapsible-body">
                                  <br />
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-6">
                                    <input type="checkbox" id="checkbox-6" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Mexican</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-7">
                                    <input type="checkbox" id="checkbox-7" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Italian</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-8">
                                    <input type="checkbox" id="checkbox-8" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>American</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-9">
                                    <input type="checkbox" id="checkbox-9" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Thai</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-10">
                                    <input type="checkbox" id="checkbox-10" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Chinese</p>
                                    </span>
                                  </label>
                                </div>
                              </li>
                            </div>
                            <hr className="list" />

                            <div className="collapsible popout" data-collapsible="accordion">
                              <li>
                                <div className="collapsible-header">
                                  Meat
                  </div>
                                <div className="collapsible-body">
                                  <br />
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-11">
                                    <input type="checkbox" id="checkbox-11" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Beef</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-12">
                                    <input type="checkbox" id="checkbox-12" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Chicken</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-13">
                                    <input type="checkbox" id="checkbox-13" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Seafood</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-14">
                                    <input type="checkbox" id="checkbox-14" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Poultry</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-15">
                                    <input type="checkbox" id="checkbox-15" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Pork</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-16">
                                    <input type="checkbox" id="checkbox-16" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Cured Meat</p>
                                    </span>
                                  </label>
                                </div>
                              </li>
                            </div>
                            <hr className="list" />

                            <div className="collapsible popout" data-collapsible="accordion">
                              <li>
                                <div className="collapsible-header">
                                  Dish
                  </div>
                                <div className="collapsible-body">
                                  <br />
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-17">
                                    <input type="checkbox" id="checkbox-17" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Pizza</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-18">
                                    <input type="checkbox" id="checkbox-18" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>BBQ</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-19">
                                    <input type="checkbox" id="checkbox-19" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Burger</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-20">
                                    <input type="checkbox" id="checkbox-20" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Sushi</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-21">
                                    <input type="checkbox" id="checkbox-21" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Pasta Red Sauce</p>
                                    </span>
                                  </label>
                                  <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-22">
                                    <input type="checkbox" id="checkbox-22" className="mdl-checkbox__input" />
                                    <span className="mdl-checkbox__label">
                                      <p>Pasta White Sauce</p>
                                    </span>
                                  </label>
                                </div>
                              </li>
                            </div>

                          </div>
                          <hr className="list" />
                        </li>


                        <li>
                          <div id="listHead" className="collapsible-header"><i className="material-icons">filter_drama&nbsp;</i>Dessert</div>
                          <div className="collapsible-body">
                            <div className="collapsible-header">
                              <br />
                              <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-23">
                                <input type="checkbox" id="checkbox-23" className="mdl-checkbox__input" />
                                <span className="mdl-checkbox__label">
                                  <p>Chocolate Cake</p>
                                </span>
                              </label>
                              <label className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" htmlFor="checkbox-24">
                                <input type="checkbox" id="checkbox-24" className="mdl-checkbox__input" />
                                <span className="mdl-checkbox__label">
                                  <p>Fruit</p>
                                </span>
                              </label>
                            </div>
                            <hr className="list" />
                          </div>
                        </li>
                      </ul>

                      <button id="formSubmit">Submit</button>

                    </div>
                  </div>

                  <div className="mdl-tabs__panel" id="tab2-panel">
                    <div className="image"></div>
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


              {this.state.wines.map(wine => (
                <div key={wine.name}>
                  <h2 style={titleStyle}>{wine.name}</h2>
                  {wine.image ? (
                    <img src={`/img/winePictures/${wine.image}`} />
                  ) : ''}
                  <button onClick={() => this.addFavorite(wine)}>Add To Favorites</button>
                  {/* <p>{this.state.wine1Description}</p>
                  <h2>{this.state.wine2}</h2>
                  <img src={this.state.wine2Image} />
                  <p>{this.state.wine2Description}</p>
                  <h2>{this.state.wine3}</h2>
                  <img src={this.state.wine3Image} />
                  <p>{this.state.wine3Description}</p> */}
                </div>
              ))}


            </div>
          </main>


          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
            <GoogleLogin
              clientId="1063825968337-jlrfit23tiqrc36i9rkkbhmgstbdrslm.apps.googleusercontent.com"
              onSuccess={this.responseGoogle.bind(this)}
              onFailure={() => console.log(this, arguments)}
              width={1000}
              height={1000}
              longtitle={true}
              isSignedIn
            />
          </Modal>

        </div>
      // </div>
    )
  }
}

export default UserForm;
