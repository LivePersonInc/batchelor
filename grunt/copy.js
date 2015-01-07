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
        src: ['./unit-tests/*.js'],
        dest: 'coverage/'
    }
};