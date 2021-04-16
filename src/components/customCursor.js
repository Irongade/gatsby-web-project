import React, {useState, useEffect, useRef} from 'react';
import {Cursor} from "../styles/globalStyles"

// context
import {useGlobalStateContext} from "../context/globalContext"

const CustomCursor = ({toggleMenu}) => {

    const {cursorType} = useGlobalStateContext();
    const cursor = useRef(null);

    const [mousePosition, setMousePosition] = useState({
        x: 400,
        y: 400
    })

    const onMouseMove = event => {
        const { clientX, clientY } = event
        cursor.current.style.left = `${clientX}px`;
        cursor.current.style.top = `${clientY}px`;
    }

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove)
        return () => {
            document.removeEventListener("mousemove", onMouseMove)
        }
    }, [])

    return (
        <>
            <Cursor 
                className={`${!!cursorType ? "hovered" : ""} ${cursorType} ${toggleMenu ? "nav-open" : ""}`}
                ref = {cursor}
             />
        </>
    )
}

export default CustomCursor
