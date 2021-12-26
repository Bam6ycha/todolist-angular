class Lodash {
  chunk(array, chunksCount) {
    if (!array && chunksCount) {
      return;
    }

    let index = 0;
    const result = [];

    while (index < this.length(array)) {
      if (!array[index]) {
        break;
      }
      this.push(result, this.slice(array, index, (index += chunksCount)));
    }

    return result;
  }

  compact(array) {
    if (array) {
      const result = [];

      for (let i = 0; i < this.length(array); i++) {
        if (array[i]) {
          this.push(result, array[i]);
        }
      }

      return result;
    }
  }

  drop(array, dropCount = 1) {
    if (dropCount > this.length(array)) {
      return [];
    }

    if (array) {
      const result = [];
      for (let i = dropCount; i < this.length(array); i++) {
        this.push(result, array[i]);
      }

      return result;
    }
  }

  dropWhile(array, predicate) {
    if (!array) {
      return [];
    }

    let result = [];

    for (let i = 0; i < this.length(array); i++) {
      if (!predicate(array[i], i, array)) {
        this.push(result, ...this.slice(array, i, i + 1));
      }
    }

    return result;
  }

  filter(collection, predicate) {
    if (!collection) {
      return;
    }

    if (!Array.isArray(collection) && typeof collection === "object") {
      collection = this.filter([collection], predicate);
    }

    let result = [];

    if (typeof predicate === "function") {
      for (let i = 0; i < this.length(collection); i++) {
        if (predicate(collection[i], i, collection)) {
          this.push(result, collection[i]);
        }
      }
    } else {
      for (let i = 0; i < this.length(collection); i++) {
        if (Array.isArray(predicate)) {
          for (let j = 0; j < this.length(predicate); j++) {
            if (predicate[j] === collection[i]) {
              this.push(result, collection[i]);
            }
          }
        }

        if (
          typeof predicate === "object" &&
          typeof collection[i] === "object"
        ) {
          for (let key in collection[i]) {
            for (let property in predicate) {
              if (collection[i][key] === predicate[property]) {
                this.push(result, collection[i]);
              }
            }
          }
        }

        if (Array.isArray(predicate) && typeof collection[i] === "object") {
          for (let key in collection[i]) {
            for (let x = 0; x < this.length(predicate); x++) {
              if (predicate[x] === collection[i][key]) {
                this.push(result, collection[i]);
              }
            }
          }
        }

        if (typeof predicate !== "object" && predicate != null) {
          result = this.filter(collection, [predicate]);
        }
      }
    }

    if (typeof result[0] === "string" || typeof result[0] === "number") {
      return result;
    } else {
      return [...new Set(result)];
    }
  }

  find(collection, predicate, indexSearchFrom = 0) {
    if (!collection) {
      return undefined;
    }

    let result;

    for (let i = indexSearchFrom; i < this.length(collection); i++) {
      if (this.filter(collection, predicate)[0] === collection[i]) {
        result = i;
        return result;
      }
    }

    return result;
  }

  includes(collection, value, indexSearchFrom) {
    if (typeof collection === "string" && typeof value === "string") {
      let firstEntry;
      let lastEnty;
      for (let i = 0; i < collection.length; i++) {
        if (collection[i].toLocaleLowerCase() === value[0]) {
          firstEntry = i;
        }

        if (collection[i].toLocaleLowerCase() === value[value.length - 1]) {
          lastEnty = i;
        }
      }
      return collection.slice(firstEntry, lastEnty + 1) === value;
    }

    if (this.find(collection, value, indexSearchFrom) != null) {
      return true;
    }

    return false;
  }

  isMergebleObject(item) {
    return this.isObject(item) && !Array.isArray(item);
  }

  isObject(item) {
    return item !== null && typeof item === "object";
  }

  length(array) {
    if (!array) {
      return;
    }

    let count = 0;

    while (array[count] !== undefined) {
      count++;
    }

    return count;
  }

  map(array, callback) {
    if (!array) {
      return [];
    }

    const result = [];

    for (let i = 0; i < this.length(array); i++) {
      this.push(result, callback(array[i], i, array));
    }

    return result;
  }

  merge(object, ...sources) {
    if (!this.length(sources)) {
      return object;
    }

    const source = this.shift(sources);

    if (source == undefined) {
      return object;
    }

    if (this.isMergebleObject(object) && this.isMergebleObject(source)) {
      const sourceKeys = Object.keys(source);
      const objectKeys = Object.keys(object);
      const keys = [...new Set([...objectKeys, ...sourceKeys])];

      this.map(keys, (key) => {
        if (!object[key]) {
          object[key] = source[key];
        }

        if (Array.isArray(object[key]) && Array.isArray(source[key])) {
          for (let i = 0; i < object[key].length; i++) {
            object[key][i] = { ...object[key][i], ...source[key][i] };
          }
        }
      });
    }

    return object;
  }

  omit(object, path) {
    if (typeof object !== "object" && object == null) {
      return {};
    }

    const result = Object.assign({}, object);

    for (let key in object) {
      for (let item of path) {
        if (item === key) {
          delete result[key];
        }
      }
    }

    return result;
  }

  omitBy(object, predicate) {
    if (typeof object !== "object" && object == null) {
      return {};
    }

    const result = Object.assign({}, object);

    for (let key in result) {
      if (predicate(key, object[key])) {
        delete result[key];
      }
    }

    return result;
  }

  push(array, item) {
    if (!array) {
      return;
    }

    array[this.length(array)] = item;

    return array;
  }

  pick(object, path) {
    if (typeof object !== "object" && object == null) {
      return {};
    }

    const result = {};
    const objectKeys = Object.keys(object);

    for (let i = 0; i < this.length(objectKeys); i++) {
      for (let j = 0; j < this.length(path); j++) {
        if (objectKeys[i] === path[j]) {
          result[objectKeys[i]] = object[objectKeys[i]];
        }
      }
    }

    return result;
  }

  pickBy(object, predicate) {
    if (typeof object !== "object" && object == null) {
      return {};
    }

    const result = {};
    const objectKeys = Object.keys(object);

    for (let i = 0; i < this.length(objectKeys); i++) {
      if (predicate(objectKeys[i], object[objectKeys[i]])) {
        result[objectKeys[i]] = object[objectKeys[i]];
      }
    }

    return result;
  }

  slice(array, start, end) {
    if (!array) {
      return [];
    }

    if (start < 0 && start > this.length(array)) {
      return array;
    }

    if (!end || end > this.length(array)) {
      end = this.length(array);
    }

    const result = [];

    for (let i = start; i < end; i++) {
      this.push(result, array[i]);
    }

    return result;
  }

  shift(array) {
    if (this.length(array) === 0) {
      return;
    }

    const result = array[0];

    for (let i = 1; i <= this.length(array); ++i) {
      array[i - 1] = array[i];
    }

    array.length--;

    return result;
  }

  take(array, elementCount = 1) {
    if (elementCount > this.length(array)) {
      return array;
    }

    if (array) {
      const result = [];
      for (let i = 0; i < elementCount; i++) {
        this.push(result, array[i]);
      }

      return result;
    }
  }

  toPairs(object) {
    if (typeof object !== "object" || object == null) {
      return {};
    }

    if (object instanceof Set || object instanceof Map) {
      const iterator = object.entries();
      const result = [];
      let done = false;

      while (!done) {
        const nextObj = iterator.next();
        const { value } = nextObj;

        done = nextObj.done;

        if (value != null) {
          this.push(result, value);
        }
      }

      return result;
    }

    return Object.entries(object);
  }

  zip(...arrays) {
    if (!arrays) {
      return [];
    }

    let maxLength = 0;

    this.map(arrays, (item) => {
      if (Array.isArray(item)) {
        maxLength = Math.max(this.length(item), maxLength);
      }
    });

    const result = [];

    for (let i = 0; i < maxLength; i++) {
      const zipArray = this.map(arrays, (item) => item[i]);
      this.push(result, zipArray);
    }

    return result;
  }
}
