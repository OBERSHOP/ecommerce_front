import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import nesting from 'postcss-nesting'
import customProperties from 'postcss-custom-properties'

const config = {
  plugins: [
    tailwindcss,
    nesting,             // para suportar CSS aninhado (@apply em aninhamento)
    customProperties,    // para :root --tokens
    autoprefixer,
  ],
}

export default config
