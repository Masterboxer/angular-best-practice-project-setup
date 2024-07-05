/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        "primary-background-color": "var(--primary-background-color)",
        "primary-text-color": "var(--primary-text-color)",
        "primary-border-color": "var(--primary-border-color)",
        "common-warning-color": "var(--common-warning-color)",

        "secondary-background-color": "var(--secondary-background-color)",
        "secondary-text-color": "var(--secondary-text-color)",
        "secondary-border-color": "var(--secondary-border-color)"
      }
    }
  }
};
