import React, {useState,useEffect} from "react";
import Layout from "../components/Layout";

// contexts
import {useGlobalStateContext, useGlobalDispatchContext} from "../context/globalContext"

//components
import HomeBanner from "../components/homepage/HomeBanner"
import HomeContent from "../components/homepage/HomeContent"
import HomeFeature from "../components/homepage/HomeFeature"
import HomeAbout from "../components/homepage/HomeAbout"

export default function Home() {


  const [isClient, setClient] = useState(false);
  // const key = isClient ? "client" : "server";

  useEffect(() => {
    setClient(true);
  }, []);

  const {cursorStyles} = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  const onCursorHover = (targetCursorType) => {
    const cursorType = (cursorStyles.includes(targetCursorType) && targetCursorType) || false;

    dispatch({type: "CURSOR_TYPE", cursorType: cursorType})
  }

  if ( !isClient ) return null;

  return <Layout>
    <HomeBanner onCursorHover={onCursorHover} />
    <HomeContent />
    <HomeFeature onCursorHover={onCursorHover} />
    <HomeAbout onCursorHover={onCursorHover} />
  </Layout>
}
