module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			"babel-preset-expo",
			["@babel/preset-env", { targets: { node: "current" } }],
			"@babel/preset-typescript",
		],
		plugins: [
			"nativewind/babel",
			[
				"module:react-native-dotenv",
				{
					envName: "APP_ENV",
					moduleName: "@env",
					path: ".env",
				},
			],
		],
	};
};
