module.exports = {
    batchelor: {
        files: [
            {src: "./config/*.json", dest: "coverage/"}
            , {src: "./batchelor.js", dest: "coverage/"}
        ],
        process: function (content, srcpath) {
            return content;
        }
    },
    coverage: {
        files: [
            {
                expand: true,
                flatten: true,
                filter: 'isFile',
                src: ["./unit-tests/*.js"], dest: "./coverage/unit-tests/"
            }
        ]
    }
};
