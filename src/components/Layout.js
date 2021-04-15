  
import React, { useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import {createGlobalStyle, ThemeProvider } from "styled-components";
import {normalize} from "styled-normalize"

// context
import {useGlobalStateContext, useGlobalDispatchContext } from "../context/globalContext"

// components
import Header from "./Header";
import CustomCursor from "./customCursor";
import Navigation from "../components/Navigation"

const GlobalStyle = createGlobalStyle`
  ${normalize}
  * {
    text-decoration: none;
    cursor: none;
  }

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }

  body {
    font-family: --apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${props => props.theme.background};
    overscroll-behavior: none;
    overflow-x: hidden;
  }
`

const Layout = ({ children }) => {

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const darkTheme = {
    background: "#000",
    text: "#fff",
    red: "#ea291e"
  }

  const lightTheme = {
    background: "#fff",
    text: "#000",
    red: "#ea291e"
  }

  const {currentTheme, cursorStyles } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const onCursorHover = (targetCursorType) => {
    const cursorType = (cursorStyles.includes(targetCursorType) && targetCursorType) || false;

    dispatch({type: "CURSOR_TYPE", cursorType: cursorType})
  }

  const [toggleMenu, setToggleMenu] = useState(false);
  const [hamburgerPosition, setHamburgerPosition ] = useState({
    x: 0,
    y: 0
  })


  return (
    <ThemeProvider theme={currentTheme === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <CustomCursor toggleMenu={toggleMenu} />
      <Header onCursorHover={onCursorHover} toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} hamburgerPosition={hamburgerPosition} setHamburgerPosition={setHamburgerPosition} />
      <Navigation onCursorHover={onCursorHover} toggleMenu={toggleMenu} setToggleMenu={setToggleMenu}  />
      <main>{children}</main>
   </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout