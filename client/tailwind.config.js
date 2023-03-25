/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      textColor: {
        
      },
      backgroundColor: {
        
      },
      colors: {
        tprimary: 'var(--color-text-primary)',
        tmuted: 'var(--color-text-muted)',
        tlink: 'var(--color-text-link)',

        fill: 'var(--color-fill)', /*instead of div colour*/ 
        base: 'var(--color-fill-base)',
        background: 'var(--color-fill-bg)',
        
        baccent: 'var(--color-button-accent)',
        baccenthover: 'var(--color-button-accent-hover)',
        bmuted: 'var(--color-button-muted)',

        'divcol': '#1A1A1B',
        'gr': '#272729',
        'pur': '#3F0071',
        'hovpur': '#2a024a',
        'pinks': '#FB2576',
      },
      fontFamily: {
        reenie: ["Reenie Beanie", "sans-serif"],
      },
      animation: {
        add: "add 1s ease-in-out 1"
      },
      keyframes:{
        add: {
          "0%" : {
            transform: "scale(0.5)"
          },
          "50%" : {
            transform: "scale(1)"
          },
          "100%" : {
            transform: "scale(0.5)"
          },
        }
      },
    },
  },
  plugins: [],
}
