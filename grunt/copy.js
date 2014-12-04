module.exports = {
    batchelor: {
        files: [
            {src: "./batchelor.js", dest: "./batchelor/batchelor.js"},
            {src: "./config/*.json", dest: "coverage/"}
        ],
        process: function (content, srcpath) {
            return content;
        }
    },
    coverage: {
        src: ['./unit-tests/*.js'],
        dest: 'coverage/'
    }
};