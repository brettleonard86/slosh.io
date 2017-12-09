import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserForm from "./pages/Home";
//import Header from "./components/Header";
import Wrapper from "./components/Wrapper";

const App = () =>
  <Router>
    <div>
      <Wrapper>
        <Route exact path="/" component={UserForm} />
        <Route exact path="/Home" component={UserForm} />
      </Wrapper>
    </div>
  </Router>;

export default App;

      /* <Header/> */
