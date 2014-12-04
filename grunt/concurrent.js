module.exports = {
    first:  ['jshint', 'clean'],
    second: ['copy:batchelor', 'blanket', 'copy:coverage'],
    third:  ['mochaTest'],
    fourth: ['string-replace'],
    fifth:  ['mustache_render:README']
};