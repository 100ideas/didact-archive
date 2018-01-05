import React, {Component, Children} from "react";
import Link from 'next/link';
import Head from 'next/head';
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";

const withTheme = (Component) => {
  class WithTheme extends React.Component {
    static contextTypes = {
      theme: PropTypes.string
    };
    render() {
      // eslint-disable-next-line react/prop-types
      const { theme } = this.context;

      return (
        <Component
          theme={theme}
          {...this.props}
        />
      );
    }
  }
  return hoistStatics(WithTheme, Component);
};

class ThemeProvider extends Component {
  getChildContext() {
   const { theme } = this.props
   return { theme }
  }
  render() {
    // `Children.only` enables us not to add a <div /> for nothing
    return (

      // Children.only(this.props.children)

      <div
        className="pt-dark layout"
        style={{backgroundColor: '#293742'}}>

        <Head>
          <meta charSet="utf-8" />
          <title>{this.props.title}</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="/static/normalize.css" />
          <link rel="stylesheet" href="/static/blueprintjs/dist/blueprint.css" />
          <link rel="stylesheet" href="static/blueprintjs-labs/dist/blueprint-labs.css" />
          <link rel="stylesheet" href="/static/flex.css" />
        </Head>

        <main className="wrap container-fluid">

          <nav className="pt-navbar">
            <div className="pt-navbar-group pt-align-left">
              <Link href="/"><a><div className="pt-navbar-heading">blueprintjs next playground</div></a></Link>
            </div>
            <div className="pt-navbar-group pt-align-right">
              <Link href="/profile">
                <a className="pt-button pt-minimal">Profile</a>
              </Link>
              <button className="pt-button pt-minimal pt-icon-user" />
            </div>
          </nav>

          { this.props.children }

          <footer>
            <p>footer</p>
            <p>use meta-k to activate omnibox</p>
          </footer>

        </main>

      </div>

    )
  }
}

ThemeProvider.childContextTypes = {
  theme: PropTypes.string.isRequired
};
ThemeProvider.propTypes = {
  theme: PropTypes.string.isRequired,
}

const SMALLEST_SCREEN = '(max-width: 420px)';
const NAV_COLLAPSE = '(max-width: 700px)';

export {
  withTheme,
  ThemeProvider,
  SMALLEST_SCREEN,
  NAV_COLLAPSE
};
