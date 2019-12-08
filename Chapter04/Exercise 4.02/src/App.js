import React, { Component } from "react";

import LifecycleTest from "./LifecycleTest";

class App extends Component {
  renderLifecycleTest() {
    if (false) {
      return <LifecycleTest />;
    } else {
      return;
    }
  }
  render() {
    return (
      <div className="App">
        Hello Conditional
        {true && <LifecycleTest />}
      </div>
    );
  }
}

export default App;
