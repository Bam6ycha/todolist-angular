function reverseSearch(data, prefix, pivot, result) {
    for (let i = pivot; i >= 0; i--) {
        if (data[i].toLowerCase().startsWith(prefix.toLowerCase())) {
            result.unshift(data[i]);
        } else {
            break;
        }
    }
}

function directSearch(data, prefix, pivot, result) {
    for (let j = pivot + 1; j < data.length; j++) {
        if (data[j].toLowerCase().startsWith(prefix.toLowerCase())) {
            result.push(data[j]);
        } else {
            break;
        }
    }
}

function isContainsPrefix(data, pivot, prefix) {
    if (data[pivot].toLowerCase().startsWith(prefix.toLowerCase())) {
        return true;
    }
    return false;
}

module.exports.createAutoComplete = function (data) {
    if (!data) {
        return [];
    }
    const dictionary = data;
    return function (prefix) {
        let start = 0;
        let end = dictionary.length - 1;
        let isFound = false;
        let middle;
        const result = [];
        if (!prefix) {
            return result;
        }
        while (isFound === false && start <= end) {
            middle = Math.floor((start + end) / 2);
            if (isContainsPrefix(dictionary, middle, prefix)) {
                reverseSearch(dictionary, prefix, middle, result);
                directSearch(dictionary, prefix, middle, result);
                isFound = true;
            }

            if (
                dictionary[middle].slice(0, prefix.length).toLowerCase() <
                prefix.toLowerCase()
            ) {
                start = middle + 1;
            } else {
                end = middle - 1;
            }
        }
        return result;
    };
};
