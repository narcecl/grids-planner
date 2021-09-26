var envJSON = require('./env.variables.json');

module.exports = {
	runtimeCompiler: true,
	publicPath: process.env.NODE_ENV === 'production' ? envJSON.production.PATH : envJSON.development.PATH,
	css: {
		loaderOptions: {
			sass: {
				prependData: `
					@import "./src/assets/scss/variables.scss";
					@import "./src/assets/scss/mixins.scss";
				`
			}
		}
	},
	chainWebpack: (config) => {
		config.plugin('html').tap(args => {
			args[0].title = 'Grids Planner | Instagram Feed Planner';
			return args;
		});
	},
}