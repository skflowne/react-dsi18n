import React from "react"
import "./App.css"

import Dsi18nProvider from "react-dsi18n"
import translations from "./locales"
import Content from "./components/Content"

const App = props => {
    return (
        <Dsi18nProvider
            translations={translations}
            locale={navigator.language}
            fallback="en"
        >
            <Content />
        </Dsi18nProvider>
    )
}

export default App
