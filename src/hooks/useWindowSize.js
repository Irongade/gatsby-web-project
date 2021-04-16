import React, {useState, useEffect} from 'react'

export default function useWindowSize() {
    const isBrowser = typeof window !== "undefined"

    function getSize() {
        return {
            width: isBrowser ? window.innerWidth : "",
            height: isBrowser ? window.innerHeight : ""
        }
    }

    const [windowSize, setWindowSize]= useState(getSize())

    useEffect(() => {
        function handleResize() {
            setWindowSize(getSize())
        }

        window.addEventListener("resize", handleResize)
        
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])


    return windowSize;
}

