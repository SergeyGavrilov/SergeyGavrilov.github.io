webpackJsonp([4,5],{

/***/ "./node_modules/intl-format-cache/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports = __webpack_require__("./node_modules/intl-format-cache/lib/memoizer.js")['default'];
exports['default'] = exports;


/***/ }),

/***/ "./node_modules/intl-format-cache/lib/es5.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

// Function.prototype.bind implementation from Mozilla Developer Network:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Polyfill



var bind = Function.prototype.bind || function (oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
          return fToBind.apply(this instanceof fNOP
                 ? this
                 : oThis,
                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    if (this.prototype) {
      // native functions don't have a prototype
      fNOP.prototype = this.prototype;
    }
    fBound.prototype = new fNOP();

    return fBound;
};

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var hop = Object.prototype.hasOwnProperty;

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};

exports.bind = bind, exports.defineProperty = defineProperty, exports.objCreate = objCreate;

//# sourceMappingURL=es5.js.map

/***/ }),

/***/ "./node_modules/intl-format-cache/lib/memoizer.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jshint esnext: true */


var src$es5$$ = __webpack_require__("./node_modules/intl-format-cache/lib/es5.js");
exports["default"] = createFormatCache;

// -----------------------------------------------------------------------------

function createFormatCache(FormatConstructor) {
    var cache = src$es5$$.objCreate(null);

    return function () {
        var args    = Array.prototype.slice.call(arguments);
        var cacheId = getCacheId(args);
        var format  = cacheId && cache[cacheId];

        if (!format) {
            format = new (src$es5$$.bind.apply(FormatConstructor, [null].concat(args)))();

            if (cacheId) {
                cache[cacheId] = format;
            }
        }

        return format;
    };
}

// -- Utilities ----------------------------------------------------------------

function getCacheId(inputs) {
    // When JSON is not available in the runtime, we will not create a cache id.
    if (typeof JSON === 'undefined') { return; }

    var cacheId = [];

    var i, len, input;

    for (i = 0, len = inputs.length; i < len; i += 1) {
        input = inputs[i];

        if (input && typeof input === 'object') {
            cacheId.push(orderedProps(input));
        } else {
            cacheId.push(input);
        }
    }

    return JSON.stringify(cacheId);
}

function orderedProps(obj) {
    var props = [],
        keys  = [];

    var key, i, len, prop;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys.push(key);
        }
    }

    var orderedKeys = keys.sort();

    for (i = 0, len = orderedKeys.length; i < len; i += 1) {
        key  = orderedKeys[i];
        prop = {};

        prop[key] = obj[key];
        props[i]  = prop;
    }

    return props;
}

//# sourceMappingURL=memoizer.js.map

/***/ }),

/***/ "./node_modules/intl-messageformat-parser/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports = module.exports = __webpack_require__("./node_modules/intl-messageformat-parser/lib/parser.js")['default'];
exports['default'] = exports;


/***/ }),

/***/ "./node_modules/intl-messageformat-parser/lib/parser.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports["default"] = (function() {
  "use strict";

  /*
   * Generated by PEG.js 0.9.0.
   *
   * http://pegjs.org/
   */

  function peg$subclass(child, parent) {
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message  = message;
    this.expected = expected;
    this.found    = found;
    this.location = location;
    this.name     = "SyntaxError";

    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  function peg$parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        parser  = this,

        peg$FAILED = {},

        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction  = peg$parsestart,

        peg$c0 = function(elements) {
                return {
                    type    : 'messageFormatPattern',
                    elements: elements,
                    location: location()
                };
            },
        peg$c1 = function(text) {
                var string = '',
                    i, j, outerLen, inner, innerLen;

                for (i = 0, outerLen = text.length; i < outerLen; i += 1) {
                    inner = text[i];

                    for (j = 0, innerLen = inner.length; j < innerLen; j += 1) {
                        string += inner[j];
                    }
                }

                return string;
            },
        peg$c2 = function(messageText) {
                return {
                    type : 'messageTextElement',
                    value: messageText,
                    location: location()
                };
            },
        peg$c3 = /^[^ \t\n\r,.+={}#]/,
        peg$c4 = { type: "class", value: "[^ \\t\\n\\r,.+={}#]", description: "[^ \\t\\n\\r,.+={}#]" },
        peg$c5 = "{",
        peg$c6 = { type: "literal", value: "{", description: "\"{\"" },
        peg$c7 = ",",
        peg$c8 = { type: "literal", value: ",", description: "\",\"" },
        peg$c9 = "}",
        peg$c10 = { type: "literal", value: "}", description: "\"}\"" },
        peg$c11 = function(id, format) {
                return {
                    type  : 'argumentElement',
                    id    : id,
                    format: format && format[2],
                    location: location()
                };
            },
        peg$c12 = "number",
        peg$c13 = { type: "literal", value: "number", description: "\"number\"" },
        peg$c14 = "date",
        peg$c15 = { type: "literal", value: "date", description: "\"date\"" },
        peg$c16 = "time",
        peg$c17 = { type: "literal", value: "time", description: "\"time\"" },
        peg$c18 = function(type, style) {
                return {
                    type : type + 'Format',
                    style: style && style[2],
                    location: location()
                };
            },
        peg$c19 = "plural",
        peg$c20 = { type: "literal", value: "plural", description: "\"plural\"" },
        peg$c21 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: false,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options,
                    location: location()
                };
            },
        peg$c22 = "selectordinal",
        peg$c23 = { type: "literal", value: "selectordinal", description: "\"selectordinal\"" },
        peg$c24 = function(pluralStyle) {
                return {
                    type   : pluralStyle.type,
                    ordinal: true,
                    offset : pluralStyle.offset || 0,
                    options: pluralStyle.options,
                    location: location()
                }
            },
        peg$c25 = "select",
        peg$c26 = { type: "literal", value: "select", description: "\"select\"" },
        peg$c27 = function(options) {
                return {
                    type   : 'selectFormat',
                    options: options,
                    location: location()
                };
            },
        peg$c28 = "=",
        peg$c29 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c30 = function(selector, pattern) {
                return {
                    type    : 'optionalFormatPattern',
                    selector: selector,
                    value   : pattern,
                    location: location()
                };
            },
        peg$c31 = "offset:",
        peg$c32 = { type: "literal", value: "offset:", description: "\"offset:\"" },
        peg$c33 = function(number) {
                return number;
            },
        peg$c34 = function(offset, options) {
                return {
                    type   : 'pluralFormat',
                    offset : offset,
                    options: options,
                    location: location()
                };
            },
        peg$c35 = { type: "other", description: "whitespace" },
        peg$c36 = /^[ \t\n\r]/,
        peg$c37 = { type: "class", value: "[ \\t\\n\\r]", description: "[ \\t\\n\\r]" },
        peg$c38 = { type: "other", description: "optionalWhitespace" },
        peg$c39 = /^[0-9]/,
        peg$c40 = { type: "class", value: "[0-9]", description: "[0-9]" },
        peg$c41 = /^[0-9a-f]/i,
        peg$c42 = { type: "class", value: "[0-9a-f]i", description: "[0-9a-f]i" },
        peg$c43 = "0",
        peg$c44 = { type: "literal", value: "0", description: "\"0\"" },
        peg$c45 = /^[1-9]/,
        peg$c46 = { type: "class", value: "[1-9]", description: "[1-9]" },
        peg$c47 = function(digits) {
            return parseInt(digits, 10);
        },
        peg$c48 = /^[^{}\\\0-\x1F \t\n\r]/,
        peg$c49 = { type: "class", value: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]", description: "[^{}\\\\\\0-\\x1F\\x7f \\t\\n\\r]" },
        peg$c50 = "\\\\",
        peg$c51 = { type: "literal", value: "\\\\", description: "\"\\\\\\\\\"" },
        peg$c52 = function() { return '\\'; },
        peg$c53 = "\\#",
        peg$c54 = { type: "literal", value: "\\#", description: "\"\\\\#\"" },
        peg$c55 = function() { return '\\#'; },
        peg$c56 = "\\{",
        peg$c57 = { type: "literal", value: "\\{", description: "\"\\\\{\"" },
        peg$c58 = function() { return '\u007B'; },
        peg$c59 = "\\}",
        peg$c60 = { type: "literal", value: "\\}", description: "\"\\\\}\"" },
        peg$c61 = function() { return '\u007D'; },
        peg$c62 = "\\u",
        peg$c63 = { type: "literal", value: "\\u", description: "\"\\\\u\"" },
        peg$c64 = function(digits) {
                return String.fromCharCode(parseInt(digits, 16));
            },
        peg$c65 = function(chars) { return chars.join(''); },

        peg$currPos          = 0,
        peg$savedPos         = 0,
        peg$posDetailsCache  = [{ line: 1, column: 1, seenCR: false }],
        peg$maxFailPos       = 0,
        peg$maxFailExpected  = [],
        peg$silentFails      = 0,

        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$savedPos, peg$currPos);
    }

    function location() {
      return peg$computeLocation(peg$savedPos, peg$currPos);
    }

    function expected(description) {
      throw peg$buildException(
        null,
        [{ type: "other", description: description }],
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function error(message) {
      throw peg$buildException(
        message,
        null,
        input.substring(peg$savedPos, peg$currPos),
        peg$computeLocation(peg$savedPos, peg$currPos)
      );
    }

    function peg$computePosDetails(pos) {
      var details = peg$posDetailsCache[pos],
          p, ch;

      if (details) {
        return details;
      } else {
        p = pos - 1;
        while (!peg$posDetailsCache[p]) {
          p--;
        }

        details = peg$posDetailsCache[p];
        details = {
          line:   details.line,
          column: details.column,
          seenCR: details.seenCR
        };

        while (p < pos) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) { details.line++; }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }

          p++;
        }

        peg$posDetailsCache[pos] = details;
        return details;
      }
    }

    function peg$computeLocation(startPos, endPos) {
      var startPosDetails = peg$computePosDetails(startPos),
          endPosDetails   = peg$computePosDetails(endPos);

      return {
        start: {
          offset: startPos,
          line:   startPosDetails.line,
          column: startPosDetails.column
        },
        end: {
          offset: endPos,
          line:   endPosDetails.line,
          column: endPosDetails.column
        }
      };
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) { return; }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, found, location) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function(a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) { return ch.charCodeAt(0).toString(16).toUpperCase(); }

          return s
            .replace(/\\/g,   '\\\\')
            .replace(/"/g,    '\\"')
            .replace(/\x08/g, '\\b')
            .replace(/\t/g,   '\\t')
            .replace(/\n/g,   '\\n')
            .replace(/\f/g,   '\\f')
            .replace(/\r/g,   '\\r')
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return '\\x0' + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return '\\x'  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return '\\u0' + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return '\\u'  + hex(ch); });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc, foundDesc, i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1
          ? expectedDescs.slice(0, -1).join(", ")
              + " or "
              + expectedDescs[expected.length - 1]
          : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new peg$SyntaxError(
        message !== null ? message : buildMessage(expected, found),
        expected,
        found,
        location
      );
    }

    function peg$parsestart() {
      var s0;

      s0 = peg$parsemessageFormatPattern();

      return s0;
    }

    function peg$parsemessageFormatPattern() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsemessageFormatElement();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsemessageFormatElement();
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c0(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsemessageFormatElement() {
      var s0;

      s0 = peg$parsemessageTextElement();
      if (s0 === peg$FAILED) {
        s0 = peg$parseargumentElement();
      }

      return s0;
    }

    function peg$parsemessageText() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$currPos;
      s3 = peg$parse_();
      if (s3 !== peg$FAILED) {
        s4 = peg$parsechars();
        if (s4 !== peg$FAILED) {
          s5 = peg$parse_();
          if (s5 !== peg$FAILED) {
            s3 = [s3, s4, s5];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
      } else {
        peg$currPos = s2;
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsechars();
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s3 = [s3, s4, s5];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c1(s1);
      }
      s0 = s1;
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsews();
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parsemessageTextElement() {
      var s0, s1;

      s0 = peg$currPos;
      s1 = peg$parsemessageText();
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c2(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parseargument() {
      var s0, s1, s2;

      s0 = peg$parsenumber();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c3.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c4); }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c3.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c4); }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
      }

      return s0;
    }

    function peg$parseargumentElement() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 123) {
        s1 = peg$c5;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c6); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseargument();
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 44) {
                s6 = peg$c7;
                peg$currPos++;
              } else {
                s6 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c8); }
              }
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parseelementFormat();
                  if (s8 !== peg$FAILED) {
                    s6 = [s6, s7, s8];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
              if (s5 === peg$FAILED) {
                s5 = null;
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parse_();
                if (s6 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 125) {
                    s7 = peg$c9;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c10); }
                  }
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c11(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseelementFormat() {
      var s0;

      s0 = peg$parsesimpleFormat();
      if (s0 === peg$FAILED) {
        s0 = peg$parsepluralFormat();
        if (s0 === peg$FAILED) {
          s0 = peg$parseselectOrdinalFormat();
          if (s0 === peg$FAILED) {
            s0 = peg$parseselectFormat();
          }
        }
      }

      return s0;
    }

    function peg$parsesimpleFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c12) {
        s1 = peg$c12;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c13); }
      }
      if (s1 === peg$FAILED) {
        if (input.substr(peg$currPos, 4) === peg$c14) {
          s1 = peg$c14;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c15); }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c16) {
            s1 = peg$c16;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c17); }
          }
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 44) {
            s4 = peg$c7;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          if (s4 !== peg$FAILED) {
            s5 = peg$parse_();
            if (s5 !== peg$FAILED) {
              s6 = peg$parsechars();
              if (s6 !== peg$FAILED) {
                s4 = [s4, s5, s6];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 === peg$FAILED) {
            s3 = null;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c18(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsepluralFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c19) {
        s1 = peg$c19;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c20); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c7;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c21(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseselectOrdinalFormat() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 13) === peg$c22) {
        s1 = peg$c22;
        peg$currPos += 13;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c23); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c7;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsepluralStyle();
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c24(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseselectFormat() {
      var s0, s1, s2, s3, s4, s5, s6;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 6) === peg$c25) {
        s1 = peg$c25;
        peg$currPos += 6;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c26); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 44) {
            s3 = peg$c7;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c8); }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = [];
              s6 = peg$parseoptionalFormatPattern();
              if (s6 !== peg$FAILED) {
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parseoptionalFormatPattern();
                }
              } else {
                s5 = peg$FAILED;
              }
              if (s5 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c27(s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseselector() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s2 = peg$c28;
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c29); }
      }
      if (s2 !== peg$FAILED) {
        s3 = peg$parsenumber();
        if (s3 !== peg$FAILED) {
          s2 = [s2, s3];
          s1 = s2;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parsechars();
      }

      return s0;
    }

    function peg$parseoptionalFormatPattern() {
      var s0, s1, s2, s3, s4, s5, s6, s7, s8;

      s0 = peg$currPos;
      s1 = peg$parse_();
      if (s1 !== peg$FAILED) {
        s2 = peg$parseselector();
        if (s2 !== peg$FAILED) {
          s3 = peg$parse_();
          if (s3 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 123) {
              s4 = peg$c5;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c6); }
            }
            if (s4 !== peg$FAILED) {
              s5 = peg$parse_();
              if (s5 !== peg$FAILED) {
                s6 = peg$parsemessageFormatPattern();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 125) {
                      s8 = peg$c9;
                      peg$currPos++;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) { peg$fail(peg$c10); }
                    }
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c30(s2, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parseoffset() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.substr(peg$currPos, 7) === peg$c31) {
        s1 = peg$c31;
        peg$currPos += 7;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c32); }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = peg$parsenumber();
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c33(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsepluralStyle() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$parseoffset();
      if (s1 === peg$FAILED) {
        s1 = null;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parse_();
        if (s2 !== peg$FAILED) {
          s3 = [];
          s4 = peg$parseoptionalFormatPattern();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseoptionalFormatPattern();
            }
          } else {
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c34(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }

      return s0;
    }

    function peg$parsews() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      if (peg$c36.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c37); }
      }
      if (s1 !== peg$FAILED) {
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c36.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c37); }
          }
        }
      } else {
        s0 = peg$FAILED;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c35); }
      }

      return s0;
    }

    function peg$parse_() {
      var s0, s1, s2;

      peg$silentFails++;
      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsews();
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        s2 = peg$parsews();
      }
      if (s1 !== peg$FAILED) {
        s0 = input.substring(s0, peg$currPos);
      } else {
        s0 = s1;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c38); }
      }

      return s0;
    }

    function peg$parsedigit() {
      var s0;

      if (peg$c39.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c40); }
      }

      return s0;
    }

    function peg$parsehexDigit() {
      var s0;

      if (peg$c41.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c42); }
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 48) {
        s1 = peg$c43;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c44); }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$currPos;
        s2 = peg$currPos;
        if (peg$c45.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c46); }
        }
        if (s3 !== peg$FAILED) {
          s4 = [];
          s5 = peg$parsedigit();
          while (s5 !== peg$FAILED) {
            s4.push(s5);
            s5 = peg$parsedigit();
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c47(s1);
      }
      s0 = s1;

      return s0;
    }

    function peg$parsechar() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      if (peg$c48.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$c49); }
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2) === peg$c50) {
          s1 = peg$c50;
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$c51); }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c52();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.substr(peg$currPos, 2) === peg$c53) {
            s1 = peg$c53;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$c54); }
          }
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c55();
          }
          s0 = s1;
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            if (input.substr(peg$currPos, 2) === peg$c56) {
              s1 = peg$c56;
              peg$currPos += 2;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) { peg$fail(peg$c57); }
            }
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c58();
            }
            s0 = s1;
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.substr(peg$currPos, 2) === peg$c59) {
                s1 = peg$c59;
                peg$currPos += 2;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) { peg$fail(peg$c60); }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c61();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.substr(peg$currPos, 2) === peg$c62) {
                  s1 = peg$c62;
                  peg$currPos += 2;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) { peg$fail(peg$c63); }
                }
                if (s1 !== peg$FAILED) {
                  s2 = peg$currPos;
                  s3 = peg$currPos;
                  s4 = peg$parsehexDigit();
                  if (s4 !== peg$FAILED) {
                    s5 = peg$parsehexDigit();
                    if (s5 !== peg$FAILED) {
                      s6 = peg$parsehexDigit();
                      if (s6 !== peg$FAILED) {
                        s7 = peg$parsehexDigit();
                        if (s7 !== peg$FAILED) {
                          s4 = [s4, s5, s6, s7];
                          s3 = s4;
                        } else {
                          peg$currPos = s3;
                          s3 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s3;
                      s3 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s3;
                    s3 = peg$FAILED;
                  }
                  if (s3 !== peg$FAILED) {
                    s2 = input.substring(s2, peg$currPos);
                  } else {
                    s2 = s3;
                  }
                  if (s2 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c64(s2);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              }
            }
          }
        }
      }

      return s0;
    }

    function peg$parsechars() {
      var s0, s1, s2;

      s0 = peg$currPos;
      s1 = [];
      s2 = peg$parsechar();
      if (s2 !== peg$FAILED) {
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parsechar();
        }
      } else {
        s1 = peg$FAILED;
      }
      if (s1 !== peg$FAILED) {
        peg$savedPos = s0;
        s1 = peg$c65(s1);
      }
      s0 = s1;

      return s0;
    }

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(
        null,
        peg$maxFailExpected,
        peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
        peg$maxFailPos < input.length
          ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
          : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
      );
    }
  }

  return {
    SyntaxError: peg$SyntaxError,
    parse:       peg$parse
  };
})();

//# sourceMappingURL=parser.js.map

/***/ }),

/***/ "./node_modules/intl-messageformat/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jshint node:true */



var IntlMessageFormat = __webpack_require__("./node_modules/intl-messageformat/lib/main.js")['default'];

// Add all locale data to `IntlMessageFormat`. This module will be ignored when
// bundling for the browser with Browserify/Webpack.
__webpack_require__(27);

// Re-export `IntlMessageFormat` as the CommonJS default exports with all the
// locale data registered, and with English set as the default locale. Define
// the `default` prop for use with other compiled ES6 Modules.
exports = module.exports = IntlMessageFormat;
exports['default'] = exports;


/***/ }),

/***/ "./node_modules/intl-messageformat/lib/compiler.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


exports["default"] = Compiler;

function Compiler(locales, formats, pluralFn) {
    this.locales  = locales;
    this.formats  = formats;
    this.pluralFn = pluralFn;
}

Compiler.prototype.compile = function (ast) {
    this.pluralStack        = [];
    this.currentPlural      = null;
    this.pluralNumberFormat = null;

    return this.compileMessage(ast);
};

Compiler.prototype.compileMessage = function (ast) {
    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new Error('Message AST is not of type: "messageFormatPattern"');
    }

    var elements = ast.elements,
        pattern  = [];

    var i, len, element;

    for (i = 0, len = elements.length; i < len; i += 1) {
        element = elements[i];

        switch (element.type) {
            case 'messageTextElement':
                pattern.push(this.compileMessageText(element));
                break;

            case 'argumentElement':
                pattern.push(this.compileArgument(element));
                break;

            default:
                throw new Error('Message element does not have a valid type');
        }
    }

    return pattern;
};

Compiler.prototype.compileMessageText = function (element) {
    // When this `element` is part of plural sub-pattern and its value contains
    // an unescaped '#', use a `PluralOffsetString` helper to properly output
    // the number with the correct offset in the string.
    if (this.currentPlural && /(^|[^\\])#/g.test(element.value)) {
        // Create a cache a NumberFormat instance that can be reused for any
        // PluralOffsetString instance in this message.
        if (!this.pluralNumberFormat) {
            this.pluralNumberFormat = new Intl.NumberFormat(this.locales);
        }

        return new PluralOffsetString(
                this.currentPlural.id,
                this.currentPlural.format.offset,
                this.pluralNumberFormat,
                element.value);
    }

    // Unescape the escaped '#'s in the message text.
    return element.value.replace(/\\#/g, '#');
};

Compiler.prototype.compileArgument = function (element) {
    var format = element.format;

    if (!format) {
        return new StringFormat(element.id);
    }

    var formats  = this.formats,
        locales  = this.locales,
        pluralFn = this.pluralFn,
        options;

    switch (format.type) {
        case 'numberFormat':
            options = formats.number[format.style];
            return {
                id    : element.id,
                format: new Intl.NumberFormat(locales, options).format
            };

        case 'dateFormat':
            options = formats.date[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'timeFormat':
            options = formats.time[format.style];
            return {
                id    : element.id,
                format: new Intl.DateTimeFormat(locales, options).format
            };

        case 'pluralFormat':
            options = this.compileOptions(element);
            return new PluralFormat(
                element.id, format.ordinal, format.offset, options, pluralFn
            );

        case 'selectFormat':
            options = this.compileOptions(element);
            return new SelectFormat(element.id, options);

        default:
            throw new Error('Message element does not have a valid format type');
    }
};

Compiler.prototype.compileOptions = function (element) {
    var format      = element.format,
        options     = format.options,
        optionsHash = {};

    // Save the current plural element, if any, then set it to a new value when
    // compiling the options sub-patterns. This conforms the spec's algorithm
    // for handling `"#"` syntax in message text.
    this.pluralStack.push(this.currentPlural);
    this.currentPlural = format.type === 'pluralFormat' ? element : null;

    var i, len, option;

    for (i = 0, len = options.length; i < len; i += 1) {
        option = options[i];

        // Compile the sub-pattern and save it under the options's selector.
        optionsHash[option.selector] = this.compileMessage(option.value);
    }

    // Pop the plural stack to put back the original current plural value.
    this.currentPlural = this.pluralStack.pop();

    return optionsHash;
};

// -- Compiler Helper Classes --------------------------------------------------

function StringFormat(id) {
    this.id = id;
}

StringFormat.prototype.format = function (value) {
    if (!value && typeof value !== 'number') {
        return '';
    }

    return typeof value === 'string' ? value : String(value);
};

function PluralFormat(id, useOrdinal, offset, options, pluralFn) {
    this.id         = id;
    this.useOrdinal = useOrdinal;
    this.offset     = offset;
    this.options    = options;
    this.pluralFn   = pluralFn;
}

PluralFormat.prototype.getOption = function (value) {
    var options = this.options;

    var option = options['=' + value] ||
            options[this.pluralFn(value - this.offset, this.useOrdinal)];

    return option || options.other;
};

function PluralOffsetString(id, offset, numberFormat, string) {
    this.id           = id;
    this.offset       = offset;
    this.numberFormat = numberFormat;
    this.string       = string;
}

PluralOffsetString.prototype.format = function (value) {
    var number = this.numberFormat.format(value - this.offset);

    return this.string
            .replace(/(^|[^\\])#/g, '$1' + number)
            .replace(/\\#/g, '#');
};

function SelectFormat(id, options) {
    this.id      = id;
    this.options = options;
}

SelectFormat.prototype.getOption = function (value) {
    var options = this.options;
    return options[value] || options.other;
};

//# sourceMappingURL=compiler.js.map

/***/ }),

/***/ "./node_modules/intl-messageformat/lib/core.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


var src$utils$$ = __webpack_require__("./node_modules/intl-messageformat/lib/utils.js"), src$es5$$ = __webpack_require__("./node_modules/intl-messageformat/lib/es5.js"), src$compiler$$ = __webpack_require__("./node_modules/intl-messageformat/lib/compiler.js"), intl$messageformat$parser$$ = __webpack_require__("./node_modules/intl-messageformat-parser/index.js");
exports["default"] = MessageFormat;

// -- MessageFormat --------------------------------------------------------

function MessageFormat(message, locales, formats) {
    // Parse string messages into an AST.
    var ast = typeof message === 'string' ?
            MessageFormat.__parse(message) : message;

    if (!(ast && ast.type === 'messageFormatPattern')) {
        throw new TypeError('A message must be provided as a String or AST.');
    }

    // Creates a new object with the specified `formats` merged with the default
    // formats.
    formats = this._mergeFormats(MessageFormat.formats, formats);

    // Defined first because it's used to build the format pattern.
    src$es5$$.defineProperty(this, '_locale',  {value: this._resolveLocale(locales)});

    // Compile the `ast` to a pattern that is highly optimized for repeated
    // `format()` invocations. **Note:** This passes the `locales` set provided
    // to the constructor instead of just the resolved locale.
    var pluralFn = this._findPluralRuleFunction(this._locale);
    var pattern  = this._compilePattern(ast, locales, formats, pluralFn);

    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var messageFormat = this;
    this.format = function (values) {
      try {
        return messageFormat._format(pattern, values);
      } catch (e) {
        if (e.variableId) {
          throw new Error(
            'The intl string context variable \'' + e.variableId + '\'' +
            ' was not provided to the string \'' + message + '\''
          );
        } else {
          throw e;
        }
      }
    };
}

// Default format options used as the prototype of the `formats` provided to the
// constructor. These are used when constructing the internal Intl.NumberFormat
// and Intl.DateTimeFormat instances.
src$es5$$.defineProperty(MessageFormat, 'formats', {
    enumerable: true,

    value: {
        number: {
            'currency': {
                style: 'currency'
            },

            'percent': {
                style: 'percent'
            }
        },

        date: {
            'short': {
                month: 'numeric',
                day  : 'numeric',
                year : '2-digit'
            },

            'medium': {
                month: 'short',
                day  : 'numeric',
                year : 'numeric'
            },

            'long': {
                month: 'long',
                day  : 'numeric',
                year : 'numeric'
            },

            'full': {
                weekday: 'long',
                month  : 'long',
                day    : 'numeric',
                year   : 'numeric'
            }
        },

        time: {
            'short': {
                hour  : 'numeric',
                minute: 'numeric'
            },

            'medium':  {
                hour  : 'numeric',
                minute: 'numeric',
                second: 'numeric'
            },

            'long': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            },

            'full': {
                hour        : 'numeric',
                minute      : 'numeric',
                second      : 'numeric',
                timeZoneName: 'short'
            }
        }
    }
});

// Define internal private properties for dealing with locale data.
src$es5$$.defineProperty(MessageFormat, '__localeData__', {value: src$es5$$.objCreate(null)});
src$es5$$.defineProperty(MessageFormat, '__addLocaleData', {value: function (data) {
    if (!(data && data.locale)) {
        throw new Error(
            'Locale data provided to IntlMessageFormat is missing a ' +
            '`locale` property'
        );
    }

    MessageFormat.__localeData__[data.locale.toLowerCase()] = data;
}});

// Defines `__parse()` static method as an exposed private.
src$es5$$.defineProperty(MessageFormat, '__parse', {value: intl$messageformat$parser$$["default"].parse});

// Define public `defaultLocale` property which defaults to English, but can be
// set by the developer.
src$es5$$.defineProperty(MessageFormat, 'defaultLocale', {
    enumerable: true,
    writable  : true,
    value     : undefined
});

MessageFormat.prototype.resolvedOptions = function () {
    // TODO: Provide anything else?
    return {
        locale: this._locale
    };
};

MessageFormat.prototype._compilePattern = function (ast, locales, formats, pluralFn) {
    var compiler = new src$compiler$$["default"](locales, formats, pluralFn);
    return compiler.compile(ast);
};

MessageFormat.prototype._findPluralRuleFunction = function (locale) {
    var localeData = MessageFormat.__localeData__;
    var data       = localeData[locale.toLowerCase()];

    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find a `pluralRuleFunction` to return.
    while (data) {
        if (data.pluralRuleFunction) {
            return data.pluralRuleFunction;
        }

        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error(
        'Locale data added to IntlMessageFormat is missing a ' +
        '`pluralRuleFunction` for :' + locale
    );
};

MessageFormat.prototype._format = function (pattern, values) {
    var result = '',
        i, len, part, id, value, err;

    for (i = 0, len = pattern.length; i < len; i += 1) {
        part = pattern[i];

        // Exist early for string parts.
        if (typeof part === 'string') {
            result += part;
            continue;
        }

        id = part.id;

        // Enforce that all required values are provided by the caller.
        if (!(values && src$utils$$.hop.call(values, id))) {
          err = new Error('A value must be provided for: ' + id);
          err.variableId = id;
          throw err;
        }

        value = values[id];

        // Recursively format plural and select parts' option — which can be a
        // nested pattern structure. The choosing of the option to use is
        // abstracted-by and delegated-to the part helper object.
        if (part.options) {
            result += this._format(part.getOption(value), values);
        } else {
            result += part.format(value);
        }
    }

    return result;
};

MessageFormat.prototype._mergeFormats = function (defaults, formats) {
    var mergedFormats = {},
        type, mergedType;

    for (type in defaults) {
        if (!src$utils$$.hop.call(defaults, type)) { continue; }

        mergedFormats[type] = mergedType = src$es5$$.objCreate(defaults[type]);

        if (formats && src$utils$$.hop.call(formats, type)) {
            src$utils$$.extend(mergedType, formats[type]);
        }
    }

    return mergedFormats;
};

MessageFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
        locales = [locales];
    }

    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(MessageFormat.defaultLocale);

    var localeData = MessageFormat.__localeData__;
    var i, len, localeParts, data;

    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
        localeParts = locales[i].toLowerCase().split('-');

        while (localeParts.length) {
            data = localeData[localeParts.join('-')];
            if (data) {
                // Return the normalized locale string; e.g., we return "en-US",
                // instead of "en-us".
                return data.locale;
            }

            localeParts.pop();
        }
    }

    var defaultLocale = locales.pop();
    throw new Error(
        'No locale data has been added to IntlMessageFormat for: ' +
        locales.join(', ') + ', or the default locale: ' + defaultLocale
    );
};

//# sourceMappingURL=core.js.map

/***/ }),

/***/ "./node_modules/intl-messageformat/lib/en.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// GENERATED FILE

exports["default"] = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"}};

//# sourceMappingURL=en.js.map

/***/ }),

/***/ "./node_modules/intl-messageformat/lib/es5.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


var src$utils$$ = __webpack_require__("./node_modules/intl-messageformat/lib/utils.js");

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!src$utils$$.hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (src$utils$$.hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};

exports.defineProperty = defineProperty, exports.objCreate = objCreate;

//# sourceMappingURL=es5.js.map

/***/ }),

/***/ "./node_modules/intl-messageformat/lib/main.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jslint esnext: true */


var src$core$$ = __webpack_require__("./node_modules/intl-messageformat/lib/core.js"), src$en$$ = __webpack_require__("./node_modules/intl-messageformat/lib/en.js");

src$core$$["default"].__addLocaleData(src$en$$["default"]);
src$core$$["default"].defaultLocale = 'en';

exports["default"] = src$core$$["default"];

//# sourceMappingURL=main.js.map

/***/ }),

/***/ "./node_modules/intl-messageformat/lib/utils.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


exports.extend = extend;
var hop = Object.prototype.hasOwnProperty;

function extend(obj) {
    var sources = Array.prototype.slice.call(arguments, 1),
        i, len, source, key;

    for (i = 0, len = sources.length; i < len; i += 1) {
        source = sources[i];
        if (!source) { continue; }

        for (key in source) {
            if (hop.call(source, key)) {
                obj[key] = source[key];
            }
        }
    }

    return obj;
}
exports.hop = hop;

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/intl-relativeformat/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jshint node:true */



var IntlRelativeFormat = __webpack_require__("./node_modules/intl-relativeformat/lib/main.js")['default'];

// Add all locale data to `IntlRelativeFormat`. This module will be ignored when
// bundling for the browser with Browserify/Webpack.
__webpack_require__(28);

// Re-export `IntlRelativeFormat` as the CommonJS default exports with all the
// locale data registered, and with English set as the default locale. Define
// the `default` prop for use with other compiled ES6 Modules.
exports = module.exports = IntlRelativeFormat;
exports['default'] = exports;


/***/ }),

/***/ "./node_modules/intl-relativeformat/lib/core.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */


var intl$messageformat$$ = __webpack_require__("./node_modules/intl-messageformat/index.js"), src$diff$$ = __webpack_require__("./node_modules/intl-relativeformat/lib/diff.js"), src$es5$$ = __webpack_require__("./node_modules/intl-relativeformat/lib/es5.js");
exports["default"] = RelativeFormat;

// -----------------------------------------------------------------------------

var FIELDS = [
    'second', 'second-short',
    'minute', 'minute-short',
    'hour', 'hour-short',
    'day', 'day-short',
    'month', 'month-short',
    'year', 'year-short'
];
var STYLES = ['best fit', 'numeric'];

// -- RelativeFormat -----------------------------------------------------------

function RelativeFormat(locales, options) {
    options = options || {};

    // Make a copy of `locales` if it's an array, so that it doesn't change
    // since it's used lazily.
    if (src$es5$$.isArray(locales)) {
        locales = locales.concat();
    }

    src$es5$$.defineProperty(this, '_locale', {value: this._resolveLocale(locales)});
    src$es5$$.defineProperty(this, '_options', {value: {
        style: this._resolveStyle(options.style),
        units: this._isValidUnits(options.units) && options.units
    }});

    src$es5$$.defineProperty(this, '_locales', {value: locales});
    src$es5$$.defineProperty(this, '_fields', {value: this._findFields(this._locale)});
    src$es5$$.defineProperty(this, '_messages', {value: src$es5$$.objCreate(null)});

    // "Bind" `format()` method to `this` so it can be passed by reference like
    // the other `Intl` APIs.
    var relativeFormat = this;
    this.format = function format(date, options) {
        return relativeFormat._format(date, options);
    };
}

// Define internal private properties for dealing with locale data.
src$es5$$.defineProperty(RelativeFormat, '__localeData__', {value: src$es5$$.objCreate(null)});
src$es5$$.defineProperty(RelativeFormat, '__addLocaleData', {value: function (data) {
    if (!(data && data.locale)) {
        throw new Error(
            'Locale data provided to IntlRelativeFormat is missing a ' +
            '`locale` property value'
        );
    }

    RelativeFormat.__localeData__[data.locale.toLowerCase()] = data;

    // Add data to IntlMessageFormat.
    intl$messageformat$$["default"].__addLocaleData(data);
}});

// Define public `defaultLocale` property which can be set by the developer, or
// it will be set when the first RelativeFormat instance is created by
// leveraging the resolved locale from `Intl`.
src$es5$$.defineProperty(RelativeFormat, 'defaultLocale', {
    enumerable: true,
    writable  : true,
    value     : undefined
});

// Define public `thresholds` property which can be set by the developer, and
// defaults to relative time thresholds from moment.js.
src$es5$$.defineProperty(RelativeFormat, 'thresholds', {
    enumerable: true,

    value: {
        second: 45, 'second-short': 45,  // seconds to minute
        minute: 45, 'minute-short': 45, // minutes to hour
        hour  : 22, 'hour-short': 22, // hours to day
        day   : 26, 'day-short': 26, // days to month
        month : 11, 'month-short': 11 // months to year
    }
});

RelativeFormat.prototype.resolvedOptions = function () {
    return {
        locale: this._locale,
        style : this._options.style,
        units : this._options.units
    };
};

RelativeFormat.prototype._compileMessage = function (units) {
    // `this._locales` is the original set of locales the user specified to the
    // constructor, while `this._locale` is the resolved root locale.
    var locales        = this._locales;
    var resolvedLocale = this._locale;

    var field        = this._fields[units];
    var relativeTime = field.relativeTime;
    var future       = '';
    var past         = '';
    var i;

    for (i in relativeTime.future) {
        if (relativeTime.future.hasOwnProperty(i)) {
            future += ' ' + i + ' {' +
                relativeTime.future[i].replace('{0}', '#') + '}';
        }
    }

    for (i in relativeTime.past) {
        if (relativeTime.past.hasOwnProperty(i)) {
            past += ' ' + i + ' {' +
                relativeTime.past[i].replace('{0}', '#') + '}';
        }
    }

    var message = '{when, select, future {{0, plural, ' + future + '}}' +
                                 'past {{0, plural, ' + past + '}}}';

    // Create the synthetic IntlMessageFormat instance using the original
    // locales value specified by the user when constructing the the parent
    // IntlRelativeFormat instance.
    return new intl$messageformat$$["default"](message, locales);
};

RelativeFormat.prototype._getMessage = function (units) {
    var messages = this._messages;

    // Create a new synthetic message based on the locale data from CLDR.
    if (!messages[units]) {
        messages[units] = this._compileMessage(units);
    }

    return messages[units];
};

RelativeFormat.prototype._getRelativeUnits = function (diff, units) {
    var field = this._fields[units];

    if (field.relative) {
        return field.relative[diff];
    }
};

RelativeFormat.prototype._findFields = function (locale) {
    var localeData = RelativeFormat.__localeData__;
    var data       = localeData[locale.toLowerCase()];

    // The locale data is de-duplicated, so we have to traverse the locale's
    // hierarchy until we find `fields` to return.
    while (data) {
        if (data.fields) {
            return data.fields;
        }

        data = data.parentLocale && localeData[data.parentLocale.toLowerCase()];
    }

    throw new Error(
        'Locale data added to IntlRelativeFormat is missing `fields` for :' +
        locale
    );
};

RelativeFormat.prototype._format = function (date, options) {
    var now = options && options.now !== undefined ? options.now : src$es5$$.dateNow();

    if (date === undefined) {
        date = now;
    }

    // Determine if the `date` and optional `now` values are valid, and throw a
    // similar error to what `Intl.DateTimeFormat#format()` would throw.
    if (!isFinite(now)) {
        throw new RangeError(
            'The `now` option provided to IntlRelativeFormat#format() is not ' +
            'in valid range.'
        );
    }

    if (!isFinite(date)) {
        throw new RangeError(
            'The date value provided to IntlRelativeFormat#format() is not ' +
            'in valid range.'
        );
    }

    var diffReport  = src$diff$$["default"](now, date);
    var units       = this._options.units || this._selectUnits(diffReport);
    var diffInUnits = diffReport[units];

    if (this._options.style !== 'numeric') {
        var relativeUnits = this._getRelativeUnits(diffInUnits, units);
        if (relativeUnits) {
            return relativeUnits;
        }
    }

    return this._getMessage(units).format({
        '0' : Math.abs(diffInUnits),
        when: diffInUnits < 0 ? 'past' : 'future'
    });
};

RelativeFormat.prototype._isValidUnits = function (units) {
    if (!units || src$es5$$.arrIndexOf.call(FIELDS, units) >= 0) {
        return true;
    }

    if (typeof units === 'string') {
        var suggestion = /s$/.test(units) && units.substr(0, units.length - 1);
        if (suggestion && src$es5$$.arrIndexOf.call(FIELDS, suggestion) >= 0) {
            throw new Error(
                '"' + units + '" is not a valid IntlRelativeFormat `units` ' +
                'value, did you mean: ' + suggestion
            );
        }
    }

    throw new Error(
        '"' + units + '" is not a valid IntlRelativeFormat `units` value, it ' +
        'must be one of: "' + FIELDS.join('", "') + '"'
    );
};

RelativeFormat.prototype._resolveLocale = function (locales) {
    if (typeof locales === 'string') {
        locales = [locales];
    }

    // Create a copy of the array so we can push on the default locale.
    locales = (locales || []).concat(RelativeFormat.defaultLocale);

    var localeData = RelativeFormat.__localeData__;
    var i, len, localeParts, data;

    // Using the set of locales + the default locale, we look for the first one
    // which that has been registered. When data does not exist for a locale, we
    // traverse its ancestors to find something that's been registered within
    // its hierarchy of locales. Since we lack the proper `parentLocale` data
    // here, we must take a naive approach to traversal.
    for (i = 0, len = locales.length; i < len; i += 1) {
        localeParts = locales[i].toLowerCase().split('-');

        while (localeParts.length) {
            data = localeData[localeParts.join('-')];
            if (data) {
                // Return the normalized locale string; e.g., we return "en-US",
                // instead of "en-us".
                return data.locale;
            }

            localeParts.pop();
        }
    }

    var defaultLocale = locales.pop();
    throw new Error(
        'No locale data has been added to IntlRelativeFormat for: ' +
        locales.join(', ') + ', or the default locale: ' + defaultLocale
    );
};

RelativeFormat.prototype._resolveStyle = function (style) {
    // Default to "best fit" style.
    if (!style) {
        return STYLES[0];
    }

    if (src$es5$$.arrIndexOf.call(STYLES, style) >= 0) {
        return style;
    }

    throw new Error(
        '"' + style + '" is not a valid IntlRelativeFormat `style` value, it ' +
        'must be one of: "' + STYLES.join('", "') + '"'
    );
};

RelativeFormat.prototype._selectUnits = function (diffReport) {
    var i, l, units;
    var fields = FIELDS.filter(function(field) {
        return field.indexOf('-short') < 1;
    });

    for (i = 0, l = fields.length; i < l; i += 1) {
        units = fields[i];

        if (Math.abs(diffReport[units]) < RelativeFormat.thresholds[units]) {
            break;
        }
    }

    return units;
};

//# sourceMappingURL=core.js.map

/***/ }),

/***/ "./node_modules/intl-relativeformat/lib/diff.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */



var round = Math.round;

function daysToYears(days) {
    // 400 years have 146097 days (taking into account leap year rules)
    return days * 400 / 146097;
}

exports["default"] = function (from, to) {
    // Convert to ms timestamps.
    from = +from;
    to   = +to;

    var millisecond = round(to - from),
        second      = round(millisecond / 1000),
        minute      = round(second / 60),
        hour        = round(minute / 60),
        day         = round(hour / 24),
        week        = round(day / 7);

    var rawYears = daysToYears(day),
        month    = round(rawYears * 12),
        year     = round(rawYears);

    return {
        millisecond    : millisecond,
        second         : second,
        'second-short' : second,
        minute         : minute,
        'minute-short' : minute,
        hour           : hour,
        'hour-short'   : hour,
        day            : day,
        'day-short'    : day,
        week           : week,
        'week-short'   : week,
        month          : month,
        'month-short'  : month,
        year           : year,
        'year-short'   : year
    };
};

//# sourceMappingURL=diff.js.map

/***/ }),

/***/ "./node_modules/intl-relativeformat/lib/en.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// GENERATED FILE

exports["default"] = {"locale":"en","pluralRuleFunction":function (n,ord){var s=String(n).split("."),v0=!s[1],t0=Number(s[0])==n,n10=t0&&s[0].slice(-1),n100=t0&&s[0].slice(-2);if(ord)return n10==1&&n100!=11?"one":n10==2&&n100!=12?"two":n10==3&&n100!=13?"few":"other";return n==1&&v0?"one":"other"},"fields":{"year":{"displayName":"year","relative":{"0":"this year","1":"next year","-1":"last year"},"relativeTime":{"future":{"one":"in {0} year","other":"in {0} years"},"past":{"one":"{0} year ago","other":"{0} years ago"}}},"year-short":{"displayName":"yr.","relative":{"0":"this yr.","1":"next yr.","-1":"last yr."},"relativeTime":{"future":{"one":"in {0} yr.","other":"in {0} yr."},"past":{"one":"{0} yr. ago","other":"{0} yr. ago"}}},"month":{"displayName":"month","relative":{"0":"this month","1":"next month","-1":"last month"},"relativeTime":{"future":{"one":"in {0} month","other":"in {0} months"},"past":{"one":"{0} month ago","other":"{0} months ago"}}},"month-short":{"displayName":"mo.","relative":{"0":"this mo.","1":"next mo.","-1":"last mo."},"relativeTime":{"future":{"one":"in {0} mo.","other":"in {0} mo."},"past":{"one":"{0} mo. ago","other":"{0} mo. ago"}}},"day":{"displayName":"day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"one":"in {0} day","other":"in {0} days"},"past":{"one":"{0} day ago","other":"{0} days ago"}}},"day-short":{"displayName":"day","relative":{"0":"today","1":"tomorrow","-1":"yesterday"},"relativeTime":{"future":{"one":"in {0} day","other":"in {0} days"},"past":{"one":"{0} day ago","other":"{0} days ago"}}},"hour":{"displayName":"hour","relative":{"0":"this hour"},"relativeTime":{"future":{"one":"in {0} hour","other":"in {0} hours"},"past":{"one":"{0} hour ago","other":"{0} hours ago"}}},"hour-short":{"displayName":"hr.","relative":{"0":"this hour"},"relativeTime":{"future":{"one":"in {0} hr.","other":"in {0} hr."},"past":{"one":"{0} hr. ago","other":"{0} hr. ago"}}},"minute":{"displayName":"minute","relative":{"0":"this minute"},"relativeTime":{"future":{"one":"in {0} minute","other":"in {0} minutes"},"past":{"one":"{0} minute ago","other":"{0} minutes ago"}}},"minute-short":{"displayName":"min.","relative":{"0":"this minute"},"relativeTime":{"future":{"one":"in {0} min.","other":"in {0} min."},"past":{"one":"{0} min. ago","other":"{0} min. ago"}}},"second":{"displayName":"second","relative":{"0":"now"},"relativeTime":{"future":{"one":"in {0} second","other":"in {0} seconds"},"past":{"one":"{0} second ago","other":"{0} seconds ago"}}},"second-short":{"displayName":"sec.","relative":{"0":"now"},"relativeTime":{"future":{"one":"in {0} sec.","other":"in {0} sec."},"past":{"one":"{0} sec. ago","other":"{0} sec. ago"}}}}};

//# sourceMappingURL=en.js.map

/***/ }),

/***/ "./node_modules/intl-relativeformat/lib/es5.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
Copyright (c) 2014, Yahoo! Inc. All rights reserved.
Copyrights licensed under the New BSD License.
See the accompanying LICENSE file for terms.
*/

/* jslint esnext: true */

// Purposely using the same implementation as the Intl.js `Intl` polyfill.
// Copyright 2013 Andy Earnshaw, MIT License



var hop = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

var realDefineProp = (function () {
    try { return !!Object.defineProperty({}, 'a', {}); }
    catch (e) { return false; }
})();

var es3 = !realDefineProp && !Object.prototype.__defineGetter__;

var defineProperty = realDefineProp ? Object.defineProperty :
        function (obj, name, desc) {

    if ('get' in desc && obj.__defineGetter__) {
        obj.__defineGetter__(name, desc.get);
    } else if (!hop.call(obj, name) || 'value' in desc) {
        obj[name] = desc.value;
    }
};

var objCreate = Object.create || function (proto, props) {
    var obj, k;

    function F() {}
    F.prototype = proto;
    obj = new F();

    for (k in props) {
        if (hop.call(props, k)) {
            defineProperty(obj, k, props[k]);
        }
    }

    return obj;
};

var arrIndexOf = Array.prototype.indexOf || function (search, fromIndex) {
    /*jshint validthis:true */
    var arr = this;
    if (!arr.length) {
        return -1;
    }

    for (var i = fromIndex || 0, max = arr.length; i < max; i++) {
        if (arr[i] === search) {
            return i;
        }
    }

    return -1;
};

var isArray = Array.isArray || function (obj) {
    return toString.call(obj) === '[object Array]';
};

var dateNow = Date.now || function () {
    return new Date().getTime();
};

exports.defineProperty = defineProperty, exports.objCreate = objCreate, exports.arrIndexOf = arrIndexOf, exports.isArray = isArray, exports.dateNow = dateNow;

//# sourceMappingURL=es5.js.map

/***/ }),

/***/ "./node_modules/intl-relativeformat/lib/main.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* jslint esnext: true */


var src$core$$ = __webpack_require__("./node_modules/intl-relativeformat/lib/core.js"), src$en$$ = __webpack_require__("./node_modules/intl-relativeformat/lib/en.js");

src$core$$["default"].__addLocaleData(src$en$$["default"]);
src$core$$["default"].defaultLocale = 'en';

exports["default"] = src$core$$["default"];

//# sourceMappingURL=main.js.map

/***/ }),

/***/ "./node_modules/lodash/_addMapEntry.js":
/***/ (function(module, exports) {

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

module.exports = addMapEntry;


/***/ }),

/***/ "./node_modules/lodash/_addSetEntry.js":
/***/ (function(module, exports) {

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

module.exports = addSetEntry;


/***/ }),

/***/ "./node_modules/lodash/_apply.js":
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),

/***/ "./node_modules/lodash/_arrayEach.js":
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),

/***/ "./node_modules/lodash/_arrayIncludes.js":
/***/ (function(module, exports, __webpack_require__) {

var baseIndexOf = __webpack_require__("./node_modules/lodash/_baseIndexOf.js");

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;


/***/ }),

/***/ "./node_modules/lodash/_arrayIncludesWith.js":
/***/ (function(module, exports) {

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;


/***/ }),

/***/ "./node_modules/lodash/_arrayReduce.js":
/***/ (function(module, exports) {

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array == null ? 0 : array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;


/***/ }),

/***/ "./node_modules/lodash/_assignValue.js":
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__("./node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__("./node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),

/***/ "./node_modules/lodash/_baseAssign.js":
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__("./node_modules/lodash/_copyObject.js"),
    keys = __webpack_require__("./node_modules/lodash/keys.js");

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),

/***/ "./node_modules/lodash/_baseAssignIn.js":
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__("./node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__("./node_modules/lodash/keysIn.js");

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),

/***/ "./node_modules/lodash/_baseAssignValue.js":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("./node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),

/***/ "./node_modules/lodash/_baseClone.js":
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__("./node_modules/lodash/_Stack.js"),
    arrayEach = __webpack_require__("./node_modules/lodash/_arrayEach.js"),
    assignValue = __webpack_require__("./node_modules/lodash/_assignValue.js"),
    baseAssign = __webpack_require__("./node_modules/lodash/_baseAssign.js"),
    baseAssignIn = __webpack_require__("./node_modules/lodash/_baseAssignIn.js"),
    cloneBuffer = __webpack_require__("./node_modules/lodash/_cloneBuffer.js"),
    copyArray = __webpack_require__("./node_modules/lodash/_copyArray.js"),
    copySymbols = __webpack_require__("./node_modules/lodash/_copySymbols.js"),
    copySymbolsIn = __webpack_require__("./node_modules/lodash/_copySymbolsIn.js"),
    getAllKeys = __webpack_require__("./node_modules/lodash/_getAllKeys.js"),
    getAllKeysIn = __webpack_require__("./node_modules/lodash/_getAllKeysIn.js"),
    getTag = __webpack_require__("./node_modules/lodash/_getTag.js"),
    initCloneArray = __webpack_require__("./node_modules/lodash/_initCloneArray.js"),
    initCloneByTag = __webpack_require__("./node_modules/lodash/_initCloneByTag.js"),
    initCloneObject = __webpack_require__("./node_modules/lodash/_initCloneObject.js"),
    isArray = __webpack_require__("./node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__("./node_modules/lodash/isBuffer.js"),
    isObject = __webpack_require__("./node_modules/lodash/isObject.js"),
    keys = __webpack_require__("./node_modules/lodash/keys.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),

/***/ "./node_modules/lodash/_baseCreate.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("./node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),

/***/ "./node_modules/lodash/_baseDifference.js":
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__("./node_modules/lodash/_SetCache.js"),
    arrayIncludes = __webpack_require__("./node_modules/lodash/_arrayIncludes.js"),
    arrayIncludesWith = __webpack_require__("./node_modules/lodash/_arrayIncludesWith.js"),
    arrayMap = __webpack_require__("./node_modules/lodash/_arrayMap.js"),
    baseUnary = __webpack_require__("./node_modules/lodash/_baseUnary.js"),
    cacheHas = __webpack_require__("./node_modules/lodash/_cacheHas.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support
 * for excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee == null ? value : iteratee(value);

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;


/***/ }),

/***/ "./node_modules/lodash/_baseFindKey.js":
/***/ (function(module, exports) {

/**
 * The base implementation of methods like `_.findKey` and `_.findLastKey`,
 * without support for iteratee shorthands, which iterates over `collection`
 * using `eachFunc`.
 *
 * @private
 * @param {Array|Object} collection The collection to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFindKey(collection, predicate, eachFunc) {
  var result;
  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = key;
      return false;
    }
  });
  return result;
}

module.exports = baseFindKey;


/***/ }),

/***/ "./node_modules/lodash/_baseFlatten.js":
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__("./node_modules/lodash/_arrayPush.js"),
    isFlattenable = __webpack_require__("./node_modules/lodash/_isFlattenable.js");

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;


/***/ }),

/***/ "./node_modules/lodash/_baseFor.js":
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__("./node_modules/lodash/_createBaseFor.js");

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),

/***/ "./node_modules/lodash/_baseForOwn.js":
/***/ (function(module, exports, __webpack_require__) {

var baseFor = __webpack_require__("./node_modules/lodash/_baseFor.js"),
    keys = __webpack_require__("./node_modules/lodash/keys.js");

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;


/***/ }),

/***/ "./node_modules/lodash/_baseIndexOf.js":
/***/ (function(module, exports, __webpack_require__) {

var baseFindIndex = __webpack_require__("./node_modules/lodash/_baseFindIndex.js"),
    baseIsNaN = __webpack_require__("./node_modules/lodash/_baseIsNaN.js"),
    strictIndexOf = __webpack_require__("./node_modules/lodash/_strictIndexOf.js");

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex);
}

module.exports = baseIndexOf;


/***/ }),

/***/ "./node_modules/lodash/_baseIsNaN.js":
/***/ (function(module, exports) {

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

module.exports = baseIsNaN;


/***/ }),

/***/ "./node_modules/lodash/_baseKeysIn.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("./node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__("./node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__("./node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_baseRest.js":
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__("./node_modules/lodash/identity.js"),
    overRest = __webpack_require__("./node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__("./node_modules/lodash/_setToString.js");

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),

/***/ "./node_modules/lodash/_baseSetToString.js":
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__("./node_modules/lodash/constant.js"),
    defineProperty = __webpack_require__("./node_modules/lodash/_defineProperty.js"),
    identity = __webpack_require__("./node_modules/lodash/identity.js");

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),

/***/ "./node_modules/lodash/_baseSlice.js":
/***/ (function(module, exports) {

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;


/***/ }),

/***/ "./node_modules/lodash/_baseUnset.js":
/***/ (function(module, exports, __webpack_require__) {

var castPath = __webpack_require__("./node_modules/lodash/_castPath.js"),
    last = __webpack_require__("./node_modules/lodash/last.js"),
    parent = __webpack_require__("./node_modules/lodash/_parent.js"),
    toKey = __webpack_require__("./node_modules/lodash/_toKey.js");

/**
 * The base implementation of `_.unset`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The property path to unset.
 * @returns {boolean} Returns `true` if the property is deleted, else `false`.
 */
function baseUnset(object, path) {
  path = castPath(path, object);
  object = parent(object, path);
  return object == null || delete object[toKey(last(path))];
}

module.exports = baseUnset;


/***/ }),

/***/ "./node_modules/lodash/_cloneArrayBuffer.js":
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__("./node_modules/lodash/_Uint8Array.js");

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),

/***/ "./node_modules/lodash/_cloneBuffer.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__("./node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/lodash/_cloneDataView.js":
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__("./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),

/***/ "./node_modules/lodash/_cloneMap.js":
/***/ (function(module, exports, __webpack_require__) {

var addMapEntry = __webpack_require__("./node_modules/lodash/_addMapEntry.js"),
    arrayReduce = __webpack_require__("./node_modules/lodash/_arrayReduce.js"),
    mapToArray = __webpack_require__("./node_modules/lodash/_mapToArray.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), CLONE_DEEP_FLAG) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

module.exports = cloneMap;


/***/ }),

/***/ "./node_modules/lodash/_cloneRegExp.js":
/***/ (function(module, exports) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),

/***/ "./node_modules/lodash/_cloneSet.js":
/***/ (function(module, exports, __webpack_require__) {

var addSetEntry = __webpack_require__("./node_modules/lodash/_addSetEntry.js"),
    arrayReduce = __webpack_require__("./node_modules/lodash/_arrayReduce.js"),
    setToArray = __webpack_require__("./node_modules/lodash/_setToArray.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1;

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), CLONE_DEEP_FLAG) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

module.exports = cloneSet;


/***/ }),

/***/ "./node_modules/lodash/_cloneSymbol.js":
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__("./node_modules/lodash/_Symbol.js");

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),

/***/ "./node_modules/lodash/_cloneTypedArray.js":
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__("./node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),

/***/ "./node_modules/lodash/_copyArray.js":
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),

/***/ "./node_modules/lodash/_copyObject.js":
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__("./node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__("./node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),

/***/ "./node_modules/lodash/_copySymbols.js":
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__("./node_modules/lodash/_copyObject.js"),
    getSymbols = __webpack_require__("./node_modules/lodash/_getSymbols.js");

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),

/***/ "./node_modules/lodash/_copySymbolsIn.js":
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__("./node_modules/lodash/_copyObject.js"),
    getSymbolsIn = __webpack_require__("./node_modules/lodash/_getSymbolsIn.js");

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),

/***/ "./node_modules/lodash/_createBaseFor.js":
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),

/***/ "./node_modules/lodash/_customOmitClone.js":
/***/ (function(module, exports, __webpack_require__) {

var isPlainObject = __webpack_require__("./node_modules/lodash/isPlainObject.js");

/**
 * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
 * objects.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {string} key The key of the property to inspect.
 * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
 */
function customOmitClone(value) {
  return isPlainObject(value) ? undefined : value;
}

module.exports = customOmitClone;


/***/ }),

/***/ "./node_modules/lodash/_defineProperty.js":
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__("./node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),

/***/ "./node_modules/lodash/_flatRest.js":
/***/ (function(module, exports, __webpack_require__) {

var flatten = __webpack_require__("./node_modules/lodash/flatten.js"),
    overRest = __webpack_require__("./node_modules/lodash/_overRest.js"),
    setToString = __webpack_require__("./node_modules/lodash/_setToString.js");

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;


/***/ }),

/***/ "./node_modules/lodash/_getAllKeysIn.js":
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__("./node_modules/lodash/_baseGetAllKeys.js"),
    getSymbolsIn = __webpack_require__("./node_modules/lodash/_getSymbolsIn.js"),
    keysIn = __webpack_require__("./node_modules/lodash/keysIn.js");

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_getPrototype.js":
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__("./node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),

/***/ "./node_modules/lodash/_getSymbolsIn.js":
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__("./node_modules/lodash/_arrayPush.js"),
    getPrototype = __webpack_require__("./node_modules/lodash/_getPrototype.js"),
    getSymbols = __webpack_require__("./node_modules/lodash/_getSymbols.js"),
    stubArray = __webpack_require__("./node_modules/lodash/stubArray.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),

/***/ "./node_modules/lodash/_initCloneArray.js":
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),

/***/ "./node_modules/lodash/_initCloneByTag.js":
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__("./node_modules/lodash/_cloneArrayBuffer.js"),
    cloneDataView = __webpack_require__("./node_modules/lodash/_cloneDataView.js"),
    cloneMap = __webpack_require__("./node_modules/lodash/_cloneMap.js"),
    cloneRegExp = __webpack_require__("./node_modules/lodash/_cloneRegExp.js"),
    cloneSet = __webpack_require__("./node_modules/lodash/_cloneSet.js"),
    cloneSymbol = __webpack_require__("./node_modules/lodash/_cloneSymbol.js"),
    cloneTypedArray = __webpack_require__("./node_modules/lodash/_cloneTypedArray.js");

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),

/***/ "./node_modules/lodash/_initCloneObject.js":
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__("./node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__("./node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__("./node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),

/***/ "./node_modules/lodash/_isFlattenable.js":
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__("./node_modules/lodash/_Symbol.js"),
    isArguments = __webpack_require__("./node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__("./node_modules/lodash/isArray.js");

/** Built-in value references. */
var spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

module.exports = isFlattenable;


/***/ }),

/***/ "./node_modules/lodash/_nativeKeysIn.js":
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),

/***/ "./node_modules/lodash/_overRest.js":
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__("./node_modules/lodash/_apply.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),

/***/ "./node_modules/lodash/_parent.js":
/***/ (function(module, exports, __webpack_require__) {

var baseGet = __webpack_require__("./node_modules/lodash/_baseGet.js"),
    baseSlice = __webpack_require__("./node_modules/lodash/_baseSlice.js");

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}

module.exports = parent;


/***/ }),

/***/ "./node_modules/lodash/_setToString.js":
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__("./node_modules/lodash/_baseSetToString.js"),
    shortOut = __webpack_require__("./node_modules/lodash/_shortOut.js");

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),

/***/ "./node_modules/lodash/_shortOut.js":
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),

/***/ "./node_modules/lodash/_strictIndexOf.js":
/***/ (function(module, exports) {

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = strictIndexOf;


/***/ }),

/***/ "./node_modules/lodash/constant.js":
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),

/***/ "./node_modules/lodash/debounce.js":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("./node_modules/lodash/isObject.js"),
    now = __webpack_require__("./node_modules/lodash/now.js"),
    toNumber = __webpack_require__("./node_modules/lodash/toNumber.js");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/lodash/findKey.js":
/***/ (function(module, exports, __webpack_require__) {

var baseFindKey = __webpack_require__("./node_modules/lodash/_baseFindKey.js"),
    baseForOwn = __webpack_require__("./node_modules/lodash/_baseForOwn.js"),
    baseIteratee = __webpack_require__("./node_modules/lodash/_baseIteratee.js");

/**
 * This method is like `_.find` except that it returns the key of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {Function} [predicate=_.identity] The function invoked per iteration.
 * @returns {string|undefined} Returns the key of the matched element,
 *  else `undefined`.
 * @example
 *
 * var users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * };
 *
 * _.findKey(users, function(o) { return o.age < 40; });
 * // => 'barney' (iteration order is not guaranteed)
 *
 * // The `_.matches` iteratee shorthand.
 * _.findKey(users, { 'age': 1, 'active': true });
 * // => 'pebbles'
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findKey(users, ['active', false]);
 * // => 'fred'
 *
 * // The `_.property` iteratee shorthand.
 * _.findKey(users, 'active');
 * // => 'barney'
 */
function findKey(object, predicate) {
  return baseFindKey(object, baseIteratee(predicate, 3), baseForOwn);
}

module.exports = findKey;


/***/ }),

/***/ "./node_modules/lodash/flatten.js":
/***/ (function(module, exports, __webpack_require__) {

var baseFlatten = __webpack_require__("./node_modules/lodash/_baseFlatten.js");

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;


/***/ }),

/***/ "./node_modules/lodash/isArrayLikeObject.js":
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__("./node_modules/lodash/isArrayLike.js"),
    isObjectLike = __webpack_require__("./node_modules/lodash/isObjectLike.js");

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),

/***/ "./node_modules/lodash/isPlainObject.js":
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__("./node_modules/lodash/_baseGetTag.js"),
    getPrototype = __webpack_require__("./node_modules/lodash/_getPrototype.js"),
    isObjectLike = __webpack_require__("./node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),

/***/ "./node_modules/lodash/keysIn.js":
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__("./node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__("./node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__("./node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),

/***/ "./node_modules/lodash/last.js":
/***/ (function(module, exports) {

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array == null ? 0 : array.length;
  return length ? array[length - 1] : undefined;
}

module.exports = last;


/***/ }),

/***/ "./node_modules/lodash/now.js":
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__("./node_modules/lodash/_root.js");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "./node_modules/lodash/omit.js":
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__("./node_modules/lodash/_arrayMap.js"),
    baseClone = __webpack_require__("./node_modules/lodash/_baseClone.js"),
    baseUnset = __webpack_require__("./node_modules/lodash/_baseUnset.js"),
    castPath = __webpack_require__("./node_modules/lodash/_castPath.js"),
    copyObject = __webpack_require__("./node_modules/lodash/_copyObject.js"),
    customOmitClone = __webpack_require__("./node_modules/lodash/_customOmitClone.js"),
    flatRest = __webpack_require__("./node_modules/lodash/_flatRest.js"),
    getAllKeysIn = __webpack_require__("./node_modules/lodash/_getAllKeysIn.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable property paths of `object` that are not omitted.
 *
 * **Note:** This method is considerably slower than `_.pick`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to omit.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = flatRest(function(object, paths) {
  var result = {};
  if (object == null) {
    return result;
  }
  var isDeep = false;
  paths = arrayMap(paths, function(path) {
    path = castPath(path, object);
    isDeep || (isDeep = path.length > 1);
    return path;
  });
  copyObject(object, getAllKeysIn(object), result);
  if (isDeep) {
    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
  }
  var length = paths.length;
  while (length--) {
    baseUnset(result, paths[length]);
  }
  return result;
});

module.exports = omit;


/***/ }),

/***/ "./node_modules/lodash/without.js":
/***/ (function(module, exports, __webpack_require__) {

var baseDifference = __webpack_require__("./node_modules/lodash/_baseDifference.js"),
    baseRest = __webpack_require__("./node_modules/lodash/_baseRest.js"),
    isArrayLikeObject = __webpack_require__("./node_modules/lodash/isArrayLikeObject.js");

/**
 * Creates an array excluding all given values using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * **Note:** Unlike `_.pull`, this method returns a new array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {...*} [values] The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 * @see _.difference, _.xor
 * @example
 *
 * _.without([2, 1, 2, 3], 1, 2);
 * // => [3]
 */
var without = baseRest(function(array, values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, values)
    : [];
});

module.exports = without;


/***/ }),

/***/ "./node_modules/normalizr/dist/src/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.denormalize = exports.normalize = exports.schema = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Entity = __webpack_require__("./node_modules/normalizr/dist/src/schemas/Entity.js");

var _Entity2 = _interopRequireDefault(_Entity);

var _Union = __webpack_require__("./node_modules/normalizr/dist/src/schemas/Union.js");

var _Union2 = _interopRequireDefault(_Union);

var _Values = __webpack_require__("./node_modules/normalizr/dist/src/schemas/Values.js");

var _Values2 = _interopRequireDefault(_Values);

var _Array = __webpack_require__("./node_modules/normalizr/dist/src/schemas/Array.js");

var ArrayUtils = _interopRequireWildcard(_Array);

var _Object = __webpack_require__("./node_modules/normalizr/dist/src/schemas/Object.js");

var ObjectUtils = _interopRequireWildcard(_Object);

var _ImmutableUtils = __webpack_require__("./node_modules/normalizr/dist/src/schemas/ImmutableUtils.js");

var ImmutableUtils = _interopRequireWildcard(_ImmutableUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var visit = function visit(value, parent, key, schema, addEntity) {
  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || !value) {
    return value;
  }

  if ((typeof schema === 'undefined' ? 'undefined' : _typeof(schema)) === 'object' && (!schema.normalize || typeof schema.normalize !== 'function')) {
    var method = Array.isArray(schema) ? ArrayUtils.normalize : ObjectUtils.normalize;
    return method(schema, value, parent, key, visit, addEntity);
  }

  return schema.normalize(value, parent, key, visit, addEntity);
};

var addEntities = function addEntities(entities) {
  return function (schema, processedEntity, value, parent, key) {
    var schemaKey = schema.key;
    var id = schema.getId(value, parent, key);
    if (!(schemaKey in entities)) {
      entities[schemaKey] = {};
    }

    var existingEntity = entities[schemaKey][id];
    if (existingEntity) {
      entities[schemaKey][id] = schema.merge(existingEntity, processedEntity);
    } else {
      entities[schemaKey][id] = processedEntity;
    }
  };
};

var schema = exports.schema = {
  Array: ArrayUtils.default,
  Entity: _Entity2.default,
  Object: ObjectUtils.default,
  Union: _Union2.default,
  Values: _Values2.default
};

var normalize = exports.normalize = function normalize(input, schema) {
  if (!input || (typeof input === 'undefined' ? 'undefined' : _typeof(input)) !== 'object') {
    throw new Error('Unexpected input given to normalize. Expected type to be "object", found "' + (typeof input === 'undefined' ? 'undefined' : _typeof(input)) + '".');
  }

  var entities = {};
  var addEntity = addEntities(entities);

  var result = visit(input, input, null, schema, addEntity);
  return { entities: entities, result: result };
};

var unvisitEntity = function unvisitEntity(id, schema, unvisit, getEntity, cache) {
  var entity = getEntity(id, schema);
  if ((typeof entity === 'undefined' ? 'undefined' : _typeof(entity)) !== 'object' || entity === null) {
    return entity;
  }

  if (!cache[schema.key]) {
    cache[schema.key] = {};
  }

  if (!cache[schema.key][id]) {
    // Ensure we don't mutate it non-immutable objects
    var entityCopy = ImmutableUtils.isImmutable(entity) ? entity : _extends({}, entity);

    // Need to set this first so that if it is referenced further within the
    // denormalization the reference will already exist.
    cache[schema.key][id] = entityCopy;
    cache[schema.key][id] = schema.denormalize(entityCopy, unvisit);
  }

  return cache[schema.key][id];
};

var getUnvisit = function getUnvisit(entities) {
  var cache = {};
  var getEntity = getEntities(entities);

  return function unvisit(input, schema) {
    if ((typeof schema === 'undefined' ? 'undefined' : _typeof(schema)) === 'object' && (!schema.denormalize || typeof schema.denormalize !== 'function')) {
      var method = Array.isArray(schema) ? ArrayUtils.denormalize : ObjectUtils.denormalize;
      return method(schema, input, unvisit);
    }

    if (input === undefined || input === null) {
      return input;
    }

    if (schema instanceof _Entity2.default) {
      return unvisitEntity(input, schema, unvisit, getEntity, cache);
    }

    return schema.denormalize(input, unvisit);
  };
};

var getEntities = function getEntities(entities) {
  var isImmutable = ImmutableUtils.isImmutable(entities);

  return function (entityOrId, schema) {
    var schemaKey = schema.key;

    if ((typeof entityOrId === 'undefined' ? 'undefined' : _typeof(entityOrId)) === 'object') {
      return entityOrId;
    }

    return isImmutable ? entities.getIn([schemaKey, entityOrId.toString()]) : entities[schemaKey][entityOrId];
  };
};

var denormalize = exports.denormalize = function denormalize(input, schema, entities) {
  if (typeof input !== 'undefined') {
    return getUnvisit(entities)(input, schema);
  }
};

/***/ }),

/***/ "./node_modules/normalizr/dist/src/schemas/Array.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.denormalize = exports.normalize = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Polymorphic = __webpack_require__("./node_modules/normalizr/dist/src/schemas/Polymorphic.js");

var _Polymorphic2 = _interopRequireDefault(_Polymorphic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var validateSchema = function validateSchema(definition) {
  var isArray = Array.isArray(definition);
  if (isArray && definition.length > 1) {
    throw new Error('Expected schema definition to be a single schema, but found ' + definition.length + '.');
  }

  return definition[0];
};

var getValues = function getValues(input) {
  return Array.isArray(input) ? input : Object.keys(input).map(function (key) {
    return input[key];
  });
};

var normalize = exports.normalize = function normalize(schema, input, parent, key, visit, addEntity) {
  schema = validateSchema(schema);

  var values = getValues(input);

  // Special case: Arrays pass *their* parent on to their children, since there
  // is not any special information that can be gathered from themselves directly
  return values.map(function (value, index) {
    return visit(value, parent, key, schema, addEntity);
  });
};

var denormalize = exports.denormalize = function denormalize(schema, input, unvisit) {
  schema = validateSchema(schema);
  return input && input.map ? input.map(function (entityOrId) {
    return unvisit(entityOrId, schema);
  }) : input;
};

var ArraySchema = function (_PolymorphicSchema) {
  _inherits(ArraySchema, _PolymorphicSchema);

  function ArraySchema() {
    _classCallCheck(this, ArraySchema);

    return _possibleConstructorReturn(this, (ArraySchema.__proto__ || Object.getPrototypeOf(ArraySchema)).apply(this, arguments));
  }

  _createClass(ArraySchema, [{
    key: 'normalize',
    value: function normalize(input, parent, key, visit, addEntity) {
      var _this2 = this;

      var values = getValues(input);

      return values.map(function (value, index) {
        return _this2.normalizeValue(value, parent, key, visit, addEntity);
      }).filter(function (value) {
        return value !== undefined && value !== null;
      });
    }
  }, {
    key: 'denormalize',
    value: function denormalize(input, unvisit) {
      var _this3 = this;

      return input && input.map ? input.map(function (value) {
        return _this3.denormalizeValue(value, unvisit);
      }) : input;
    }
  }]);

  return ArraySchema;
}(_Polymorphic2.default);

exports.default = ArraySchema;

/***/ }),

/***/ "./node_modules/normalizr/dist/src/schemas/Entity.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ImmutableUtils = __webpack_require__("./node_modules/normalizr/dist/src/schemas/ImmutableUtils.js");

var ImmutableUtils = _interopRequireWildcard(_ImmutableUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getDefaultGetId = function getDefaultGetId(idAttribute) {
  return function (input) {
    return ImmutableUtils.isImmutable(input) ? input.get(idAttribute) : input[idAttribute];
  };
};

var EntitySchema = function () {
  function EntitySchema(key) {
    var definition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, EntitySchema);

    if (!key || typeof key !== 'string') {
      throw new Error('Expected a string key for Entity, but found ' + key + '.');
    }

    var _options$idAttribute = options.idAttribute,
        idAttribute = _options$idAttribute === undefined ? 'id' : _options$idAttribute,
        _options$mergeStrateg = options.mergeStrategy,
        mergeStrategy = _options$mergeStrateg === undefined ? function (entityA, entityB) {
      return _extends({}, entityA, entityB);
    } : _options$mergeStrateg,
        _options$processStrat = options.processStrategy,
        processStrategy = _options$processStrat === undefined ? function (input) {
      return _extends({}, input);
    } : _options$processStrat;


    this._key = key;
    this._getId = typeof idAttribute === 'function' ? idAttribute : getDefaultGetId(idAttribute);
    this._idAttribute = idAttribute;
    this._mergeStrategy = mergeStrategy;
    this._processStrategy = processStrategy;
    this.define(definition);
  }

  _createClass(EntitySchema, [{
    key: 'define',
    value: function define(definition) {
      this.schema = Object.keys(definition).reduce(function (entitySchema, key) {
        var schema = definition[key];
        return _extends({}, entitySchema, _defineProperty({}, key, schema));
      }, this.schema || {});
    }
  }, {
    key: 'getId',
    value: function getId(input, parent, key) {
      return this._getId(input, parent, key);
    }
  }, {
    key: 'merge',
    value: function merge(entityA, entityB) {
      return this._mergeStrategy(entityA, entityB);
    }
  }, {
    key: 'normalize',
    value: function normalize(input, parent, key, visit, addEntity) {
      var _this = this;

      var processedEntity = this._processStrategy(input, parent, key);
      Object.keys(this.schema).forEach(function (key) {
        if (processedEntity.hasOwnProperty(key) && _typeof(processedEntity[key]) === 'object') {
          var schema = _this.schema[key];
          processedEntity[key] = visit(processedEntity[key], processedEntity, key, schema, addEntity);
        }
      });

      addEntity(this, processedEntity, input, parent, key);
      return this.getId(input, parent, key);
    }
  }, {
    key: 'denormalize',
    value: function denormalize(entity, unvisit) {
      var _this2 = this;

      if (ImmutableUtils.isImmutable(entity)) {
        return ImmutableUtils.denormalizeImmutable(this.schema, entity, unvisit);
      }

      Object.keys(this.schema).forEach(function (key) {
        if (entity.hasOwnProperty(key)) {
          var schema = _this2.schema[key];
          entity[key] = unvisit(entity[key], schema);
        }
      });
      return entity;
    }
  }, {
    key: 'key',
    get: function get() {
      return this._key;
    }
  }, {
    key: 'idAttribute',
    get: function get() {
      return this._idAttribute;
    }
  }]);

  return EntitySchema;
}();

exports.default = EntitySchema;

/***/ }),

/***/ "./node_modules/normalizr/dist/src/schemas/ImmutableUtils.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isImmutable = isImmutable;
exports.denormalizeImmutable = denormalizeImmutable;
/**
 * Helpers to enable Immutable compatibility *without* bringing in
 * the 'immutable' package as a dependency.
 */

/**
 * Check if an object is immutable by checking if it has a key specific
 * to the immutable library.
 *
 * @param  {any} object
 * @return {bool}
 */
function isImmutable(object) {
  return !!(object && typeof object.hasOwnProperty === 'function' && (object.hasOwnProperty('__ownerID') || // Immutable.Map
  object._map && object._map.hasOwnProperty('__ownerID') // Immutable.Record
  ));
}

/**
 * Denormalize an immutable entity.
 *
 * @param  {Schema} schema
 * @param  {Immutable.Map|Immutable.Record} input
 * @param  {function} unvisit
 * @param  {function} getDenormalizedEntity
 * @return {Immutable.Map|Immutable.Record}
 */
function denormalizeImmutable(schema, input, unvisit) {
  return Object.keys(schema).reduce(function (object, key) {
    // Immutable maps cast keys to strings on write so we need to ensure
    // we're accessing them using string keys.
    var stringKey = '' + key;

    if (object.has(stringKey)) {
      return object.set(stringKey, unvisit(object.get(stringKey), schema[stringKey]));
    } else {
      return object;
    }
  }, input);
}

/***/ }),

/***/ "./node_modules/normalizr/dist/src/schemas/Object.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.denormalize = exports.normalize = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ImmutableUtils = __webpack_require__("./node_modules/normalizr/dist/src/schemas/ImmutableUtils.js");

var ImmutableUtils = _interopRequireWildcard(_ImmutableUtils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _normalize = function _normalize(schema, input, parent, key, visit, addEntity) {
  var object = _extends({}, input);
  Object.keys(schema).forEach(function (key) {
    var localSchema = schema[key];
    var value = visit(input[key], input, key, localSchema, addEntity);
    if (value === undefined || value === null) {
      delete object[key];
    } else {
      object[key] = value;
    }
  });
  return object;
};

exports.normalize = _normalize;
var _denormalize = function _denormalize(schema, input, unvisit) {
  if (ImmutableUtils.isImmutable(input)) {
    return ImmutableUtils.denormalizeImmutable(schema, input, unvisit);
  }

  var object = _extends({}, input);
  Object.keys(schema).forEach(function (key) {
    if (object[key]) {
      object[key] = unvisit(object[key], schema[key]);
    }
  });
  return object;
};

exports.denormalize = _denormalize;

var ObjectSchema = function () {
  function ObjectSchema(definition) {
    _classCallCheck(this, ObjectSchema);

    this.define(definition);
  }

  _createClass(ObjectSchema, [{
    key: 'define',
    value: function define(definition) {
      this.schema = Object.keys(definition).reduce(function (entitySchema, key) {
        var schema = definition[key];
        return _extends({}, entitySchema, _defineProperty({}, key, schema));
      }, this.schema || {});
    }
  }, {
    key: 'normalize',
    value: function normalize() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _normalize.apply(undefined, [this.schema].concat(args));
    }
  }, {
    key: 'denormalize',
    value: function denormalize() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return _denormalize.apply(undefined, [this.schema].concat(args));
    }
  }]);

  return ObjectSchema;
}();

exports.default = ObjectSchema;

/***/ }),

/***/ "./node_modules/normalizr/dist/src/schemas/Polymorphic.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ImmutableUtils = __webpack_require__("./node_modules/normalizr/dist/src/schemas/ImmutableUtils.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PolymorphicSchema = function () {
  function PolymorphicSchema(definition, schemaAttribute) {
    _classCallCheck(this, PolymorphicSchema);

    if (schemaAttribute) {
      this._schemaAttribute = typeof schemaAttribute === 'string' ? function (input) {
        return input[schemaAttribute];
      } : schemaAttribute;
    }
    this.define(definition);
  }

  _createClass(PolymorphicSchema, [{
    key: 'define',
    value: function define(definition) {
      this.schema = definition;
    }
  }, {
    key: 'getSchemaAttribute',
    value: function getSchemaAttribute(input, parent, key) {
      return !this.isSingleSchema && this._schemaAttribute(input, parent, key);
    }
  }, {
    key: 'inferSchema',
    value: function inferSchema(input, parent, key) {
      if (this.isSingleSchema) {
        return this.schema;
      }

      var attr = this.getSchemaAttribute(input, parent, key);
      return this.schema[attr];
    }
  }, {
    key: 'normalizeValue',
    value: function normalizeValue(value, parent, key, visit, addEntity) {
      var schema = this.inferSchema(value, parent, key);
      if (!schema) {
        return value;
      }
      var normalizedValue = visit(value, parent, key, schema, addEntity);
      return this.isSingleSchema || normalizedValue === undefined || normalizedValue === null ? normalizedValue : { id: normalizedValue, schema: this.getSchemaAttribute(value, parent, key) };
    }
  }, {
    key: 'denormalizeValue',
    value: function denormalizeValue(value, unvisit) {
      var schemaKey = (0, _ImmutableUtils.isImmutable)(value) ? value.get('schema') : value.schema;
      if (!this.isSingleSchema && !schemaKey) {
        return value;
      }
      var id = (0, _ImmutableUtils.isImmutable)(value) ? value.get('id') : value.id;
      var schema = this.isSingleSchema ? this.schema : this.schema[schemaKey];
      return unvisit(id || value, schema);
    }
  }, {
    key: 'isSingleSchema',
    get: function get() {
      return !this._schemaAttribute;
    }
  }]);

  return PolymorphicSchema;
}();

exports.default = PolymorphicSchema;

/***/ }),

/***/ "./node_modules/normalizr/dist/src/schemas/Union.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Polymorphic = __webpack_require__("./node_modules/normalizr/dist/src/schemas/Polymorphic.js");

var _Polymorphic2 = _interopRequireDefault(_Polymorphic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UnionSchema = function (_PolymorphicSchema) {
  _inherits(UnionSchema, _PolymorphicSchema);

  function UnionSchema(definition, schemaAttribute) {
    _classCallCheck(this, UnionSchema);

    if (!schemaAttribute) {
      throw new Error('Expected option "schemaAttribute" not found on UnionSchema.');
    }
    return _possibleConstructorReturn(this, (UnionSchema.__proto__ || Object.getPrototypeOf(UnionSchema)).call(this, definition, schemaAttribute));
  }

  _createClass(UnionSchema, [{
    key: 'normalize',
    value: function normalize(input, parent, key, visit, addEntity) {
      return this.normalizeValue(input, parent, key, visit, addEntity);
    }
  }, {
    key: 'denormalize',
    value: function denormalize(input, unvisit) {
      return this.denormalizeValue(input, unvisit);
    }
  }]);

  return UnionSchema;
}(_Polymorphic2.default);

exports.default = UnionSchema;

/***/ }),

/***/ "./node_modules/normalizr/dist/src/schemas/Values.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Polymorphic = __webpack_require__("./node_modules/normalizr/dist/src/schemas/Polymorphic.js");

var _Polymorphic2 = _interopRequireDefault(_Polymorphic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValuesSchema = function (_PolymorphicSchema) {
  _inherits(ValuesSchema, _PolymorphicSchema);

  function ValuesSchema() {
    _classCallCheck(this, ValuesSchema);

    return _possibleConstructorReturn(this, (ValuesSchema.__proto__ || Object.getPrototypeOf(ValuesSchema)).apply(this, arguments));
  }

  _createClass(ValuesSchema, [{
    key: 'normalize',
    value: function normalize(input, parent, key, visit, addEntity) {
      var _this2 = this;

      return Object.keys(input).reduce(function (output, key, index) {
        var value = input[key];
        return value !== undefined && value !== null ? _extends({}, output, _defineProperty({}, key, _this2.normalizeValue(value, input, key, visit, addEntity))) : output;
      }, {});
    }
  }, {
    key: 'denormalize',
    value: function denormalize(input, unvisit) {
      var _this3 = this;

      return Object.keys(input).reduce(function (output, key) {
        var entityOrId = input[key];
        return _extends({}, output, _defineProperty({}, key, _this3.denormalizeValue(entityOrId, unvisit)));
      }, {});
    }
  }]);

  return ValuesSchema;
}(_Polymorphic2.default);

exports.default = ValuesSchema;

/***/ }),

/***/ "./node_modules/react-intl/lib/index.es.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLocaleData", function() { return addLocaleData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intlShape", function() { return intlShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "injectIntl", function() { return injectIntl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defineMessages", function() { return defineMessages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IntlProvider", function() { return IntlProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedDate", function() { return FormattedDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedTime", function() { return FormattedTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedRelative", function() { return FormattedRelative; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedNumber", function() { return FormattedNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedPlural", function() { return FormattedPlural; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedMessage", function() { return FormattedMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormattedHTMLMessage", function() { return FormattedHTMLMessage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__locale_data_index_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__locale_data_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__locale_data_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_intl_messageformat__ = __webpack_require__("./node_modules/intl-messageformat/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_intl_messageformat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_intl_messageformat__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_intl_relativeformat__ = __webpack_require__("./node_modules/intl-relativeformat/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_intl_relativeformat___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_intl_relativeformat__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types__ = __webpack_require__("./node_modules/prop-types/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__("./node_modules/react/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_invariant__ = __webpack_require__("./node_modules/invariant/browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_intl_format_cache__ = __webpack_require__("./node_modules/intl-format-cache/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_intl_format_cache___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_intl_format_cache__);
/*
 * Copyright 2017, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */









// GENERATED FILE
var defaultLocaleData = { "locale": "en", "pluralRuleFunction": function pluralRuleFunction(n, ord) {
    var s = String(n).split("."),
        v0 = !s[1],
        t0 = Number(s[0]) == n,
        n10 = t0 && s[0].slice(-1),
        n100 = t0 && s[0].slice(-2);if (ord) return n10 == 1 && n100 != 11 ? "one" : n10 == 2 && n100 != 12 ? "two" : n10 == 3 && n100 != 13 ? "few" : "other";return n == 1 && v0 ? "one" : "other";
  }, "fields": { "year": { "displayName": "year", "relative": { "0": "this year", "1": "next year", "-1": "last year" }, "relativeTime": { "future": { "one": "in {0} year", "other": "in {0} years" }, "past": { "one": "{0} year ago", "other": "{0} years ago" } } }, "month": { "displayName": "month", "relative": { "0": "this month", "1": "next month", "-1": "last month" }, "relativeTime": { "future": { "one": "in {0} month", "other": "in {0} months" }, "past": { "one": "{0} month ago", "other": "{0} months ago" } } }, "day": { "displayName": "day", "relative": { "0": "today", "1": "tomorrow", "-1": "yesterday" }, "relativeTime": { "future": { "one": "in {0} day", "other": "in {0} days" }, "past": { "one": "{0} day ago", "other": "{0} days ago" } } }, "hour": { "displayName": "hour", "relative": { "0": "this hour" }, "relativeTime": { "future": { "one": "in {0} hour", "other": "in {0} hours" }, "past": { "one": "{0} hour ago", "other": "{0} hours ago" } } }, "minute": { "displayName": "minute", "relative": { "0": "this minute" }, "relativeTime": { "future": { "one": "in {0} minute", "other": "in {0} minutes" }, "past": { "one": "{0} minute ago", "other": "{0} minutes ago" } } }, "second": { "displayName": "second", "relative": { "0": "now" }, "relativeTime": { "future": { "one": "in {0} second", "other": "in {0} seconds" }, "past": { "one": "{0} second ago", "other": "{0} seconds ago" } } } } };

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

function addLocaleData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var locales = Array.isArray(data) ? data : [data];

  locales.forEach(function (localeData) {
    if (localeData && localeData.locale) {
      __WEBPACK_IMPORTED_MODULE_1_intl_messageformat___default.a.__addLocaleData(localeData);
      __WEBPACK_IMPORTED_MODULE_2_intl_relativeformat___default.a.__addLocaleData(localeData);
    }
  });
}

function hasLocaleData(locale) {
  var localeParts = (locale || '').split('-');

  while (localeParts.length > 0) {
    if (hasIMFAndIRFLocaleData(localeParts.join('-'))) {
      return true;
    }

    localeParts.pop();
  }

  return false;
}

function hasIMFAndIRFLocaleData(locale) {
  var normalizedLocale = locale && locale.toLowerCase();

  return !!(__WEBPACK_IMPORTED_MODULE_1_intl_messageformat___default.a.__localeData__[normalizedLocale] && __WEBPACK_IMPORTED_MODULE_2_intl_relativeformat___default.a.__localeData__[normalizedLocale]);
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



















var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var bool = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.bool;
var number = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.number;
var string = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string;
var func = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func;
var object = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object;
var oneOf = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.oneOf;
var shape = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.shape;
var any = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any;
var oneOfType = __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.oneOfType;

var localeMatcher = oneOf(['best fit', 'lookup']);
var narrowShortLong = oneOf(['narrow', 'short', 'long']);
var numeric2digit = oneOf(['numeric', '2-digit']);
var funcReq = func.isRequired;

var intlConfigPropTypes = {
  locale: string,
  formats: object,
  messages: object,
  textComponent: any,

  defaultLocale: string,
  defaultFormats: object
};

var intlFormatPropTypes = {
  formatDate: funcReq,
  formatTime: funcReq,
  formatRelative: funcReq,
  formatNumber: funcReq,
  formatPlural: funcReq,
  formatMessage: funcReq,
  formatHTMLMessage: funcReq
};

var intlShape = shape(_extends({}, intlConfigPropTypes, intlFormatPropTypes, {
  formatters: object,
  now: funcReq
}));

var messageDescriptorPropTypes = {
  id: string.isRequired,
  description: oneOfType([string, object]),
  defaultMessage: string
};

var dateTimeFormatPropTypes = {
  localeMatcher: localeMatcher,
  formatMatcher: oneOf(['basic', 'best fit']),

  timeZone: string,
  hour12: bool,

  weekday: narrowShortLong,
  era: narrowShortLong,
  year: numeric2digit,
  month: oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
  day: numeric2digit,
  hour: numeric2digit,
  minute: numeric2digit,
  second: numeric2digit,
  timeZoneName: oneOf(['short', 'long'])
};

var numberFormatPropTypes = {
  localeMatcher: localeMatcher,

  style: oneOf(['decimal', 'currency', 'percent']),
  currency: string,
  currencyDisplay: oneOf(['symbol', 'code', 'name']),
  useGrouping: bool,

  minimumIntegerDigits: number,
  minimumFractionDigits: number,
  maximumFractionDigits: number,
  minimumSignificantDigits: number,
  maximumSignificantDigits: number
};

var relativeFormatPropTypes = {
  style: oneOf(['best fit', 'numeric']),
  units: oneOf(['second', 'minute', 'hour', 'day', 'month', 'year'])
};

var pluralFormatPropTypes = {
  style: oneOf(['cardinal', 'ordinal'])
};

/*
HTML escaping and shallow-equals implementations are the same as React's
(on purpose.) Therefore, it has the following Copyright and Licensing:

Copyright 2013-2014, Facebook, Inc.
All rights reserved.

This source code is licensed under the BSD-style license found in the LICENSE
file in the root directory of React's source tree.
*/

var intlConfigPropNames = Object.keys(intlConfigPropTypes);

var ESCAPED_CHARS = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  "'": '&#x27;'
};

var UNSAFE_CHARS_REGEX = /[&><"']/g;

function escape(str) {
  return ('' + str).replace(UNSAFE_CHARS_REGEX, function (match) {
    return ESCAPED_CHARS[match];
  });
}

function filterProps(props, whitelist) {
  var defaults$$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return whitelist.reduce(function (filtered, name) {
    if (props.hasOwnProperty(name)) {
      filtered[name] = props[name];
    } else if (defaults$$1.hasOwnProperty(name)) {
      filtered[name] = defaults$$1[name];
    }

    return filtered;
  }, {});
}

function invariantIntlContext() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      intl = _ref.intl;

  __WEBPACK_IMPORTED_MODULE_5_invariant___default()(intl, '[React Intl] Could not find required `intl` object. ' + '<IntlProvider> needs to exist in the component ancestry.');
}

function shallowEquals(objA, objB) {
  if (objA === objB) {
    return true;
  }

  if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var i = 0; i < keysA.length; i++) {
    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

function shouldIntlComponentUpdate(_ref2, nextProps, nextState) {
  var props = _ref2.props,
      state = _ref2.state,
      _ref2$context = _ref2.context,
      context = _ref2$context === undefined ? {} : _ref2$context;
  var nextContext = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _context$intl = context.intl,
      intl = _context$intl === undefined ? {} : _context$intl;
  var _nextContext$intl = nextContext.intl,
      nextIntl = _nextContext$intl === undefined ? {} : _nextContext$intl;


  return !shallowEquals(nextProps, props) || !shallowEquals(nextState, state) || !(nextIntl === intl || shallowEquals(filterProps(nextIntl, intlConfigPropNames), filterProps(intl, intlConfigPropNames)));
}

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

// Inspired by react-redux's `connect()` HOC factory function implementation:
// https://github.com/rackt/react-redux

function getDisplayName(Component$$1) {
  return Component$$1.displayName || Component$$1.name || 'Component';
}

function injectIntl(WrappedComponent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$intlPropName = options.intlPropName,
      intlPropName = _options$intlPropName === undefined ? 'intl' : _options$intlPropName,
      _options$withRef = options.withRef,
      withRef = _options$withRef === undefined ? false : _options$withRef;

  var InjectIntl = function (_Component) {
    inherits(InjectIntl, _Component);

    function InjectIntl(props, context) {
      classCallCheck(this, InjectIntl);

      var _this = possibleConstructorReturn(this, (InjectIntl.__proto__ || Object.getPrototypeOf(InjectIntl)).call(this, props, context));

      invariantIntlContext(context);
      return _this;
    }

    createClass(InjectIntl, [{
      key: 'getWrappedInstance',
      value: function getWrappedInstance() {
        __WEBPACK_IMPORTED_MODULE_5_invariant___default()(withRef, '[React Intl] To access the wrapped instance, ' + 'the `{withRef: true}` option must be set when calling: ' + '`injectIntl()`');

        return this.refs.wrappedInstance;
      }
    }, {
      key: 'render',
      value: function render() {
        return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(WrappedComponent, _extends({}, this.props, defineProperty({}, intlPropName, this.context.intl), {
          ref: withRef ? 'wrappedInstance' : null
        }));
      }
    }]);
    return InjectIntl;
  }(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

  InjectIntl.displayName = 'InjectIntl(' + getDisplayName(WrappedComponent) + ')';
  InjectIntl.contextTypes = {
    intl: intlShape
  };
  InjectIntl.WrappedComponent = WrappedComponent;


  return InjectIntl;
}

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

function defineMessages(messageDescriptors) {
  // This simply returns what's passed-in because it's meant to be a hook for
  // babel-plugin-react-intl.
  return messageDescriptors;
}

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

// This is a "hack" until a proper `intl-pluralformat` package is created.

function resolveLocale(locales) {
  // IntlMessageFormat#_resolveLocale() does not depend on `this`.
  return __WEBPACK_IMPORTED_MODULE_1_intl_messageformat___default.a.prototype._resolveLocale(locales);
}

function findPluralFunction(locale) {
  // IntlMessageFormat#_findPluralFunction() does not depend on `this`.
  return __WEBPACK_IMPORTED_MODULE_1_intl_messageformat___default.a.prototype._findPluralRuleFunction(locale);
}

var IntlPluralFormat = function IntlPluralFormat(locales) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  classCallCheck(this, IntlPluralFormat);

  var useOrdinal = options.style === 'ordinal';
  var pluralFn = findPluralFunction(resolveLocale(locales));

  this.format = function (value) {
    return pluralFn(value, useOrdinal);
  };
};

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var DATE_TIME_FORMAT_OPTIONS = Object.keys(dateTimeFormatPropTypes);
var NUMBER_FORMAT_OPTIONS = Object.keys(numberFormatPropTypes);
var RELATIVE_FORMAT_OPTIONS = Object.keys(relativeFormatPropTypes);
var PLURAL_FORMAT_OPTIONS = Object.keys(pluralFormatPropTypes);

var RELATIVE_FORMAT_THRESHOLDS = {
  second: 60, // seconds to minute
  minute: 60, // minutes to hour
  hour: 24, // hours to day
  day: 30, // days to month
  month: 12 // months to year
};

function updateRelativeFormatThresholds(newThresholds) {
  var thresholds = __WEBPACK_IMPORTED_MODULE_2_intl_relativeformat___default.a.thresholds;
  thresholds.second = newThresholds.second;
  thresholds.minute = newThresholds.minute;
  thresholds.hour = newThresholds.hour;
  thresholds.day = newThresholds.day;
  thresholds.month = newThresholds.month;
}

function getNamedFormat(formats, type, name) {
  var format = formats && formats[type] && formats[type][name];
  if (format) {
    return format;
  }

  if (true) {
    console.error('[React Intl] No ' + type + ' format named: ' + name);
  }
}

function formatDate(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;


  var date = new Date(value);
  var defaults$$1 = format && getNamedFormat(formats, 'date', format);
  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    if (true) {
      console.error('[React Intl] Error formatting date.\n' + e);
    }
  }

  return String(date);
}

function formatTime(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;


  var date = new Date(value);
  var defaults$$1 = format && getNamedFormat(formats, 'time', format);
  var filteredOptions = filterProps(options, DATE_TIME_FORMAT_OPTIONS, defaults$$1);

  if (!filteredOptions.hour && !filteredOptions.minute && !filteredOptions.second) {
    // Add default formatting options if hour, minute, or second isn't defined.
    filteredOptions = _extends({}, filteredOptions, { hour: 'numeric', minute: 'numeric' });
  }

  try {
    return state.getDateTimeFormat(locale, filteredOptions).format(date);
  } catch (e) {
    if (true) {
      console.error('[React Intl] Error formatting time.\n' + e);
    }
  }

  return String(date);
}

function formatRelative(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;


  var date = new Date(value);
  var now = new Date(options.now);
  var defaults$$1 = format && getNamedFormat(formats, 'relative', format);
  var filteredOptions = filterProps(options, RELATIVE_FORMAT_OPTIONS, defaults$$1);

  // Capture the current threshold values, then temporarily override them with
  // specific values just for this render.
  var oldThresholds = _extends({}, __WEBPACK_IMPORTED_MODULE_2_intl_relativeformat___default.a.thresholds);
  updateRelativeFormatThresholds(RELATIVE_FORMAT_THRESHOLDS);

  try {
    return state.getRelativeFormat(locale, filteredOptions).format(date, {
      now: isFinite(now) ? now : state.now()
    });
  } catch (e) {
    if (true) {
      console.error('[React Intl] Error formatting relative time.\n' + e);
    }
  } finally {
    updateRelativeFormatThresholds(oldThresholds);
  }

  return String(date);
}

function formatNumber(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats;
  var format = options.format;


  var defaults$$1 = format && getNamedFormat(formats, 'number', format);
  var filteredOptions = filterProps(options, NUMBER_FORMAT_OPTIONS, defaults$$1);

  try {
    return state.getNumberFormat(locale, filteredOptions).format(value);
  } catch (e) {
    if (true) {
      console.error('[React Intl] Error formatting number.\n' + e);
    }
  }

  return String(value);
}

function formatPlural(config, state, value) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale;


  var filteredOptions = filterProps(options, PLURAL_FORMAT_OPTIONS);

  try {
    return state.getPluralFormat(locale, filteredOptions).format(value);
  } catch (e) {
    if (true) {
      console.error('[React Intl] Error formatting plural.\n' + e);
    }
  }

  return 'other';
}

function formatMessage(config, state) {
  var messageDescriptor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var values = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var locale = config.locale,
      formats = config.formats,
      messages = config.messages,
      defaultLocale = config.defaultLocale,
      defaultFormats = config.defaultFormats;
  var id = messageDescriptor.id,
      defaultMessage = messageDescriptor.defaultMessage;

  // `id` is a required field of a Message Descriptor.

  __WEBPACK_IMPORTED_MODULE_5_invariant___default()(id, '[React Intl] An `id` must be provided to format a message.');

  var message = messages && messages[id];
  var hasValues = Object.keys(values).length > 0;

  // Avoid expensive message formatting for simple messages without values. In
  // development messages will always be formatted in case of missing values.
  if (!hasValues && "development" === 'production') {
    return message || defaultMessage || id;
  }

  var formattedMessage = void 0;

  if (message) {
    try {
      var formatter = state.getMessageFormat(message, locale, formats);

      formattedMessage = formatter.format(values);
    } catch (e) {
      if (true) {
        console.error('[React Intl] Error formatting message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : '') + ('\n' + e));
      }
    }
  } else {
    if (true) {
      // This prevents warnings from littering the console in development
      // when no `messages` are passed into the <IntlProvider> for the
      // default locale, and a default message is in the source.
      if (!defaultMessage || locale && locale.toLowerCase() !== defaultLocale.toLowerCase()) {
        console.error('[React Intl] Missing message: "' + id + '" for locale: "' + locale + '"' + (defaultMessage ? ', using default message as fallback.' : ''));
      }
    }
  }

  if (!formattedMessage && defaultMessage) {
    try {
      var _formatter = state.getMessageFormat(defaultMessage, defaultLocale, defaultFormats);

      formattedMessage = _formatter.format(values);
    } catch (e) {
      if (true) {
        console.error('[React Intl] Error formatting the default message for: "' + id + '"' + ('\n' + e));
      }
    }
  }

  if (!formattedMessage) {
    if (true) {
      console.error('[React Intl] Cannot format message: "' + id + '", ' + ('using message ' + (message || defaultMessage ? 'source' : 'id') + ' as fallback.'));
    }
  }

  return formattedMessage || message || defaultMessage || id;
}

function formatHTMLMessage(config, state, messageDescriptor) {
  var rawValues = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  // Process all the values before they are used when formatting the ICU
  // Message string. Since the formatted message might be injected via
  // `innerHTML`, all String-based values need to be HTML-escaped.
  var escapedValues = Object.keys(rawValues).reduce(function (escaped, name) {
    var value = rawValues[name];
    escaped[name] = typeof value === 'string' ? escape(value) : value;
    return escaped;
  }, {});

  return formatMessage(config, state, messageDescriptor, escapedValues);
}



var format = Object.freeze({
	formatDate: formatDate,
	formatTime: formatTime,
	formatRelative: formatRelative,
	formatNumber: formatNumber,
	formatPlural: formatPlural,
	formatMessage: formatMessage,
	formatHTMLMessage: formatHTMLMessage
});

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var intlConfigPropNames$1 = Object.keys(intlConfigPropTypes);
var intlFormatPropNames = Object.keys(intlFormatPropTypes);

// These are not a static property on the `IntlProvider` class so the intl
// config values can be inherited from an <IntlProvider> ancestor.
var defaultProps = {
  formats: {},
  messages: {},
  textComponent: 'span',

  defaultLocale: 'en',
  defaultFormats: {}
};

var IntlProvider = function (_Component) {
  inherits(IntlProvider, _Component);

  function IntlProvider(props) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, IntlProvider);

    var _this = possibleConstructorReturn(this, (IntlProvider.__proto__ || Object.getPrototypeOf(IntlProvider)).call(this, props, context));

    __WEBPACK_IMPORTED_MODULE_5_invariant___default()(typeof Intl !== 'undefined', '[React Intl] The `Intl` APIs must be available in the runtime, ' + 'and do not appear to be built-in. An `Intl` polyfill should be loaded.\n' + 'See: http://formatjs.io/guides/runtime-environments/');

    var intlContext = context.intl;

    // Used to stabilize time when performing an initial rendering so that
    // all relative times use the same reference "now" time.

    var initialNow = void 0;
    if (isFinite(props.initialNow)) {
      initialNow = Number(props.initialNow);
    } else {
      // When an `initialNow` isn't provided via `props`, look to see an
      // <IntlProvider> exists in the ancestry and call its `now()`
      // function to propagate its value for "now".
      initialNow = intlContext ? intlContext.now() : Date.now();
    }

    // Creating `Intl*` formatters is expensive. If there's a parent
    // `<IntlProvider>`, then its formatters will be used. Otherwise, this
    // memoize the `Intl*` constructors and cache them for the lifecycle of
    // this IntlProvider instance.

    var _ref = intlContext || {},
        _ref$formatters = _ref.formatters,
        formatters = _ref$formatters === undefined ? {
      getDateTimeFormat: __WEBPACK_IMPORTED_MODULE_6_intl_format_cache___default()(Intl.DateTimeFormat),
      getNumberFormat: __WEBPACK_IMPORTED_MODULE_6_intl_format_cache___default()(Intl.NumberFormat),
      getMessageFormat: __WEBPACK_IMPORTED_MODULE_6_intl_format_cache___default()(__WEBPACK_IMPORTED_MODULE_1_intl_messageformat___default.a),
      getRelativeFormat: __WEBPACK_IMPORTED_MODULE_6_intl_format_cache___default()(__WEBPACK_IMPORTED_MODULE_2_intl_relativeformat___default.a),
      getPluralFormat: __WEBPACK_IMPORTED_MODULE_6_intl_format_cache___default()(IntlPluralFormat)
    } : _ref$formatters;

    _this.state = _extends({}, formatters, {

      // Wrapper to provide stable "now" time for initial render.
      now: function now() {
        return _this._didDisplay ? Date.now() : initialNow;
      }
    });
    return _this;
  }

  createClass(IntlProvider, [{
    key: 'getConfig',
    value: function getConfig() {
      var intlContext = this.context.intl;

      // Build a whitelisted config object from `props`, defaults, and
      // `context.intl`, if an <IntlProvider> exists in the ancestry.

      var config = filterProps(this.props, intlConfigPropNames$1, intlContext);

      // Apply default props. This must be applied last after the props have
      // been resolved and inherited from any <IntlProvider> in the ancestry.
      // This matches how React resolves `defaultProps`.
      for (var propName in defaultProps) {
        if (config[propName] === undefined) {
          config[propName] = defaultProps[propName];
        }
      }

      if (!hasLocaleData(config.locale)) {
        var _config = config,
            locale = _config.locale,
            defaultLocale = _config.defaultLocale,
            defaultFormats = _config.defaultFormats;


        if (true) {
          console.error('[React Intl] Missing locale data for locale: "' + locale + '". ' + ('Using default locale: "' + defaultLocale + '" as fallback.'));
        }

        // Since there's no registered locale data for `locale`, this will
        // fallback to the `defaultLocale` to make sure things can render.
        // The `messages` are overridden to the `defaultProps` empty object
        // to maintain referential equality across re-renders. It's assumed
        // each <FormattedMessage> contains a `defaultMessage` prop.
        config = _extends({}, config, {
          locale: defaultLocale,
          formats: defaultFormats,
          messages: defaultProps.messages
        });
      }

      return config;
    }
  }, {
    key: 'getBoundFormatFns',
    value: function getBoundFormatFns(config, state) {
      return intlFormatPropNames.reduce(function (boundFormatFns, name) {
        boundFormatFns[name] = format[name].bind(null, config, state);
        return boundFormatFns;
      }, {});
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      var config = this.getConfig();

      // Bind intl factories and current config to the format functions.
      var boundFormatFns = this.getBoundFormatFns(config, this.state);

      var _state = this.state,
          now = _state.now,
          formatters = objectWithoutProperties(_state, ['now']);


      return {
        intl: _extends({}, config, boundFormatFns, {
          formatters: formatters,
          now: now
        })
      };
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._didDisplay = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_4_react__["Children"].only(this.props.children);
    }
  }]);
  return IntlProvider;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

IntlProvider.displayName = 'IntlProvider';
IntlProvider.contextTypes = {
  intl: intlShape
};
IntlProvider.childContextTypes = {
  intl: intlShape.isRequired
};
 true ? IntlProvider.propTypes = _extends({}, intlConfigPropTypes, {
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.element.isRequired,
  initialNow: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedDate = function (_Component) {
  inherits(FormattedDate, _Component);

  function FormattedDate(props, context) {
    classCallCheck(this, FormattedDate);

    var _this = possibleConstructorReturn(this, (FormattedDate.__proto__ || Object.getPrototypeOf(FormattedDate)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedDate, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatDate = _context$intl.formatDate,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;


      var formattedDate = formatDate(value, this.props);

      if (typeof children === 'function') {
        return children(formattedDate);
      }

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        Text,
        null,
        formattedDate
      );
    }
  }]);
  return FormattedDate;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedDate.displayName = 'FormattedDate';
FormattedDate.contextTypes = {
  intl: intlShape
};
 true ? FormattedDate.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any.isRequired,
  format: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedTime = function (_Component) {
  inherits(FormattedTime, _Component);

  function FormattedTime(props, context) {
    classCallCheck(this, FormattedTime);

    var _this = possibleConstructorReturn(this, (FormattedTime.__proto__ || Object.getPrototypeOf(FormattedTime)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedTime, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatTime = _context$intl.formatTime,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;


      var formattedTime = formatTime(value, this.props);

      if (typeof children === 'function') {
        return children(formattedTime);
      }

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        Text,
        null,
        formattedTime
      );
    }
  }]);
  return FormattedTime;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedTime.displayName = 'FormattedTime';
FormattedTime.contextTypes = {
  intl: intlShape
};
 true ? FormattedTime.propTypes = _extends({}, dateTimeFormatPropTypes, {
  value: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any.isRequired,
  format: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var SECOND = 1000;
var MINUTE = 1000 * 60;
var HOUR = 1000 * 60 * 60;
var DAY = 1000 * 60 * 60 * 24;

// The maximum timer delay value is a 32-bit signed integer.
// See: https://mdn.io/setTimeout
var MAX_TIMER_DELAY = 2147483647;

function selectUnits(delta) {
  var absDelta = Math.abs(delta);

  if (absDelta < MINUTE) {
    return 'second';
  }

  if (absDelta < HOUR) {
    return 'minute';
  }

  if (absDelta < DAY) {
    return 'hour';
  }

  // The maximum scheduled delay will be measured in days since the maximum
  // timer delay is less than the number of milliseconds in 25 days.
  return 'day';
}

function getUnitDelay(units) {
  switch (units) {
    case 'second':
      return SECOND;
    case 'minute':
      return MINUTE;
    case 'hour':
      return HOUR;
    case 'day':
      return DAY;
    default:
      return MAX_TIMER_DELAY;
  }
}

function isSameDate(a, b) {
  if (a === b) {
    return true;
  }

  var aTime = new Date(a).getTime();
  var bTime = new Date(b).getTime();

  return isFinite(aTime) && isFinite(bTime) && aTime === bTime;
}

var FormattedRelative = function (_Component) {
  inherits(FormattedRelative, _Component);

  function FormattedRelative(props, context) {
    classCallCheck(this, FormattedRelative);

    var _this = possibleConstructorReturn(this, (FormattedRelative.__proto__ || Object.getPrototypeOf(FormattedRelative)).call(this, props, context));

    invariantIntlContext(context);

    var now = isFinite(props.initialNow) ? Number(props.initialNow) : context.intl.now();

    // `now` is stored as state so that `render()` remains a function of
    // props + state, instead of accessing `Date.now()` inside `render()`.
    _this.state = { now: now };
    return _this;
  }

  createClass(FormattedRelative, [{
    key: 'scheduleNextUpdate',
    value: function scheduleNextUpdate(props, state) {
      var _this2 = this;

      // Cancel and pending update because we're scheduling a new update.
      clearTimeout(this._timer);

      var value = props.value,
          units = props.units,
          updateInterval = props.updateInterval;

      var time = new Date(value).getTime();

      // If the `updateInterval` is falsy, including `0` or we don't have a
      // valid date, then auto updates have been turned off, so we bail and
      // skip scheduling an update.
      if (!updateInterval || !isFinite(time)) {
        return;
      }

      var delta = time - state.now;
      var unitDelay = getUnitDelay(units || selectUnits(delta));
      var unitRemainder = Math.abs(delta % unitDelay);

      // We want the largest possible timer delay which will still display
      // accurate information while reducing unnecessary re-renders. The delay
      // should be until the next "interesting" moment, like a tick from
      // "1 minute ago" to "2 minutes ago" when the delta is 120,000ms.
      var delay = delta < 0 ? Math.max(updateInterval, unitDelay - unitRemainder) : Math.max(updateInterval, unitRemainder);

      this._timer = setTimeout(function () {
        _this2.setState({ now: _this2.context.intl.now() });
      }, delay);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scheduleNextUpdate(this.props, this.state);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var nextValue = _ref.value;

      // When the `props.value` date changes, `state.now` needs to be updated,
      // and the next update can be rescheduled.
      if (!isSameDate(nextValue, this.props.value)) {
        this.setState({ now: this.context.intl.now() });
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      this.scheduleNextUpdate(nextProps, nextState);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._timer);
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatRelative = _context$intl.formatRelative,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;


      var formattedRelative = formatRelative(value, _extends({}, this.props, this.state));

      if (typeof children === 'function') {
        return children(formattedRelative);
      }

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        Text,
        null,
        formattedRelative
      );
    }
  }]);
  return FormattedRelative;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedRelative.displayName = 'FormattedRelative';
FormattedRelative.contextTypes = {
  intl: intlShape
};
FormattedRelative.defaultProps = {
  updateInterval: 1000 * 10
};
 true ? FormattedRelative.propTypes = _extends({}, relativeFormatPropTypes, {
  value: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any.isRequired,
  format: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  updateInterval: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.number,
  initialNow: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedNumber = function (_Component) {
  inherits(FormattedNumber, _Component);

  function FormattedNumber(props, context) {
    classCallCheck(this, FormattedNumber);

    var _this = possibleConstructorReturn(this, (FormattedNumber.__proto__ || Object.getPrototypeOf(FormattedNumber)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedNumber, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatNumber = _context$intl.formatNumber,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          children = _props.children;


      var formattedNumber = formatNumber(value, this.props);

      if (typeof children === 'function') {
        return children(formattedNumber);
      }

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        Text,
        null,
        formattedNumber
      );
    }
  }]);
  return FormattedNumber;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedNumber.displayName = 'FormattedNumber';
FormattedNumber.contextTypes = {
  intl: intlShape
};
 true ? FormattedNumber.propTypes = _extends({}, numberFormatPropTypes, {
  value: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any.isRequired,
  format: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedPlural = function (_Component) {
  inherits(FormattedPlural, _Component);

  function FormattedPlural(props, context) {
    classCallCheck(this, FormattedPlural);

    var _this = possibleConstructorReturn(this, (FormattedPlural.__proto__ || Object.getPrototypeOf(FormattedPlural)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedPlural, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      for (var _len = arguments.length, next = Array(_len), _key = 0; _key < _len; _key++) {
        next[_key] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatPlural = _context$intl.formatPlural,
          Text = _context$intl.textComponent;
      var _props = this.props,
          value = _props.value,
          other = _props.other,
          children = _props.children;


      var pluralCategory = formatPlural(value, this.props);
      var formattedPlural = this.props[pluralCategory] || other;

      if (typeof children === 'function') {
        return children(formattedPlural);
      }

      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        Text,
        null,
        formattedPlural
      );
    }
  }]);
  return FormattedPlural;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedPlural.displayName = 'FormattedPlural';
FormattedPlural.contextTypes = {
  intl: intlShape
};
FormattedPlural.defaultProps = {
  style: 'cardinal'
};
 true ? FormattedPlural.propTypes = _extends({}, pluralFormatPropTypes, {
  value: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.any.isRequired,

  other: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node.isRequired,
  zero: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node,
  one: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node,
  two: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node,
  few: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node,
  many: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.node,

  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedMessage = function (_Component) {
  inherits(FormattedMessage, _Component);

  function FormattedMessage(props, context) {
    classCallCheck(this, FormattedMessage);

    var _this = possibleConstructorReturn(this, (FormattedMessage.__proto__ || Object.getPrototypeOf(FormattedMessage)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;


      if (!shallowEquals(nextValues, values)) {
        return true;
      }

      // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.
      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatMessage = _context$intl.formatMessage,
          Text = _context$intl.textComponent;
      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          values = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;


      var tokenDelimiter = void 0;
      var tokenizedValues = void 0;
      var elements = void 0;

      var hasValues = values && Object.keys(values).length > 0;
      if (hasValues) {
        // Creates a token with a random UID that should not be guessable or
        // conflict with other parts of the `message` string.
        var uid = Math.floor(Math.random() * 0x10000000000).toString(16);

        var generateToken = function () {
          var counter = 0;
          return function () {
            return 'ELEMENT-' + uid + '-' + (counter += 1);
          };
        }();

        // Splitting with a delimiter to support IE8. When using a regex
        // with a capture group IE8 does not include the capture group in
        // the resulting array.
        tokenDelimiter = '@__' + uid + '__@';
        tokenizedValues = {};
        elements = {};

        // Iterates over the `props` to keep track of any React Element
        // values so they can be represented by the `token` as a placeholder
        // when the `message` is formatted. This allows the formatted
        // message to then be broken-up into parts with references to the
        // React Elements inserted back in.
        Object.keys(values).forEach(function (name) {
          var value = values[name];

          if (Object(__WEBPACK_IMPORTED_MODULE_4_react__["isValidElement"])(value)) {
            var token = generateToken();
            tokenizedValues[name] = tokenDelimiter + token + tokenDelimiter;
            elements[token] = value;
          } else {
            tokenizedValues[name] = value;
          }
        });
      }

      var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
      var formattedMessage = formatMessage(descriptor, tokenizedValues || values);

      var nodes = void 0;

      var hasElements = elements && Object.keys(elements).length > 0;
      if (hasElements) {
        // Split the message into parts so the React Element values captured
        // above can be inserted back into the rendered message. This
        // approach allows messages to render with React Elements while
        // keeping React's virtual diffing working properly.
        nodes = formattedMessage.split(tokenDelimiter).filter(function (part) {
          return !!part;
        }).map(function (part) {
          return elements[part] || part;
        });
      } else {
        nodes = [formattedMessage];
      }

      if (typeof children === 'function') {
        return children.apply(undefined, toConsumableArray(nodes));
      }

      // Needs to use `createElement()` instead of JSX, otherwise React will
      // warn about a missing `key` prop with rich-text message formatting.
      return __WEBPACK_IMPORTED_MODULE_4_react__["createElement"].apply(undefined, [Component$$1, null].concat(toConsumableArray(nodes)));
    }
  }]);
  return FormattedMessage;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedMessage.displayName = 'FormattedMessage';
FormattedMessage.contextTypes = {
  intl: intlShape
};
FormattedMessage.defaultProps = {
  values: {}
};
 true ? FormattedMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object,
  tagName: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

var FormattedHTMLMessage = function (_Component) {
  inherits(FormattedHTMLMessage, _Component);

  function FormattedHTMLMessage(props, context) {
    classCallCheck(this, FormattedHTMLMessage);

    var _this = possibleConstructorReturn(this, (FormattedHTMLMessage.__proto__ || Object.getPrototypeOf(FormattedHTMLMessage)).call(this, props, context));

    invariantIntlContext(context);
    return _this;
  }

  createClass(FormattedHTMLMessage, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var values = this.props.values;
      var nextValues = nextProps.values;


      if (!shallowEquals(nextValues, values)) {
        return true;
      }

      // Since `values` has already been checked, we know they're not
      // different, so the current `values` are carried over so the shallow
      // equals comparison on the other props isn't affected by the `values`.
      var nextPropsToCheck = _extends({}, nextProps, {
        values: values
      });

      for (var _len = arguments.length, next = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        next[_key - 1] = arguments[_key];
      }

      return shouldIntlComponentUpdate.apply(undefined, [this, nextPropsToCheck].concat(next));
    }
  }, {
    key: 'render',
    value: function render() {
      var _context$intl = this.context.intl,
          formatHTMLMessage = _context$intl.formatHTMLMessage,
          Text = _context$intl.textComponent;
      var _props = this.props,
          id = _props.id,
          description = _props.description,
          defaultMessage = _props.defaultMessage,
          rawValues = _props.values,
          _props$tagName = _props.tagName,
          Component$$1 = _props$tagName === undefined ? Text : _props$tagName,
          children = _props.children;


      var descriptor = { id: id, description: description, defaultMessage: defaultMessage };
      var formattedHTMLMessage = formatHTMLMessage(descriptor, rawValues);

      if (typeof children === 'function') {
        return children(formattedHTMLMessage);
      }

      // Since the message presumably has HTML in it, we need to set
      // `innerHTML` in order for it to be rendered and not escaped by React.
      // To be safe, all string prop values were escaped when formatting the
      // message. It is assumed that the message is not UGC, and came from the
      // developer making it more like a template.
      //
      // Note: There's a perf impact of using this component since there's no
      // way for React to do its virtual DOM diffing.
      var html = { __html: formattedHTMLMessage };
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(Component$$1, { dangerouslySetInnerHTML: html });
    }
  }]);
  return FormattedHTMLMessage;
}(__WEBPACK_IMPORTED_MODULE_4_react__["Component"]);

FormattedHTMLMessage.displayName = 'FormattedHTMLMessage';
FormattedHTMLMessage.contextTypes = {
  intl: intlShape
};
FormattedHTMLMessage.defaultProps = {
  values: {}
};
 true ? FormattedHTMLMessage.propTypes = _extends({}, messageDescriptorPropTypes, {
  values: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.object,
  tagName: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.string,
  children: __WEBPACK_IMPORTED_MODULE_3_prop_types___default.a.func
}) : void 0;

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(defaultLocaleData);

/*
 * Copyright 2015, Yahoo Inc.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */

addLocaleData(__WEBPACK_IMPORTED_MODULE_0__locale_data_index_js___default.a);




/***/ }),

/***/ "./src/js/react_apps/chat/actions/auth.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.getNewToken=getNewToken;exports.successNewToken=successNewToken;exports.failNewToken=failNewToken;var _actionsTypes=__webpack_require__("./src/js/react_apps/chat/constants/actions-types.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function getNewToken(resendData){return function(dispatch,getState,_ref){var ws=_ref.ws;ws.getNewToken();dispatch({type:_actionsTypes.PENDING_NEW_TOKEN,payload:resendData});};}function successNewToken(token){return function(dispatch,getState,_ref2){var ws=_ref2.ws;var _getState$auth=getState().auth,id=_getState$auth.id,pendingToResend=_getState$auth.pendingToResend;pendingToResend.forEach(function(data){ws.send(_extends({},data,{user_data:{token:token,id:id}}));});dispatch({type:_actionsTypes.SUCCESS_NEW_TOKEN,payload:{token:token}});};}function failNewToken(){return{type:_actionsTypes.FAIL_NEW_TOKEN};};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(getNewToken,'getNewToken','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/auth.js');reactHotLoader.register(successNewToken,'successNewToken','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/auth.js');reactHotLoader.register(failNewToken,'failNewToken','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/auth.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/actions/chats.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.createdNewChat=exports.successCreateChat=exports.selectChat=exports.successGetChat=exports.setChatsFilter=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.getChats=getChats;exports.successGetChats=successGetChats;exports.failGetChats=failGetChats;exports.getChat=getChat;var _actionsTypes=__webpack_require__("./src/js/react_apps/chat/constants/actions-types.js");var _utils=__webpack_require__("./src/js/react_apps/chat/utils/index.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var setChatsFilter=exports.setChatsFilter=function setChatsFilter(filter){return{type:_actionsTypes.SET_CHATS_FILTER,payload:{filter:filter}};};function getChats(proposalId,partnerId){return function(dispatch,getState,_ref){var ws=_ref.ws;ws.getChats({proposalId:proposalId,partnerId:partnerId});dispatch({type:_actionsTypes.PENDING_CHATS,payload:{proposals:{selected:proposalId}}});};}function successGetChats(payload){return{type:_actionsTypes.SUCCESS_GET_CHATS,payload:payload};}function failGetChats(){return{type:_actionsTypes.FAIL_GET_CHATS};}function getChat(data){return function(dispatch,getState,_ref2){var ws=_ref2.ws;ws.getChat(data);dispatch({type:_actionsTypes.PENDING_CHAT,payload:data});};}var successGetChat=exports.successGetChat=function successGetChat(payload){return function(dispatch,getState){var _getState=getState(),chats=_getState.chats;if(chats.selected&&chats.selected!==payload.chatId){return;}dispatch({type:_actionsTypes.SUCCESS_GET_CHAT,payload:payload});};};var selectChat=exports.selectChat=function selectChat(id){return function(dispatch,getState){var chat=getState().chats.byId[id];var proposal=getState().proposals.selected;(0,_utils.addParamsToUrl)({proposal:proposal,partner:chat.partner});dispatch(getChat({chatId:id}));};};var successCreateChat=exports.successCreateChat=function successCreateChat(data){return function(dispatch,getState){var userId=getState().auth.id;var payload=_extends({},data);if(userId!==data.proposal.owner){payload.selectThisChat=true;}dispatch({type:_actionsTypes.SUCCESS_CREATE_CHAT,payload:payload});};};var createdNewChat=exports.createdNewChat=function createdNewChat(data){return function(dispatch,getState){var selectedId=getState().proposals.selected;if(data.proposalId===selectedId){dispatch({type:_actionsTypes.NEW_CHAT,payload:{proposalId:data.proposalId,chat:{id:data.chatId,unread:data.unread,count:data.count,partner:data.id,proposal:data.proposalId},user:{id:data.id,active:data.active,name:data.name,avatar:data.avatar,lastMessage:data.lastMessage}}});}};};;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(setChatsFilter,'setChatsFilter','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/chats.js');reactHotLoader.register(getChats,'getChats','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/chats.js');reactHotLoader.register(successGetChats,'successGetChats','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/chats.js');reactHotLoader.register(failGetChats,'failGetChats','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/chats.js');reactHotLoader.register(getChat,'getChat','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/chats.js');reactHotLoader.register(successGetChat,'successGetChat','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/chats.js');reactHotLoader.register(selectChat,'selectChat','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/chats.js');reactHotLoader.register(successCreateChat,'successCreateChat','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/chats.js');reactHotLoader.register(createdNewChat,'createdNewChat','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/chats.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/actions/messages.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.pinScrollToBottom=exports.successReadMessage=exports.readMessage=exports.newMessage=exports.successSpamMessage=exports.spamMessage=exports.successDeleteMessage=exports.deleteMessage=exports.failEditMessage=exports.successEditMessage=exports.endEditMessage=exports.startEditMessage=exports.successAddMessage=exports.addMessage=undefined;var _actionsTypes=__webpack_require__("./src/js/react_apps/chat/constants/actions-types.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i];}return target;}var addMessage=exports.addMessage=function addMessage(text,to){return function(dispatch,getState,_ref){var ws=_ref.ws;dispatch({type:_actionsTypes.PENDING_ADD_MESSAGE,payload:{text:text}});ws.addMessage({text:text,to:to});};};var successAddMessage=function successAddMessage(data){var chatId=data.chatId,message=_objectWithoutProperties(data,['chatId']);return function(dispatch,getState){var _getState=getState(),chats=_getState.chats;if(chats.selected!==chatId){return;}dispatch({type:_actionsTypes.SUCCESS_ADD_MESSAGE,payload:message});};};exports.successAddMessage=successAddMessage;var startEditMessage=exports.startEditMessage=function startEditMessage(id){return{type:_actionsTypes.START_EDIT_MESSAGE,payload:{id:id}};};var endEditMessage=exports.endEditMessage=function endEditMessage(id,text){return function(dispatch,getState,_ref2){var ws=_ref2.ws;dispatch({type:_actionsTypes.PENDING_EDIT_MESSAGE,payload:{id:id}});ws.editMessage({id:id,text:text});};};var successEditMessage=exports.successEditMessage=function successEditMessage(id,text){return{type:_actionsTypes.SUCCESS_EDIT_MESSAGE,payload:{id:id,text:text}};};var failEditMessage=exports.failEditMessage=function failEditMessage(id){return{type:_actionsTypes.FAIL_EDIT_MESSAGE,payload:{id:id}};};var deleteMessage=exports.deleteMessage=function deleteMessage(id){return function(dispatch,getState,_ref3){var ws=_ref3.ws;dispatch({type:_actionsTypes.PENDING_DELETE_MESSAGE,payload:{id:id}});ws.deleteMessage({id:id});};};var successDeleteMessage=exports.successDeleteMessage=function successDeleteMessage(messageId,chatId,to,proposalId){return function(dispatch,getState){var payload={messageId:messageId,chatId:chatId};var userId=getState().auth.id;payload.proposal={id:proposalId};if(to===userId){var messagesById=getState().messages.byId;var messagesIds=getState().messages.ids;for(var i=messagesIds.length-2;i>=0;i--){var message=messagesById[messagesIds[i]];if(message.to===userId){payload.proposal.date=message.date;break;}}payload.changeUnread=true;}dispatch({type:_actionsTypes.SUCCESS_DELETE_MESSAGE,payload:payload});};};var spamMessage=exports.spamMessage=function spamMessage(id){return function(dispatch,getState,_ref4){var ws=_ref4.ws;dispatch({type:_actionsTypes.PENDING_SPAM_MESSAGE,payload:{id:id}});ws.spamMessage({id:id});};};var successSpamMessage=exports.successSpamMessage=function successSpamMessage(messageId,chatId){return{type:_actionsTypes.SUCCESS_SPAM_MESSAGE,payload:{messageId:messageId,chatId:chatId}};};var newMessage=exports.newMessage=function newMessage(message,chatId,proposalId){return function(dispatch,getState){var _getState2=getState(),chats=_getState2.chats,proposals=_getState2.proposals;var selectedProposal=proposals.selected;var proposal={id:proposalId,date:message.date};var addToChat=true;var changeLastMessage=false;if(chats.selected!==chatId){addToChat=false;}if(selectedProposal===proposalId){changeLastMessage=true;}dispatch({type:_actionsTypes.NEW_MESSAGE,payload:{message:message,addToChat:addToChat,chatId:chatId,proposal:proposal,changeLastMessage:changeLastMessage}});};};var readMessage=exports.readMessage=function readMessage(id){return function(dispatch,getState,_ref5){var ws=_ref5.ws;ws.readMessages({id:id});dispatch({type:_actionsTypes.PENDING_READ_MESSAGE,payload:{id:id}});};};var successReadMessage=exports.successReadMessage=function successReadMessage(messageId,chatId,to){return function(dispatch,getState){var payload={messageId:messageId,chatId:chatId};var userId=getState().auth.id;if(to===userId){payload.changeUnread=true;}dispatch({type:_actionsTypes.SUCCESS_READ_MESSAGE,payload:payload});};};var pinScrollToBottom=exports.pinScrollToBottom=function pinScrollToBottom(payload){return function(dispatch,getState){var scrollIsBottom=getState().messages.scrollToBottom;if(scrollIsBottom!==payload){dispatch({type:_actionsTypes.SCROLL_BOTTOM_PINED,payload:payload});}};};;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(addMessage,'addMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');reactHotLoader.register(successAddMessage,'successAddMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');reactHotLoader.register(startEditMessage,'startEditMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');reactHotLoader.register(endEditMessage,'endEditMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');reactHotLoader.register(successEditMessage,'successEditMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');reactHotLoader.register(failEditMessage,'failEditMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');reactHotLoader.register(deleteMessage,'deleteMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');reactHotLoader.register(successDeleteMessage,'successDeleteMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');reactHotLoader.register(spamMessage,'spamMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');reactHotLoader.register(successSpamMessage,'successSpamMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');reactHotLoader.register(newMessage,'newMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');reactHotLoader.register(readMessage,'readMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');reactHotLoader.register(successReadMessage,'successReadMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');reactHotLoader.register(pinScrollToBottom,'pinScrollToBottom','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/messages.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/actions/proposals.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.getProposals=getProposals;exports.successGetProposals=successGetProposals;var _actionsTypes=__webpack_require__("./src/js/react_apps/chat/constants/actions-types.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function getProposals(page){return function(dispatch,getState,_ref){var ws=_ref.ws;ws.getProposals({page:page,pageSize:getState().proposals.pageSize});dispatch({type:_actionsTypes.PENDING_GET_PROPOSALS});};}function successGetProposals(data){return{type:_actionsTypes.SUCCESS_GET_PROPOSALS,payload:data};};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(getProposals,'getProposals','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/proposals.js');reactHotLoader.register(successGetProposals,'successGetProposals','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/proposals.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/actions/users.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.clientDisconnected=exports.clientConnected=exports.successGetAllUnread=exports.getAllUnread=undefined;var _actionsTypes=__webpack_require__("./src/js/react_apps/chat/constants/actions-types.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var getAllUnread=exports.getAllUnread=function getAllUnread(){return function(dispatch,getState,_ref){var ws=_ref.ws;var reauthtoken=getState().auth.reauthtoken;if(!reauthtoken){console.error('reauthtoken not found, plz relogin to site ¯\\_(ツ)_/¯');dispatch(successGetAllUnread(0));}ws.debouncedGetAllUnread();dispatch({type:_actionsTypes.PENDING_GET_ALL_UNREAD});};};var successGetAllUnread=exports.successGetAllUnread=function successGetAllUnread(total){return{type:_actionsTypes.SUCCESS_GET_ALL_UNREAD,payload:{total:total}};};var clientConnected=exports.clientConnected=function clientConnected(id){return{type:_actionsTypes.CLIENT_CONNECTED,payload:{id:id}};};var clientDisconnected=exports.clientDisconnected=function clientDisconnected(id){return{type:_actionsTypes.CLIENT_DISCONNECTED,payload:{id:id}};};;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(getAllUnread,'getAllUnread','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/users.js');reactHotLoader.register(successGetAllUnread,'successGetAllUnread','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/users.js');reactHotLoader.register(clientConnected,'clientConnected','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/users.js');reactHotLoader.register(clientDisconnected,'clientDisconnected','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/actions/users.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/components/Alert/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});var _propTypes=__webpack_require__("./node_modules/prop-types/index.js");var _propTypes2=_interopRequireDefault(_propTypes);var _react=__webpack_require__("./node_modules/react/index.js");var _react2=_interopRequireDefault(_react);var _classnames=__webpack_require__("./node_modules/classnames/index.js");var _classnames2=_interopRequireDefault(_classnames);var _reactI18next=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");var _informationMessages=__webpack_require__("./src/js/react_apps/informationMessagesModal/containers/informationMessages/index.js");var _informationMessages2=_interopRequireDefault(_informationMessages);var _constants=__webpack_require__("./src/js/react_apps/informationMessagesModal/constants/index.js");var _renderWithoutStore=__webpack_require__("./src/js/react_apps/chat/utils/renderWithoutStore.js");var _renderWithoutStore2=_interopRequireDefault(_renderWithoutStore);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var WrapperForContent=function WrapperForContent(_ref){var children=_ref.children,needWrap=_ref.needWrap;if(needWrap){return _react2.default.createElement('div',{className:'wrapper-inner'},_react2.default.createElement('div',{className:'chat'},children));}else{return children;}};var Alert=function Alert(_ref2){var type=_ref2.type,useWrap=_ref2.useWrap,title=_ref2.title,text=_ref2.text,inModal=_ref2.inModal,isCode=_ref2.isCode,t=_ref2.t;var ConvertType={'info':_constants.informationMessagesModalConstants.INFO_MODAL_INFO_TYPE,'success':_constants.informationMessagesModalConstants.INFO_MODAL_SUCCESS_TYPE,'warning':_constants.informationMessagesModalConstants.INFO_MODAL_WARNING_TYPE,'danger':_constants.informationMessagesModalConstants.INFO_MODAL_ERROR_TYPE};return _react2.default.createElement(WrapperForContent,{needWrap:useWrap},_react2.default.createElement('div',{className:(0,_classnames2.default)({'lapse-list__item':!inModal})},_react2.default.createElement(_informationMessages2.default,{messageType:ConvertType[type]||_constants.informationMessagesModalConstants.INFO_MODAL_INFO_TYPE,title:isCode&&title?t(title):title,message:isCode&&text?t(text):text})));};Alert.render=function(type){var useWrap=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var title=arguments[2];var text=arguments[3];var el=arguments[4];var isCode=arguments[5];(0,_renderWithoutStore2.default)((0,_reactI18next.translate)()(Alert),el,{type:type,useWrap:useWrap,title:title,isCode:isCode,text:text});};Alert.renderError=Alert.render.bind(null,'danger',true);Alert.defaultProps={type:'info'};Alert.propTypes={title:_propTypes2.default.any.isRequired,text:_propTypes2.default.any,isCode:_propTypes2.default.bool,useWrap:_propTypes2.default.bool,inModal:_propTypes2.default.bool,type:_propTypes2.default.oneOf(['info','success','warning','danger'])};var _default=(0,_reactI18next.translate)()(Alert);exports.default=_default;;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(WrapperForContent,'WrapperForContent','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/Alert/index.js');reactHotLoader.register(Alert,'Alert','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/Alert/index.js');reactHotLoader.register(_default,'default','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/Alert/index.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/components/Modal/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _propTypes=__webpack_require__("./node_modules/prop-types/index.js");var _propTypes2=_interopRequireDefault(_propTypes);var _react=__webpack_require__("./node_modules/react/index.js");var _react2=_interopRequireDefault(_react);var _SVG=__webpack_require__("./src/js/react_apps/chat/components/SVG/index.js");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Modal=function(_PureComponent){_inherits(Modal,_PureComponent);function Modal(props){_classCallCheck(this,Modal);var _this=_possibleConstructorReturn(this,(Modal.__proto__||Object.getPrototypeOf(Modal)).call(this,props));_this.close=_this.close.bind(_this);return _this;}_createClass(Modal,[{key:'componentDidMount',value:function componentDidMount(){document.documentElement.classList.add('no-scroll');}},{key:'componentWillUnmount',value:function componentWillUnmount(){document.documentElement.classList.remove('no-scroll');}},{key:'close',value:function close(e){e.preventDefault();var onClose=this.props.onClose;if(onClose){onClose(e);}}},{key:'render',value:function render(){var _props=this.props,title=_props.title,type=_props.type,children=_props.children;if(type==='alert'){return _react2.default.createElement(_react.Fragment,null,_react2.default.createElement('div',{key:'sub',className:'sub'}),_react2.default.createElement('section',{key:'popup',className:'popup',onClick:this.close},_react2.default.createElement('div',{className:'popup__unit'},_react2.default.createElement('div',{className:'popup__close',onClick:this.close},_react2.default.createElement(_SVG.CloseSvg,null)),_react2.default.createElement('div',{className:'popup__inner'},_react.Children.toArray(children)))));}return _react2.default.createElement(_react.Fragment,null,_react2.default.createElement('div',{key:'sub',className:'sub'}),_react2.default.createElement('section',{key:'popup',className:'popup'},_react2.default.createElement('div',{className:'popup__unit popup__unit--chat'},_react2.default.createElement('div',{className:'popup__close',onClick:this.close},_react2.default.createElement(_SVG.CloseSvg,null)),_react2.default.createElement('div',{className:'popup__inner'},_react2.default.createElement('header',{className:'popup__header'},_react2.default.createElement('h2',{className:'popup__title'},title)),_react.Children.toArray(children)))));}},{key:'__reactstandin__regenerateByEval',value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code);}}]);return Modal;}(_react.PureComponent);Modal.propTypes={onClose:_propTypes2.default.func,title:_propTypes2.default.string,children:_propTypes2.default.node,type:_propTypes2.default.string};var _default=Modal;exports.default=_default;;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(Modal,'Modal','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/Modal/index.js');reactHotLoader.register(_default,'default','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/Modal/index.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/components/ModalAlert/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__("./node_modules/react/index.js");var _react2=_interopRequireDefault(_react);var _propTypes=__webpack_require__("./node_modules/prop-types/index.js");var _propTypes2=_interopRequireDefault(_propTypes);var _Modal=__webpack_require__("./src/js/react_apps/chat/components/Modal/index.js");var _Modal2=_interopRequireDefault(_Modal);var _Alert=__webpack_require__("./src/js/react_apps/chat/components/Alert/index.js");var _Alert2=_interopRequireDefault(_Alert);var _utils=__webpack_require__("./src/js/react_apps/chat/utils/index.js");var _renderWithoutStore=__webpack_require__("./src/js/react_apps/chat/utils/renderWithoutStore.js");var _renderWithoutStore2=_interopRequireDefault(_renderWithoutStore);var _config=__webpack_require__("./src/js/react_apps/chat/config.js");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var ModalAlert=function ModalAlert(_ref){var onClose=_ref.onClose,type=_ref.type,title=_ref.title,text=_ref.text;return _react2.default.createElement(_Modal2.default,{onClose:onClose,type:'alert'},_react2.default.createElement(_Alert2.default,{type:type,title:title,text:text,inModal:true,isCode:true}));};ModalAlert.propTypes={onClose:_propTypes2.default.func,type:_propTypes2.default.string,title:_propTypes2.default.any,text:_propTypes2.default.any};ModalAlert.destroy=_utils.destroyComponent.bind(null,_config.wrappersIds.alertModal);ModalAlert.render=function renderAlert(type,title,text){if(document.getElementById(_config.wrappersIds.alertModal)){ModalAlert.destroy();}var wrapper=(0,_utils.createWrapper)(_config.wrappersIds.alertModal);(0,_renderWithoutStore2.default)(ModalAlert,wrapper,{onClose:ModalAlert.destroy,type:type,title:title,text:text});};ModalAlert.renderError=ModalAlert.render.bind(null,'danger');ModalAlert.renderWarning=ModalAlert.render.bind(null,'warning');var _default=ModalAlert;exports.default=_default;;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(ModalAlert,'ModalAlert','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/ModalAlert/index.js');reactHotLoader.register(_default,'default','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/ModalAlert/index.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/components/SVG/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.CloseSvg=exports.EditSvg=exports.DeleteSvg=exports.SpamSvg=exports.DateSvg=exports.ArrowSvg=exports.MessageSvg=exports.CalendarSvg=undefined;var _react=__webpack_require__("./node_modules/react/index.js");var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var CalendarSvg=exports.CalendarSvg=function CalendarSvg(){return _react2.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"17",height:"15",viewBox:"0 0 17 15"},_react2.default.createElement("defs",null,_react2.default.createElement("style",{dangerouslySetInnerHTML:{__html:'.cls-12 {fill: #3598dc;fill-rule: evenodd;}'}})),_react2.default.createElement("path",{className:"cls-12",d:"M272.6,648h15.8a0.581,0.581,0,0,0,.6-0.573V634.635a0.581,0.581,0,0,0-.6-0.573h-2.972v-0.489a0.6,0.6,0,0,0-1.2,0v0.489h-7.35v-0.489a0.6,0.6,0,0,0-1.2,0v0.489H272.6a0.58,0.58,0,0,0-.6.573V647.44A0.587,0.587,0,0,0,272.6,648Zm0.6-12.791h2.475v0.308a0.6,0.6,0,0,0,1.2,0v-0.308h7.35v0.308a0.6,0.6,0,0,0,1.2,0v-0.308h2.387v1.482H273.2v-1.482Zm0,2.629h14.6v9.03H273.2v-9.03Zm11.627,2.628h-8.639a0.574,0.574,0,1,0,0,1.146h8.639A0.574,0.574,0,1,0,284.827,640.465Zm-4.32,2.768h-4.319a0.574,0.574,0,1,0,0,1.146h4.319A0.574,0.574,0,1,0,280.507,643.233Z",transform:"translate(-272 -633)"}));};var MessageSvg=exports.MessageSvg=function MessageSvg(){return _react2.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"13",height:"13",viewBox:"0 0 13 13"},_react2.default.createElement("defs",null,_react2.default.createElement("style",{dangerouslySetInnerHTML:{__html:'.cls-13 {fill: #2899ea;fill-rule: evenodd;}'}})),_react2.default.createElement("path",{className:"cls-13",d:"M860.7,38H850.3a1.3,1.3,0,0,0-1.3,1.3V51l2.6-2.6h9.1a1.3,1.3,0,0,0,1.3-1.3V39.3A1.3,1.3,0,0,0,860.7,38Zm-9.1,4.55h7.8v1.3h-7.8v-1.3Zm5.2,3.25h-5.2V44.5h5.2v1.3Zm2.6-3.9h-7.8V40.6h7.8v1.3Z",transform:"translate(-849 -38)"}));};var ArrowSvg=exports.ArrowSvg=function ArrowSvg(){return _react2.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"18",height:"13",viewBox:"0 0 18 13"},_react2.default.createElement("defs",null,_react2.default.createElement("path",{id:"52qga",d:"M1302.2 317.52l4.47-4.32a.71.71 0 0 1 .98 0c.28.26.28.69 0 .95l-3.27 3.17h11.92c.39 0 .7.3.7.68 0 .37-.31.68-.7.68h-11.92l3.27 3.17c.28.26.28.69 0 .95a.7.7 0 0 1-.99 0l-4.46-4.32a.66.66 0 0 1 0-.96z"})),_react2.default.createElement("g",null,_react2.default.createElement("g",{transform:"translate(-1300 -311)"},_react2.default.createElement("use",{fill:"#3598dc",xlinkHref:"#52qga"}))));};var DateSvg=exports.DateSvg=function DateSvg(){return _react2.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"17",height:"15",viewBox:"0 0 17 15"},_react2.default.createElement("defs",null,_react2.default.createElement("style",{dangerouslySetInnerHTML:{__html:'.cls-14 {fill: #3598dc;fill-rule: evenodd;}'}})),_react2.default.createElement("path",{className:"cls-14",d:"M272.6,648h15.8a0.581,0.581,0,0,0,.6-0.573V634.635a0.581,0.581,0,0,0-.6-0.573h-2.972v-0.489a0.6,0.6,0,0,0-1.2,0v0.489h-7.35v-0.489a0.6,0.6,0,0,0-1.2,0v0.489H272.6a0.58,0.58,0,0,0-.6.573V647.44A0.587,0.587,0,0,0,272.6,648Zm0.6-12.791h2.475v0.308a0.6,0.6,0,0,0,1.2,0v-0.308h7.35v0.308a0.6,0.6,0,0,0,1.2,0v-0.308h2.387v1.482H273.2v-1.482Zm0,2.629h14.6v9.03H273.2v-9.03Zm11.627,2.628h-8.639a0.574,0.574,0,1,0,0,1.146h8.639A0.574,0.574,0,1,0,284.827,640.465Zm-4.32,2.768h-4.319a0.574,0.574,0,1,0,0,1.146h4.319A0.574,0.574,0,1,0,280.507,643.233Z",transform:"translate(-272 -633)"}));};var SpamSvg=exports.SpamSvg=function SpamSvg(){return _react2.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"13",height:"12",viewBox:"0 0 13 12"},_react2.default.createElement("defs",null,_react2.default.createElement("style",{dangerouslySetInnerHTML:{__html:'.cls-15 {fill: #2899ea; fill-rule: evenodd; opacity: 0.5;}'}})),_react2.default.createElement("path",{className:"cls-15",d:"M1494.71,543.2l-4.59-8.282a1.92,1.92,0,0,0-3.27,0,0.012,0.012,0,0,1-.01.013l-4.57,8.256a1.828,1.828,0,0,0-.02,1.875,1.886,1.886,0,0,0,1.66.943h9.13a1.93,1.93,0,0,0,1.68-.943A1.8,1.8,0,0,0,1494.71,543.2Zm-6.98-5.4a0.76,0.76,0,0,1,1.52,0v2.985a0.76,0.76,0,0,1-1.52,0v-2.985h0Zm0.76,6.716a1.12,1.12,0,1,1,1.14-1.12A1.13,1.13,0,0,1,1488.49,544.508Z",transform:"translate(-1482 -534)"}));};var DeleteSvg=exports.DeleteSvg=function DeleteSvg(){return _react2.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"9.437",height:"11",viewBox:"0 0 9.437 11"},_react2.default.createElement("defs",null,_react2.default.createElement("style",{dangerouslySetInnerHTML:{__html:'.cls-16 {fill: #3598dc; fill-rule: evenodd;}'}})),_react2.default.createElement("path",{className:"cls-16",d:"M797.375,444.1v-0.55a0.508,0.508,0,0,0-.525-0.55H793.7a0.508,0.508,0,0,0-.525.55v0.55H790.55v1.1H800v-1.1h-2.625Zm-6.3,2.2,0.472,7.2a0.528,0.528,0,0,0,.525.5h6.353a0.528,0.528,0,0,0,.525-0.5l0.525-7.2h-8.4Zm2.625,6.05a0.526,0.526,0,1,1-1.05,0v-4.4a0.526,0.526,0,1,1,1.05,0v4.4Zm2.1,0a0.526,0.526,0,1,1-1.05,0v-4.4a0.526,0.526,0,1,1,1.05,0v4.4Zm2.1,0a0.526,0.526,0,1,1-1.05,0v-4.4a0.526,0.526,0,1,1,1.05,0v4.4Z",transform:"translate(-790.563 -443)"}));};var EditSvg=exports.EditSvg=function EditSvg(){return _react2.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"10.813",height:"10.969",viewBox:"0 0 10.813 10.969"},_react2.default.createElement("defs",null,_react2.default.createElement("style",{dangerouslySetInnerHTML:{__html:'.cls-17 {fill: #3598dc; fill-rule: evenodd;}'}})),_react2.default.createElement("path",{className:"cls-17",d:"M814.486,445.306a0.715,0.715,0,0,0-1.026,0l-0.256.261-3.589,3.657h0l-0.113.115a10.418,10.418,0,0,0-1.175,3.046c0,0.018-.011.037-0.017,0.056-0.014.048-.029,0.1-0.044,0.146l-0.039.133c-0.012.038-.023,0.075-0.034,0.114-0.026.087-.052,0.177-0.079,0.269a1.08,1.08,0,0,0-.04.822,1.045,1.045,0,0,0,.806-0.04l0.263-.08,0.116-.036,0.123-.038,0.151-.048,0.044-.014a10.375,10.375,0,0,0,2.987-1.2h0l0,0,0.116-.118,0.008,0.007,3.589-3.657h0l0.257-.261a0.749,0.749,0,0,0,0-1.045ZM812.154,452l-0.011.008-0.009.006-0.01.006-0.009.006a8.289,8.289,0,0,1-1.321.574l-0.321.115-1.209-1.232c0.04-.116.078-0.227,0.114-0.329a8.539,8.539,0,0,1,.562-1.348,0.041,0.041,0,0,0,0-.009l0.007-.011,0-.008,0.008-.012,0.089-.091,2.191,2.233Zm6.433-6.69-2.051-2.09a0.714,0.714,0,0,0-1.025,0l-0.513.522a0.749,0.749,0,0,0,0,1.045l2.051,2.09a0.717,0.717,0,0,0,1.026,0l0.512-.522A0.749,0.749,0,0,0,818.587,445.306Z",transform:"translate(-808 -443.031)"}));};var CloseSvg=exports.CloseSvg=function CloseSvg(){return _react2.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"11.97",height:"11.969",viewBox:"0 0 11.97 11.969"},_react2.default.createElement("defs",null,_react2.default.createElement("style",{dangerouslySetInnerHTML:{__html:'.cls-18 {fill: #3598dc; fill-rule: evenodd;}'}})),_react2.default.createElement("path",{className:"cls-18",d:"M1124.59,197.361L1120.95,201l3.64,3.638a1.385,1.385,0,0,1-1.96,1.958l-3.63-3.637-3.64,3.637a1.37,1.37,0,0,1-.98.406,1.4,1.4,0,0,1-.98-0.406,1.386,1.386,0,0,1,0-1.958l3.64-3.638-3.64-3.637a1.386,1.386,0,0,1,1.96-1.959l3.64,3.638,3.63-3.638A1.386,1.386,0,1,1,1124.59,197.361Z",transform:"translate(-1113.03 -195.031)"}));};;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(CalendarSvg,"CalendarSvg","/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/SVG/index.js");reactHotLoader.register(MessageSvg,"MessageSvg","/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/SVG/index.js");reactHotLoader.register(ArrowSvg,"ArrowSvg","/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/SVG/index.js");reactHotLoader.register(DateSvg,"DateSvg","/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/SVG/index.js");reactHotLoader.register(SpamSvg,"SpamSvg","/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/SVG/index.js");reactHotLoader.register(DeleteSvg,"DeleteSvg","/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/SVG/index.js");reactHotLoader.register(EditSvg,"EditSvg","/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/SVG/index.js");reactHotLoader.register(CloseSvg,"CloseSvg","/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/components/SVG/index.js");leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/constants/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var MESSAGE_STATUSES=exports.MESSAGE_STATUSES={0:'send',1:'proccessed',2:'decline',3:'delivered',4:'read'};;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(MESSAGE_STATUSES,'MESSAGE_STATUSES','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/constants/index.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/containers/TotalUnread/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__("./node_modules/react/index.js");var _react2=_interopRequireDefault(_react);var _reactRedux=__webpack_require__("./node_modules/react-redux/es/index.js");var _propTypes=__webpack_require__("./node_modules/prop-types/index.js");var _propTypes2=_interopRequireDefault(_propTypes);var _users=__webpack_require__("./src/js/react_apps/chat/actions/users.js");var _render=__webpack_require__("./src/js/react_apps/chat/utils/render.js");var _render2=_interopRequireDefault(_render);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var TotalUnread=function(_PureComponent){_inherits(TotalUnread,_PureComponent);function TotalUnread(){_classCallCheck(this,TotalUnread);return _possibleConstructorReturn(this,(TotalUnread.__proto__||Object.getPrototypeOf(TotalUnread)).apply(this,arguments));}_createClass(TotalUnread,[{key:'componentDidMount',value:function componentDidMount(){this.props.getAllUnread();}},{key:'render',value:function render(){return _react2.default.createElement('span',null,this.props.total);}},{key:'__reactstandin__regenerateByEval',value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code);}}]);return TotalUnread;}(_react.PureComponent);TotalUnread.propTypes={total:_propTypes2.default.number,getAllUnread:_propTypes2.default.func};var mapStateToProps=function mapStateToProps(state){return{total:state.users.totalUnread};};TotalUnread=(0,_reactRedux.connect)(mapStateToProps,{getAllUnread:_users.getAllUnread})(TotalUnread);TotalUnread.render=_render2.default.bind(null,TotalUnread);var _default=TotalUnread;exports.default=_default;;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(TotalUnread,'TotalUnread','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/containers/TotalUnread/index.js');reactHotLoader.register(mapStateToProps,'mapStateToProps','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/containers/TotalUnread/index.js');reactHotLoader.register(_default,'default','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/containers/TotalUnread/index.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/i18n.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.default=setupIntl;var _reactIntl=__webpack_require__("./node_modules/react-intl/lib/index.es.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var readyState={};function loadScript(url,ind){return new Promise(function(resolve){var id='intl-script-'+ind;var script=document.getElementById(id);if(!script){script=document.createElement('script');script.id=id;script.src=url;document.head.appendChild(script);}if(readyState[id]){resolve();}script.addEventListener('load',function(){readyState[id]=true;resolve();});});}function setupIntl(locale){var urls=['https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.'+locale,'https://unpkg.com/react-intl@latest/locale-data/'+locale+'.js'];return Promise.all(urls.map(loadScript)).then(function(){return(0,_reactIntl.addLocaleData)(ReactIntlLocaleData[locale]);});};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(readyState,'readyState','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/i18n.js');reactHotLoader.register(loadScript,'loadScript','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/i18n.js');reactHotLoader.register(setupIntl,'setupIntl','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/i18n.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/normalize/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.normalizeProposals=exports.normalizeUsers=exports.normalizeMessages=undefined;var _normalizr=__webpack_require__("./node_modules/normalizr/dist/src/index.js");var _schemas=__webpack_require__("./src/js/react_apps/chat/normalize/schemas.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function makeEmpty(){return{byId:{},ids:[]};}function normalizeData(data,name,schema){if(!data||!data.length){return makeEmpty();}var normalized=(0,_normalizr.normalize)(data,[schema]);return{byId:normalized.entities[name],ids:normalized.result};}var normalizeMessages=exports.normalizeMessages=function normalizeMessages(data){return normalizeData(data,'messages',_schemas.message);};var normalizeUsers=exports.normalizeUsers=function normalizeUsers(data){return normalizeData(data,'users',_schemas.user);};var normalizeProposals=exports.normalizeProposals=function normalizeProposals(data){var result={proposals:makeEmpty(),users:{},chats:{}};if(!data||!data.proposals||!data.proposals.length){return result;}var preparedData={proposals:data.proposals.map(function(proposal){return{id:proposal.id,title:proposal.title,date:proposal.date,count:proposal.count,source:proposal.source,chats:proposal.users.map(function(user){return{id:user.chatId,proposal:proposal.id,unread:user.unread,count:user.count,partner:{id:user.id,active:user.active,name:user.name,avatar:user.avatar,lastMessage:user.lastMessage}};})};})};var normalized=(0,_normalizr.normalize)(preparedData,{'proposals':[_schemas.proposal]});result.proposals.byId=normalized.entities.proposals;result.proposals.ids=normalized.result.proposals;result.users=normalized.entities.users;result.chats=normalized.entities.chats;if(data.pages&&data.pages.total){result.proposals.pagesTotal=data.pages.total;result.proposals.pageCurrent=data.pages.current;result.proposals.pageSize=data.pages.pageSize;}return result;};;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(makeEmpty,'makeEmpty','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/normalize/index.js');reactHotLoader.register(normalizeData,'normalizeData','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/normalize/index.js');reactHotLoader.register(normalizeMessages,'normalizeMessages','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/normalize/index.js');reactHotLoader.register(normalizeUsers,'normalizeUsers','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/normalize/index.js');reactHotLoader.register(normalizeProposals,'normalizeProposals','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/normalize/index.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/normalize/schemas.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.proposal=exports.chat=exports.message=exports.user=undefined;var _normalizr=__webpack_require__("./node_modules/normalizr/dist/src/index.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var user=exports.user=new _normalizr.schema.Entity('users');var message=exports.message=new _normalizr.schema.Entity('messages');var chat=exports.chat=new _normalizr.schema.Entity('chats',{partner:user});var proposal=exports.proposal=new _normalizr.schema.Entity('proposals',{chats:[chat]});;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(user,'user','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/normalize/schemas.js');reactHotLoader.register(message,'message','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/normalize/schemas.js');reactHotLoader.register(chat,'chat','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/normalize/schemas.js');reactHotLoader.register(proposal,'proposal','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/normalize/schemas.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/reducers/auth.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.initialState=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=auth;var _actionsTypes=__webpack_require__("./src/js/react_apps/chat/constants/actions-types.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}var initialState=exports.initialState={token:null,id:null,pendingToken:false,pendingToResend:[]};function auth(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];switch(action.type){case _actionsTypes.PENDING_NEW_TOKEN:return _extends({},state,{pendingToken:true,pendingToResend:[].concat(_toConsumableArray(state.pendingToResend),[action.payload])});case _actionsTypes.SUCCESS_NEW_TOKEN:return _extends({},state,{token:action.payload.token,pendingToken:false,pendingToResend:[]});case _actionsTypes.FAIL_NEW_TOKEN:return null;default:return state;}};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(initialState,'initialState','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/auth.js');reactHotLoader.register(auth,'auth','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/auth.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/reducers/chats.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.initialState=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=chat;var _actionsTypes=__webpack_require__("./src/js/react_apps/chat/constants/actions-types.js");var _constants=__webpack_require__("./src/js/react_apps/chat/constants/index.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var initialState=exports.initialState={byId:{},pending:true,filter:null,selected:null};function chat(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];var message=void 0;var targetChat=void 0;switch(action.type){case _actionsTypes.SUCCESS_GET_PROPOSALS:return _extends({},state,{byId:action.payload.chats});case _actionsTypes.SET_CHATS_FILTER:return _extends({},state,{filter:action.payload.filter});case _actionsTypes.SUCCESS_GET_CHATS:return _extends({},state,{byId:_extends({},state.byId,action.payload.chats),selected:action.payload.currentChatId,pending:false});case _actionsTypes.PENDING_CHAT:return _extends({},state,{pending:true,selected:null});case _actionsTypes.SUCCESS_GET_CHAT:return _extends({},state,{selected:action.payload.chat.id,byId:_extends({},state.byId,_defineProperty({},action.payload.chat.id,_extends({},state.byId[action.payload.chat.id],action.payload.chat))),pending:false});case _actionsTypes.NEW_CHAT:return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},action.payload.chat.id,_extends({},action.payload.chat)))});case _actionsTypes.SUCCESS_CREATE_CHAT:return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},action.payload.chat.id,action.payload.chat)),unread:0,selected:action.payload.selectThisChat?action.payload.chat.id:state.selected,pending:false});case _actionsTypes.NEW_MESSAGE:message=action.payload.message;targetChat=state.byId[action.payload.chatId];if(!targetChat||_constants.MESSAGE_STATUSES[message.status]==='read'){return state;}return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},action.payload.chatId,_extends({},targetChat,{unread:targetChat.unread+1,count:targetChat.count+1})))});case _actionsTypes.SUCCESS_READ_MESSAGE:case _actionsTypes.SUCCESS_DELETE_MESSAGE:targetChat=state.byId[action.payload.chatId];if(!targetChat||!action.payload.changeUnread){return state;}return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},targetChat.id,_extends({},targetChat,{unread:targetChat.unread>0?targetChat.unread-1:0})))});default:return state;}};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(initialState,'initialState','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/chats.js');reactHotLoader.register(chat,'chat','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/chats.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/reducers/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});var _redux=__webpack_require__("./node_modules/redux/es/index.js");var _reduxForm=__webpack_require__("./node_modules/redux-form/es/index.js");var _proposals=__webpack_require__("./src/js/react_apps/chat/reducers/proposals.js");var _proposals2=_interopRequireDefault(_proposals);var _users=__webpack_require__("./src/js/react_apps/chat/reducers/users.js");var _users2=_interopRequireDefault(_users);var _messages=__webpack_require__("./src/js/react_apps/chat/reducers/messages.js");var _messages2=_interopRequireDefault(_messages);var _chats=__webpack_require__("./src/js/react_apps/chat/reducers/chats.js");var _chats2=_interopRequireDefault(_chats);var _auth=__webpack_require__("./src/js/react_apps/chat/reducers/auth.js");var _auth2=_interopRequireDefault(_auth);var _tabs=__webpack_require__("./src/js/react_apps/chat/reducers/tabs.js");var _tabs2=_interopRequireDefault(_tabs);var _modules=__webpack_require__("./src/js/react_apps/chat/reducers/modules.js");var _modules2=_interopRequireDefault(_modules);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var _default=(0,_redux.combineReducers)({proposals:_proposals2.default,users:_users2.default,messages:_messages2.default,chats:_chats2.default,form:_reduxForm.reducer,auth:_auth2.default,tabs:_tabs2.default,modules:_modules2.default});exports.default=_default;;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(_default,'default','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/index.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/reducers/messages.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.initialState=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=messages;var _omit=__webpack_require__("./node_modules/lodash/omit.js");var _omit2=_interopRequireDefault(_omit);var _without=__webpack_require__("./node_modules/lodash/without.js");var _without2=_interopRequireDefault(_without);var _findKey=__webpack_require__("./node_modules/lodash/findKey.js");var _findKey2=_interopRequireDefault(_findKey);var _actionsTypes=__webpack_require__("./src/js/react_apps/chat/constants/actions-types.js");var _constants=__webpack_require__("./src/js/react_apps/chat/constants/index.js");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var initialState=exports.initialState={byId:{},ids:[],inEdit:null,pendingToEdit:{},scrollToBottom:true};function messages(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];switch(action.type){case _actionsTypes.PENDING_CHAT:return _extends({},state,{inEdit:null});case _actionsTypes.SUCCESS_GET_CHAT:return _extends({},state,action.payload.messages,{scrollToBottom:true});case _actionsTypes.SUCCESS_ADD_MESSAGE:return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},action.payload.id,_extends({},action.payload))),ids:[].concat(_toConsumableArray(state.ids),[action.payload.id]),scrollToBottom:true});case _actionsTypes.SUCCESS_DELETE_MESSAGE:case _actionsTypes.SUCCESS_SPAM_MESSAGE:var messageId=action.payload.messageId;if(state.inEdit===messageId){return _extends({},state,{byId:(0,_omit2.default)(state.byId,messageId),ids:(0,_without2.default)(state.ids,messageId),inEdit:null});}else{return _extends({},state,{byId:(0,_omit2.default)(state.byId,messageId),ids:(0,_without2.default)(state.ids,messageId)});}case _actionsTypes.START_EDIT_MESSAGE:return _extends({},state,{inEdit:action.payload.id});case _actionsTypes.SUCCESS_EDIT_MESSAGE:if(!state.byId[action.payload.id]){return state;}return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},action.payload.id,_extends({},state.byId[action.payload.id],{text:action.payload.text,showEditedIcon:true}))),inEdit:null});case _actionsTypes.FAIL_EDIT_MESSAGE:return _extends({},state,{inEdit:null});case _actionsTypes.NEW_MESSAGE:if(!action.payload.addToChat){return state;}return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},action.payload.message.id,action.payload.message)),ids:[].concat(_toConsumableArray(state.ids),[action.payload.message.id])});case _actionsTypes.SUCCESS_READ_MESSAGE:return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},action.payload.messageId,_extends({},state.byId[action.payload.messageId],{status:Number((0,_findKey2.default)(_constants.MESSAGE_STATUSES,function(item){return item==='read';}))})))});case _actionsTypes.SCROLL_BOTTOM_PINED:return _extends({},state,{scrollToBottom:action.payload});default:return state;}};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(initialState,'initialState','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/messages.js');reactHotLoader.register(messages,'messages','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/messages.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/reducers/modules.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.initialState=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=modules;var _actionsTypes=__webpack_require__("./src/js/react_apps/chat/constants/actions-types.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var initialState=exports.initialState={chatModule:false,proposalsChatListModule:false,buttonsModule:false,totalUnreadModule:false};function modules(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];switch(action.type){case _actionsTypes.SET_CHAT_MODULE:return _extends({},state,{chatModule:true});case _actionsTypes.SET_PROPOSALS_CHAT_LIST_MODULE:return _extends({},state,{proposalsChatListModule:true});case _actionsTypes.SET_CHAT_BUTTONS_MODULE:return _extends({},state,{buttonsModule:true});case _actionsTypes.SET_CHAT_TOTAL_UNREAD_MODULE:return _extends({},state,{totalUnreadModule:true});case _actionsTypes.UNSET_CHAT_MODULE:return _extends({},state,{chatModule:false});case _actionsTypes.UNSET_PROPOSALS_CHAT_LIST_MODULE:return _extends({},state,{proposalsChatListModule:false});case _actionsTypes.UNSET_CHAT_BUTTONS_MODULE:return _extends({},state,{buttonsModule:false});case _actionsTypes.UNSET_CHAT_TOTAL_UNREAD_MODULE:return _extends({},state,{totalUnreadModule:false});default:return state;}};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(initialState,'initialState','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/modules.js');reactHotLoader.register(modules,'modules','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/modules.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/reducers/proposals.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.initialState=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=proposals;var _actionsTypes=__webpack_require__("./src/js/react_apps/chat/constants/actions-types.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else{return Array.from(arr);}}var initialState=exports.initialState={byId:{},ids:[],pageSize:8,pagesTotal:1,pageCurrent:0,selected:null,pending:true};function proposals(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];var proposal=void 0;var proposalId=void 0;var chats=void 0;switch(action.type){case _actionsTypes.PENDING_CHATS:return _extends({},state,{pending:true,selected:action.payload.proposals.selected});case _actionsTypes.SUCCESS_GET_CHATS:return _extends({},state,{byId:_extends({},state.byId,action.payload.proposals.byId),ids:[].concat(_toConsumableArray(state.ids),_toConsumableArray(action.payload.proposals.ids)),pending:false});case _actionsTypes.FAIL_GET_CHATS:return _extends({},state,{pending:false});case _actionsTypes.PENDING_CHAT:if(!action.payload.proposalId){return state;}return _extends({},state,{selected:action.payload.proposalId});case _actionsTypes.SUCCESS_GET_CHAT:proposal=action.payload.proposal;return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},proposal.id,_extends({},state.byId[proposal.id],proposal))),pending:false});case _actionsTypes.NEW_CHAT:proposalId=action.payload.proposalId;return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},proposalId,_extends({},state.byId[proposalId],{chats:[].concat(_toConsumableArray(state.byId[proposalId].chats),[action.payload.chat.id])}))),pending:false});case _actionsTypes.SUCCESS_GET_PROPOSALS:return _extends({},state,action.payload.proposals,{pending:false});case _actionsTypes.SUCCESS_DELETE_MESSAGE:case _actionsTypes.NEW_MESSAGE:if(!action.payload.proposal.date){return state;}proposal=state.byId[action.payload.proposal.id];if(!proposal){return state;}return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},action.payload.proposal.id,_extends({},proposal,{date:action.payload.proposal.date,count:proposal.count+1})))});case _actionsTypes.SUCCESS_CREATE_CHAT:proposal=state.byId[action.payload.proposal.id];chats=proposal&&proposal.chats?[].concat(_toConsumableArray(proposal.chats),[action.payload.chat.id]):[action.payload.chat.id];return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},action.payload.proposal.id,_extends({},proposal,action.payload.proposal,{chats:chats})))});case _actionsTypes.FAIL_NEW_TOKEN:return _extends({},state,{pending:false});default:return state;}};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(initialState,'initialState','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/proposals.js');reactHotLoader.register(proposals,'proposals','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/proposals.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/reducers/tabs.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.initialState=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=tabs;var _actionsTypes=__webpack_require__("./src/js/react_apps/chat/constants/actions-types.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var initialState=exports.initialState={activeTabIndex:0};function tabs(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];switch(action.type){case _actionsTypes.SELECT_TAB_INDEX:return _extends({},state,{activeTabIndex:action.payload});default:return state;}};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(initialState,'initialState','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/tabs.js');reactHotLoader.register(tabs,'tabs','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/tabs.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/reducers/users.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.initialState=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=users;var _actionsTypes=__webpack_require__("./src/js/react_apps/chat/constants/actions-types.js");var _constants=__webpack_require__("./src/js/react_apps/chat/constants/index.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var initialState=exports.initialState={byId:{},totalUnread:0};function users(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];switch(action.type){case _actionsTypes.SUCCESS_GET_CHATS:return _extends({},state,{byId:_extends({},state.byId,action.payload.users)});case _actionsTypes.SUCCESS_GET_CHAT:return _extends({},state,{byId:_extends({},state.byId,action.payload.users)});case _actionsTypes.SUCCESS_GET_PROPOSALS:return _extends({},state,{byId:_extends({},state.byId,action.payload.users)});case _actionsTypes.SUCCESS_CREATE_CHAT:return _extends({},state,{byId:_extends({},state.byId,action.payload.users)});case _actionsTypes.NEW_CHAT:return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},action.payload.user.id,_extends({},action.payload.user)))});case _actionsTypes.SUCCESS_GET_ALL_UNREAD:return _extends({},state,{totalUnread:action.payload.total});case _actionsTypes.CLIENT_CONNECTED:if(state.byId[action.payload.id]){return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},action.payload.id,_extends({},state.byId[action.payload.id],{active:true})))});}return state;case _actionsTypes.CLIENT_DISCONNECTED:if(state.byId[action.payload.id]){return _extends({},state,{byId:_extends({},state.byId,_defineProperty({},action.payload.id,_extends({},state.byId[action.payload.id],{active:false})))});}return state;case _actionsTypes.NEW_MESSAGE:if(_constants.MESSAGE_STATUSES[action.payload.message.status]==='read'){return state;}var userId=action.payload.message.from;if(state.byId[userId]&&action.payload.changeLastMessage){return _extends({},state,{totalUnread:state.totalUnread+1,byId:_extends({},state.byId,_defineProperty({},userId,_extends({},state.byId[userId],{lastMessage:action.payload.message.text})))});}else{return _extends({},state,{totalUnread:state.totalUnread+1});}case _actionsTypes.SUCCESS_READ_MESSAGE:case _actionsTypes.SUCCESS_DELETE_MESSAGE:if(!action.payload.changeUnread){return state;}return _extends({},state,{totalUnread:state.totalUnread>0?state.totalUnread-1:0});default:return state;}};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(initialState,'initialState','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/users.js');reactHotLoader.register(users,'users','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/reducers/users.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/socket/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.SOCKET_READY_STATES=undefined;var _utils=__webpack_require__("./src/js/react_apps/chat/utils/index.js");var _config=__webpack_require__("./src/js/react_apps/chat/config.js");(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var messagesIds={authError:'chat_global_auth_error',connectionError:'chat_global_connection_error'};var SOCKET_READY_STATES=exports.SOCKET_READY_STATES={0:'CONNECTING',1:'OPEN',2:'CLOSING',3:'CLOSED'};var ws={instance:null,connect:function connect(id){this.id=id;this.instance=new WebSocket(_config.websocketIP+'?id='+id);},reconnect:function reconnect(){this.instance=new WebSocket(_config.websocketIP+'?id='+this.id);return onWSReady();}};function createInstance(){return new Promise(function(resolve,reject){if(ws.instance){return resolve();}function resolveWS(){if(ws.instance){return resolve();}var appState=window.INITIAL_STATE||{};if(!appState.auth||!appState.auth.reauthtoken){reject((0,_utils.createError)(messagesIds.authError));}var id=appState.auth.id;ws.connect(id);resolve();}if(document.readyState!=='loading'){resolveWS();}else{document.addEventListener('DOMContentLoaded',resolveWS);}});}function onWSReady(){return new Promise(function(resolve,reject){function onError(){reject((0,_utils.createError)(messagesIds.connectionError));}switch(SOCKET_READY_STATES[ws.instance.readyState]){case'OPEN':resolve(ws);break;case'CLOSING':case'CLOSED':onError();break;default:ws.instance.addEventListener('error',onError);ws.instance.addEventListener('open',function(){return resolve(ws);});}});}var getWS=function getWS(){return createInstance().then(onWSReady);};var _default=getWS;exports.default=_default;;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(messagesIds,'messagesIds','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/index.js');reactHotLoader.register(SOCKET_READY_STATES,'SOCKET_READY_STATES','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/index.js');reactHotLoader.register(ws,'ws','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/index.js');reactHotLoader.register(createInstance,'createInstance','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/index.js');reactHotLoader.register(onWSReady,'onWSReady','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/index.js');reactHotLoader.register(getWS,'getWS','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/index.js');reactHotLoader.register(_default,'default','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/index.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/socket/intl-messages.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var _default={deleteMessageFail:{title:'chat_socket_delete_message_fail_title',text:'chat_socket_delete_message_fail_text'},editMessageFail:{title:'chat_socket_edit_message_fail_title',text:'chat_socket_edit_message_fail_text'},addMessageFail:{title:'chat_socket_add_message_fail_title',text:'chat_socket_add_message_fail_text'},spamMessageFail:{title:'chat_socket_spam_message_fail_title',text:'chat_socket_spam_message_fail_text'},connectionError:{title:'chat_socket_connection_error_title',text:'chat_socket_connection_error_text'},getChatFail:{title:'chat_socket_get_chat_info_fail_title',text:'chat_socket_get_chat_info_fail_text'},getChatsFail:{title:'chat_socket_get_chats_info_fail_title',text:'chat_socket_get_chats_info_fail_text'},getTokenFail:{title:'chat_socket_token_fail_title',text:'chat_socket_token_fail_text'},getServerFail:{title:'chat_socket_server_fail_title',text:'chat_socket_server_fail_text'}};exports.default=_default;;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(_default,'default','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/intl-messages.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/socket/listeners.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=addSocketHandlers;var _omit=__webpack_require__("./node_modules/lodash/omit.js");var _omit2=_interopRequireDefault(_omit);var _normalize=__webpack_require__("./src/js/react_apps/chat/normalize/index.js");var _messageTypes=__webpack_require__("./src/js/react_apps/chat/socket/message-types.js");var _messages=__webpack_require__("./src/js/react_apps/chat/actions/messages.js");var _users3=__webpack_require__("./src/js/react_apps/chat/actions/users.js");var _chats=__webpack_require__("./src/js/react_apps/chat/actions/chats.js");var _proposals=__webpack_require__("./src/js/react_apps/chat/actions/proposals.js");var _auth=__webpack_require__("./src/js/react_apps/chat/actions/auth.js");var _ModalAlert=__webpack_require__("./src/js/react_apps/chat/components/ModalAlert/index.js");var _ModalAlert2=_interopRequireDefault(_ModalAlert);var _Alert=__webpack_require__("./src/js/react_apps/chat/components/Alert/index.js");var _Alert2=_interopRequireDefault(_Alert);var _moduleName=__webpack_require__("./src/js/react_apps/chat/constants/moduleName.js");var _intlMessages=__webpack_require__("./src/js/react_apps/chat/socket/intl-messages.js");var _intlMessages2=_interopRequireDefault(_intlMessages);var _config=__webpack_require__("./src/js/react_apps/chat/config.js");var _utils=__webpack_require__("./src/js/react_apps/chat/utils/index.js");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var checkModulesAndShowError=function checkModulesAndShowError(_ref){var state=_ref.state,titleCode=_ref.titleCode,textCode=_ref.textCode,_ref$innerError=_ref.innerError,innerError=_ref$innerError===undefined?false:_ref$innerError,_ref$innerErrorForMod=_ref.innerErrorForModalChat,innerErrorForModalChat=_ref$innerErrorForMod===undefined?false:_ref$innerErrorForMod;var modules=state.modules;var totalUnreadModuleKey=_moduleName.LINK_CONSTANTS[_moduleName.TOTAL_UNREAD].key;var buttonsModuleKey=_moduleName.LINK_CONSTANTS[_moduleName.CHAT_BUTTON].key;var proposalsChatListModuleKey=_moduleName.LINK_CONSTANTS[_moduleName.PROPOSALS_CHAT_LIST].key;var chatModuleKey=_moduleName.LINK_CONSTANTS[_moduleName.CHAT_MODULE].key;if(modules[totalUnreadModuleKey]&&!modules[buttonsModuleKey]&&!modules[proposalsChatListModuleKey]&&!modules[chatModuleKey]){return null;}else if(modules[chatModuleKey]&&!modules[buttonsModuleKey]){if(innerError){var wrapper=document.getElementById(_config.wrappersIds.chatPage);_Alert2.default.render('warning',true,titleCode,textCode,wrapper,true);}else{_ModalAlert2.default.renderWarning(titleCode,textCode);}}else if(modules[proposalsChatListModuleKey]&&!modules[buttonsModuleKey]){if(innerError){var _wrapper=document.getElementById(_config.wrappersIds.proposalsPage);_Alert2.default.render('warning',true,titleCode,textCode,_wrapper,true);}else{_ModalAlert2.default.renderWarning(titleCode,textCode);}}else if(modules[buttonsModuleKey]){if(innerErrorForModalChat){(0,_utils.destroyComponent)(_config.wrappersIds.chatModal);}_ModalAlert2.default.renderWarning(titleCode,textCode);}else{_ModalAlert2.default.renderWarning(titleCode,textCode);}};function addSocketHandlers(store,ws){var remainingAtempts=_config.reconnectionAttempts;var mes=function mes(e){var _users,_users2;var data=JSON.parse(e.data);var state=store.getState();var dispatch=store.dispatch;console.log(data);switch(data.action){case _messageTypes.SUCCESS_GET_CHATS:dispatch((0,_chats.successGetChats)(_extends({currentChatId:data.currentChatId},(0,_normalize.normalizeProposals)({proposals:[{id:state.proposals.selected,title:data.title,date:data.date,users:data.users}]}))));if(data.currentChatId){dispatch((0,_chats.getChat)({chatId:data.currentChatId}));}break;case _messageTypes.SUCCESS_GET_CHAT:dispatch((0,_chats.successGetChat)({proposal:data.proposal,chatId:data.chat.id,messages:(0,_normalize.normalizeMessages)(data.messages||[]),chat:_extends({},data.chat,{partner:state.auth.id===data.chat.owner.id?data.chat.partner.id:data.chat.owner.id}),users:(_users={},_defineProperty(_users,data.chat.partner.id,data.chat.partner),_defineProperty(_users,data.chat.owner.id,data.chat.owner),_users)}));break;case _messageTypes.SUCCESS_CREATE_CHAT:return dispatch((0,_chats.successCreateChat)({proposal:_extends({},data.proposal,{owner:data.chat.owner.id}),chat:_extends({},(0,_omit2.default)(data.chat,'owner'),{partner:state.auth.id===data.chat.owner.id?data.chat.partner.id:data.chat.owner.id}),users:(_users2={},_defineProperty(_users2,data.chat.owner.id,data.chat.owner),_defineProperty(_users2,data.chat.partner.id,data.chat.partner),_users2)}));case _messageTypes.SUCCESS_EDIT_MESSAGE:return dispatch((0,_messages.successEditMessage)(data.id,data.text));case _messageTypes.SUCCESS_ADD_MESSAGE:return dispatch((0,_messages.successAddMessage)((0,_omit2.default)(data,'action')));case _messageTypes.NEW_MESSAGE:return dispatch((0,_messages.newMessage)((0,_omit2.default)(data,['action','chatId','proposalId']),data.chatId,data.proposalId));case _messageTypes.SUCCESS_DELETE_MESSAGE:return dispatch((0,_messages.successDeleteMessage)(data.id,data.chatId,data.to,data.proposalId));case _messageTypes.SUCCESS_SPAM_MESSAGE:return dispatch((0,_messages.successSpamMessage)(data.id,data.chatId));case _messageTypes.SUCCESS_READ_MESSAGE:return dispatch((0,_messages.successReadMessage)(data.id,data.chatId,data.to));case _messageTypes.SUCCESS_GET_PROPOSALS:return dispatch((0,_proposals.successGetProposals)((0,_normalize.normalizeProposals)(data)));case _messageTypes.SUCCESS_GET_ALL_UNREAD:return dispatch((0,_users3.successGetAllUnread)(data.unread));case _messageTypes.INVALID_TOKEN:return dispatch((0,_auth.getNewToken)(data.resend));case _messageTypes.SUCCESS_NEW_TOKEN:return dispatch((0,_auth.successNewToken)(data.token));case _messageTypes.CONNECTION_STATUS:if(data.client_connected){return dispatch((0,_users3.clientConnected)(data.id));}else{return dispatch((0,_users3.clientDisconnected)(data.id));}case _messageTypes.NEW_CHAT:return dispatch((0,_chats.createdNewChat)(data.user));case _messageTypes.FAIL_GET_CHATS:checkModulesAndShowError({state:state,titleCode:_intlMessages2.default.getChatsFail.title,textCode:_intlMessages2.default.getChatsFail.text,innerError:true});return dispatch((0,_chats.failGetChats)());case _messageTypes.FAIL_NEW_TOKEN:checkModulesAndShowError({state:state,titleCode:_intlMessages2.default.getTokenFail.title,textCode:_intlMessages2.default.getTokenFail.text,innerError:true});return dispatch((0,_auth.failNewToken)());case _messageTypes.FAIL_READ_MESSAGE:case _messageTypes.FAIL_CREATE_CHAT:case _messageTypes.FAIL_GET_CHAT:checkModulesAndShowError({state:state,titleCode:_intlMessages2.default.getChatFail.title,textCode:_intlMessages2.default.getChatFail.text,innerErrorForModalChat:true});break;case _messageTypes.FAIL_GET_PROPOSAL_CHATS:checkModulesAndShowError({state:state,titleCode:_intlMessages2.default.getServerFail.title,textCode:_intlMessages2.default.getServerFail.text,innerError:true});break;case _messageTypes.FAIL_ADD_MESSAGE:checkModulesAndShowError({state:state,titleCode:_intlMessages2.default.addMessageFail.title,textCode:_intlMessages2.default.addMessageFail.text});dispatch((0,_messages.failEditMessage)(data.id,data.text));break;case _messageTypes.FAIL_DELETE_MESSAGE:checkModulesAndShowError({state:state,titleCode:_intlMessages2.default.deleteMessageFail.title,textCode:_intlMessages2.default.deleteMessageFail.text});dispatch((0,_messages.failEditMessage)(data.id,data.text));break;case _messageTypes.FAIL_SPAM_MESSAGE:checkModulesAndShowError({state:state,titleCode:_intlMessages2.default.spamMessageFail.title,textCode:_intlMessages2.default.spamMessageFail.text});dispatch((0,_messages.failEditMessage)(data.id,data.text));break;case _messageTypes.FAIL_EDIT_MESSAGE:checkModulesAndShowError({state:state,titleCode:_intlMessages2.default.editMessageFail.title,textCode:_intlMessages2.default.editMessageFail.text});dispatch((0,_messages.failEditMessage)(data.id,data.text));break;default:return;}};function addListeners(){ws.instance.addEventListener('message',mes);ws.instance.addEventListener('error',reconnect);ws.instance.addEventListener('close',reconnect);}addListeners();function reconnect(){if(remainingAtempts<=0){checkModulesAndShowError({state:store.getState(),titleCode:_intlMessages2.default.connectionError.title,textCode:_intlMessages2.default.connectionError.text});return;}ws.reconnect().then(function(){addListeners();remainingAtempts=_config.reconnectionAttempts;}).catch(reconnect);remainingAtempts-=1;}if(true){window.wsReconnect=reconnect;window.setAct=function(messageType){mes({data:JSON.stringify(messageType)});};}};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(checkModulesAndShowError,'checkModulesAndShowError','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/listeners.js');reactHotLoader.register(addSocketHandlers,'addSocketHandlers','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/listeners.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/socket/message-types.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var SUCCESS_GET_CHATS=exports.SUCCESS_GET_CHATS='SUCCESS_GET_CHATS';var FAIL_GET_CHATS=exports.FAIL_GET_CHATS='FAIL_GET_CHATS';var SUCCESS_GET_CHAT=exports.SUCCESS_GET_CHAT='SUCCESS_GET_CHAT';var FAIL_GET_CHAT=exports.FAIL_GET_CHAT='FAIL_GET_CHAT';var SUCCESS_CREATE_CHAT=exports.SUCCESS_CREATE_CHAT='SUCCESS_CREATE_CHAT';var FAIL_CREATE_CHAT=exports.FAIL_CREATE_CHAT='FAIL_CREATE_CHAT';var SUCCESS_EDIT_MESSAGE=exports.SUCCESS_EDIT_MESSAGE='SUCCESS_EDIT_MESSAGE';var FAIL_EDIT_MESSAGE=exports.FAIL_EDIT_MESSAGE='FAIL_EDIT_MESSAGE';var SUCCESS_ADD_MESSAGE=exports.SUCCESS_ADD_MESSAGE='SUCCESS_ADD_MESSAGE';var FAIL_ADD_MESSAGE=exports.FAIL_ADD_MESSAGE='FAIL_ADD_MESSAGE';var SUCCESS_DELETE_MESSAGE=exports.SUCCESS_DELETE_MESSAGE='SUCCESS_DELETE_MESSAGE';var FAIL_DELETE_MESSAGE=exports.FAIL_DELETE_MESSAGE='FAIL_DELETE_MESSAGE';var SUCCESS_SPAM_MESSAGE=exports.SUCCESS_SPAM_MESSAGE='SUCCESS_SPAM_MESSAGE';var FAIL_SPAM_MESSAGE=exports.FAIL_SPAM_MESSAGE='FAIL_SPAM_MESSAGE';var SUCCESS_READ_MESSAGE=exports.SUCCESS_READ_MESSAGE='SUCCESS_READ_MESSAGE';var FAIL_READ_MESSAGE=exports.FAIL_READ_MESSAGE='FAIL_READ_MESSAGE';var NEW_MESSAGE=exports.NEW_MESSAGE='SUCCESS_NEW_MESSAGE';var SUCCESS_GET_PROPOSALS=exports.SUCCESS_GET_PROPOSALS='SUCCESS_GET_PROPOSAL_CHATS';var FAIL_GET_PROPOSAL_CHATS=exports.FAIL_GET_PROPOSAL_CHATS='FAIL_GET_PROPOSAL_CHATS';var INVALID_TOKEN=exports.INVALID_TOKEN='INVALID_TOKEN';var SUCCESS_NEW_TOKEN=exports.SUCCESS_NEW_TOKEN='SUCCESS_NEW_TOKEN';var FAIL_NEW_TOKEN=exports.FAIL_NEW_TOKEN='FAIL_NEW_TOKEN';var SUCCESS_GET_ALL_UNREAD=exports.SUCCESS_GET_ALL_UNREAD='SUCCESS_GET_ALL_UNREAD';var CONNECTION_STATUS=exports.CONNECTION_STATUS='CONNECTION_STATUS';var NEW_CHAT=exports.NEW_CHAT='NEW_CHAT';;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(SUCCESS_GET_CHATS,'SUCCESS_GET_CHATS','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(FAIL_GET_CHATS,'FAIL_GET_CHATS','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(SUCCESS_GET_CHAT,'SUCCESS_GET_CHAT','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(FAIL_GET_CHAT,'FAIL_GET_CHAT','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(SUCCESS_CREATE_CHAT,'SUCCESS_CREATE_CHAT','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(FAIL_CREATE_CHAT,'FAIL_CREATE_CHAT','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(SUCCESS_EDIT_MESSAGE,'SUCCESS_EDIT_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(FAIL_EDIT_MESSAGE,'FAIL_EDIT_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(SUCCESS_ADD_MESSAGE,'SUCCESS_ADD_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(FAIL_ADD_MESSAGE,'FAIL_ADD_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(SUCCESS_DELETE_MESSAGE,'SUCCESS_DELETE_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(FAIL_DELETE_MESSAGE,'FAIL_DELETE_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(SUCCESS_SPAM_MESSAGE,'SUCCESS_SPAM_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(FAIL_SPAM_MESSAGE,'FAIL_SPAM_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(SUCCESS_READ_MESSAGE,'SUCCESS_READ_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(FAIL_READ_MESSAGE,'FAIL_READ_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(NEW_MESSAGE,'NEW_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(SUCCESS_GET_PROPOSALS,'SUCCESS_GET_PROPOSALS','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(FAIL_GET_PROPOSAL_CHATS,'FAIL_GET_PROPOSAL_CHATS','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(INVALID_TOKEN,'INVALID_TOKEN','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(SUCCESS_NEW_TOKEN,'SUCCESS_NEW_TOKEN','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(FAIL_NEW_TOKEN,'FAIL_NEW_TOKEN','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(SUCCESS_GET_ALL_UNREAD,'SUCCESS_GET_ALL_UNREAD','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(CONNECTION_STATUS,'CONNECTION_STATUS','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');reactHotLoader.register(NEW_CHAT,'NEW_CHAT','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/message-types.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/socket/methods.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _debounce=__webpack_require__("./node_modules/lodash/debounce.js");var _debounce2=_interopRequireDefault(_debounce);var _requestTypes=__webpack_require__("./src/js/react_apps/chat/socket/request-types.js");var _index=__webpack_require__("./src/js/react_apps/chat/socket/index.js");var _ModalAlert=__webpack_require__("./src/js/react_apps/chat/components/ModalAlert/index.js");var _ModalAlert2=_interopRequireDefault(_ModalAlert);var _intlMessages=__webpack_require__("./src/js/react_apps/chat/socket/intl-messages.js");var _intlMessages2=_interopRequireDefault(_intlMessages);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var WsMethods=function(){function WsMethods(store,ws){_classCallCheck(this,WsMethods);this.debouncedGetAllUnread=(0,_debounce2.default)(this.getAllUnread,250);this.getState=store.getState;this.ws=ws;}_createClass(WsMethods,[{key:'getAuth',value:function getAuth(){var _getState$auth=this.getState().auth,id=_getState$auth.id,token=_getState$auth.token;return{id:id,token:token};}},{key:'send',value:function send(data){console.log(data);switch(_index.SOCKET_READY_STATES[this.ws.readyState]){case'CLOSING':case'CLOSED':_ModalAlert2.default.renderError((0,_intlMessages2.default)().connectionError.title,(0,_intlMessages2.default)().connectionError.text);break;default:this.ws.instance.send(JSON.stringify(data));}}},{key:'getChats',value:function getChats(_ref){var partnerId=_ref.partnerId,proposalId=_ref.proposalId;var data={action:_requestTypes.GET_CHATS,user_data:this.getAuth(),message_data:{opponent_id:partnerId,proposal_id:proposalId}};this.send(data);}},{key:'getChat',value:function getChat(_ref2){var chatId=_ref2.chatId,proposalId=_ref2.proposalId,partnerId=_ref2.partnerId;var data={action:_requestTypes.GET_CHAT,user_data:this.getAuth(),message_data:{}};if(chatId){data.message_data.chat_id=chatId;}if(proposalId&&partnerId){data.message_data.proposal_id=proposalId;data.message_data.opponent_id=partnerId;}this.send(data);}},{key:'getAllUnread',value:function getAllUnread(){var data={action:_requestTypes.GET_ALL_UNREAD,user_data:this.getAuth()};this.send(data);}},{key:'addMessage',value:function addMessage(_ref3){var text=_ref3.text,to=_ref3.to;var _getState=this.getState(),auth=_getState.auth,chats=_getState.chats;var data={action:_requestTypes.ADD_MESSAGE,user_data:this.getAuth(),message_data:{chat_id:chats.selected,from:auth.id,to:to,text:text}};this.send(data);}},{key:'editMessage',value:function editMessage(_ref4){var id=_ref4.id,text=_ref4.text;var _getState2=this.getState(),chats=_getState2.chats;var data={action:_requestTypes.EDIT_MESSAGE,user_data:this.getAuth(),message_data:{id:id,chat_id:chats.selected,text:text}};this.send(data);}},{key:'deleteMessage',value:function deleteMessage(_ref5){var id=_ref5.id;var _getState3=this.getState(),chats=_getState3.chats;var data={action:_requestTypes.DELETE_MESSAGE,user_data:this.getAuth(),message_data:{id:id,chat_id:chats.selected}};this.send(data);}},{key:'spamMessage',value:function spamMessage(_ref6){var id=_ref6.id;var _getState4=this.getState(),chats=_getState4.chats;var data={action:_requestTypes.SPAM_MESSAGE,user_data:this.getAuth(),message_data:{id:id,chat_id:chats.selected}};this.send(data);}},{key:'readMessages',value:function readMessages(_ref7){var id=_ref7.id;var _getState5=this.getState(),chats=_getState5.chats;var data={action:_requestTypes.READ_MESSAGE,user_data:this.getAuth(),message_data:{id:id,chat_id:chats.selected}};this.send(data);}},{key:'getProposals',value:function getProposals(_ref8){var page=_ref8.page,pageSize=_ref8.pageSize;var data={action:_requestTypes.GET_PROPOSALS,user_data:this.getAuth(),message_data:{page:page,page_size:pageSize}};this.send(data);}},{key:'getNewToken',value:function getNewToken(){var _getState6=this.getState(),auth=_getState6.auth;if(!!auth.pendingToken){return;}var data={action:_requestTypes.GET_NEW_TOKEN,user_data:{id:auth.id,reauthtoken:auth.reauthtoken}};this.send(data);}},{key:'__reactstandin__regenerateByEval',value:function __reactstandin__regenerateByEval(key,code){this[key]=eval(code);}}]);return WsMethods;}();var _default=WsMethods;exports.default=_default;;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(WsMethods,'WsMethods','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/methods.js');reactHotLoader.register(_default,'default','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/methods.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/socket/request-types.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var ADD_MESSAGE=exports.ADD_MESSAGE='addMessage';var EDIT_MESSAGE=exports.EDIT_MESSAGE='editMessage';var SPAM_MESSAGE=exports.SPAM_MESSAGE='spamMessage';var DELETE_MESSAGE=exports.DELETE_MESSAGE='deleteMessage';var READ_MESSAGE=exports.READ_MESSAGE='readMessage';var GET_CHAT=exports.GET_CHAT='getChat';var GET_CHATS=exports.GET_CHATS='getChats';var GET_PROPOSALS=exports.GET_PROPOSALS='getProposalChats';var GET_ALL_UNREAD=exports.GET_ALL_UNREAD='getAllUnread';var GET_NEW_TOKEN=exports.GET_NEW_TOKEN='getNewToken';;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(ADD_MESSAGE,'ADD_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/request-types.js');reactHotLoader.register(EDIT_MESSAGE,'EDIT_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/request-types.js');reactHotLoader.register(SPAM_MESSAGE,'SPAM_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/request-types.js');reactHotLoader.register(DELETE_MESSAGE,'DELETE_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/request-types.js');reactHotLoader.register(READ_MESSAGE,'READ_MESSAGE','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/request-types.js');reactHotLoader.register(GET_CHAT,'GET_CHAT','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/request-types.js');reactHotLoader.register(GET_CHATS,'GET_CHATS','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/request-types.js');reactHotLoader.register(GET_PROPOSALS,'GET_PROPOSALS','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/request-types.js');reactHotLoader.register(GET_ALL_UNREAD,'GET_ALL_UNREAD','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/request-types.js');reactHotLoader.register(GET_NEW_TOKEN,'GET_NEW_TOKEN','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/socket/request-types.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/store.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});var _typeof=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=getStore;var _redux=__webpack_require__("./node_modules/redux/es/index.js");var _reduxThunk=__webpack_require__("./node_modules/redux-thunk/lib/index.js");var _reduxThunk2=_interopRequireDefault(_reduxThunk);var _socket=__webpack_require__("./src/js/react_apps/chat/socket/index.js");var _socket2=_interopRequireDefault(_socket);var _reducers=__webpack_require__("./src/js/react_apps/chat/reducers/index.js");var _reducers2=_interopRequireDefault(_reducers);var _listeners=__webpack_require__("./src/js/react_apps/chat/socket/listeners.js");var _listeners2=_interopRequireDefault(_listeners);var _methods=__webpack_require__("./src/js/react_apps/chat/socket/methods.js");var _methods2=_interopRequireDefault(_methods);var _modules=__webpack_require__("./src/js/react_apps/chat/reducers/modules.js");var _moduleName=__webpack_require__("./src/js/react_apps/chat/constants/moduleName.js");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var store=null;function getStore(){var moduleName=arguments.length>0&&arguments[0]!==undefined?arguments[0]:false;var checkModuleInStore=function checkModuleInStore(){if(_moduleName.LINK_CONSTANTS[moduleName]){var state=store.getState();var key=_moduleName.LINK_CONSTANTS[moduleName].key;var action=_moduleName.LINK_CONSTANTS[moduleName].action;if(!state.modules[key]){store.dispatch(action());}}};return new Promise(function(resolve,reject){if(store){checkModuleInStore();return resolve(store);}var setModules=function setModules(moduleName){if(_moduleName.LINK_CONSTANTS[moduleName]){var key=_moduleName.LINK_CONSTANTS[moduleName].key;return _extends({},_modules.initialState,_defineProperty({},key,true));}else{return _modules.initialState;}};(0,_socket2.default)().then(function(ws){if(store){checkModuleInStore();return resolve(store);}var appState=window.INITIAL_STATE||{};var wsApi={};var composeEnhancers="development"==='development'&&(typeof window==='undefined'?'undefined':_typeof(window))==='object'&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:_redux.compose;var middlewares=[(0,_redux.applyMiddleware)(_reduxThunk2.default.withExtraArgument(wsApi))];store=(0,_redux.createStore)(_reducers2.default,{auth:_extends({},appState.auth,{pendingToken:false,pendingToResend:[]}),modules:_extends({},setModules(moduleName))},composeEnhancers.apply(undefined,middlewares));wsApi.ws=new _methods2.default(store,ws);(0,_listeners2.default)(store,ws);resolve(store);}).catch(function(err){return reject(err);});});};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(store,'store','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/store.js');reactHotLoader.register(getStore,'getStore','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/store.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/utils/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.checkDateForEditMessage=undefined;exports.createWrapper=createWrapper;exports.getDate=getDate;exports.getOnlyDate=getOnlyDate;exports.ucFirst=ucFirst;exports.unmountComponent=unmountComponent;exports.destroyComponent=destroyComponent;exports.addParamsToUrl=addParamsToUrl;exports.createError=createError;var _reactDom=__webpack_require__("./node_modules/react-dom/index.js");var _reactDom2=_interopRequireDefault(_reactDom);var _dateformat=__webpack_require__("./node_modules/dateformat/lib/dateformat.js");var _dateformat2=_interopRequireDefault(_dateformat);var _config=__webpack_require__("./src/js/react_apps/chat/config.js");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();function createWrapper(id){var wrapper=document.createElement('div');wrapper.id=id;document.body.appendChild(wrapper);return wrapper;}var checkDateForEditMessage=exports.checkDateForEditMessage=function checkDateForEditMessage(date){return(date.sec+_config.timeoutMessage)*1000>Number(new Date());};function getDate(date){return date instanceof Date?date:new Date(date.sec*1000);}function getOnlyDate(date){return(0,_dateformat2.default)(getDate(date),'yyyy/mm/dd');}function ucFirst(str){if(!str){return str;}return str[0].toUpperCase()+str.slice(1);}function unmountComponent(id){if(!document.getElementById(id)){return;}_reactDom2.default.unmountComponentAtNode(document.getElementById(id));}function destroyComponent(id){if(!document.getElementById(id)){return;}unmountComponent(id);document.body.removeChild(document.getElementById(id));}function addParamsToUrl(params){var _window$location=window.location,origin=_window$location.origin,pathname=_window$location.pathname;var paramsArray=Object.keys(params).map(function(param){return param+'='+params[param];});var paramsStr='?'+paramsArray.join('&');window.history.pushState(null,null,''+origin+pathname+paramsStr);}function createError(messageCode){var err=new Error(messageCode);err.message=messageCode;return err;};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(createWrapper,'createWrapper','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/utils/index.js');reactHotLoader.register(checkDateForEditMessage,'checkDateForEditMessage','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/utils/index.js');reactHotLoader.register(getDate,'getDate','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/utils/index.js');reactHotLoader.register(getOnlyDate,'getOnlyDate','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/utils/index.js');reactHotLoader.register(ucFirst,'ucFirst','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/utils/index.js');reactHotLoader.register(unmountComponent,'unmountComponent','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/utils/index.js');reactHotLoader.register(destroyComponent,'destroyComponent','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/utils/index.js');reactHotLoader.register(addParamsToUrl,'addParamsToUrl','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/utils/index.js');reactHotLoader.register(createError,'createError','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/utils/index.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/utils/render.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.default=render;var _react=__webpack_require__("./node_modules/react/index.js");var _react2=_interopRequireDefault(_react);var _reactDom=__webpack_require__("./node_modules/react-dom/index.js");var _reactDom2=_interopRequireDefault(_reactDom);var _reactRedux=__webpack_require__("./node_modules/react-redux/es/index.js");var _reactIntl=__webpack_require__("./node_modules/react-intl/lib/index.es.js");var _reactI18next=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");var _=__webpack_require__("./src/js/react_apps/chat/utils/index.js");var _store=__webpack_require__("./src/js/react_apps/chat/store.js");var _store2=_interopRequireDefault(_store);var _i18n=__webpack_require__("./src/js/react_apps/chat/i18n.js");var _i18n2=_interopRequireDefault(_i18n);var _i18n3=__webpack_require__("./src/js/react_apps/common/helpers/i18n/i18n.js");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var renderError='chat_global_render_error';function render(Component,el){var moduleName=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var props=arguments.length>3&&arguments[3]!==undefined?arguments[3]:{};return new Promise(function(resolve,reject){if(!el){reject((0,_.createError)(renderError));}(0,_i18n3.loadedI18n)().then(function(i18n){var locale=i18n.language;(0,_i18n2.default)(locale).then(function(){return(0,_store2.default)(moduleName);}).then(function(store){if(!store.getState().auth){return;}_reactDom2.default.render(_react2.default.createElement(_reactRedux.Provider,{store:store},_react2.default.createElement(_reactIntl.IntlProvider,{locale:locale,textComponent:_react.Fragment},_react2.default.createElement(_reactI18next.I18nextProvider,{i18n:i18n},_react2.default.createElement(Component,props)))),el,resolve);}).catch(function(err){reject(err);});});});};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(renderError,'renderError','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/utils/render.js');reactHotLoader.register(render,'render','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/utils/render.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/chat/utils/renderWithoutStore.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});exports.default=renderWithoutStore;var _react=__webpack_require__("./node_modules/react/index.js");var _react2=_interopRequireDefault(_react);var _reactDom=__webpack_require__("./node_modules/react-dom/index.js");var _reactDom2=_interopRequireDefault(_reactDom);var _reactIntl=__webpack_require__("./node_modules/react-intl/lib/index.es.js");var _reactI18next=__webpack_require__("./node_modules/react-i18next/dist/es/index.js");var _=__webpack_require__("./src/js/react_apps/chat/utils/index.js");var _i18n=__webpack_require__("./src/js/react_apps/chat/i18n.js");var _i18n2=_interopRequireDefault(_i18n);var _i18n3=__webpack_require__("./src/js/react_apps/common/helpers/i18n/i18n.js");function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var renderError='chat_global_render_error';function renderWithoutStore(Component,el){var props=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};return new Promise(function(resolve,reject){if(!el){reject((0,_.createError)(renderError));}(0,_i18n3.loadedI18n)().then(function(i18n){var locale=i18n.language;(0,_i18n2.default)(locale).then(function(){_reactDom2.default.render(_react2.default.createElement(_reactIntl.IntlProvider,{locale:locale},_react2.default.createElement(_reactI18next.I18nextProvider,{i18n:i18n},_react2.default.createElement(Component,props))),el,resolve);});});});};(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(renderError,'renderError','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/utils/renderWithoutStore.js');reactHotLoader.register(renderWithoutStore,'renderWithoutStore','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/chat/utils/renderWithoutStore.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/js/react_apps/informationMessagesModal/containers/informationMessages/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__("./node_modules/react/index.js");var _react2=_interopRequireDefault(_react);var _constants=__webpack_require__("./src/js/react_apps/informationMessagesModal/constants/index.js");var _errorMessage=__webpack_require__("./src/js/react_apps/informationMessagesModal/components/errorMessage/index.js");var _errorMessage2=_interopRequireDefault(_errorMessage);var _warningMessage=__webpack_require__("./src/js/react_apps/informationMessagesModal/components/warningMessage/index.js");var _warningMessage2=_interopRequireDefault(_warningMessage);var _successMessage=__webpack_require__("./src/js/react_apps/informationMessagesModal/components/successMessage/index.js");var _successMessage2=_interopRequireDefault(_successMessage);var _infoMessage=__webpack_require__("./src/js/react_apps/informationMessagesModal/components/infoMessage/index.js");var _infoMessage2=_interopRequireDefault(_infoMessage);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}(function(){var enterModule=__webpack_require__("./node_modules/react-hot-loader/index.js").enterModule;enterModule&&enterModule(module);})();var InformationMessages=function InformationMessages(_ref){var messageType=_ref.messageType,title=_ref.title,message=_ref.message;switch(messageType){case _constants.informationMessagesModalConstants.INFO_MODAL_ERROR_TYPE:return _react2.default.createElement(_errorMessage2.default,{title:title,message:message});case _constants.informationMessagesModalConstants.INFO_MODAL_SUCCESS_TYPE:return _react2.default.createElement(_successMessage2.default,{title:title,message:message});case _constants.informationMessagesModalConstants.INFO_MODAL_INFO_TYPE:return _react2.default.createElement(_infoMessage2.default,{title:title,message:message});case _constants.informationMessagesModalConstants.INFO_MODAL_WARNING_TYPE:return _react2.default.createElement(_warningMessage2.default,{title:title,message:message});default:console.warn('Cannot have "'+messageType+'" type message');return null;}};var _default=InformationMessages;exports.default=_default;;(function(){var reactHotLoader=__webpack_require__("./node_modules/react-hot-loader/index.js").default;var leaveModule=__webpack_require__("./node_modules/react-hot-loader/index.js").leaveModule;if(!reactHotLoader){return;}reactHotLoader.register(InformationMessages,'InformationMessages','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/informationMessagesModal/containers/informationMessages/index.js');reactHotLoader.register(_default,'default','/Users/sgr/Work/Sites/devbs/www/frontend_app/src/js/react_apps/informationMessagesModal/containers/informationMessages/index.js');leaveModule(module);})();;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 27:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

});
//# sourceMappingURL=4.js.map