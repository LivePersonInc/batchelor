module.exports = {
    README: {
        files: [
            {
                data: "./coverage/coverage.json",
                template: "./README.mustache",
                dest: "./README.md"
            }
        ]
    }
};