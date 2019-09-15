import React from "react"
import "@testing-library/react/cleanup-after-each"
import {
    render,
    fireEvent,
    getByTestId,
    getByText
} from "@testing-library/react"
import Dsi18nProvider, { useTranslation } from "./index"

const Content1 = props => {
    const { t, i18nContext } = useTranslation("Test")

    return (
        <div>
            <span id="locale">{i18nContext.currentLocale}</span>
            <span id="fallback">{i18nContext.fallback}</span>
            <h1>{t("title")}</h1>
            <p>{t("paragraph", { locals: { var: "variable" } })}</p>
        </div>
    )
}

const Content2 = props => {
    const { t, i18nContext } = useTranslation("Test")

    return (
        <div>
            <span id="locale">{i18nContext.locale}</span>
            <span id="fallback">{i18nContext.fallback}</span>
            <h1>{t("title")}</h1>
            <p>{t("paragraph", { newLine: <span>end</span> })}</p>
        </div>
    )
}

const Content3 = props => {
    const { t, i18nContext } = useTranslation()

    return (
        <div>
            <h1>{t("Test.localeChange")}</h1>
            <span id="locale">{i18nContext.currentLocale}</span>
            <button
                data-testid="change-locale-es"
                onClick={e => i18nContext.setCurrentLocale("es")}
            >
                ES
            </button>
            <button
                data-testid="change-locale-fr"
                onClick={e => i18nContext.setCurrentLocale("fr")}
            >
                FR
            </button>
        </div>
    )
}

describe("Dsi18n", () => {
    let translations = {}
    let locale = "en"
    let fallback = "en"
    let content = Content1

    let setupContainer = () => {
        const { container, rerender } = render(
            <Dsi18nProvider
                translations={translations}
                locale={locale}
                fallback={fallback}
            >
                {React.createElement(content, null)}
            </Dsi18nProvider>
        )
        return { container, rerender }
    }

    it("when nothing is available, it renders the key", () => {
        const { container } = setupContainer()
        getByText(container, "Test.title")
        getByText(container, "Test.paragraph")
    })

    it("defaults to english and shows translation when it exists", () => {
        translations = {
            en: {
                Test: {
                    title: "Defaults to english"
                }
            }
        }
        const { container } = setupContainer()
        getByText(container, translations.en.Test.title)
    })

    it("fallsbacks on english locale by default and shows translation when it exists", () => {
        translations = {
            en: {
                Test: {
                    title: "Defaults to english"
                }
            }
        }
        locale = "fr"

        const { container } = setupContainer()
        getByText(container, translations.en.Test.title)
    })

    it("allows to explicitly set the locale and shows the correct translation", () => {
        translations = {
            en: {
                Test: {
                    title: "Defaults to english"
                }
            },
            fr: {
                Test: {
                    title: "Locale is set to fr"
                }
            }
        }
        locale = "fr"

        const { container } = setupContainer()
        getByText(container, translations.fr.Test.title)
        getByText(container, locale)
    })

    it("allows to explicitly set fallback locale and switches correctly when translation does not exist", () => {
        translations = {
            es: {
                Test: {
                    paragraph: "Donde esta la biblioteca"
                }
            },
            fr: {
                Test: {
                    title: "Locale is set to fr"
                }
            }
        }
        locale = "fr"
        fallback = "es"

        const { container } = setupContainer()
        getByText(container, translations.fr.Test.title)
        getByText(container, translations.es.Test.paragraph)
        getByText(container, locale)
    })

    it("by default adds line breaks as <br/> elements", () => {
        translations = {
            en: {
                Test: {
                    paragraph: `Here is a
                    multiline
                    paragraph`
                }
            }
        }

        locale = "en"
        fallback = "en"
        content = Content1

        const { container } = setupContainer()
        const brElements = container.querySelector("p").querySelectorAll("br")
        expect(brElements).toHaveLength(3)
    })

    it("allows to set the line break replacement and to opt-out", () => {
        translations = {
            en: {
                Test: {
                    paragraph: `Here is a
                    multiline
                    paragraph`
                }
            }
        }

        locale = "en"
        fallback = "en"
        content = Content2

        const { container } = setupContainer()
        const lbElements = container.querySelector("p").querySelectorAll("span")
        expect(lbElements).toHaveLength(3)
    })

    it("allows interpolation of variables without breaking new lines", () => {
        translations = {
            en: {
                Test: {
                    paragraph: `Here is a
                    multiline
                    paragraph of {{var}} lines`
                }
            }
        }

        locale = "en"
        fallback = "en"
        content = Content1

        const { container } = setupContainer()
        const lbElements = container.querySelector("p").querySelectorAll("br")
        expect(lbElements).toHaveLength(3)
        getByText(container, "variable", { exact: false })
    })

    it("allows to change the current locale", () => {
        translations = {
            es: {
                Test: {
                    localeChange: "Donde esta la biblioteca"
                }
            },
            fr: {
                Test: {
                    localeChange: "Locale is set to fr"
                }
            }
        }
        locale = "fr"
        fallback = "en"
        content = Content3

        const { container } = setupContainer()
        getByText(container, translations.fr.Test.localeChange)
        fireEvent.click(getByTestId(container, "change-locale-es"))
        getByText(container, translations.es.Test.localeChange)
    })
})
