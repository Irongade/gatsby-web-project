const React = require("react")
import {GlobalProvider} from "./src/context/globalContext"

exports.wrapRootElement = ({ element }) => {
  return (
      <GlobalProvider>
        {element}
      </GlobalProvider>
  )
}