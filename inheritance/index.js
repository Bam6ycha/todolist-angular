function Base() {
  Base.prototype.plus = function () {
    throw new Error("Method is`n implemented");
  };

  Base.prototype.minus = function () {
    throw new Error("Method is`n implemented");
  };

  Base.prototype.divide = function () {
    throw new Error("Method is`n implemented");
  };

  Base.prototype.multiply = function () {
    throw new Error("Method is`n implemented");
  };

  Base.prototype.mod = function () {
    throw new Error("Method is`n implemented");
  };

  Base.prototype.remove = function () {
    throw new Error("Method is`n implemented");
  };

  Base.prototype.sub = function () {
    throw new Error("Method is`n implemented");
  };

  Base.prototype.get = function () {
    throw new Error("Method is`n implemented");
  };
}

function StringBuilder(value) {
  this._value = value;
  this.operations = [];

  Base.apply(this, arguments);
  StringBuilder.prototype.__proto__ = Object.create(Base.prototype);

  StringBuilder.prototype.defer = function (operation) {
    this.operations.push(operation);
  };

  StringBuilder.prototype.divide = function (count) {
    if (!count) {
      return this._value;
    }

    function lazyDivide() {
      const newString = this._value.slice(
        0,
        Math.floor(this._value.length / count)
      );
      return (this._value = newString);
    }

    const bindDivide = lazyDivide.bind(this);

    this.defer(bindDivide);

    return this;
  };

  StringBuilder.prototype.minus = function (count) {
    if (count > this._value.length) {
      return (this._value = "");
    }

    function lazyMinus() {
      const newString = this._value.slice(0, this._value.length - count);
      return (this._value = newString);
    }

    const bindMinus = lazyMinus.bind(this);

    this.defer(bindMinus);

    return this;
  };

  StringBuilder.prototype.multiply = function (count) {
    if (!count) {
      return this._value;
    }

    if (count < 0) {
      throw new RangeError("repeat count must be non-negative");
    }

    if (count == Infinity) {
      throw new RangeError("repeat count must be less than infinity");
    }

    count = Math.floor(count);

    if (this._value.length === 0 || count === 0) {
      return "";
    }

    function lazyMultiply() {
      let newString = "";
      let repeatCount = 0;

      while (repeatCount < count) {
        newString += this._value;
        repeatCount++;
      }

      return (this._value = newString);
    }

    const bindMultiply = lazyMultiply.bind(this);

    this.defer(bindMultiply);

    return this;
  };

  StringBuilder.prototype.plus = function () {
    if (!arguments) {
      return this._value;
    }

    const parameters = Array.from(arguments);

    function lazyPlus() {
      return (this._value = parameters.reduce(function (sum, current) {
        return sum + current;
      }, this._value));
    }

    const bindPlus = lazyPlus.bind(this);

    this.defer(bindPlus);

    return this;
  };

  StringBuilder.prototype.remove = function (letter) {
    if (!letter) {
      return this._value;
    }

    function lazyRemove() {
      const letters = this._value.split("");
      const prefix = letter.split("");

      for (let i = 0; i < letters.length; i++) {
        for (let j = 0; j < prefix.length; j++) {
          if (prefix[j] === letters[i]) {
            letters[i] = "";
          }
        }
      }

      return (this._value = letters.join(""));
    }

    const bindRemoving = lazyRemove.bind(this);
    this.defer(bindRemoving);

    return this;
  };

  StringBuilder.prototype.sub = function (from, count) {
    if (!(from && count)) {
      return this._value;
    }

    function lazySub() {
      return (this._value = value.substr(from, count));
    }

    const bindLazy = lazySub.bind(this);

    this.defer(bindLazy);

    return this;
  };

  StringBuilder.prototype.get = function () {
    this.operations.forEach(function (item) {
      return item();
    });

    return this._value;
  };
}

class IntBuilder extends Base {
  static random(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  constructor(value) {
    super();
    this._value = value;
    this.operations = [];
  }

  defer(operation) {
    this.operations.push(operation);
  }

  divide(count) {
    this.defer(() => (this._value = this._value / count));

    return this;
  }

  minus(...rest) {
    if (!rest) {
      return this._value;
    }

    this.defer(() => {
      for (let i = 0; i < rest.length; i++) {
        this._value -= rest[i];
      }
      return this._value;
    });

    return this;
  }

  multiply(count) {
    this.defer(() => (this._value *= count));

    return this;
  }

  mod(number) {
    this.defer(() => (this._value = this._value % number));

    return this;
  }

  plus(...rest) {
    if (!rest) {
      return this._value;
    }

    this.defer(() => {
      return (this._value = rest.reduce(
        (sum, current) => sum + current,
        this._value
      ));
    });

    return this;
  }

  get() {
    const finalResult = this.operations.map((item) => item());
    return finalResult[finalResult.length - 1];
  }
}
