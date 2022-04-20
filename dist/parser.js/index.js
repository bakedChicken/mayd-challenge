/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 710:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorLogMessageFilter = exports.LogMessageFilter = void 0;
const LogLevels_1 = __nccwpck_require__(945);
class LogMessageFilter {
    constructor(predicate) {
        this.predicate = predicate;
    }
    check(value) {
        return this.predicate(value);
    }
}
exports.LogMessageFilter = LogMessageFilter;
class ErrorLogMessageFilter extends LogMessageFilter {
    constructor() {
        super((log) => log.logLevel === LogLevels_1.LogLevels.ERROR);
    }
}
exports.ErrorLogMessageFilter = ErrorLogMessageFilter;


/***/ }),

/***/ 945:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.assertStringIsLogLevel = exports.UnknownLogLevelError = exports.LogLevels = void 0;
var LogLevels;
(function (LogLevels) {
    LogLevels["INFO"] = "info";
    LogLevels["DEBUG"] = "debug";
    LogLevels["WARN"] = "warn";
    LogLevels["ERROR"] = "error";
})(LogLevels = exports.LogLevels || (exports.LogLevels = {}));
class UnknownLogLevelError extends Error {
    constructor(supposedLogLevel) {
        super(`The log message has unknown log level: ${supposedLogLevel}`);
        this.supposedLogLevel = supposedLogLevel;
    }
}
exports.UnknownLogLevelError = UnknownLogLevelError;
function assertStringIsLogLevel(value) {
    if (!Object.values(LogLevels).includes(value)) {
        throw new UnknownLogLevelError(value);
    }
}
exports.assertStringIsLogLevel = assertStringIsLogLevel;


/***/ }),

/***/ 555:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogMessageFormatParser = exports.MalformedLogMessageError = void 0;
const LogLevels_1 = __nccwpck_require__(945);
class MalformedLogMessageError extends Error {
    constructor(raw) {
        super(`The log message has malformed format:\n${raw}`);
        this.raw = raw;
    }
}
exports.MalformedLogMessageError = MalformedLogMessageError;
class LogMessageFormatParser {
    parse(line) {
        try {
            const splittedLine = line.split(" - ");
            if (splittedLine.length !== 3) {
                return {
                    result: "error",
                    error: new MalformedLogMessageError(line),
                };
            }
            const [date, logLevel, message] = splittedLine;
            (0, LogLevels_1.assertStringIsLogLevel)(logLevel);
            return {
                result: "ok",
                message: {
                    loggedAt: new Date(date),
                    logLevel: logLevel,
                    message: JSON.parse(message),
                },
            };
        }
        catch (error) {
            return {
                result: "error",
                error: error,
            };
        }
    }
}
exports.LogMessageFormatParser = LogMessageFormatParser;


/***/ }),

/***/ 521:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StreamReader = void 0;
const readline_1 = __nccwpck_require__(761);
class StreamReader {
    constructor(stream) {
        this.stream = stream;
    }
    read() {
        return __asyncGenerator(this, arguments, function* read_1() {
            var e_1, _a;
            const readLineInterface = (0, readline_1.createInterface)({
                input: this.stream,
                crlfDelay: Infinity,
            });
            try {
                for (var readLineInterface_1 = __asyncValues(readLineInterface), readLineInterface_1_1; readLineInterface_1_1 = yield __await(readLineInterface_1.next()), !readLineInterface_1_1.done;) {
                    const line = readLineInterface_1_1.value;
                    yield yield __await(line);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (readLineInterface_1_1 && !readLineInterface_1_1.done && (_a = readLineInterface_1.return)) yield __await(_a.call(readLineInterface_1));
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
}
exports.StreamReader = StreamReader;


/***/ }),

/***/ 118:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OutputLogMessageToStringTransformer = exports.InputLogMessageToOutputLogMessageTransformer = exports.composeTransformers = void 0;
function composeTransformers(...transformers) {
    return {
        transform: (value) => {
            let transformedValue = value;
            for (const transformer of transformers) {
                transformedValue = transformer.transform(transformedValue);
            }
            return transformedValue;
        },
    };
}
exports.composeTransformers = composeTransformers;
class InputLogMessageToOutputLogMessageTransformer {
    transform(value) {
        return {
            timestamp: value.loggedAt.valueOf(),
            loglevel: value.logLevel,
            transactionId: value.message.transactionId,
            error: value.message.err,
        };
    }
}
exports.InputLogMessageToOutputLogMessageTransformer = InputLogMessageToOutputLogMessageTransformer;
class OutputLogMessageToStringTransformer {
    transform(value) {
        return JSON.stringify(value);
    }
}
exports.OutputLogMessageToStringTransformer = OutputLogMessageToStringTransformer;


/***/ }),

/***/ 898:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JsonWriter = void 0;
class JsonWriter {
    constructor(stream) {
        this.stream = stream;
        this.isFirstWrite = true;
    }
    append(value) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isFirstWrite) {
                this.stream.write("[");
            }
            yield new Promise((resolve, reject) => {
                this.stream.write(this.isFirstWrite ? value : `,${value}`, "utf-8", (err) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
            });
            this.isFirstWrite = false;
        });
    }
    end() {
        this.stream.write("]");
        this.stream.end();
    }
}
exports.JsonWriter = JsonWriter;


/***/ }),

/***/ 399:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const fs_1 = __nccwpck_require__(147);
const path_1 = __nccwpck_require__(17);
const Filter_1 = __nccwpck_require__(710);
const parse_1 = __nccwpck_require__(89);
const Parser_1 = __nccwpck_require__(555);
const Reader_1 = __nccwpck_require__(521);
const Transformer_1 = __nccwpck_require__(118);
const Writer_1 = __nccwpck_require__(898);
function main(inputFile, outputFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const readStream = (0, fs_1.createReadStream)(inputFile, {
            encoding: "utf-8",
        });
        const writeStream = (0, fs_1.createWriteStream)(outputFile, {
            encoding: "utf-8",
        });
        yield (0, parse_1.parse)(new Reader_1.StreamReader(readStream), new Parser_1.LogMessageFormatParser(), new Filter_1.ErrorLogMessageFilter(), (0, Transformer_1.composeTransformers)(new Transformer_1.InputLogMessageToOutputLogMessageTransformer(), new Transformer_1.OutputLogMessageToStringTransformer()), new Writer_1.JsonWriter(writeStream));
    });
}
const inputArgIndex = process.argv.indexOf("--input");
const outputArgIndex = process.argv.indexOf("--output");
if (inputArgIndex === -1 || outputArgIndex === -1) {
    console.error("FORMAT: node parser.js --input filename --output filename");
    process.exit(1);
}
const input = (0, path_1.resolve)(process.argv[inputArgIndex + 1]);
const output = (0, path_1.resolve)(process.argv[outputArgIndex + 1]);
main(input, output).catch(console.error);


/***/ }),

/***/ 89:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parse = void 0;
// parser enterprise edition
function parse(reader, parser, filter, transformer, writer) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (var _b = __asyncValues(reader.read()), _c; _c = yield _b.next(), !_c.done;) {
                const rawLine = _c.value;
                try {
                    const parseResult = parser.parse(rawLine);
                    if (parseResult.result === "error") {
                        console.error("An error occured during parsing:");
                        console.error(parseResult.error);
                        console.error("skipping...");
                        continue;
                    }
                    if (filter.check(parseResult.message)) {
                        yield writer.append(transformer.transform(parseResult.message));
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        writer.end();
    });
}
exports.parse = parse;


/***/ }),

/***/ 147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 17:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 761:
/***/ ((module) => {

module.exports = require("readline");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(399);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;