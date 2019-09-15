import babel from "rollup-plugin-babel"
import { terser } from "rollup-plugin-terser"

export default {
    input: "src/index.js",
    plugins: [babel(), terser()],
    output: {
        format: "cjs",
        file: "index.js"
    },
    external: ["react"]
}
