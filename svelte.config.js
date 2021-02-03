/**
 * @type {import("svelte-preprocess")} sveltePreprocess
 */
const sveltePreprocess = require('svelte-preprocess');
module.exports = {
  // @ts-ignore
  preprocess: sveltePreprocess({
    typescript: true,
    // disable preprocessors not in use
    babel: false,
    coffeescript: false,
    globalStyle: false,
    less: false,
    postcss: {
      plugins: [require("autoprefixer")({
        overrideBrowserslist: "last 2 versions",
      })],
    },
    pug: false,
    // @ts-ignore
    replace: false,
    sass: false,
    scss: {
      prependData: "@import 'src/global.scss';"
    },
    stylus: false,
    defaults: {
      script: "ts",
      style: "scss"
    }
  }),

};
