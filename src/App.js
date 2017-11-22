import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserForm from "./pages/Food";
import Login from "./pages/Login";
import Wine from "./pages/Wine";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Wrapper from "./components/Wrapper";

const App = () =>
  <Router>
    <div>
      <Navbar />
      <Wrapper>
        <Route exact path="/" component={} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Food" component={UserForm} />
        <Route exact path="/Wine" component={Wine} />
      </Wrapper>
      <Footer />
    </div>
  </Router>;

export default App;
