import React, { Component } from "react";
import Modal from "./Modal";


class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choice: 'Stew',
      isModalOpen: false
    };
  }
  onChange = (e) => {
    // Because we named the inputs to match their corresponding values in state, it's
    // super easy to update the state
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    // get our form data out of state
    const { choice } = this.state;

  }

  openModal() {
    this.setState({ isModalOpen: true })
  }

  closeModal() {
    this.setState({ isModalOpen: false })
  }

  render() {
    const { choice } = this.state;
    return (
      <div>
        <div>
          <button onClick={() => this.openModal()}>Open modal</button>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
            <h1>Modal title</h1>
            <p>hello</p>
            <p><button onClick={() => this.closeModal()}>Close</button></p>
          </Modal>
        </div>
        <div>
          <form onSubmit={this.onSubmit}>
            <label>Select list:</label>
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
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default UserForm;
