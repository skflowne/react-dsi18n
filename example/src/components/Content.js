import React from "react"
import { useTranslation } from "react-dsi18n"
import LanguageSwitcher from "./LanguageSwitcher"

const Content = props => {
    const { t, i18nContext } = useTranslation("App")

    return (
        <div className="container">
            <LanguageSwitcher i18nContext={i18nContext} />
            <h1>
                {t("title", {
                    locals: { "package-name": "react-dsi18n" }
                })}
            </h1>
            <p className="text">
                {t("description", {
                    locals: {
                        locale: i18nContext.currentLocale,
                        fallback: i18nContext.fallback
                    }
                })}
            </p>
            <ul className="text">
                <li key="interpolation">{t("features.interpolation")}</li>
                <li key="newline">{t("features.replaceNewLine")}</li>
                <li key="autoLocale">{t("features.automaticLocale")}</li>
            </ul>
        </div>
    )
}

export default Content
