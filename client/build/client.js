/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _settings = __webpack_require__(1);
	
	var _settings2 = _interopRequireDefault(_settings);
	
	var _socket = __webpack_require__(4);
	
	var _socket2 = _interopRequireDefault(_socket);
	
	var _canvas = __webpack_require__(5);
	
	var _canvas2 = _interopRequireDefault(_canvas);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var WS_HOST = 'ws://10.0.1.141:8989';
	
	var Client = function () {
		function Client() {
			_classCallCheck(this, Client);
	
			this.canvas = new _canvas2.default();
	
			this.settings = new _settings2.default();
			this.settings.on('update', this.addUser.bind(this));
	
			this.socket = new _socket2.default(WS_HOST);
			this.socket.on('connect', this.onConnect.bind(this));
			this.socket.on('disconnect', this.onDisconnect.bind(this));
			this.socket.on('onmessage', this.onMessage.bind(this));
			this.socket.connect();
		}
	
		_createClass(Client, [{
			key: 'onConnect',
			value: function onConnect() {
				this.settings.status = 'connected';
				if (this.settings.name != '') {
					this.addUser();
				}
			}
		}, {
			key: 'onDisconnect',
			value: function onDisconnect() {
				this.settings.status = 'non-connected';
				this.canvas.fill('black');
			}
		}, {
			key: 'onMessage',
			value: function onMessage(msg) {
				this.canvas.fill(msg);
			}
		}, {
			key: 'addUser',
			value: function addUser() {
				// console.log('updateName', this.settings.name)
				this.socket.send({
					'type': 'add-user',
					'name': this.settings.name
				});
			}
		}]);
	
		return Client;
	}();
	
	new Client();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventemitter = __webpack_require__(2);
	
	var _eventemitter2 = _interopRequireDefault(_eventemitter);
	
	__webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* global $ */
	
	var Config = function (_EventEmitter) {
		_inherits(Config, _EventEmitter);
	
		function Config() {
			_classCallCheck(this, Config);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Config).call(this));
	
			_this.$form = $('.settings');
			_this.$status = $('.settings__status');
			_this.$name = $('.settings__name');
	
			_this.$form.sisyphus();
	
			$('.settings__update').on('click', function () {
				_this.emit('update');
			});
	
			// $(window).on('keyup', (e) => {
			// 	const key = String.fromCharCode(e.keyCode)
			// 	if (key == 'H') {
			// 		this.$form.toggleClass('hidden')
			// 	}
			// })
	
			$('.canvas').on('click', function () {
				_this.$form.toggleClass('hidden');
			});
			return _this;
		}
	
		_createClass(Config, [{
			key: 'status',
			get: function get() {
				return this.$status.html();
			},
			set: function set(_status) {
				this.$status.html(_status);
			}
		}, {
			key: 'name',
			get: function get() {
				return this.$name.val();
			}
		}]);
	
		return Config;
	}(_eventemitter2.default);

	exports.default = Config;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var has = Object.prototype.hasOwnProperty;
	
	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;
	
	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} [once=false] Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}
	
	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }
	
	/**
	 * Hold the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;
	
	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var events = this._events
	    , names = []
	    , name;
	
	  if (!events) return names;
	
	  for (name in events) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }
	
	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }
	
	  return names;
	};
	
	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];
	
	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];
	
	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }
	
	  return ee;
	};
	
	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return false;
	
	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;
	
	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);
	
	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }
	
	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }
	
	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;
	
	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);
	
	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }
	
	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }
	
	  return true;
	};
	
	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;
	
	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;
	
	  if (!this._events || !this._events[evt]) return this;
	
	  var listeners = this._events[evt]
	    , events = [];
	
	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }
	
	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }
	
	  return this;
	};
	
	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;
	
	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);
	
	  return this;
	};
	
	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};
	
	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;
	
	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 3 */
/***/ function(module, exports) {

	!function(a){function b(a){return"[id="+a.attr("id")+"][name="+a.attr("name")+"]"}a.fn.sisyphus=function(c){var d=a.map(this,function(c){return b(a(c))}).join(),e=Sisyphus.getInstance(d);return e.protect(this,c),e};var c={};c.isAvailable=function(){if("object"==typeof a.jStorage)return!0;try{return localStorage.getItem}catch(b){return!1}},c.set=function(b,c){if("object"==typeof a.jStorage)a.jStorage.set(b,c+"");else try{localStorage.setItem(b,c+"")}catch(d){}},c.get=function(b){if("object"==typeof a.jStorage){var c=a.jStorage.get(b);return c?c.toString():c}return localStorage.getItem(b)},c.remove=function(b){"object"==typeof a.jStorage?a.jStorage.deleteKey(b):localStorage.removeItem(b)},Sisyphus=function(){function f(){return{setInstanceIdentifier:function(a){this.identifier=a},getInstanceIdentifier:function(){return this.identifier},setInitialOptions:function(b){var d={excludeFields:[],customKeySuffix:"",locationBased:!1,timeout:0,autoRelease:!0,onBeforeSave:function(){},onSave:function(){},onBeforeRestore:function(){},onRestore:function(){},onRelease:function(){}};this.options=this.options||a.extend(d,b),this.browserStorage=c},setOptions:function(b){this.options=this.options||this.setInitialOptions(b),this.options=a.extend(this.options,b)},protect:function(b,c){this.setOptions(c),b=b||{};var f=this;if(this.targets=this.targets||[],f.options.name?this.href=f.options.name:this.href=location.hostname+location.pathname+location.search+location.hash,this.targets=a.merge(this.targets,b),this.targets=a.unique(this.targets),this.targets=a(this.targets),!this.browserStorage.isAvailable())return!1;var g=f.options.onBeforeRestore.call(f);if((void 0===g||g)&&f.restoreAllData(),this.options.autoRelease&&f.bindReleaseData(),!d.started[this.getInstanceIdentifier()])if(f.isCKEditorPresent())var h=setInterval(function(){e.isLoaded&&(clearInterval(h),f.bindSaveData(),d.started[f.getInstanceIdentifier()]=!0)},100);else f.bindSaveData(),d.started[f.getInstanceIdentifier()]=!0},isCKEditorPresent:function(){return this.isCKEditorExists()?(e.isLoaded=!1,e.on("instanceReady",function(){e.isLoaded=!0}),!0):!1},isCKEditorExists:function(){return"undefined"!=typeof e},findFieldsToProtect:function(a){return a.find(":input").not(":submit").not(":reset").not(":button").not(":file").not(":password").not(":disabled").not("[readonly]")},bindSaveData:function(){var c=this;c.options.timeout&&c.saveDataByTimeout(),c.targets.each(function(){var d=b(a(this));c.findFieldsToProtect(a(this)).each(function(){if(-1!==a.inArray(this,c.options.excludeFields))return!0;var e=a(this),f=(c.options.locationBased?c.href:"")+d+b(e)+c.options.customKeySuffix;(e.is(":text")||e.is("textarea"))&&(c.options.timeout||c.bindSaveDataImmediately(e,f)),c.bindSaveDataOnChange(e)})})},saveAllData:function(){var c=this;c.targets.each(function(){var d=b(a(this)),f={};c.findFieldsToProtect(a(this)).each(function(){var g=a(this);if(-1!==a.inArray(this,c.options.excludeFields)||void 0===g.attr("name")&&void 0===g.attr("id"))return!0;var h=(c.options.locationBased?c.href:"")+d+b(g)+c.options.customKeySuffix,i=g.val();if(g.is(":checkbox")){var j=g.attr("name");if(void 0!==j&&-1!==j.indexOf("[")){if(f[j]===!0)return;i=[],a("[name='"+j+"']:checked").each(function(){i.push(a(this).val())}),f[j]=!0}else i=g.is(":checked");c.saveToBrowserStorage(h,i,!1)}else if(g.is(":radio"))g.is(":checked")&&(i=g.val(),c.saveToBrowserStorage(h,i,!1));else if(c.isCKEditorExists()){var k=e.instances[g.attr("name")]||e.instances[g.attr("id")];k?(k.updateElement(),c.saveToBrowserStorage(h,g.val(),!1)):c.saveToBrowserStorage(h,i,!1)}else c.saveToBrowserStorage(h,i,!1)})}),c.options.onSave.call(c)},restoreAllData:function(){var c=this,d=!1;c.targets.each(function(){var e=a(this),f=b(a(this));c.findFieldsToProtect(e).each(function(){if(-1!==a.inArray(this,c.options.excludeFields))return!0;var e=a(this),g=(c.options.locationBased?c.href:"")+f+b(e)+c.options.customKeySuffix,h=c.browserStorage.get(g);null!==h&&(c.restoreFieldsData(e,h),d=!0)})}),d&&c.options.onRestore.call(c)},restoreFieldsData:function(a,b){if(void 0===a.attr("name")&&void 0===a.attr("id"))return!1;var c=a.attr("name");!a.is(":checkbox")||"false"===b||void 0!==c&&-1!==c.indexOf("[")?!a.is(":checkbox")||"false"!==b||void 0!==c&&-1!==c.indexOf("[")?a.is(":radio")?a.val()===b&&a.prop("checked",!0):void 0===c||-1===c.indexOf("[")?a.val(b):(b=b.split(","),a.val(b)):a.prop("checked",!1):a.prop("checked",!0)},bindSaveDataImmediately:function(a,b){var c=this;if("onpropertychange"in a?a.get(0).onpropertychange=function(){c.saveToBrowserStorage(b,a.val())}:a.get(0).oninput=function(){c.saveToBrowserStorage(b,a.val())},this.isCKEditorExists()){var d=e.instances[a.attr("name")]||e.instances[a.attr("id")];d&&d.document.on("keyup",function(){d.updateElement(),c.saveToBrowserStorage(b,a.val())})}},saveToBrowserStorage:function(a,b,c){var d=this,e=d.options.onBeforeSave.call(d);(void 0===e||e!==!1)&&(c=void 0===c?!0:c,this.browserStorage.set(a,b),c&&""!==b&&this.options.onSave.call(this))},bindSaveDataOnChange:function(a){var b=this;a.change(function(){b.saveAllData()})},saveDataByTimeout:function(){var a=this,b=a.targets;setTimeout(function(){function b(){a.saveAllData(),setTimeout(b,1e3*a.options.timeout)}return b}(b),1e3*a.options.timeout)},bindReleaseData:function(){var c=this;c.targets.each(function(){var d=a(this),e=b(d);a(this).bind("submit reset",function(){c.releaseData(e,c.findFieldsToProtect(d))})})},manuallyReleaseData:function(){var c=this;c.targets.each(function(){var d=a(this),e=b(d);c.releaseData(e,c.findFieldsToProtect(d))})},releaseData:function(c,e){var f=!1,g=this;d.started[g.getInstanceIdentifier()]=!1,e.each(function(){if(-1!==a.inArray(this,g.options.excludeFields))return!0;var d=a(this),e=(g.options.locationBased?g.href:"")+c+b(d)+g.options.customKeySuffix;g.browserStorage.remove(e),f=!0}),f&&g.options.onRelease.call(g)}}}var d={instantiated:[],started:[]},e=window.CKEDITOR;return{getInstance:function(a){return d.instantiated[a]||(d.instantiated[a]=f(),d.instantiated[a].setInstanceIdentifier(a),d.instantiated[a].setInitialOptions()),a?d.instantiated[a]:d.instantiated[a]},free:function(){return d={instantiated:[],started:[]},null},version:"1.1.2"}}()}(jQuery);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventemitter = __webpack_require__(2);
	
	var _eventemitter2 = _interopRequireDefault(_eventemitter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Socket = function (_EventEmitter) {
		_inherits(Socket, _EventEmitter);
	
		function Socket(_host) {
			_classCallCheck(this, Socket);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Socket).call(this));
	
			_this.host = _host;
	
			_this.connect = _this.connect.bind(_this);
			_this.onConnect = _this.onConnect.bind(_this);
			_this.onDisconnect = _this.onDisconnect.bind(_this);
			_this.onMessage = _this.onMessage.bind(_this);
	
			return _this;
		}
	
		_createClass(Socket, [{
			key: 'connect',
			value: function connect() {
				// console.log(`Trying to connect ${WS_HOST}`)
				this.ws = new WebSocket(this.host);
				this.ws.onopen = this.onConnect;
				this.ws.onclose = this.onDisconnect;
				this.ws.oneror = this.onDisconnect;
			}
		}, {
			key: 'onDisconnect',
			value: function onDisconnect() {
				this.emit('disconnect');
				setTimeout(this.connect, 2000);
			}
		}, {
			key: 'onConnect',
			value: function onConnect() {
				this.ws.onmessage = this.onMessage;
				this.emit('connect');
			}
		}, {
			key: 'onMessage',
			value: function onMessage(e) {
				this.emit('onmessage', e.data);
			}
		}, {
			key: 'send',
			value: function send(object) {
				this.ws.send(JSON.stringify(object));
			}
		}]);
	
		return Socket;
	}(_eventemitter2.default);

	exports.default = Socket;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/* global createjs */
	
	var Canvas = function () {
		function Canvas() {
			_classCallCheck(this, Canvas);
	
			this.canvas = $('.canvas')[0];
		}
	
		_createClass(Canvas, [{
			key: 'fill',
			value: function fill(color) {
				console.log(color);
				this.canvas.style.backgroundColor = color;
			}
		}]);
	
		return Canvas;
	}();

	exports.default = Canvas;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWNlNTk4ZDAwOWExNzMyMGE4ZjkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ldmVudGVtaXR0ZXIzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3dlYl9tb2R1bGVzL3Npc3lwaHVzLmpzIiwid2VicGFjazovLy8uL3NyYy9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN0Q0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLEtBQU0sVUFBVSxzQkFBVjs7S0FFQTtBQUVMLFdBRkssTUFFTCxHQUFjO3lCQUZULFFBRVM7O0FBRWIsUUFBSyxNQUFMLEdBQWMsc0JBQWQsQ0FGYTs7QUFJYixRQUFLLFFBQUwsR0FBZ0Isd0JBQWhCLENBSmE7QUFLYixRQUFLLFFBQUwsQ0FBYyxFQUFkLENBQWlCLFFBQWpCLEVBQTJCLEtBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsSUFBbEIsQ0FBM0IsRUFMYTs7QUFPYixRQUFLLE1BQUwsR0FBYyxxQkFBVyxPQUFYLENBQWQsQ0FQYTtBQVFiLFFBQUssTUFBTCxDQUFZLEVBQVosQ0FBZSxTQUFmLEVBQTBCLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBb0IsSUFBcEIsQ0FBMUIsRUFSYTtBQVNiLFFBQUssTUFBTCxDQUFZLEVBQVosQ0FBZSxZQUFmLEVBQTZCLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUF1QixJ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LElBQUwsQ0FBVSxZQUFWLEVBRGM7QUFFZCxlQUFXLEtBQUssT0FBTCxFQUFjLElBQXpCLEVBRmM7Ozs7K0JBS0g7QUFDWCxTQUFLLEVBQUwsQ0FBUSxTQUFSLEdBQW9CLEtBQUssU0FBTCxDQURUO0FBRVgsU0FBSyxJQUFMLENBQVUsU0FBVixFQUZXOzs7OzZCQUtGLEdBQUc7QUFDWixTQUFLLElBQUwsQ0FBVSxXQUFWLEVBQXVCLEVBQUUsSUFBRixDQUF2QixDQURZOzs7O3dCQUlSLFFBQVE7QUFDWixTQUFLLEVBQUwsQ0FBUSxJQUFSLENBQWEsS0FBSyxTQUFMLENBQWUsTUFBZixDQUFiLEVBRFk7Ozs7U0FwQ087Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQ0FBO0FBRXBCLFdBRm9CLE1BRXBCLEdBQWM7eUJBRk0sUUFFTjs7QUFFYixRQUFLLE1BQUwsR0FBYyxFQUFFLFNBQUYsRUFBYSxDQUFiLENBQWQsQ0FGYTtHQUFkOztlQUZvQjs7d0JBUWYsT0FBTztBQUNYLFlBQVEsR0FBUixDQUFZLEtBQVosRUFEVztBQUVYLFNBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsZUFBbEIsR0FBb0MsS0FBcEMsQ0FGVzs7OztTQVJRIiwiZmlsZSI6Ii4vYnVpbGQvY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBlY2U1OThkMDA5YTE3MzIwYThmOVxuICoqLyIsImltcG9ydCBTZXR0aW5ncyBmcm9tICcuL3NldHRpbmdzLmpzJ1xuaW1wb3J0IFNvY2tldCBmcm9tICcuL3NvY2tldC5qcydcbmltcG9ydCBDYW52YXMgZnJvbSAnLi9jYW52YXMuanMnXG5cbmNvbnN0IFdTX0hPU1QgPSAnd3M6Ly8xMC4wLjEuMTQxOjg5ODknXG5cbmNsYXNzIENsaWVudCB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cblx0XHR0aGlzLmNhbnZhcyA9IG5ldyBDYW52YXMoKVxuXG5cdFx0dGhpcy5zZXR0aW5ncyA9IG5ldyBTZXR0aW5ncygpXG5cdFx0dGhpcy5zZXR0aW5ncy5vbigndXBkYXRlJywgdGhpcy5hZGRVc2VyLmJpbmQodGhpcykpXG5cblx0XHR0aGlzLnNvY2tldCA9IG5ldyBTb2NrZXQoV1NfSE9TVClcblx0XHR0aGlzLnNvY2tldC5vbignY29ubmVjdCcsIHRoaXMub25Db25uZWN0LmJpbmQodGhpcykpXG5cdFx0dGhpcy5zb2NrZXQub24oJ2Rpc2Nvbm5lY3QnLCB0aGlzLm9uRGlzY29ubmVjdC5iaW5kKHRoaXMpKVxuXHRcdHRoaXMuc29ja2V0Lm9uKCdvbm1lc3NhZ2UnLCB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpKVxuXHRcdHRoaXMuc29ja2V0LmNvbm5lY3QoKVxuXG5cblx0fVxuXG5cdG9uQ29ubmVjdCgpIHtcblx0XHR0aGlzLnNldHRpbmdzLnN0YXR1cyA9ICdjb25uZWN0ZWQnXG5cdFx0aWYgKHRoaXMuc2V0dGluZ3MubmFtZSAhPSAnJykge1xuXHRcdFx0dGhpcy5hZGRVc2VyKClcblx0XHR9XG5cdH1cblxuXHRvbkRpc2Nvbm5lY3QoKSB7XG5cdFx0dGhpcy5zZXR0aW5ncy5zdGF0dXMgPSAnbm9uLWNvbm5lY3RlZCdcblx0XHR0aGlzLmNhbnZhcy5maWxsKCdibGFjaycpXG5cdH1cblxuXHRvbk1lc3NhZ2UobXNnKSB7XG5cdFx0dGhpcy5jYW52YXMuZmlsbChtc2cpXG5cdH1cblxuXHRhZGRVc2VyKCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKCd1cGRhdGVOYW1lJywgdGhpcy5zZXR0aW5ncy5uYW1lKVxuXHRcdHRoaXMuc29ja2V0LnNlbmQoe1xuXHRcdFx0J3R5cGUnOiAnYWRkLXVzZXInLFxuXHRcdFx0J25hbWUnOiB0aGlzLnNldHRpbmdzLm5hbWVcblx0XHR9KVxuXHR9XG59XG5cbm5ldyBDbGllbnQoKVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xpZW50LmpzXG4gKiovIiwiLyogZ2xvYmFsICQgKi9cblxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudGVtaXR0ZXIzJ1xuaW1wb3J0ICdzaXN5cGh1cydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlnIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRzdXBlcigpXG5cblx0XHR0aGlzLiRmb3JtID0gJCgnLnNldHRpbmdzJylcblx0XHR0aGlzLiRzdGF0dXMgPSAkKCcuc2V0dGluZ3NfX3N0YXR1cycpXG5cdFx0dGhpcy4kbmFtZSA9ICQoJy5zZXR0aW5nc19fbmFtZScpXG5cblx0XHR0aGlzLiRmb3JtLnNpc3lwaHVzKClcblxuXHRcdCQoJy5zZXR0aW5nc19fdXBkYXRlJykub24oJ2NsaWNrJywgKCkgPT4ge1xuXHRcdFx0dGhpcy5lbWl0KCd1cGRhdGUnKVxuXHRcdH0pXG5cblx0XHQvLyAkKHdpbmRvdykub24oJ2tleXVwJywgKGUpID0+IHtcblx0XHQvLyBcdGNvbnN0IGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS5rZXlDb2RlKVxuXHRcdC8vIFx0aWYgKGtleSA9PSAnSCcpIHtcblx0XHQvLyBcdFx0dGhpcy4kZm9ybS50b2dnbGVDbGFzcygnaGlkZGVuJylcblx0XHQvLyBcdH1cblx0XHQvLyB9KVxuXG5cdFx0JCgnLmNhbnZhcycpLm9uKCdjbGljaycsICgpID0+IHtcblx0XHRcdHRoaXMuJGZvcm0udG9nZ2xlQ2xhc3MoJ2hpZGRlbicpXG5cdFx0fSlcblx0fVxuXG5cdGdldCBzdGF0dXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuJHN0YXR1cy5odG1sKClcblx0fVxuXHRzZXQgc3RhdHVzKF9zdGF0dXMpIHtcblx0XHR0aGlzLiRzdGF0dXMuaHRtbChfc3RhdHVzKVxuXHR9XG5cblx0Z2V0IG5hbWUoKSB7XG5cdFx0cmV0dXJuIHRoaXMuJG5hbWUudmFsKClcblx0fVxuXG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NldHRpbmdzLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLy9cbi8vIFdlIHN0b3JlIG91ciBFRSBvYmplY3RzIGluIGEgcGxhaW4gb2JqZWN0IHdob3NlIHByb3BlcnRpZXMgYXJlIGV2ZW50IG5hbWVzLlxuLy8gSWYgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIG5vdCBzdXBwb3J0ZWQgd2UgcHJlZml4IHRoZSBldmVudCBuYW1lcyB3aXRoIGFcbi8vIGB+YCB0byBtYWtlIHN1cmUgdGhhdCB0aGUgYnVpbHQtaW4gb2JqZWN0IHByb3BlcnRpZXMgYXJlIG5vdCBvdmVycmlkZGVuIG9yXG4vLyB1c2VkIGFzIGFuIGF0dGFjayB2ZWN0b3IuXG4vLyBXZSBhbHNvIGFzc3VtZSB0aGF0IGBPYmplY3QuY3JlYXRlKG51bGwpYCBpcyBhdmFpbGFibGUgd2hlbiB0aGUgZXZlbnQgbmFtZVxuLy8gaXMgYW4gRVM2IFN5bWJvbC5cbi8vXG52YXIgcHJlZml4ID0gdHlwZW9mIE9iamVjdC5jcmVhdGUgIT09ICdmdW5jdGlvbicgPyAnficgOiBmYWxzZTtcblxuLyoqXG4gKiBSZXByZXNlbnRhdGlvbiBvZiBhIHNpbmdsZSBFdmVudEVtaXR0ZXIgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gRXZlbnQgaGFuZGxlciB0byBiZSBjYWxsZWQuXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IENvbnRleHQgZm9yIGZ1bmN0aW9uIGV4ZWN1dGlvbi5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29uY2U9ZmFsc2VdIE9ubHkgZW1pdCBvbmNlXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIE1pbmltYWwgRXZlbnRFbWl0dGVyIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBFdmVudEVtaXR0ZXIgaW50ZXJmYWNlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkgeyAvKiBOb3RoaW5nIHRvIHNldCAqLyB9XG5cbi8qKlxuICogSG9sZCB0aGUgYXNzaWduZWQgRXZlbnRFbWl0dGVycyBieSBuYW1lLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5cbi8qKlxuICogUmV0dXJuIGFuIGFycmF5IGxpc3RpbmcgdGhlIGV2ZW50cyBmb3Igd2hpY2ggdGhlIGVtaXR0ZXIgaGFzIHJlZ2lzdGVyZWRcbiAqIGxpc3RlbmVycy5cbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzXG4gICAgLCBuYW1lcyA9IFtdXG4gICAgLCBuYW1lO1xuXG4gIGlmICghZXZlbnRzKSByZXR1cm4gbmFtZXM7XG5cbiAgZm9yIChuYW1lIGluIGV2ZW50cykge1xuICAgIGlmIChoYXMuY2FsbChldmVudHMsIG5hbWUpKSBuYW1lcy5wdXNoKHByZWZpeCA/IG5hbWUuc2xpY2UoMSkgOiBuYW1lKTtcbiAgfVxuXG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgcmV0dXJuIG5hbWVzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGV2ZW50cykpO1xuICB9XG5cbiAgcmV0dXJuIG5hbWVzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYSBsaXN0IG9mIGFzc2lnbmVkIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIGV2ZW50cyB0aGF0IHNob3VsZCBiZSBsaXN0ZWQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGV4aXN0cyBXZSBvbmx5IG5lZWQgdG8ga25vdyBpZiB0aGVyZSBhcmUgbGlzdGVuZXJzLlxuICogQHJldHVybnMge0FycmF5fEJvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyhldmVudCwgZXhpc3RzKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XG4gICAgLCBhdmFpbGFibGUgPSB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKGV4aXN0cykgcmV0dXJuICEhYXZhaWxhYmxlO1xuICBpZiAoIWF2YWlsYWJsZSkgcmV0dXJuIFtdO1xuICBpZiAoYXZhaWxhYmxlLmZuKSByZXR1cm4gW2F2YWlsYWJsZS5mbl07XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhdmFpbGFibGUubGVuZ3RoLCBlZSA9IG5ldyBBcnJheShsKTsgaSA8IGw7IGkrKykge1xuICAgIGVlW2ldID0gYXZhaWxhYmxlW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBFbWl0IGFuIGV2ZW50IHRvIGFsbCByZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHJldHVybnMge0Jvb2xlYW59IEluZGljYXRpb24gaWYgd2UndmUgZW1pdHRlZCBhbiBldmVudC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiBmYWxzZTtcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF1cbiAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGFyZ3NcbiAgICAsIGk7XG5cbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCksIHRydWU7XG4gICAgICBjYXNlIDI6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEpLCB0cnVlO1xuICAgICAgY2FzZSAzOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiksIHRydWU7XG4gICAgICBjYXNlIDQ6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMyksIHRydWU7XG4gICAgICBjYXNlIDU6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQpLCB0cnVlO1xuICAgICAgY2FzZSA2OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0LCBhNSksIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChpID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgIH1cblxuICAgIGxpc3RlbmVycy5mbi5hcHBseShsaXN0ZW5lcnMuY29udGV4dCwgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGhcbiAgICAgICwgajtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnNbaV0uZm4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCFhcmdzKSBmb3IgKGogPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgYXJnc1tqIC0gMV0gPSBhcmd1bWVudHNbal07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBuZXcgRXZlbnRMaXN0ZW5lciBmb3IgdGhlIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIENhbGxiYWNrIGZ1bmN0aW9uLlxuICogQHBhcmFtIHtNaXhlZH0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgb2YgdGhlIGZ1bmN0aW9uLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgdGhpcylcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpIHRoaXMuX2V2ZW50cyA9IHByZWZpeCA/IHt9IDogT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgdGhpcy5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lcjtcbiAgZWxzZSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XS5mbikgdGhpcy5fZXZlbnRzW2V2dF0ucHVzaChsaXN0ZW5lcik7XG4gICAgZWxzZSB0aGlzLl9ldmVudHNbZXZ0XSA9IFtcbiAgICAgIHRoaXMuX2V2ZW50c1tldnRdLCBsaXN0ZW5lclxuICAgIF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkIGFuIEV2ZW50TGlzdGVuZXIgdGhhdCdzIG9ubHkgY2FsbGVkIG9uY2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gQ2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge01peGVkfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCBvZiB0aGUgZnVuY3Rpb24uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgdGhpcywgdHJ1ZSlcbiAgICAsIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpIHRoaXMuX2V2ZW50cyA9IHByZWZpeCA/IHt9IDogT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgdGhpcy5fZXZlbnRzW2V2dF0gPSBsaXN0ZW5lcjtcbiAgZWxzZSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XS5mbikgdGhpcy5fZXZlbnRzW2V2dF0ucHVzaChsaXN0ZW5lcik7XG4gICAgZWxzZSB0aGlzLl9ldmVudHNbZXZ0XSA9IFtcbiAgICAgIHRoaXMuX2V2ZW50c1tldnRdLCBsaXN0ZW5lclxuICAgIF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIGV2ZW50IHdlIHdhbnQgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIHRoYXQgd2UgbmVlZCB0byBmaW5kLlxuICogQHBhcmFtIHtNaXhlZH0gY29udGV4dCBPbmx5IHJlbW92ZSBsaXN0ZW5lcnMgbWF0Y2hpbmcgdGhpcyBjb250ZXh0LlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIE9ubHkgcmVtb3ZlIG9uY2UgbGlzdGVuZXJzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGV2ZW50LCBmbiwgY29udGV4dCwgb25jZSkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiB0aGlzO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XVxuICAgICwgZXZlbnRzID0gW107XG5cbiAgaWYgKGZuKSB7XG4gICAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgICAgaWYgKFxuICAgICAgICAgICBsaXN0ZW5lcnMuZm4gIT09IGZuXG4gICAgICAgIHx8IChvbmNlICYmICFsaXN0ZW5lcnMub25jZSlcbiAgICAgICAgfHwgKGNvbnRleHQgJiYgbGlzdGVuZXJzLmNvbnRleHQgIT09IGNvbnRleHQpXG4gICAgICApIHtcbiAgICAgICAgZXZlbnRzLnB1c2gobGlzdGVuZXJzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICAgbGlzdGVuZXJzW2ldLmZuICE9PSBmblxuICAgICAgICAgIHx8IChvbmNlICYmICFsaXN0ZW5lcnNbaV0ub25jZSlcbiAgICAgICAgICB8fCAoY29udGV4dCAmJiBsaXN0ZW5lcnNbaV0uY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICAgKSB7XG4gICAgICAgICAgZXZlbnRzLnB1c2gobGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIFJlc2V0IHRoZSBhcnJheSwgb3IgcmVtb3ZlIGl0IGNvbXBsZXRlbHkgaWYgd2UgaGF2ZSBubyBtb3JlIGxpc3RlbmVycy5cbiAgLy9cbiAgaWYgKGV2ZW50cy5sZW5ndGgpIHtcbiAgICB0aGlzLl9ldmVudHNbZXZ0XSA9IGV2ZW50cy5sZW5ndGggPT09IDEgPyBldmVudHNbMF0gOiBldmVudHM7XG4gIH0gZWxzZSB7XG4gICAgZGVsZXRlIHRoaXMuX2V2ZW50c1tldnRdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9yIG9ubHkgdGhlIGxpc3RlbmVycyBmb3IgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIGV2ZW50IHdhbnQgdG8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMpIHJldHVybiB0aGlzO1xuXG4gIGlmIChldmVudCkgZGVsZXRlIHRoaXMuX2V2ZW50c1twcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50XTtcbiAgZWxzZSB0aGlzLl9ldmVudHMgPSBwcmVmaXggPyB7fSA6IE9iamVjdC5jcmVhdGUobnVsbCk7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gQWxpYXMgbWV0aG9kcyBuYW1lcyBiZWNhdXNlIHBlb3BsZSByb2xsIGxpa2UgdGhhdC5cbi8vXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcblxuLy9cbi8vIFRoaXMgZnVuY3Rpb24gZG9lc24ndCBhcHBseSBhbnltb3JlLlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBFeHBvc2UgdGhlIHByZWZpeC5cbi8vXG5FdmVudEVtaXR0ZXIucHJlZml4ZWQgPSBwcmVmaXg7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5pZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9ldmVudGVtaXR0ZXIzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiIWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSl7cmV0dXJuXCJbaWQ9XCIrYS5hdHRyKFwiaWRcIikrXCJdW25hbWU9XCIrYS5hdHRyKFwibmFtZVwiKStcIl1cIn1hLmZuLnNpc3lwaHVzPWZ1bmN0aW9uKGMpe3ZhciBkPWEubWFwKHRoaXMsZnVuY3Rpb24oYyl7cmV0dXJuIGIoYShjKSl9KS5qb2luKCksZT1TaXN5cGh1cy5nZXRJbnN0YW5jZShkKTtyZXR1cm4gZS5wcm90ZWN0KHRoaXMsYyksZX07dmFyIGM9e307Yy5pc0F2YWlsYWJsZT1mdW5jdGlvbigpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBhLmpTdG9yYWdlKXJldHVybiEwO3RyeXtyZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW19Y2F0Y2goYil7cmV0dXJuITF9fSxjLnNldD1mdW5jdGlvbihiLGMpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBhLmpTdG9yYWdlKWEualN0b3JhZ2Uuc2V0KGIsYytcIlwiKTtlbHNlIHRyeXtsb2NhbFN0b3JhZ2Uuc2V0SXRlbShiLGMrXCJcIil9Y2F0Y2goZCl7fX0sYy5nZXQ9ZnVuY3Rpb24oYil7aWYoXCJvYmplY3RcIj09dHlwZW9mIGEualN0b3JhZ2Upe3ZhciBjPWEualN0b3JhZ2UuZ2V0KGIpO3JldHVybiBjP2MudG9TdHJpbmcoKTpjfXJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShiKX0sYy5yZW1vdmU9ZnVuY3Rpb24oYil7XCJvYmplY3RcIj09dHlwZW9mIGEualN0b3JhZ2U/YS5qU3RvcmFnZS5kZWxldGVLZXkoYik6bG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYil9LFNpc3lwaHVzPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZigpe3JldHVybntzZXRJbnN0YW5jZUlkZW50aWZpZXI6ZnVuY3Rpb24oYSl7dGhpcy5pZGVudGlmaWVyPWF9LGdldEluc3RhbmNlSWRlbnRpZmllcjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmlkZW50aWZpZXJ9LHNldEluaXRpYWxPcHRpb25zOmZ1bmN0aW9uKGIpe3ZhciBkPXtleGNsdWRlRmllbGRzOltdLGN1c3RvbUtleVN1ZmZpeDpcIlwiLGxvY2F0aW9uQmFzZWQ6ITEsdGltZW91dDowLGF1dG9SZWxlYXNlOiEwLG9uQmVmb3JlU2F2ZTpmdW5jdGlvbigpe30sb25TYXZlOmZ1bmN0aW9uKCl7fSxvbkJlZm9yZVJlc3RvcmU6ZnVuY3Rpb24oKXt9LG9uUmVzdG9yZTpmdW5jdGlvbigpe30sb25SZWxlYXNlOmZ1bmN0aW9uKCl7fX07dGhpcy5vcHRpb25zPXRoaXMub3B0aW9uc3x8YS5leHRlbmQoZCxiKSx0aGlzLmJyb3dzZXJTdG9yYWdlPWN9LHNldE9wdGlvbnM6ZnVuY3Rpb24oYil7dGhpcy5vcHRpb25zPXRoaXMub3B0aW9uc3x8dGhpcy5zZXRJbml0aWFsT3B0aW9ucyhiKSx0aGlzLm9wdGlvbnM9YS5leHRlbmQodGhpcy5vcHRpb25zLGIpfSxwcm90ZWN0OmZ1bmN0aW9uKGIsYyl7dGhpcy5zZXRPcHRpb25zKGMpLGI9Ynx8e307dmFyIGY9dGhpcztpZih0aGlzLnRhcmdldHM9dGhpcy50YXJnZXRzfHxbXSxmLm9wdGlvbnMubmFtZT90aGlzLmhyZWY9Zi5vcHRpb25zLm5hbWU6dGhpcy5ocmVmPWxvY2F0aW9uLmhvc3RuYW1lK2xvY2F0aW9uLnBhdGhuYW1lK2xvY2F0aW9uLnNlYXJjaCtsb2NhdGlvbi5oYXNoLHRoaXMudGFyZ2V0cz1hLm1lcmdlKHRoaXMudGFyZ2V0cyxiKSx0aGlzLnRhcmdldHM9YS51bmlxdWUodGhpcy50YXJnZXRzKSx0aGlzLnRhcmdldHM9YSh0aGlzLnRhcmdldHMpLCF0aGlzLmJyb3dzZXJTdG9yYWdlLmlzQXZhaWxhYmxlKCkpcmV0dXJuITE7dmFyIGc9Zi5vcHRpb25zLm9uQmVmb3JlUmVzdG9yZS5jYWxsKGYpO2lmKCh2b2lkIDA9PT1nfHxnKSYmZi5yZXN0b3JlQWxsRGF0YSgpLHRoaXMub3B0aW9ucy5hdXRvUmVsZWFzZSYmZi5iaW5kUmVsZWFzZURhdGEoKSwhZC5zdGFydGVkW3RoaXMuZ2V0SW5zdGFuY2VJZGVudGlmaWVyKCldKWlmKGYuaXNDS0VkaXRvclByZXNlbnQoKSl2YXIgaD1zZXRJbnRlcnZhbChmdW5jdGlvbigpe2UuaXNMb2FkZWQmJihjbGVhckludGVydmFsKGgpLGYuYmluZFNhdmVEYXRhKCksZC5zdGFydGVkW2YuZ2V0SW5zdGFuY2VJZGVudGlmaWVyKCldPSEwKX0sMTAwKTtlbHNlIGYuYmluZFNhdmVEYXRhKCksZC5zdGFydGVkW2YuZ2V0SW5zdGFuY2VJZGVudGlmaWVyKCldPSEwfSxpc0NLRWRpdG9yUHJlc2VudDpmdW5jdGlvbigpe3JldHVybiB0aGlzLmlzQ0tFZGl0b3JFeGlzdHMoKT8oZS5pc0xvYWRlZD0hMSxlLm9uKFwiaW5zdGFuY2VSZWFkeVwiLGZ1bmN0aW9uKCl7ZS5pc0xvYWRlZD0hMH0pLCEwKTohMX0saXNDS0VkaXRvckV4aXN0czpmdW5jdGlvbigpe3JldHVyblwidW5kZWZpbmVkXCIhPXR5cGVvZiBlfSxmaW5kRmllbGRzVG9Qcm90ZWN0OmZ1bmN0aW9uKGEpe3JldHVybiBhLmZpbmQoXCI6aW5wdXRcIikubm90KFwiOnN1Ym1pdFwiKS5ub3QoXCI6cmVzZXRcIikubm90KFwiOmJ1dHRvblwiKS5ub3QoXCI6ZmlsZVwiKS5ub3QoXCI6cGFzc3dvcmRcIikubm90KFwiOmRpc2FibGVkXCIpLm5vdChcIltyZWFkb25seV1cIil9LGJpbmRTYXZlRGF0YTpmdW5jdGlvbigpe3ZhciBjPXRoaXM7Yy5vcHRpb25zLnRpbWVvdXQmJmMuc2F2ZURhdGFCeVRpbWVvdXQoKSxjLnRhcmdldHMuZWFjaChmdW5jdGlvbigpe3ZhciBkPWIoYSh0aGlzKSk7Yy5maW5kRmllbGRzVG9Qcm90ZWN0KGEodGhpcykpLmVhY2goZnVuY3Rpb24oKXtpZigtMSE9PWEuaW5BcnJheSh0aGlzLGMub3B0aW9ucy5leGNsdWRlRmllbGRzKSlyZXR1cm4hMDt2YXIgZT1hKHRoaXMpLGY9KGMub3B0aW9ucy5sb2NhdGlvbkJhc2VkP2MuaHJlZjpcIlwiKStkK2IoZSkrYy5vcHRpb25zLmN1c3RvbUtleVN1ZmZpeDsoZS5pcyhcIjp0ZXh0XCIpfHxlLmlzKFwidGV4dGFyZWFcIikpJiYoYy5vcHRpb25zLnRpbWVvdXR8fGMuYmluZFNhdmVEYXRhSW1tZWRpYXRlbHkoZSxmKSksYy5iaW5kU2F2ZURhdGFPbkNoYW5nZShlKX0pfSl9LHNhdmVBbGxEYXRhOmZ1bmN0aW9uKCl7dmFyIGM9dGhpcztjLnRhcmdldHMuZWFjaChmdW5jdGlvbigpe3ZhciBkPWIoYSh0aGlzKSksZj17fTtjLmZpbmRGaWVsZHNUb1Byb3RlY3QoYSh0aGlzKSkuZWFjaChmdW5jdGlvbigpe3ZhciBnPWEodGhpcyk7aWYoLTEhPT1hLmluQXJyYXkodGhpcyxjLm9wdGlvbnMuZXhjbHVkZUZpZWxkcyl8fHZvaWQgMD09PWcuYXR0cihcIm5hbWVcIikmJnZvaWQgMD09PWcuYXR0cihcImlkXCIpKXJldHVybiEwO3ZhciBoPShjLm9wdGlvbnMubG9jYXRpb25CYXNlZD9jLmhyZWY6XCJcIikrZCtiKGcpK2Mub3B0aW9ucy5jdXN0b21LZXlTdWZmaXgsaT1nLnZhbCgpO2lmKGcuaXMoXCI6Y2hlY2tib3hcIikpe3ZhciBqPWcuYXR0cihcIm5hbWVcIik7aWYodm9pZCAwIT09aiYmLTEhPT1qLmluZGV4T2YoXCJbXCIpKXtpZihmW2pdPT09ITApcmV0dXJuO2k9W10sYShcIltuYW1lPSdcIitqK1wiJ106Y2hlY2tlZFwiKS5lYWNoKGZ1bmN0aW9uKCl7aS5wdXNoKGEodGhpcykudmFsKCkpfSksZltqXT0hMH1lbHNlIGk9Zy5pcyhcIjpjaGVja2VkXCIpO2Muc2F2ZVRvQnJvd3NlclN0b3JhZ2UoaCxpLCExKX1lbHNlIGlmKGcuaXMoXCI6cmFkaW9cIikpZy5pcyhcIjpjaGVja2VkXCIpJiYoaT1nLnZhbCgpLGMuc2F2ZVRvQnJvd3NlclN0b3JhZ2UoaCxpLCExKSk7ZWxzZSBpZihjLmlzQ0tFZGl0b3JFeGlzdHMoKSl7dmFyIGs9ZS5pbnN0YW5jZXNbZy5hdHRyKFwibmFtZVwiKV18fGUuaW5zdGFuY2VzW2cuYXR0cihcImlkXCIpXTtrPyhrLnVwZGF0ZUVsZW1lbnQoKSxjLnNhdmVUb0Jyb3dzZXJTdG9yYWdlKGgsZy52YWwoKSwhMSkpOmMuc2F2ZVRvQnJvd3NlclN0b3JhZ2UoaCxpLCExKX1lbHNlIGMuc2F2ZVRvQnJvd3NlclN0b3JhZ2UoaCxpLCExKX0pfSksYy5vcHRpb25zLm9uU2F2ZS5jYWxsKGMpfSxyZXN0b3JlQWxsRGF0YTpmdW5jdGlvbigpe3ZhciBjPXRoaXMsZD0hMTtjLnRhcmdldHMuZWFjaChmdW5jdGlvbigpe3ZhciBlPWEodGhpcyksZj1iKGEodGhpcykpO2MuZmluZEZpZWxkc1RvUHJvdGVjdChlKS5lYWNoKGZ1bmN0aW9uKCl7aWYoLTEhPT1hLmluQXJyYXkodGhpcyxjLm9wdGlvbnMuZXhjbHVkZUZpZWxkcykpcmV0dXJuITA7dmFyIGU9YSh0aGlzKSxnPShjLm9wdGlvbnMubG9jYXRpb25CYXNlZD9jLmhyZWY6XCJcIikrZitiKGUpK2Mub3B0aW9ucy5jdXN0b21LZXlTdWZmaXgsaD1jLmJyb3dzZXJTdG9yYWdlLmdldChnKTtudWxsIT09aCYmKGMucmVzdG9yZUZpZWxkc0RhdGEoZSxoKSxkPSEwKX0pfSksZCYmYy5vcHRpb25zLm9uUmVzdG9yZS5jYWxsKGMpfSxyZXN0b3JlRmllbGRzRGF0YTpmdW5jdGlvbihhLGIpe2lmKHZvaWQgMD09PWEuYXR0cihcIm5hbWVcIikmJnZvaWQgMD09PWEuYXR0cihcImlkXCIpKXJldHVybiExO3ZhciBjPWEuYXR0cihcIm5hbWVcIik7IWEuaXMoXCI6Y2hlY2tib3hcIil8fFwiZmFsc2VcIj09PWJ8fHZvaWQgMCE9PWMmJi0xIT09Yy5pbmRleE9mKFwiW1wiKT8hYS5pcyhcIjpjaGVja2JveFwiKXx8XCJmYWxzZVwiIT09Ynx8dm9pZCAwIT09YyYmLTEhPT1jLmluZGV4T2YoXCJbXCIpP2EuaXMoXCI6cmFkaW9cIik/YS52YWwoKT09PWImJmEucHJvcChcImNoZWNrZWRcIiwhMCk6dm9pZCAwPT09Y3x8LTE9PT1jLmluZGV4T2YoXCJbXCIpP2EudmFsKGIpOihiPWIuc3BsaXQoXCIsXCIpLGEudmFsKGIpKTphLnByb3AoXCJjaGVja2VkXCIsITEpOmEucHJvcChcImNoZWNrZWRcIiwhMCl9LGJpbmRTYXZlRGF0YUltbWVkaWF0ZWx5OmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcztpZihcIm9ucHJvcGVydHljaGFuZ2VcImluIGE/YS5nZXQoMCkub25wcm9wZXJ0eWNoYW5nZT1mdW5jdGlvbigpe2Muc2F2ZVRvQnJvd3NlclN0b3JhZ2UoYixhLnZhbCgpKX06YS5nZXQoMCkub25pbnB1dD1mdW5jdGlvbigpe2Muc2F2ZVRvQnJvd3NlclN0b3JhZ2UoYixhLnZhbCgpKX0sdGhpcy5pc0NLRWRpdG9yRXhpc3RzKCkpe3ZhciBkPWUuaW5zdGFuY2VzW2EuYXR0cihcIm5hbWVcIildfHxlLmluc3RhbmNlc1thLmF0dHIoXCJpZFwiKV07ZCYmZC5kb2N1bWVudC5vbihcImtleXVwXCIsZnVuY3Rpb24oKXtkLnVwZGF0ZUVsZW1lbnQoKSxjLnNhdmVUb0Jyb3dzZXJTdG9yYWdlKGIsYS52YWwoKSl9KX19LHNhdmVUb0Jyb3dzZXJTdG9yYWdlOmZ1bmN0aW9uKGEsYixjKXt2YXIgZD10aGlzLGU9ZC5vcHRpb25zLm9uQmVmb3JlU2F2ZS5jYWxsKGQpOyh2b2lkIDA9PT1lfHxlIT09ITEpJiYoYz12b2lkIDA9PT1jPyEwOmMsdGhpcy5icm93c2VyU3RvcmFnZS5zZXQoYSxiKSxjJiZcIlwiIT09YiYmdGhpcy5vcHRpb25zLm9uU2F2ZS5jYWxsKHRoaXMpKX0sYmluZFNhdmVEYXRhT25DaGFuZ2U6ZnVuY3Rpb24oYSl7dmFyIGI9dGhpczthLmNoYW5nZShmdW5jdGlvbigpe2Iuc2F2ZUFsbERhdGEoKX0pfSxzYXZlRGF0YUJ5VGltZW91dDpmdW5jdGlvbigpe3ZhciBhPXRoaXMsYj1hLnRhcmdldHM7c2V0VGltZW91dChmdW5jdGlvbigpe2Z1bmN0aW9uIGIoKXthLnNhdmVBbGxEYXRhKCksc2V0VGltZW91dChiLDFlMyphLm9wdGlvbnMudGltZW91dCl9cmV0dXJuIGJ9KGIpLDFlMyphLm9wdGlvbnMudGltZW91dCl9LGJpbmRSZWxlYXNlRGF0YTpmdW5jdGlvbigpe3ZhciBjPXRoaXM7Yy50YXJnZXRzLmVhY2goZnVuY3Rpb24oKXt2YXIgZD1hKHRoaXMpLGU9YihkKTthKHRoaXMpLmJpbmQoXCJzdWJtaXQgcmVzZXRcIixmdW5jdGlvbigpe2MucmVsZWFzZURhdGEoZSxjLmZpbmRGaWVsZHNUb1Byb3RlY3QoZCkpfSl9KX0sbWFudWFsbHlSZWxlYXNlRGF0YTpmdW5jdGlvbigpe3ZhciBjPXRoaXM7Yy50YXJnZXRzLmVhY2goZnVuY3Rpb24oKXt2YXIgZD1hKHRoaXMpLGU9YihkKTtjLnJlbGVhc2VEYXRhKGUsYy5maW5kRmllbGRzVG9Qcm90ZWN0KGQpKX0pfSxyZWxlYXNlRGF0YTpmdW5jdGlvbihjLGUpe3ZhciBmPSExLGc9dGhpcztkLnN0YXJ0ZWRbZy5nZXRJbnN0YW5jZUlkZW50aWZpZXIoKV09ITEsZS5lYWNoKGZ1bmN0aW9uKCl7aWYoLTEhPT1hLmluQXJyYXkodGhpcyxnLm9wdGlvbnMuZXhjbHVkZUZpZWxkcykpcmV0dXJuITA7dmFyIGQ9YSh0aGlzKSxlPShnLm9wdGlvbnMubG9jYXRpb25CYXNlZD9nLmhyZWY6XCJcIikrYytiKGQpK2cub3B0aW9ucy5jdXN0b21LZXlTdWZmaXg7Zy5icm93c2VyU3RvcmFnZS5yZW1vdmUoZSksZj0hMH0pLGYmJmcub3B0aW9ucy5vblJlbGVhc2UuY2FsbChnKX19fXZhciBkPXtpbnN0YW50aWF0ZWQ6W10sc3RhcnRlZDpbXX0sZT13aW5kb3cuQ0tFRElUT1I7cmV0dXJue2dldEluc3RhbmNlOmZ1bmN0aW9uKGEpe3JldHVybiBkLmluc3RhbnRpYXRlZFthXXx8KGQuaW5zdGFudGlhdGVkW2FdPWYoKSxkLmluc3RhbnRpYXRlZFthXS5zZXRJbnN0YW5jZUlkZW50aWZpZXIoYSksZC5pbnN0YW50aWF0ZWRbYV0uc2V0SW5pdGlhbE9wdGlvbnMoKSksYT9kLmluc3RhbnRpYXRlZFthXTpkLmluc3RhbnRpYXRlZFthXX0sZnJlZTpmdW5jdGlvbigpe3JldHVybiBkPXtpbnN0YW50aWF0ZWQ6W10sc3RhcnRlZDpbXX0sbnVsbH0sdmVyc2lvbjpcIjEuMS4yXCJ9fSgpfShqUXVlcnkpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93ZWJfbW9kdWxlcy9zaXN5cGh1cy5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRlbWl0dGVyMydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ja2V0IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuXHRjb25zdHJ1Y3RvcihfaG9zdCkge1xuXHRcdHN1cGVyKClcblxuXHRcdHRoaXMuaG9zdCA9IF9ob3N0XG5cblx0XHR0aGlzLmNvbm5lY3QgXHRcdFx0PSB0aGlzLmNvbm5lY3QuYmluZCh0aGlzKVxuXHRcdHRoaXMub25Db25uZWN0IFx0XHQ9IHRoaXMub25Db25uZWN0LmJpbmQodGhpcylcblx0XHR0aGlzLm9uRGlzY29ubmVjdCA9IHRoaXMub25EaXNjb25uZWN0LmJpbmQodGhpcylcblx0XHR0aGlzLm9uTWVzc2FnZSBcdFx0PSB0aGlzLm9uTWVzc2FnZS5iaW5kKHRoaXMpXG5cblx0fVxuXG5cdGNvbm5lY3QoKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coYFRyeWluZyB0byBjb25uZWN0ICR7V1NfSE9TVH1gKVxuXHRcdHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHRoaXMuaG9zdClcblx0XHR0aGlzLndzLm9ub3BlbiBcdD0gdGhpcy5vbkNvbm5lY3Rcblx0XHR0aGlzLndzLm9uY2xvc2UgPSB0aGlzLm9uRGlzY29ubmVjdFxuXHRcdHRoaXMud3Mub25lcm9yIFx0PSB0aGlzLm9uRGlzY29ubmVjdFxuXHR9XG5cblx0b25EaXNjb25uZWN0KCkge1xuXHRcdHRoaXMuZW1pdCgnZGlzY29ubmVjdCcpXG5cdFx0c2V0VGltZW91dCh0aGlzLmNvbm5lY3QsIDIwMDApXG5cdH1cblxuXHRvbkNvbm5lY3QoKSB7XG5cdFx0dGhpcy53cy5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZVxuXHRcdHRoaXMuZW1pdCgnY29ubmVjdCcpXG5cdH1cblxuXHRvbk1lc3NhZ2UoZSkge1xuXHRcdHRoaXMuZW1pdCgnb25tZXNzYWdlJywgZS5kYXRhKVxuXHR9XG5cblx0c2VuZChvYmplY3QpIHtcblx0XHR0aGlzLndzLnNlbmQoSlNPTi5zdHJpbmdpZnkob2JqZWN0KSlcblx0fVxuXG5cblxuXG5cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3NvY2tldC5qc1xuICoqLyIsIi8qIGdsb2JhbCBjcmVhdGVqcyAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYW52YXMge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdFx0dGhpcy5jYW52YXMgPSAkKCcuY2FudmFzJylbMF1cblx0fVxuXG5cblx0ZmlsbChjb2xvcikge1xuXHRcdGNvbnNvbGUubG9nKGNvbG9yKVxuXHRcdHRoaXMuY2FudmFzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yXG5cblx0fVxuXG5cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2FudmFzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==