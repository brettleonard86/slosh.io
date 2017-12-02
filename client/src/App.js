import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserForm from "./pages/Food";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () =>
  <Router>
    <div>
      <Navbar/>
      <Wrapper>
        <Route exact path="/" component={UserForm} />
        <Route exact path="/Food" component={UserForm} />
      </Wrapper>
      <Footer/>
    </div>
  </Router>;

export default App;