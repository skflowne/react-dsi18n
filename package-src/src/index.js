import React, { Fragment, createContext, useContext, useState } from "react"

export const Dsi18nContext = createContext()

export const Dsi18nProvider = props => {
    const { locale, fallback, translations, children } = props

    const [currentLocale, setCurrentLocale] = useState(locale)

    console.log(
        "Dsi18n initialized with translations",
        Object.keys(translations).join(",")
    )

    return (
        <Dsi18nContext.Provider
            value={{
                currentLocale,
                setCurrentLocale,
                fallback,
                translations
            }}
        >
            {children}
        </Dsi18nContext.Provider>
    )
}

Dsi18nProvider.defaultProps = {
    locale: "en",
    fallback: "en",
    translations: {}
}

export default Dsi18nProvider

const getTranslation = (key, translations) => {
    const path = key.split(".")
    return path.reduce((t, key) => {
        return t[key]
    }, translations)
}

const translate = ctx => (namespace, locale, translations) => (
    key,
    options = {}
) => {
    if (options.newLine === undefined) {
        options.newLine = <br></br>
    }
    const namespacedKey = namespace ? `${namespace}.${key}` : key
    try {
        let translation = getTranslation(key, translations)

        if (!translation) {
            translations = getTranslationsForLocale(
                ctx.fallback,
                ctx.translations
            )

            translation = getTranslation(namespacedKey, translations)
            if (translation) {
                console.warn(
                    "Missing translation for key",
                    namespacedKey,
                    "falling back to",
                    ctx.fallback
                )
            } else {
                throw new Error("Missing translation")
            }
        }

        if (options && options.locals) {
            translation = Object.keys(options.locals).reduce((t, localName) => {
                const regExp = new RegExp(`{{${localName}}}`, "gm")
                t = t.replace(regExp, options.locals[localName])
                return t
            }, translation)
        }

        if (options && options.newLine) {
            const lines = translation.split("\n")
            translation = (
                <Fragment>
                    {lines.map(line => (
                        <Fragment key={line}>
                            {line}
                            {options.newLine}
                        </Fragment>
                    ))}
                </Fragment>
            )
        }
        return translation
    } catch (e) {
        console.error(
            "Dsi18n: missing translation for key",
            namespacedKey,
            "with locale",
            locale
        )
        if (
            !e.message.includes("Missing translation") &&
            !e.message.includes("property")
        ) {
            console.error("Previous error was caused by", e)
        }

        return namespacedKey
    }
}

export const useTranslation = namespace => {
    const ctx = useContext(Dsi18nContext)
    const { currentLocale, fallback } = ctx
    let translations = getTranslationsForLocale(
        currentLocale,
        ctx.translations,
        fallback
    )
    let finalLocale = currentLocale

    if (namespace && translations[namespace]) {
        translations = translations[namespace]
    } else if (namespace) {
        translations = getTranslationsForLocale(fallback, ctx.translations)
        if (translations[namespace]) {
            console.warn(
                "Dsi18n: missing namespace",
                namespace,
                "for locale",
                currentLocale,
                "falling back to locale",
                fallback
            )
            finalLocale = fallback
            translations = translations[namespace]
        } else {
            console.error(
                "Dsi18n: missing namespace in both locale",
                currentLocale,
                "and fallback locale",
                fallback
            )
            translations = {}
        }
    }

    return {
        t: translate(ctx)(namespace, finalLocale, translations),
        i18nContext: ctx
    }
}

const getTranslationsForLocale = (locale, translations, fallback) => {
    const language = locale.split("-")[0]

    if (translations[locale]) {
        return translations[locale]
    } else if (language && translations[language]) {
        console.warn(
            "Dsi18n: missing translations for locale",
            locale,
            "Falling back on language",
            language
        )
        return translations[language]
    } else if (translations[fallback]) {
        console.warn(
            "Dsi18n: missing translations for locale",
            locale,
            "Falling back to",
            fallback
        )
        return translations[fallback]
    } else {
        console.error(
            "Dsi18n: missing translations for locale",
            locale,
            "no fallback available for fallback",
            fallback
        )
        return {}
    }
}
