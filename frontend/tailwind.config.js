/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                ["Verde"]: "#2BDE73",
                ["Crimson"]: "#b31e1e",
                ["Gray1"]: "#262626",
                ["Gray2"]: "#525252",
                ["Gray3"]: "#787878",
            },
            fontFamily: {
                ["Circular-Black"]: "Circular-Black",
                ["Circular-Book"]: "Circular-Book",
                ["Circular-Bold"]: "Circular-Bold",
                ["Circular-Medium"]: "Circular-Medium",
                ["Circular-Light"]: "Circular-Light",
            },
        },
    },
    plugins: [],
};
