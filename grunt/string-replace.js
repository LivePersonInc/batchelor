module.exports = {
    "coverage": {
        "files": {
            "./coverage/coverage.json": "./coverage/results.txt"
        },
        "options": {
            "replacements": [
                {
                    "pattern": "Coverage: ",
                    "replacement": ""
                },
                {
                    "pattern": "\nCoverage succeeded.",
                    "replacement": ""
                },
                {
                    "pattern": /(\d{1,})%/,
                    "replacement": "{\n\"coverage\": \"$1\"\n}"
                },
                {
                    "pattern": "\nCode coverage below threshold: ",
                    "replacement": ""
                }
            ]
        }
    }
};