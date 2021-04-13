import React from "react";
import Layout from "../components/Layout";

// contexts
import {useGlobalStateContext, useGlobalDispatchContext} from "../context/globalContext"
//components

import HomeBanner from "../components/homepage/HomeBanner"

export default function Home() {

  const {cursorStyles} = useGlobalStateContext();
  const dispatch = useGlobalDispatchContext();

  const onCursorHover = (targetCursorType) => {
    const cursorType = (cursorStyles.includes(targetCursorType) && targetCursorType) || false;

    dispatch({type: "CURSOR_TYPE", cursorType: cursorType})
  }

  return <Layout>
    <HomeBanner onCursorHover={onCursorHover} />
  </Layout>
}
