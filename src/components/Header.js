import React, {useEffect, useRef} from 'react';
import {Link} from "gatsby"

import {HeaderNav, Logo, Menu} from "../styles/headerStyles"
import {Container, Flex} from "../styles/globalStyles"

// contexts
import {useGlobalStateContext, useGlobalDispatchContext} from "../context/globalContext"

// hooks
import useElementPosition from "../hooks/useElementPosition"

const Header = ({onCursorHover, toggleMenu, setToggleMenu, hamburgerPosition,setHamburgerPosition}) => {
    const hamburger = useRef(null);

    const dispatch = useGlobalDispatchContext();
    const {currentTheme} = useGlobalStateContext();
    const position = useElementPosition(hamburger)

    const toggleTheme = () => {
        if(currentTheme === "dark") {
            dispatch({
                type: "TOGGLE_THEME",
                theme: "light"
            })
        } else {
            dispatch({
                type: "TOGGLE_THEME",
                theme: "dark"
            })
        }
    }

    const menuHover = () => {
        onCursorHover("locked")
        setHamburgerPosition({
            x: position.x,
            y: position.y + 72
        })
    }

    useEffect(() => {
        window.localStorage.setItem("theme", currentTheme)
    }, [currentTheme])

    return (
        <HeaderNav 
            animate={{y: 0, opacity: 1}}
            initial={{y: -72, opacity: 0}}
            transition={{duration: 1, ease: [0.6,0.05,-0.01, 0.9]}}
        >
            <Container>
                <Flex spaceBetween noHeight>
                    <Logo onMouseEnter={() => onCursorHover("hovered")} onMouseLeave={onCursorHover}>
                        <Link to="/">FURR</Link>
                        <span onMouseEnter={() => onCursorHover("pointer")} onMouseLeave={() => onCursorHover("hovered")} onClick={toggleTheme}></span>
                        <Link to="/">W</Link>
                    </Logo>

                    <Menu ref={hamburger} onMouseEnter={menuHover} onMouseLeave={onCursorHover} onClick={() => setToggleMenu(!toggleMenu)}>
                        <button>
                            <span></span>
                            <span></span>
                        </button>
                    </Menu>
                </Flex>
            </Container>
        </HeaderNav>
    )
}

export default Header;
