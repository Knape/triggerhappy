// Karma configuration
// Generated on Wed Mar 18 2015 11:41:18 GMT+0800 (CST)

const coverageReporters = [
  { type: 'text-summary' },
];
const reporters = [
  'progress',
  'coverage',
];

let browsers = ['Chrome', 'Firefox']; // for local builds
const sauceLaunchers = require('./saucelab_browsers');

if (process.env.TRAVIS) {
  console.log('On Travis sending coveralls');
  coverageReporters.push({type: 'lcov', subdir: 'coverage'});
  reporters.push('coveralls');
  browsers = Object.keys('Firefox');
} else {
  console.log('Not on Travis so not sending coveralls');
  coverageReporters.push({type: 'html', subdir: 'coverage'});
}
if (process.env.SAUCE_USERNAME) {
  console.log('Will use sauceLabs');
  reporters.push('saucelabs');
  browsers = Object.keys(sauceLaunchers);
} else {
  console.log('No sauceLabs');
}

module.exports = (config) => {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon', 'sinon-chai', 'fixture'],

    client: {
      captureConsole: true,
      config: {
        browserConsoleLogOptions: true
      },
      chai: {
        includeStack: true
      }
    },

    // list of files / patterns to load in the browser
    files: [{
      pattern: 'test/**/*.js',
      included: true,
      watched: !process.env.TRAVIS || process.env.NODE_ENV !== 'production'
    }, {
      pattern: 'test/*.html',
      included: true,
      watched: !process.env.TRAVIS || process.env.NODE_ENV !== 'production'
    }],

    // list of files to exclude
    exclude: [
      'test/coverage/**',
      'lib/**',
      'node_modules/'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'test/**/*.js': ['webpack', 'sourcemap'],
      'test/*.html': ['html2js'],
      'src/*.js': ['eslint'],
    },

    webpack: {
      devtool: 'inline-source-map',
      module: {
        rules: [{
          test: /\.jsx?$/,
          use: [{
            loader: 'babel-loader',
          }],
          include: /src|test|demo/,
        }, {
          test: /\.js$/,
          include: /src/,
          use: [{
            loader: 'istanbul-instrumenter-loader',
          }],
          enforce: 'post'
        }]
      },
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-coverage',
      'karma-spec-reporter',
      'karma-chai',
      'karma-sinon-chai',
      'karma-sinon',
      'karma-coveralls',
      'karma-eslint',
      'karma-sourcemap-loader',
      'karma-fixture',
      'karma-sauce-launcher',
      'karma-html2js-preprocessor',
      'karma-firefox-launcher',
      'karma-safari-launcher',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'istanbul-instrumenter-loader',
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters,

    coverageReporter: {
      dir: 'test',
      reporters: coverageReporters,
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers,

    customLaunchers: sauceLaunchers,

    sauceLabs: {
      testName: 'triggerhappy'
    },

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    browserNoActivityTimeout: 60000,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: process.env.TRAVIS || process.env.NODE_ENV === 'production',
  });
};
