import React from "react"
import qs from "query-string"

const LanguageSwitcher = props => {
    const { i18nContext } = props

    const setUserLocale = locale => e => {
        // set locale in react-dsi18n
        i18nContext.setCurrentLocale(locale)

        // also set a url param that will have priority over navigator.language
        /*const url =
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname
        const search = url.replace(window.location, "")
        const currentParams = qs.parse(search)
        const newParams = {
            ...currentParams,
            lang: locale
        }*/
        //const newUrl = url + qs.stringify(newParams)
        //window.location.replace(newUrl)
    }

    return (
        <div>
            {Object.keys(i18nContext.translations).map(locale => {
                return (
                    <button key={locale} onClick={setUserLocale(locale)}>
                        {locale.toUpperCase()}
                    </button>
                )
            })}
        </div>
    )
}

export default LanguageSwitcher
