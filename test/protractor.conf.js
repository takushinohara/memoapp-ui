exports.config = {
	seleniumAddress: 'http://localhost:4444/wd/hub',
	capabilities: {
		browserName: 'chrome'
	},
	specs: ['e2e/**/*.js'],
	baseUrl: 'http://localhost:9000/',
	framework: 'jasmine',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 50000
	}
};
