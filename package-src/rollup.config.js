import babel from "rollup-plugin-babel"
import { terser } from "rollup-plugin-terser"
import { eslint } from "rollup-plugin-eslint"

export default {
    input: "src/index.js",
    plugins: [eslint(), babel(), terser()],
    output: {
        format: "cjs",
        file: "index.js"
    },
    external: ["react", "react-dom"]
}
