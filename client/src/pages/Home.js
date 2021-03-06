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

let wordmark = '';
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
  backgroundColor: "none"
}
const headerColor = {
  backgroundColor: "firebrick",
  position: "fixed",
  top: "0",
  right: "0"
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
      wordmark: "wordmark.png"
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
      .then((response) => {
        console.log("API getFood", response.data);
        // let matches = response.data[0].wines.find(obj => obj.image);
        this.setState({
          wines: [...response.data[0].wines]
        })
        this.setState({wordmark: ""});
        // this.setState({ wine1: response.data[0].wines[0].name });
        // this.setState({ wine1Description: response.data[0].wines[0].longDescription })
        // switch (this.state.wine1) {
        //   case "2009 Martian Grenache":
        //     this.setState({ wine1Image: MartianGrenache });
        //     break;
        //   case "2008 Chateau Beausejour Bordeaux Superior":
        //     this.setState({ wine1Image: ChateauBeause });
        //     break;
        //   case "2009 Manifesto Zinfandel":
        //     this.setState({ wine1Image: ManifestoZinfandel });
        //     break;
        //   case "2005 Liberalia Cuatro Crianza ":
        //     this.setState({ wine1Image: LiberaliaCuatro });
        //     break;
        //   case "2010 Independent Producers Merlot":
        //     this.setState({ wine1Image: IndependentProducers });
        //     break;
        //   case '2009 Quintay \"Q\" Pinot Noir':
        //     this.setState({ wine1Image: QuintayPinot });
        //     break;
        //   case '2010 Los Clop Sur Malbec ':
        //     this.setState({ wine1Image: LosClop });
        //     break;
        //   case '2007 Casa de la Cruz Pinot Noir':
        //     this.setState({ wine1Image: CasadelaCruz });
        //     break;
        //   case "Bosco dei Cirmioli Montepulciano d'Abruzzo":
        //     this.setState({ wine1Image: BoscoDei });
        //     break;
        //   case "2009 Love This Life White":
        //     this.setState({ wine1Image: LoveLife });
        //     break;
        //   case "2011 Vinum Chenin Blanc-Viognier":
        //     this.setState({ wine1Image: Vinum });
        //     break;
        //   case "2010 House Wine House Red":
        //     this.setState({ wine1Image: HouseRed });
        //     break;
        //   case "2010 Baos Quintas 'Proeza' Dao":
        //     this.setState({ wine1Image: BaosQuintas });
        //     break;
        //   case "2010 MRLT":
        //     this.setState({ wine1Image: MRLT });
        //     break;
        //   case "2012 Les Hauts De Legarde":
        //     this.setState({ wine1Image: LesHauts });
        //     break;
        //   case "2008 South Hill Sauvignon Blanc":
        //     this.setState({ wine1Image: SouthHill });
        //     break;
        //   case "2011 Triebaumer Trie Red":
        //     this.setState({ wine1Image: TrieBaumer });
        //     break;
        //   case "2010 Longue Dog White":
        //     this.setState({ wine1Image: LongueDog });
        //     break;
        //   case "2011 Zull Lust and Laune Blauer Portugieser":
        //     this.setState({ wine1Image: ZullLust });
        //     break;
        //   case "2012 Goddess Sweet White":
        //     this.setState({ wine1Image: Goddess });
        //     break;
        //   case "2012 Más Que Vinos Ercavio Blanco":
        //     this.setState({ wine1Image: Ercavio });
        //     break;
        //   case "Casas del Bosque Pinot Noir":
        //     this.setState({ wine1Image: Casas });
        //     break;
        //   case "2013 Akoya Chardonnay":
        //     this.setState({ wine1Image: Akoya });
        //     break;
        //   case "2011 Score Red Blend":
        //     this.setState({ wine1Image: Score });
        //     break;
        //   case "2013 Alcalá Monastrell":
        //     this.setState({ wine1Image: Alcala });
        //     break;
        //   case "2009 Nugan Vision Chardonnay":
        //     this.setState({ wine1Image: Nugan });
        //     break;
        //   case "2013 Rambutan Gewürztraminer":
        //     this.setState({ wine1Image: Rambutan });
        //     break;
        // }
        // //this.setState({wine1Image:  wine1src})
        // this.setState({ wine2: response.data[0].wines[1].name });
        // this.setState({ wine2Description: response.data[0].wines[1].longDescription })
        // switch (this.state.wine2) {
        //   case "2009 Martian Grenache":
        //     this.setState({ wine2Image: MartianGrenache });
        //     break;
        //   case "2008 Chateau Beausejour Bordeaux Superior":
        //     this.setState({ wine2Image: ChateauBeause });
        //     break;
        //   case "2009 Manifesto Zinfandel":
        //     this.setState({ wine2Image: ManifestoZinfandel });
        //     break;
        //   case "2005 Liberalia Cuatro Crianza ":
        //     this.setState({ wine2Image: LiberaliaCuatro });
        //     break;
        //   case "2010 Independent Producers Merlot":
        //     this.setState({ wine2Image: IndependentProducers });
        //     break;
        //   case '2009 Quintay \"Q\" Pinot Noir':
        //     this.setState({ wine2Image: QuintayPinot });
        //     break;
        //   case '2010 Los Clop Sur Malbec ':
        //     this.setState({ wine2Image: LosClop });
        //     break;
        //   case '2007 Casa de la Cruz Pinot Noir':
        //     this.setState({ wine2Image: CasadelaCruz });
        //     break;
        //   case "Bosco dei Cirmioli Montepulciano d'Abruzzo":
        //     this.setState({ wine2Image: BoscoDei });
        //     break;
        //   case "2009 Love This Life White":
        //     this.setState({ wine2Image: LoveLife });
        //     break;
        //   case "2011 Vinum Chenin Blanc-Viognier":
        //     this.setState({ wine2Image: Vinum });
        //     break;
        //   case "2010 House Wine House Red":
        //     this.setState({ wine2Image: HouseRed });
        //     break;
        //   case "2010 Baos Quintas 'Proeza' Dao":
        //     this.setState({ wine2Image: BaosQuintas });
        //     break;
        //   case "2010 MRLT":
        //     this.setState({ wine2Image: MRLT });
        //     break;
        //   case "2012 Les Hauts De Legarde":
        //     this.setState({ wine2Image: LesHauts });
        //     break;
        //   case "2008 South Hill Sauvignon Blanc":
        //     this.setState({ wine2Image: SouthHill });
        //     break;
        //   case "2011 Triebaumer Trie Red":
        //     this.setState({ wine2Image: TrieBaumer });
        //     break;
        //   case "2010 Longue Dog White":
        //     this.setState({ wine2Image: LongueDog });
        //     break;
        //   case "2011 Zull Lust and Laune Blauer Portugieser":
        //     this.setState({ wine2Image: ZullLust });
        //     break;
        //   case "2012 Goddess Sweet White":
        //     this.setState({ wine2Image: Goddess });
        //     break;
        //   case "2012 Más Que Vinos Ercavio Blanco":
        //     this.setState({ wine2Image: Ercavio });
        //     break;
        //   case "Casas del Bosque Pinot Noir":
        //     this.setState({ wine2Image: Casas });
        //     break;
        //   case "2013 Akoya Chardonnay":
        //     this.setState({ wine2Image: Akoya });
        //     break;
        //   case "2011 Score Red Blend":
        //     this.setState({ wine2Image: Score });
        //     break;
        //   case "2013 Alcalá Monastrell":
        //     this.setState({ wine2Image: Alcala });
        //     break;
        //   case "2009 Nugan Vision Chardonnay":
        //     this.setState({ wine2Image: Nugan });
        //     break;
        //   case "2013 Rambutan Gewürztraminer":
        //     this.setState({ wine2Image: Rambutan });
        //     break;
        // }
        // //this.setState({wine2Image:  wine2src})
        // this.setState({ wine3: response.data[0].wines[2].name });
        // this.setState({ wine3Description: response.data[0].wines[2].longDescription })
        // switch (this.state.wine3) {
        //   case "2009 Martian Grenache":
        //     this.setState({ wine3Image: MartianGrenache });
        //     break;
        //   case "2008 Chateau Beausejour Bordeaux Superior":
        //     this.setState({ wine3Image: ChateauBeause });
        //     break;
        //   case "2009 Manifesto Zinfandel":
        //     this.setState({ wine3Image: ManifestoZinfandel });
        //     break;
        //   case "2005 Liberalia Cuatro Crianza ":
        //     this.setState({ wine3Image: LiberaliaCuatro });
        //     break;
        //   case "2010 Independent Producers Merlot":
        //     this.setState({ wine3Image: IndependentProducers });
        //     break;
        //   case '2009 Quintay \"Q\" Pinot Noir':
        //     this.setState({ wine3Image: QuintayPinot });
        //     break;
        //   case '2010 Los Clop Sur Malbec ':
        //     this.setState({ wine3Image: LosClop });
        //     break;
        //   case '2007 Casa de la Cruz Pinot Noir':
        //     this.setState({ wine3Image: CasadelaCruz });
        //     break;
        //   case "Bosco dei Cirmioli Montepulciano d'Abruzzo":
        //     this.setState({ wine3Image: BoscoDei });
        //     break;
        //   case "2009 Love This Life White":
        //     this.setState({ wine3Image: LoveLife });
        //     break;
        //   case "2011 Vinum Chenin Blanc-Viognier":
        //     this.setState({ wine3Image: Vinum });
        //     break;
        //   case "2010 House Wine House Red":
        //     this.setState({ wine3Image: HouseRed });
        //     break;
        //   case "2010 Baos Quintas 'Proeza' Dao":
        //     this.setState({ wine3Image: BaosQuintas });
        //     break;
        //   case "2010 MRLT":
        //     this.setState({ wine3Image: MRLT });
        //     break;
        //   case "2012 Les Hauts De Legarde":
        //     this.setState({ wine3Image: LesHauts });
        //     break;
        //   case "2008 South Hill Sauvignon Blanc":
        //     this.setState({ wine3Image: SouthHill });
        //     break;
        //   case "2011 Triebaumer Trie Red":
        //     this.setState({ wine3Image: TrieBaumer });
        //     break;
        //   case "2010 Longue Dog White":
        //     this.setState({ wine3Image: LongueDog });
        //     break;
        //   case "2011 Zull Lust and Laune Blauer Portugieser":
        //     this.setState({ wine3Image: ZullLust });
        //     break;
        //   case "2012 Goddess Sweet White":
        //     this.setState({ wine3Image: Goddess });
        //     break;
        //   case "2012 Más Que Vinos Ercavio Blanco":
        //     this.setState({ wine3Image: Ercavio });
        //     break;
        //   case "Casas del Bosque Pinot Noir":
        //     this.setState({ wine3Image: Casas });
        //     break;
        //   case "2013 Akoya Chardonnay":
        //     this.setState({ wine3Image: Akoya });
        //     break;
        //   case "2011 Score Red Blend":
        //     this.setState({ wine3Image: Score });
        //     break;
        //   case "2013 Alcalá Monastrell":
        //     this.setState({ wine3Image: Alcala });
        //     break;
        //   case "2009 Nugan Vision Chardonnay":
        //     this.setState({ wine3Image: Nugan });
        //     break;
        //   case "2013 Rambutan Gewürztraminer":
        //     this.setState({ wine3Image: Rambutan });
        //     break;
        // }
        //this.setState({wine3Image:  wine3src})
        this.setState({ showResult: true })
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
    var userEmail = response.w3.U3;
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

    console.log({ accessToken: id_token });
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
    this.setState({ userLogin: false })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }
  showLogout = () => {
    this.setState({ showLogout: !this.state.showLogout })
  }

  addToFavorites(wine) {
    console.log(wine);
    // API request to save this wine to user's favorites
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
                      <ul className="collapsible" data-collapsible="accordion">
                      <hr className="list" />
                      <li>
                        <div id="listHead" className="collapsible-header"><p className="material-icons">flare&nbsp;</p>Side</div>
                        <div className="collapsible-body"> 
                      <select name="choice" className="form-control" id="sel1" onChange={this.onChange}>
                        <option>Cheeses</option>
                        <option>Fruits</option>
                        <option value="Stew" value="Chilli">Soup</option>
                        <option value="Veggies">Vegetables</option>
                        <option>Fries</option>
                      </select>

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
                                <select name="choice" className="form-control" id="sel1" onChange={this.onChange}>
                                  <option>Mexican</option>
                                  <option>American</option>
                                  <option>Chinese</option>
                                  <option>Italian</option>
                                  <option>Thai</option>
                                </select>
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
                                <select name="choice" className="form-control" id="sel1" onChange={this.onChange}>
                                  <option value="Burgers">Beef</option>
                                  <option>Chicken</option>
                                  <option value="Shellfish" value="Oysters">Fish</option>
                                  <option>Poultry</option>
                                  <option value="Ribs">Pork</option>
                                  <option>Lamb</option>
                                  <option>Cured Meats</option>
                                </select>
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
                                <select name="choice" className="form-control" id="sel1" onChange={this.onChange}>
                                  <option>Pizza</option>
                                  <option>BBQ</option>
                                  <option>Burgers</option>
                                  <option>Sushi</option>
                                  <option>Pasta Red Sauce</option>
                                  <option>Pasta White Sauce</option>
                                </select>
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
                            <select name="choice" className="form-control" id="sel1" onChange={this.onChange}>
                            <option>Fruit</option>
                            <option>Chocolate Cake</option>
                            </select>
                          </div>
                          <hr className="list" />
                        </div>
                      </li>
                    </ul>

                    <button id="formSubmit">Submit</button>
                    </form>

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
  
                  <div className="backgroundImage">


              {this.state.wines.map(wine => (
                 /*div after forloop is where you create the cards*/
              <div key={wine.name}>
                <div className="mdl-card mdl-shadow--2dp demo-card-square">
                    <div className="mdl-card__title mdl-card--expand">
                    <div className="wineImage">
                        {wine.image ? (
                        <img src={`/winePictures/${wine.image}`} />
                        ) : ''}
                      </div>
                    </div>
                      <div className="wineTitle">
                        <h2 className="mdl-card__title-text" style={titleStyle}>
                          {wine.name}
                        </h2>
                      </div>
                      <div className="mdl-card__supporting-text">
                      <div className="longDescription">
                        {wine.longDescription}
                        </div>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                      <button id="demo-show-snackbar" className="mdl-button mdl-js-button mdl-button--raised" type="button">❤</button>
                      <div id="demo-snackbar-example" className="mdl-js-snackbar mdl-snackbar">
                        <div className="mdl-snackbar__text"></div>
                        <button class="mdl-snackbar__action" type="button"></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
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
      </div>
    )
  }
}

export default UserForm;
