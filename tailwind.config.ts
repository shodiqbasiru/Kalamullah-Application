import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import ScrollBar from "tailwind-scrollbar";

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: colors.yellow,
      },
      fontFamily: {
        lpmq: ["LPMQ Isep Misbah", "sans-serif"],
        quicksand: ['Quicksand', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        oleo: ['Oleo Script', 'cursive'],
        ibmarabic: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [ScrollBar],

};
