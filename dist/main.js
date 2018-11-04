/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('[CLIENT.JS]: first line')\n\n// import { express } from 'express';\n// import CodeMirror from './codemirror/lib/codemirror.js'\n\nconsole.log(42);\n\n// // ======================= Editor =========================\n// import CodeMirror from 'codemirror/lib/codemirror.js'\n// import 'codemirror/lib/codemirror.css'\n// // import 'codemirror/theme/seti.css'\n// // import 'codemirror/mode/javascript/javascript.js'\n// const code   = document.getElementById('codeMirrorContainer')\n// const editor = CodeMirror.fromTextArea(code, {\n//   // mode:         'javascript',\n//   // theme:        'seti',\n//   lineNumbers:  true,\n//   tabSize:      2,\n// })\n\n\n// // ========================= REPL ==========================\n// import { Terminal } from 'xterm'\n// import * as fit     from 'xterm/lib/addons/fit/fit'\n// import 'xterm/dist/xterm.css'\n// Terminal.applyAddon(fit)\n// const term = new Terminal()\n\n// term.open(document.getElementById('terminal'))\n// term.fit()\n// term.writeln('----- The Cat Stones REPL -----')\n// term.writeln('')\n// term.write('>> ')\n\n// const termTextArea = document.querySelector('.xterm-helper-textarea')\n\n// let state = {\n//   line: '',\n// }\n\n// const evaluate = (line) => (\n//   fetch('/input', {\n//     method  : 'POST',\n//     headers : { 'Content-Type': 'text/plain; charset=utf-8' },\n//     body    : line,\n//   })\n// )\n\n// const handleTerminalKeypress = ({ target, key }) => {\n//   if (target !== termTextArea) return\n//   term.write(key)\n//   state.line += key\n// }\n\n// const handleEnterReleased = () => {\n//   term.writeln('')\n//   evaluate(state.line)\n//     .then(response => response.text())\n//     .then((data) => {\n//       console.log(data)\n//       term.write(data)\n//       state.line = ''\n//     })\n// }\n\n// const handleBackspaceReleased = () => {\n//   term.write('\\b \\b')\n//   state.line = state.line.slice(0, -1)\n//   console.log(state.line)\n// }\n\n// document.addEventListener('keypress', handleTerminalKeypress)\n\n// document.addEventListener('keyup', ({ target, key }) => {\n//   if (target !== termTextArea) return\n//   console.log(state.line)\n//   if (key === 'Enter')     return handleEnterReleased()\n//   if (key === 'Backspace') return handleBackspaceReleased()\n// })\n\n\n// // ========================= Yjs =========================\n// import Y                 from 'yjs'\n// import yWebsocketsClient from 'y-websockets-client'\n// import yMemory           from 'y-memory'\n// import yArray            from 'y-array'\n// import yText             from 'y-text'\n// Y.extend(yWebsocketsClient, yMemory, yArray, yText)\n// const url = 'https://catstones-websocket-server.herokuapp.com/'\n// const io  = Y['websockets-client'].io\n// Y({\n//   db: {\n//     name: 'memory',             // store the shared data in memory\n//   },\n//   connector: {\n//     name: 'websockets-client',  // use the websockets connector\n//     room: 'catstones-repl',     // instances connected to the same room share data\n//     // TODO: uncomment to use custom WebSocket server\n//     // socket: io(url),         // Pass socket.io object to use (CORS...?)\n//     // url,\n//   },\n//   share: {                      // specify the shared content\n//     array:         'Array',\n//     editorText:    'Text',\n//     terminalText:  'Text',\n//   },\n// }).then((y) => {                // Yjs is successfully initialized\n//   // ~~~~~ debugging ~~~~~ TODO: remove\n//   console.log('Yjs instance ready!')\n//   window.y = y\n\n//   y.share.editorText.bindCodeMirror(editor)\n// })\n\n\n// // ~~~~~ debugging ~~~~~ TODO: remove\n// // Yjs\n// window.Y          = Y\n// window.io         = Y['websockets-client'].io\n// // CodeMirror\n// window.CodeMirror = CodeMirror\n// window.code       = code\n// window.editor     = editor\n// // xterm.js\n// window.term       = term\n\n\nconsole.log('[CLIENT.JS]: last line')\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });