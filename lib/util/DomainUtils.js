/**
 * Created by itaic on 1/6/16.
 */
var IANADomains = {//Reference: http://en.wikipedia.org/wiki/List_of_Internet_top-level_domains
    customTopLevelDomain: { "aero": "aero", "asia": "asia", "bike": "bike", "biz": "biz", "camera": "camera", "cat": "cat", "clothing": "clothing", "coop": "coop", "equipment": "equipment", "estate": "estate", "eus": "eus", "gallery": "gallery", "graphics": "graphics", "guru": "guru", "info": "info", "int": "int", "holdings": "holdings", "jobs": "jobs", "lighting": "lighting", "mobi": "mobi", "museum": "museum", "name": "name", "photography": "photography", "plumbing": "plumbing", "post": "post", "pro": "pro", "singles": "singles", "tel": "tel", "travel": "travel", "ventures": "ventures", "xxx": "xxx" },
    topLevelDomain: { "ac": "ac", "co": "co", "com": "com", "edu": "edu", "gov": "gov", "mil": "mil", "net": "net", "org": "org" },
    countryTopLevelDomain: {"ac": "ac", "ad": "ad", "ae": "ae", "af": "af", "ag": "ag", "ai": "ai", "al": "al", "am": "am", "an": "an", "ao": "ao", "aq": "aq", "ar": "ar", "as": "as", "at": "at", "au": "au", "aw": "aw", "ax": "ax", "az": "az", "ba": "ba", "bb": "bb", "bd": "bd", "be": "be", "bf": "bf", "bg": "bg", "bh": "bh", "bi": "bi", "bj": "bj", "bm": "bm", "bn": "bn", "bo": "bo", "bq": "bq", "br": "br", "bs": "bs", "bt": "bt", "bv": "bv", "bw": "bw", "by": "by", "bz": "bz", "bzh": "bzh", "ca": "ca", "cc": "cc", "cd": "cd", "cf": "cf", "cg": "cg", "ch": "ch", "ci": "ci", "ck": "ck", "cl": "cl", "cm": "cm", "cn": "cn", "co": "co", "cr": "cr", "cs": "cs", "cu": "cu", "cv": "cv", "cw": "cw", "cx": "cx", "cy": "cy", "cz": "cz", "dd": "dd", "de": "de", "dj": "dj", "dk": "dk", "dm": "dm", "do": "do", "dz": "dz", "ec": "ec", "ee": "ee", "eg": "eg", "eh": "eh", "er": "er", "es": "es", "et": "et", "eu": "eu", "fi": "fi", "fj": "fj", "fk": "fk", "fm": "fm", "fo": "fo", "fr": "fr", "ga": "ga", "gb": "gb", "gd": "gd", "ge": "ge", "gf": "gf", "gg": "gg", "gh": "gh", "gi": "gi", "gl": "gl", "gm": "gm", "gn": "gn", "gp": "gp", "gq": "gq", "gr": "gr", "gs": "gs", "gt": "gt", "gu": "gu", "gw": "gw", "gy": "gy", "hk": "hk", "hm": "hm", "hn": "hn", "hr": "hr", "ht": "ht", "hu": "hu", "id": "id", "ie": "ie", "il": "il", "im": "im", "in": "in", "io": "io", "iq": "iq", "ir": "ir", "is": "is", "it": "it", "je": "je", "jm": "jm", "jo": "jo", "jp": "jp", "ke": "ke", "kg": "kg", "kh": "kh", "ki": "ki", "km": "km", "kn": "kn", "kp": "kp", "kr": "kr", "krd:": "krd", "kw": "kw", "ky": "ky", "kz": "kz", "la": "la", "lb": "lb", "lc": "lc", "li": "li", "lk": "lk", "lr": "lr", "ls": "ls", "lt": "lt", "lu": "lu", "lv": "lv", "ly": "ly", "ma": "ma", "mc": "mc", "md": "md", "me": "me", "mg": "mg", "mh": "mh", "mk": "mk", "ml": "ml", "mm": "mm", "mn": "mn", "mo": "mo", "mp": "mp", "mq": "mq", "mr": "mr", "ms": "ms", "mt": "mt", "mu": "mu", "mv": "mv", "mw": "mw", "mx": "mx", "my": "my", "mz": "mz", "na": "na", "nc": "nc", "ne": "ne", "nf": "nf", "ng": "ng", "ni": "ni", "nl": "nl", "no": "no", "np": "np", "nr": "nr", "nu": "nu", "nz": "nz", "om": "om", "pa": "pa", "pe": "pe", "pf": "pf", "pg": "pg", "ph": "ph", "pk": "pk", "pl": "pl", "pm": "pm", "pn": "pn", "pr": "pr", "ps": "ps", "pt": "pt", "pw": "pw", "py": "py", "qa": "qa", "re": "re", "ro": "ro", "rs": "rs", "ru": "ru", "rw": "rw", "sa": "sa", "sb": "sb", "sc": "sc", "sd": "sd", "se": "se", "sg": "sg", "sh": "sh", "si": "si", "sj": "sj", "sk": "sk", "sl": "sl", "sm": "sm", "sn": "sn", "so": "so", "sr": "sr", "ss": "ss", "st": "st", "su": "su", "sv": "sv", "sx": "sx", "sy": "sy", "sz": "sz", "tc": "tc", "td": "td", "tf": "tf", "tg": "tg", "th": "th", "tj": "tj", "tk": "tk", "tl": "tl", "tm": "tm", "tn": "tn", "to": "to", "tp": "tp", "tr": "tr", "tt": "tt", "tv": "tv", "tw": "tw", "tz": "tz", "ua": "ua", "ug": "ug", "uk": "uk", "us": "us", "uy": "uy", "uz": "uz", "va": "va", "vc": "vc", "ve": "ve", "vg": "vg", "vi": "vi", "vn": "vn", "vu": "vu", "wf": "wf", "ws": "ws", "ye": "ye", "yt": "yt", "yu": "yu", "za": "za", "zm": "zm", "zr": "zr"}
};

/**
 * Extracts the top parent domain for a specific domain
 */
function getParentDomain(hostName) {
    hostName = '' + hostName;
    var lowestIndex = null,
        domainSearch = {
            top: null,
            country: null
        },
        parts,
        sliceIndex;

    hostName = getDomain(hostName);

    parts = hostName.split(".");
    if (parts.length < 3) {//Less than 3 parts means it's always what we want
        return hostName;
    } else {
        var len = parts.length - 1;
        for (var i = len; i > -1; i--) {
            _getIndexOfDomainPart(parts[i], domainSearch, i);
            if (domainSearch.country !== null && domainSearch.top !== null) {
                break;
            }
        }
    }

    if (domainSearch.top !== null || domainSearch.country !== null) {
        lowestIndex = domainSearch.top;
        if (lowestIndex === null ||
            ((domainSearch.country !== null) &&
                domainSearch.country < lowestIndex &&
                (lowestIndex - 1 === domainSearch.country)) //If the country isn't adjacent to the top level domain, it is NOT part of the parent domain
            ) {
            lowestIndex = domainSearch.country;
        }

        sliceIndex = lowestIndex > 0 ? lowestIndex - 1 : lowestIndex;
        return _rebuildHostName(parts.slice(sliceIndex));
    } else {//We've got nothing.....at least let's not fail the request
        return hostName;
    }
}

/**
 * Validates the domain has correct character set
 */
function isValidDomain(domain) {
    var domainOnly = getDomain(domain);
    var validDomainRegEx = new RegExp(/^[a-z]{1}[a-z+|\d+|_+|\-|.]+[a-z]{1}$/ig);
    return validDomainRegEx.test(domainOnly);
}

/**
 * Gets the domain including protocol
 * @param url
 * @param fullPath
 */
function getDomain(url, fullPath) {
    var domainRegEx = new RegExp(/((?:http|ftp|ws){1}s{0,1}?:\/\/){0,1}([^\/\?/:]+)(\/?)/ig),
        matches = domainRegEx.exec(url),
        domain = null;
    if (matches && matches.length >= 3 && matches[2] !== "") {
        domain = matches[2].toLowerCase(); // 0 - full match 1- HTTPS 2- domain
        if (fullPath) {
            domain = matches[1] + domain;
        }
    }
    return domain;
}

/**
 * Rebuilds the top level domain
 */
function _rebuildHostName(res) {
    return res.join(".");
}

/**
 * Checks if the party is a valid IANA top level domain
 */
function _getIndexOfDomainPart(str, domainSearch, index) {

    str = "" + str;

    if (domainSearch.top === null && (IANADomains.topLevelDomain[str] ||
        IANADomains.customTopLevelDomain[str])) {
        domainSearch.top = index;
    } else if (domainSearch.country === null && IANADomains.countryTopLevelDomain[str]) {
        domainSearch.country = index;
    }
}

module.exports = {
    getParentDomain: getParentDomain,
    getDomain: getDomain,
    isValidDomain: isValidDomain
};