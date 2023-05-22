import React, { Component } from "react";

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <a href="/">Dashboard</a>
            </li>
            <li>
              <a href="/signin">Sign-in</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default MenuBar;
