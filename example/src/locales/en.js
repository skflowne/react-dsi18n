export default {
    App: {
        title: "{{package-name}}: Dead simple i18n for React",
        description: `This component is translated using react-dsi18n.
        This text respects the newline characters and the title above is interpolated with the package name.`,
        features: {
            interpolation: "Interpolation with {{variable}}",
            replaceNewLine:
                "You can tell the the translator to replace newline chars with any JSX component, such as a <br/>",
            automaticLocale:
                'You can directly pass a locale such as "en-EN" even if you only have translations for the locale "en"'
        }
    }
}
