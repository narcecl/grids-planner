var envJSON = require('./env.variables.json');

module.exports = {
	runtimeCompiler: true,
	publicPath: process.env.NODE_ENV === 'production' ? envJSON.production.PATH : envJSON.development.PATH,
	chainWebpack: (config) => {
		config.plugin('html').tap((args) => {
			args[0].title = 'Grids Planner';
			return args;
		});
	},
}