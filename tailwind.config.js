const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			borderRadius: {
				custom: '2.5rem',
			},
			colors: {
				principal: {
					0: '#0E1124',
					1: '#131730',
					2: '#171D3D',
					3: '#1F2755',
					4: '#1C2140',
					5: '#1F2446',
					6: '#323753',
				},
				verde: '#1AB73C',
				vermelho: '#E83F22',
				laranja: '#E89522',
			},

			fontFamily: {
				sans: ['Plus Jakarta Sans', 'sans-serif'],
			},
		},
	},
	plugins: [],
});
