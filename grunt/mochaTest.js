module.exports = {
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
};