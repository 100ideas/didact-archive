import React, {Component} from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { ThemeProvider, NAV_COLLAPSE } from "./Theme";
import Omnibar from "./Omnibar"

// export default ({ children, title }) => (

class App extends Component {
  state = {
    showConsole: false,
    showOmnibox: false,
    // isDarkTheme: window.localStorage.getItem("theseusLastTheme") === "dark",
    isDarkTheme: false,
    terminalContainerSize: 400
  };

  componentDidMount() {
    if (this.state.isDarkTheme) {
      document.body.classList.add("pt-dark");
    } else {
      document.body.classList.remove("pt-dark");
    }
  }

  render() {
    return (
      <ThemeProvider
        theme={this.state.isDarkTheme ? "dark" : "light"}
        title="nextjs+blueprint"
      >
        <Omnibar/>
        { this.props.children }
      </ThemeProvider>
    )
  }
};

export default App;
