import React, { Component } from 'react';
import {
  Classes,
  Hotkey,
  Hotkeys,
  HotkeysTarget,
  MenuItem,
  FocusStyleManager
} from "@blueprintjs/core";
import { Omnibar } from "@blueprintjs/select";
import classNames from "classnames";


@HotkeysTarget
class omnibarUI extends Component {

  state = {
    showConsole: false,
    showomnibar: false,
  };

  componentDidMount() {
    if (this.state.isDarkTheme) {
      document.body.classList.add("pt-dark");
    } else {
      document.body.classList.remove("pt-dark");
    }
  }
  renderOmniItem(props) {
    const { item, index, handleClick, isActive } = props;
    const classes = classNames({
      [Classes.ACTIVE]: isActive,
      [Classes.INTENT_PRIMARY]: isActive
    });
    return (
      <MenuItem
        className={classes}
        key={index}
        onClick={handleClick.bind(this)}
        text={item.description}
      />
    );
  }
  filterOmniList(query, items) {
    //this.setState({latestOmniQuery: query});

    const results = items.filter(
      item => item.description.toLowerCase().indexOf(query.toLowerCase()) > -1
    );

    if(results.length === 0) {
      return [{
        description: `Search for "${query}"`,
        action: 'SEARCH',
        searchQuery: query
      }];
    }

    return results;
  }

  handleomnibarToggle() {
    return this.setState({ showomnibar: !this.state.showomnibar });
  }

  handleomnibarItemSelect(item) {
    this.handleomnibarToggle();
    if(!item) {
      return this.setState({searchQuery: item}, () => {
        this.props.history.replace("/search");
      });
    }

    switch (item.action) {
      case "SHOW_CONSOLE":
        return this.setState({ showConsole: true });
      case "HIDE_CONSOLE":
        return this.setState({ showConsole: false });
      case "TOGGLE_CONSOLE":
        return this.setState({ showConsole: !this.state.showConsole });
      case "LIGHT_THEME":
        return this.setState({ isDarkTheme: false }, () => {
          document.body.classList.remove("pt-dark");
          window.localStorage.setItem("nextbpLastTheme", "light");
        });
      case "DARK_THEME":
        return this.setState({ isDarkTheme: true }, () => {
          document.body.classList.add("pt-dark");
          window.localStorage.setItem("nextbpLastTheme", "dark");
        });
      case "TOGGLE_THEME":
        return this.setState({ isDarkTheme: !this.state.isDarkTheme }, () => {
          document.body.classList.toggle("pt-dark");
          window.localStorage.setItem(
            "nextbpLastTheme",
            this.state.isDarkTheme ? "dark" : "light"
          );
        });
      case "GOTO_HOME":
        this.props.history.replace("/");
        break;
      case "GOTO_ORGANIZATIONS":
        this.props.history.replace("/organizations");
        break;
      case "GOTO_ADMIN_CENTER":
        this.props.history.replace("/settings");
        break;
      case "SEARCH":
      default:
        this.setState({searchQuery: item.searchQuery}, () => {
            this.props.history.replace("/search");
        });

    }
  }

  renderHotkeys() {
    return (
      <Hotkeys>
        <Hotkey
          allowInInput={true}
          global={true}
          combo="meta + k"
          label="Show omnibar"
          onKeyDown={this.handleomnibarToggle.bind(this)}
        />

      </Hotkeys>
    );
  }

  render () {
    return (
      <omnibar
        className="center pt-omnibar pt-overlay-content"
        noResults={<MenuItem disabled text="No results." />}
        isOpen={this.state.showomnibar}
        itemRenderer={this.renderOmniItem}
        onClose={this.handleomnibarToggle.bind(this)}
        itemListPredicate={this.filterOmniList.bind(this)}
        onItemSelect={this.handleomnibarItemSelect.bind(this)}
        resetOnSelect={true}
        resetOnClose={true}
        items={[
          {
            description: "Show Console",
            action: "SHOW_CONSOLE"
          },
          {
            description: "Hide Console",
            action: "HIDE_CONSOLE"
          },
          {
            description: "Toggle Console",
            action: "TOGGLE_CONSOLE"
          },
          {
            description: "Dark Theme",
            action: "DARK_THEME"
          },
          {
            description: "Light Theme",
            action: "LIGHT_THEME"
          },
          {
            description: "Toggle Theme",
            action: "TOGGLE_THEME"
          },
          {
            description: "Go to Home",
            action: "GOTO_HOME"
          },
          {
            description: "Go to Organizations",
            action: "GOTO_ORGANIZATIONS"
          },
          {
            description: "Go to Admin Center",
            action: "GOTO_ADMIN_CENTER"
          }
        ]}
      />
    )
  }
}

export default omnibarUI;
