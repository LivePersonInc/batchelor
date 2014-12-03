module.exports = function(grunt) {

//    grunt.loadNpmTasks('grunt-mocha-test');
//    grunt.loadNpmTasks('grunt-contrib-clean');
//    grunt.loadNpmTasks('grunt-contrib-copy');
//    grunt.loadNpmTasks('grunt-blanket');

    // Displays the elapsed execution time of grunt tasks
    require("time-grunt")(grunt);

    // Load NPM Tasks
    require("load-grunt-tasks")(grunt, { pattern: ["grunt-*"] });

    grunt.initConfig({
        "clean": {
            "coverage": {
                "src": ['coverage/']
            }
        },
        "copy": {
            batchelor: {
                files:[
                    {src: "./batchelor.js", dest: "./batchelor/batchelor.js"},
                    {src: "./config/*.json", dest:"coverage/"}
                ],
                process:function (content, srcpath) {
                    return content;
                }
            },
            coverage: {
                src: ['./unit-tests/*.js'],
                dest: 'coverage/'
            }
        },
        "blanket": {
            commons: {
                src: ['./commons'],
                dest: 'coverage/commons'
            },
            utils: {
                src: ['./utils'],
                dest: 'coverage/utils'
            },
            lib: {
                src: ['./lib'],
                dest: 'coverage/lib'
            },
            batchelor: {
                src: ['./batchelor'],
                dest: 'coverage'
            }
        },
        "mochaTest": {
            test: {
                options: {
                    reporter: 'spec',
                    captureFile: "./coverage/console-result.txt", // Optionally capture the reporter output to a file
                    quiet: false, // Optionally suppress output to standard out (defaults to false)
                    clearRequireCache: false//, // Optionally clear the require cache before running tests (defaults to false)

                // Require blanket wrapper here to instrument other required
                // files on the fly.
                //
                // NB. We cannot require blanket directly as it
                // detects that we are not running mocha cli and loads differently.
                //
                // NNB. As mocha is 'clever' enough to only run the tests once for
                // each file the following coverage task does not actually run any
                // tests which is why the coverage instrumentation has to be done here
                //"require": "./coverage/blanket"

            },
                src: ['./coverage/unit-tests/unit-tests-*.js']
            },
            "html-cov": {
                options: {
                    reporter: 'html-cov',
                    quiet: true,
                    captureFile: './coverage/coverage.html'
                },
                src: ['./coverage/unit-tests/unit-tests-*.js']
            },
            // The travis-cov reporter will fail the tests if the
            // coverage falls below the threshold configured in package.json
            "travis-cov": {
                "options": {
                    "reporter": "travis-cov",
                    "quiet": false,
                    "captureFile": "./coverage/results.txt"
                },
                src: ['./coverage/unit-tests/unit-tests-*.js']
            }
        },
        // Configure the string-replace task
        "string-replace": {
            "coverage": {
                "files": {
                    "./coverage/coverage.json": "./coverage/results.txt"
                },
                "options": {
                    "replacements": [{
                        "pattern": "Coverage: ",
                        "replacement": ""
                    }, {
                        "pattern": "\nCoverage succeeded.",
                        "replacement": ""
                    }, {
                        "pattern": /(\d{1,})%/,
                        "replacement": "{\n\"coverage\": \"$1\"\n}"
                    }, {
                        "pattern": "\nCode coverage below threshold: ",
                        "replacement": ""
                    }]
                }
            }
        }
    });
///Code coverage below threshold: 92 < 98
    grunt.registerTask('default', ['clean', 'copy:batchelor', 'blanket', 'copy:coverage', 'mochaTest', 'string-replace']);
    grunt.registerTask('replace', ['string-replace']);
};