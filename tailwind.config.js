/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#3B3B3B",
				secondary: "#252525",
				faded: "#555555",
			},
		},
	},
	plugins: [],
};
