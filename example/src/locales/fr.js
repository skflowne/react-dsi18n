export default {
    App: {
        title: "{{package-name}}: Librairie i18n ultra simple pour React",
        description: `Ce composant est traduit pour la locale "{{locale}}" avec react-dsi18n.
        Si aucune traduction n'était trouvée pour une clé, la traduction basculerait sur la locale "{{fallback}}"
        Ce texte respecte les retours à la ligne et le titre au-dessus est interpolé avec le nom du package.`,
        features: {
            interpolation: "Support des interpolations avec {{variable}}",
            replaceNewLine:
                "Vous pouvez remplacer les retour à la ligne par n'importe quel composant React ou balise JSX, comme un simple <br/>",
            automaticLocale:
                'Vous pouvez passer une locale au format "fr-FR" directement en ayant des traductions seulement pour la locale au format "fr"'
        }
    }
}
