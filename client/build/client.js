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
	
			this.settings = new _settings2.default();
			this.settings.on('update', this.updateUser.bind(this));
	
			this.canvas = new _canvas2.default();
	
			this.socket = new _socket2.default(WS_HOST);
			this.socket.on('connect', this.onConnect.bind(this));
			this.socket.on('disconnect', this.onDisconnect.bind(this));
			this.socket.on('onmessage', this.onMessage.bind(this));
			this.socket.connect();
	
			this.msgFunc = {
				color: this.canvas.fill,
				desktop: this.canvas.toggleDesktop,
				opacity: this.canvas.opacity
			};
		}
	
		_createClass(Client, [{
			key: 'onConnect',
			value: function onConnect() {
				this.settings.status = 'connected';
				if (this.settings.name != '') {
					this.updateUser();
				}
			}
		}, {
			key: 'onDisconnect',
			value: function onDisconnect() {
				this.settings.status = 'disconnected';
				this.canvas.toggleDesktop(false);
				this.canvas.fill('black');
			}
		}, {
			key: 'onMessage',
			value: function onMessage(type, value) {
				this.msgFunc[type](value);
			}
		}, {
			key: 'updateUser',
			value: function updateUser() {
				this.canvas.updateName(this.settings.name);
				this.socket.send({
					'type': 'update-user',
					'name': this.settings.name,
					'x': this.settings.x,
					'y': this.settings.y
				});
			}
		}]);
	
		return Client;
	}();
	
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		new Client();
	} else {
		alert('The File APIs are not fully supported in this browser.');
	}

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
	
	var Settings = function (_EventEmitter) {
		_inherits(Settings, _EventEmitter);
	
		function Settings() {
			_classCallCheck(this, Settings);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Settings).call(this));
	
			_this.$form = $('.settings');
			_this.$status = $('.settings__status');
			_this.$name = $('#name');
			_this.$x = $('#x');
			_this.$y = $('#y');
			_this.$coord = $('.settings__coord');
			_this.$point = $('.settings__coord-point');
	
			// load from localStorage
			_this.sisyphus = _this.$form.sisyphus();
			_this.updateCoord(_this.$x.val(), _this.$y.val());
	
			// event
			$('.settings__update').on('click', function () {
				_this.emit('update');
			});
			$('.settings__close').on('click', function () {
				_this.$form.toggleClass('hidden');
			});
			$('.viewer').on('click', function () {
				_this.$form.toggleClass('hidden');
			});
	
			_this.$coord.on({
				'mousedown': function mousedown(e) {
					_this.updateCoord(e.offsetX / _this.$coord.outerWidth(), e.offsetY / _this.$coord.outerHeight());
				}
			});
	
			_this.$x.on('change', function () {
				_this.updateCoord(_this.$x.val(), _this.$y.val());
			});
	
			_this.$y.on('change', function (e) {
				_this.updateCoord(_this.$x.val(), _this.$y.val());
			});
			return _this;
		}
	
		_createClass(Settings, [{
			key: 'updateCoord',
			value: function updateCoord(x, y) {
				this.$x.val(x);
				this.$y.val(y);
				this.$point.css({
					left: x * 100 + '%',
					top: y * 100 + '%'
				});
				this.sisyphus.saveAllData();
			}
	
			// properties
	
		}, {
			key: 'status',
			get: function get() {
				return this.$status.val();
			},
			set: function set(_status) {
				this.$status.val(_status);
			}
		}, {
			key: 'name',
			get: function get() {
				return this.$name.val();
			}
		}, {
			key: 'x',
			get: function get() {
				return this.$x.val();
			}
		}, {
			key: 'y',
			get: function get() {
				return this.$y.val();
			}
		}]);
	
		return Settings;
	}(_eventemitter2.default);

	exports.default = Settings;

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
				// type:value
				var data = e.data.split(':');
				this.emit('onmessage', data[0], data[1]);
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
	
	var Canvas = function () {
		function Canvas() {
			_classCallCheck(this, Canvas);
	
			this.$canvas = $('.canvas')[0];
			this.desktop = $('.canvas-desktop')[0];
			this.$desktop = $('.canvas-desktop');
	
			this.fill = this.fill.bind(this);
			this.opacity = this.opacity.bind(this);
			this.toggleDesktop = this.toggleDesktop.bind(this);
	
			window.desktop = this.desktop;
	
			this.toggleDesktop(false);
		}
	
		_createClass(Canvas, [{
			key: 'fill',
			value: function fill(color) {
				this.$canvas.style.backgroundColor = color;
			}
		}, {
			key: 'opacity',
			value: function opacity(alpha) {
				this.$desktop.css('opacity', parseFloat(alpha));
			}
		}, {
			key: 'toggleDesktop',
			value: function toggleDesktop(value) {
				var flag = value == 1;
				this.desktop.style.visibility = flag ? 'visible' : 'hidden';
				this.$canvas.style.visibility = flag ? 'hidden' : 'visible';
			}
		}, {
			key: 'updateName',
			value: function updateName(name) {
				this.desktop.src = './desktop/desktop.png';
			}
		}]);
	
		return Canvas;
	}();

	exports.default = Canvas;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjM3OWUwYjk4YmE2OWI3YzM2NTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NsaWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2V0dGluZ3MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9ldmVudGVtaXR0ZXIzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3dlYl9tb2R1bGVzL3Npc3lwaHVzLmpzIiwid2VicGFjazovLy8uL3NyYy9zb2NrZXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NhbnZhcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7QUN0Q0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLEtBQU0sVUFBVSxzQkFBVjs7S0FFQTtBQUVMLFdBRkssTUFFTCxHQUFjO3lCQUZULFFBRVM7O0FBRWIsUUFBSyxRQUFMLEdBQWdCLHdCQUFoQixDQUZhO0FBR2IsUUFBSyxRQUFMLENBQWMsRUFBZCxDQUFpQixRQUFqQixFQUEyQixLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBcUIsSUFBckIsQ0FBM0IsRUFIYTs7QUFLYixRQUFLLE1BQUwsR0FBYyxzQkFBZCxDQUxhOztBQU9iLFFBQUssTUFBTCxHQUFjLHFCQUFXLE9BQVgsQ0FBZCxDQVBhO0FBUWIsUUFBSyxNQUFMLENBQVksRUFBWixDQUFlLFNBQWYsRUFBMEIsS0FBSyxTQUFMLENBQWUsSUFBZixDQUFvQixJQUFwQixDQUExQixFQVJhO0FBU2IsUUFBSyxNQUFMLENBQVksRUFBWixDQUFlLFlBQWYsRUFBNkIsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQXVC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QUFtQixRQUFuQixDQUZaO0FBR3BCLFNBQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsVUFBbkIsR0FBZ0MsT0FBTyxRQUFQLEdBQWtCLFNBQWxCLENBSFo7Ozs7OEJBTVYsTUFBTTtBQUNoQixTQUFLLE9BQUwsQ0FBYSxHQUFiLEdBQW1CLHVCQUFuQixDQURnQjs7OztTQS9CRyIsImZpbGUiOiIuL2J1aWxkL2NsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMjM3OWUwYjk4YmE2OWI3YzM2NTlcbiAqKi8iLCJpbXBvcnQgU2V0dGluZ3MgZnJvbSAnLi9zZXR0aW5ncy5qcydcbmltcG9ydCBTb2NrZXQgZnJvbSAnLi9zb2NrZXQuanMnXG5pbXBvcnQgQ2FudmFzIGZyb20gJy4vY2FudmFzLmpzJ1xuXG5jb25zdCBXU19IT1NUID0gJ3dzOi8vMTAuMC4xLjE0MTo4OTg5J1xuXG5jbGFzcyBDbGllbnQge1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXG5cdFx0dGhpcy5zZXR0aW5ncyA9IG5ldyBTZXR0aW5ncygpXG5cdFx0dGhpcy5zZXR0aW5ncy5vbigndXBkYXRlJywgdGhpcy51cGRhdGVVc2VyLmJpbmQodGhpcykpXG5cblx0XHR0aGlzLmNhbnZhcyA9IG5ldyBDYW52YXMoKVxuXG5cdFx0dGhpcy5zb2NrZXQgPSBuZXcgU29ja2V0KFdTX0hPU1QpXG5cdFx0dGhpcy5zb2NrZXQub24oJ2Nvbm5lY3QnLCB0aGlzLm9uQ29ubmVjdC5iaW5kKHRoaXMpKVxuXHRcdHRoaXMuc29ja2V0Lm9uKCdkaXNjb25uZWN0JywgdGhpcy5vbkRpc2Nvbm5lY3QuYmluZCh0aGlzKSlcblx0XHR0aGlzLnNvY2tldC5vbignb25tZXNzYWdlJywgdGhpcy5vbk1lc3NhZ2UuYmluZCh0aGlzKSlcblx0XHR0aGlzLnNvY2tldC5jb25uZWN0KClcblxuXHRcdHRoaXMubXNnRnVuYyA9IHtcblx0XHRcdGNvbG9yOiB0aGlzLmNhbnZhcy5maWxsLFxuXHRcdFx0ZGVza3RvcDogdGhpcy5jYW52YXMudG9nZ2xlRGVza3RvcCxcblx0XHRcdG9wYWNpdHk6IHRoaXMuY2FudmFzLm9wYWNpdHlcblx0XHR9XG5cdH1cblxuXHRvbkNvbm5lY3QoKSB7XG5cdFx0dGhpcy5zZXR0aW5ncy5zdGF0dXMgPSAnY29ubmVjdGVkJ1xuXHRcdGlmICh0aGlzLnNldHRpbmdzLm5hbWUgIT0gJycpIHtcblx0XHRcdHRoaXMudXBkYXRlVXNlcigpXG5cdFx0fVxuXHR9XG5cblx0b25EaXNjb25uZWN0KCkge1xuXHRcdHRoaXMuc2V0dGluZ3Muc3RhdHVzID0gJ2Rpc2Nvbm5lY3RlZCdcblx0XHR0aGlzLmNhbnZhcy50b2dnbGVEZXNrdG9wKGZhbHNlKVxuXHRcdHRoaXMuY2FudmFzLmZpbGwoJ2JsYWNrJylcblx0fVxuXG5cdG9uTWVzc2FnZSh0eXBlLCB2YWx1ZSkge1xuXHRcdHRoaXMubXNnRnVuY1t0eXBlXSh2YWx1ZSlcblx0fVxuXG5cdHVwZGF0ZVVzZXIoKSB7XG5cdFx0dGhpcy5jYW52YXMudXBkYXRlTmFtZSh0aGlzLnNldHRpbmdzLm5hbWUpXG5cdFx0dGhpcy5zb2NrZXQuc2VuZCh7XG5cdFx0XHQndHlwZSc6ICd1cGRhdGUtdXNlcicsXG5cdFx0XHQnbmFtZSc6IHRoaXMuc2V0dGluZ3MubmFtZSxcblx0XHRcdCd4JzogdGhpcy5zZXR0aW5ncy54LFxuXHRcdFx0J3knOiB0aGlzLnNldHRpbmdzLnlcblx0XHR9KVxuXHR9XG59XG5cblxuaWYgKHdpbmRvdy5GaWxlICYmIHdpbmRvdy5GaWxlUmVhZGVyICYmIHdpbmRvdy5GaWxlTGlzdCAmJiB3aW5kb3cuQmxvYikge1xuXHRuZXcgQ2xpZW50KClcbn0gZWxzZSB7XG5cdGFsZXJ0KCdUaGUgRmlsZSBBUElzIGFyZSBub3QgZnVsbHkgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3Nlci4nKVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2xpZW50LmpzXG4gKiovIiwiLyogZ2xvYmFsICQgKi9cblxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudGVtaXR0ZXIzJ1xuaW1wb3J0ICdzaXN5cGh1cydcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXR0aW5ncyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0c3VwZXIoKVxuXG5cdFx0dGhpcy4kZm9ybSA9ICQoJy5zZXR0aW5ncycpXG5cdFx0dGhpcy4kc3RhdHVzID0gJCgnLnNldHRpbmdzX19zdGF0dXMnKVxuXHRcdHRoaXMuJG5hbWUgPSAkKCcjbmFtZScpXG5cdFx0dGhpcy4keCA9ICQoJyN4Jylcblx0XHR0aGlzLiR5ID0gJCgnI3knKVxuXHRcdHRoaXMuJGNvb3JkID0gJCgnLnNldHRpbmdzX19jb29yZCcpXG5cdFx0dGhpcy4kcG9pbnQgPSAkKCcuc2V0dGluZ3NfX2Nvb3JkLXBvaW50JylcblxuXHRcdC8vIGxvYWQgZnJvbSBsb2NhbFN0b3JhZ2Vcblx0XHR0aGlzLnNpc3lwaHVzID0gdGhpcy4kZm9ybS5zaXN5cGh1cygpXG5cdFx0dGhpcy51cGRhdGVDb29yZCh0aGlzLiR4LnZhbCgpLCB0aGlzLiR5LnZhbCgpKVxuXG5cdFx0Ly8gZXZlbnRcblx0XHQkKCcuc2V0dGluZ3NfX3VwZGF0ZScpLm9uKCdjbGljaycsICgpID0+IHtcblx0XHRcdHRoaXMuZW1pdCgndXBkYXRlJylcblx0XHR9KVxuXHRcdCQoJy5zZXR0aW5nc19fY2xvc2UnKS5vbignY2xpY2snLCAoKSA9PiB7XG5cdFx0XHR0aGlzLiRmb3JtLnRvZ2dsZUNsYXNzKCdoaWRkZW4nKVxuXHRcdH0pXG5cdFx0JCgnLnZpZXdlcicpLm9uKCdjbGljaycsICgpID0+IHtcblx0XHRcdHRoaXMuJGZvcm0udG9nZ2xlQ2xhc3MoJ2hpZGRlbicpXG5cdFx0fSlcblxuXHRcdHRoaXMuJGNvb3JkLm9uKHtcblx0XHRcdCdtb3VzZWRvd24nOiAoZSkgPT4ge1xuXHRcdFx0XHR0aGlzLnVwZGF0ZUNvb3JkKFxuXHRcdFx0XHRcdGUub2Zmc2V0WCAvIHRoaXMuJGNvb3JkLm91dGVyV2lkdGgoKSxcblx0XHRcdFx0XHRlLm9mZnNldFkgLyB0aGlzLiRjb29yZC5vdXRlckhlaWdodCgpXG5cdFx0XHRcdClcblx0XHRcdH1cblx0XHR9KVxuXG5cdFx0dGhpcy4keC5vbignY2hhbmdlJywgKCkgPT4ge1xuXHRcdFx0dGhpcy51cGRhdGVDb29yZCh0aGlzLiR4LnZhbCgpLCB0aGlzLiR5LnZhbCgpKVxuXHRcdH0pXG5cblx0XHR0aGlzLiR5Lm9uKCdjaGFuZ2UnLCAoZSkgPT4ge1xuXHRcdFx0dGhpcy51cGRhdGVDb29yZCh0aGlzLiR4LnZhbCgpLCB0aGlzLiR5LnZhbCgpKVxuXHRcdH0pXG5cdH1cblxuXHR1cGRhdGVDb29yZCh4LCB5KSB7XG5cdFx0dGhpcy4keC52YWwoeClcblx0XHR0aGlzLiR5LnZhbCh5KVxuXHRcdHRoaXMuJHBvaW50LmNzcyh7XG5cdFx0XHRsZWZ0OiBgJHt4ICogMTAwfSVgLFxuXHRcdFx0dG9wOiBgJHt5ICogMTAwfSVgXG5cdFx0fSlcblx0XHR0aGlzLnNpc3lwaHVzLnNhdmVBbGxEYXRhKClcblx0fVxuXG5cblx0Ly8gcHJvcGVydGllc1xuXG5cdGdldCBzdGF0dXMoKSB7XG5cdFx0cmV0dXJuIHRoaXMuJHN0YXR1cy52YWwoKVxuXHR9XG5cdHNldCBzdGF0dXMoX3N0YXR1cykge1xuXHRcdHRoaXMuJHN0YXR1cy52YWwoX3N0YXR1cylcblx0fVxuXG5cdGdldCBuYW1lKCkge1xuXHRcdHJldHVybiB0aGlzLiRuYW1lLnZhbCgpXG5cdH1cblxuXHRnZXQgeCgpIHtcblx0XHRyZXR1cm4gdGhpcy4keC52YWwoKVxuXHR9XG5cblx0Z2V0IHkoKSB7XG5cdFx0cmV0dXJuIHRoaXMuJHkudmFsKClcblx0fVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc2V0dGluZ3MuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vL1xuLy8gV2Ugc3RvcmUgb3VyIEVFIG9iamVjdHMgaW4gYSBwbGFpbiBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyBhcmUgZXZlbnQgbmFtZXMuXG4vLyBJZiBgT2JqZWN0LmNyZWF0ZShudWxsKWAgaXMgbm90IHN1cHBvcnRlZCB3ZSBwcmVmaXggdGhlIGV2ZW50IG5hbWVzIHdpdGggYVxuLy8gYH5gIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBidWlsdC1pbiBvYmplY3QgcHJvcGVydGllcyBhcmUgbm90IG92ZXJyaWRkZW4gb3Jcbi8vIHVzZWQgYXMgYW4gYXR0YWNrIHZlY3Rvci5cbi8vIFdlIGFsc28gYXNzdW1lIHRoYXQgYE9iamVjdC5jcmVhdGUobnVsbClgIGlzIGF2YWlsYWJsZSB3aGVuIHRoZSBldmVudCBuYW1lXG4vLyBpcyBhbiBFUzYgU3ltYm9sLlxuLy9cbnZhciBwcmVmaXggPSB0eXBlb2YgT2JqZWN0LmNyZWF0ZSAhPT0gJ2Z1bmN0aW9uJyA/ICd+JyA6IGZhbHNlO1xuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIEV2ZW50RW1pdHRlciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBFdmVudCBoYW5kbGVyIHRvIGJlIGNhbGxlZC5cbiAqIEBwYXJhbSB7TWl4ZWR9IGNvbnRleHQgQ29udGV4dCBmb3IgZnVuY3Rpb24gZXhlY3V0aW9uLlxuICogQHBhcmFtIHtCb29sZWFufSBbb25jZT1mYWxzZV0gT25seSBlbWl0IG9uY2VcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFRShmbiwgY29udGV4dCwgb25jZSkge1xuICB0aGlzLmZuID0gZm47XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMub25jZSA9IG9uY2UgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogTWluaW1hbCBFdmVudEVtaXR0ZXIgaW50ZXJmYWNlIHRoYXQgaXMgbW9sZGVkIGFnYWluc3QgdGhlIE5vZGUuanNcbiAqIEV2ZW50RW1pdHRlciBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7IC8qIE5vdGhpbmcgdG8gc2V0ICovIH1cblxuLyoqXG4gKiBIb2xkIHRoZSBhc3NpZ25lZCBFdmVudEVtaXR0ZXJzIGJ5IG5hbWUuXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgbGlzdGluZyB0aGUgZXZlbnRzIGZvciB3aGljaCB0aGUgZW1pdHRlciBoYXMgcmVnaXN0ZXJlZFxuICogbGlzdGVuZXJzLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHNcbiAgICAsIG5hbWVzID0gW11cbiAgICAsIG5hbWU7XG5cbiAgaWYgKCFldmVudHMpIHJldHVybiBuYW1lcztcblxuICBmb3IgKG5hbWUgaW4gZXZlbnRzKSB7XG4gICAgaWYgKGhhcy5jYWxsKGV2ZW50cywgbmFtZSkpIG5hbWVzLnB1c2gocHJlZml4ID8gbmFtZS5zbGljZSgxKSA6IG5hbWUpO1xuICB9XG5cbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICByZXR1cm4gbmFtZXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZXZlbnRzKSk7XG4gIH1cblxuICByZXR1cm4gbmFtZXM7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIGxpc3Qgb2YgYXNzaWduZWQgZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgZXZlbnRzIHRoYXQgc2hvdWxkIGJlIGxpc3RlZC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZXhpc3RzIFdlIG9ubHkgbmVlZCB0byBrbm93IGlmIHRoZXJlIGFyZSBsaXN0ZW5lcnMuXG4gKiBAcmV0dXJucyB7QXJyYXl8Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50LCBleGlzdHMpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGF2YWlsYWJsZSA9IHRoaXMuX2V2ZW50cyAmJiB0aGlzLl9ldmVudHNbZXZ0XTtcblxuICBpZiAoZXhpc3RzKSByZXR1cm4gISFhdmFpbGFibGU7XG4gIGlmICghYXZhaWxhYmxlKSByZXR1cm4gW107XG4gIGlmIChhdmFpbGFibGUuZm4pIHJldHVybiBbYXZhaWxhYmxlLmZuXTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGF2YWlsYWJsZS5sZW5ndGgsIGVlID0gbmV3IEFycmF5KGwpOyBpIDwgbDsgaSsrKSB7XG4gICAgZWVbaV0gPSBhdmFpbGFibGVbaV0uZm47XG4gIH1cblxuICByZXR1cm4gZWU7XG59O1xuXG4vKipcbiAqIEVtaXQgYW4gZXZlbnQgdG8gYWxsIHJlZ2lzdGVyZWQgZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gSW5kaWNhdGlvbiBpZiB3ZSd2ZSBlbWl0dGVkIGFuIGV2ZW50LlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZ0XVxuICAgICwgbGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgYXJnc1xuICAgICwgaTtcblxuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGxpc3RlbmVycy5mbikge1xuICAgIGlmIChsaXN0ZW5lcnMub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzLmZuLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgc3dpdGNoIChsZW4pIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQsIGE1KSwgdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZuLmFwcGx5KGxpc3RlbmVycy5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tpXS5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgICAgc3dpdGNoIChsZW4pIHtcbiAgICAgICAgY2FzZSAxOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCk7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSk7IGJyZWFrO1xuICAgICAgICBjYXNlIDM6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBSZWdpc3RlciBhIG5ldyBFdmVudExpc3RlbmVyIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gQ2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge01peGVkfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCBvZiB0aGUgZnVuY3Rpb24uXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCB0aGlzKVxuICAgICwgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50cykgdGhpcy5fZXZlbnRzID0gcHJlZml4ID8ge30gOiBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSB0aGlzLl9ldmVudHNbZXZ0XSA9IGxpc3RlbmVyO1xuICBlbHNlIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdLmZuKSB0aGlzLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgICBlbHNlIHRoaXMuX2V2ZW50c1tldnRdID0gW1xuICAgICAgdGhpcy5fZXZlbnRzW2V2dF0sIGxpc3RlbmVyXG4gICAgXTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGQgYW4gRXZlbnRMaXN0ZW5lciB0aGF0J3Mgb25seSBjYWxsZWQgb25jZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgTmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBDYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7TWl4ZWR9IFtjb250ZXh0PXRoaXNdIFRoZSBjb250ZXh0IG9mIHRoZSBmdW5jdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCB0aGlzLCB0cnVlKVxuICAgICwgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIXRoaXMuX2V2ZW50cykgdGhpcy5fZXZlbnRzID0gcHJlZml4ID8ge30gOiBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdKSB0aGlzLl9ldmVudHNbZXZ0XSA9IGxpc3RlbmVyO1xuICBlbHNlIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50c1tldnRdLmZuKSB0aGlzLl9ldmVudHNbZXZ0XS5wdXNoKGxpc3RlbmVyKTtcbiAgICBlbHNlIHRoaXMuX2V2ZW50c1tldnRdID0gW1xuICAgICAgdGhpcy5fZXZlbnRzW2V2dF0sIGxpc3RlbmVyXG4gICAgXTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgZXZlbnQgd2Ugd2FudCB0byByZW1vdmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgbGlzdGVuZXIgdGhhdCB3ZSBuZWVkIHRvIGZpbmQuXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IE9ubHkgcmVtb3ZlIGxpc3RlbmVycyBtYXRjaGluZyB0aGlzIGNvbnRleHQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSByZW1vdmUgb25jZSBsaXN0ZW5lcnMuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGZuLCBjb250ZXh0LCBvbmNlKSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIHRoaXM7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldnRdXG4gICAgLCBldmVudHMgPSBbXTtcblxuICBpZiAoZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLmZuKSB7XG4gICAgICBpZiAoXG4gICAgICAgICAgIGxpc3RlbmVycy5mbiAhPT0gZm5cbiAgICAgICAgfHwgKG9uY2UgJiYgIWxpc3RlbmVycy5vbmNlKVxuICAgICAgICB8fCAoY29udGV4dCAmJiBsaXN0ZW5lcnMuY29udGV4dCAhPT0gY29udGV4dClcbiAgICAgICkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4gIT09IGZuXG4gICAgICAgICAgfHwgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKVxuICAgICAgICAgIHx8IChjb250ZXh0ICYmIGxpc3RlbmVyc1tpXS5jb250ZXh0ICE9PSBjb250ZXh0KVxuICAgICAgICApIHtcbiAgICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAvL1xuICBpZiAoZXZlbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2V2ZW50c1tldnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW2V2dF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgb3Igb25seSB0aGUgbGlzdGVuZXJzIGZvciB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgZXZlbnQgd2FudCB0byByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyhldmVudCkge1xuICBpZiAoIXRoaXMuX2V2ZW50cykgcmV0dXJuIHRoaXM7XG5cbiAgaWYgKGV2ZW50KSBkZWxldGUgdGhpcy5fZXZlbnRzW3ByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRdO1xuICBlbHNlIHRoaXMuX2V2ZW50cyA9IHByZWZpeCA/IHt9IDogT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBBbGlhcyBtZXRob2RzIG5hbWVzIGJlY2F1c2UgcGVvcGxlIHJvbGwgbGlrZSB0aGF0LlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4vL1xuLy8gVGhpcyBmdW5jdGlvbiBkb2Vzbid0IGFwcGx5IGFueW1vcmUuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEV4cG9zZSB0aGUgcHJlZml4LlxuLy9cbkV2ZW50RW1pdHRlci5wcmVmaXhlZCA9IHByZWZpeDtcblxuLy9cbi8vIEV4cG9zZSB0aGUgbW9kdWxlLlxuLy9cbmlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIG1vZHVsZSkge1xuICBtb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2V2ZW50ZW1pdHRlcjMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIhZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihhKXtyZXR1cm5cIltpZD1cIithLmF0dHIoXCJpZFwiKStcIl1bbmFtZT1cIithLmF0dHIoXCJuYW1lXCIpK1wiXVwifWEuZm4uc2lzeXBodXM9ZnVuY3Rpb24oYyl7dmFyIGQ9YS5tYXAodGhpcyxmdW5jdGlvbihjKXtyZXR1cm4gYihhKGMpKX0pLmpvaW4oKSxlPVNpc3lwaHVzLmdldEluc3RhbmNlKGQpO3JldHVybiBlLnByb3RlY3QodGhpcyxjKSxlfTt2YXIgYz17fTtjLmlzQXZhaWxhYmxlPWZ1bmN0aW9uKCl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGEualN0b3JhZ2UpcmV0dXJuITA7dHJ5e3JldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbX1jYXRjaChiKXtyZXR1cm4hMX19LGMuc2V0PWZ1bmN0aW9uKGIsYyl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGEualN0b3JhZ2UpYS5qU3RvcmFnZS5zZXQoYixjK1wiXCIpO2Vsc2UgdHJ5e2xvY2FsU3RvcmFnZS5zZXRJdGVtKGIsYytcIlwiKX1jYXRjaChkKXt9fSxjLmdldD1mdW5jdGlvbihiKXtpZihcIm9iamVjdFwiPT10eXBlb2YgYS5qU3RvcmFnZSl7dmFyIGM9YS5qU3RvcmFnZS5nZXQoYik7cmV0dXJuIGM/Yy50b1N0cmluZygpOmN9cmV0dXJuIGxvY2FsU3RvcmFnZS5nZXRJdGVtKGIpfSxjLnJlbW92ZT1mdW5jdGlvbihiKXtcIm9iamVjdFwiPT10eXBlb2YgYS5qU3RvcmFnZT9hLmpTdG9yYWdlLmRlbGV0ZUtleShiKTpsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShiKX0sU2lzeXBodXM9ZnVuY3Rpb24oKXtmdW5jdGlvbiBmKCl7cmV0dXJue3NldEluc3RhbmNlSWRlbnRpZmllcjpmdW5jdGlvbihhKXt0aGlzLmlkZW50aWZpZXI9YX0sZ2V0SW5zdGFuY2VJZGVudGlmaWVyOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaWRlbnRpZmllcn0sc2V0SW5pdGlhbE9wdGlvbnM6ZnVuY3Rpb24oYil7dmFyIGQ9e2V4Y2x1ZGVGaWVsZHM6W10sY3VzdG9tS2V5U3VmZml4OlwiXCIsbG9jYXRpb25CYXNlZDohMSx0aW1lb3V0OjAsYXV0b1JlbGVhc2U6ITAsb25CZWZvcmVTYXZlOmZ1bmN0aW9uKCl7fSxvblNhdmU6ZnVuY3Rpb24oKXt9LG9uQmVmb3JlUmVzdG9yZTpmdW5jdGlvbigpe30sb25SZXN0b3JlOmZ1bmN0aW9uKCl7fSxvblJlbGVhc2U6ZnVuY3Rpb24oKXt9fTt0aGlzLm9wdGlvbnM9dGhpcy5vcHRpb25zfHxhLmV4dGVuZChkLGIpLHRoaXMuYnJvd3NlclN0b3JhZ2U9Y30sc2V0T3B0aW9uczpmdW5jdGlvbihiKXt0aGlzLm9wdGlvbnM9dGhpcy5vcHRpb25zfHx0aGlzLnNldEluaXRpYWxPcHRpb25zKGIpLHRoaXMub3B0aW9ucz1hLmV4dGVuZCh0aGlzLm9wdGlvbnMsYil9LHByb3RlY3Q6ZnVuY3Rpb24oYixjKXt0aGlzLnNldE9wdGlvbnMoYyksYj1ifHx7fTt2YXIgZj10aGlzO2lmKHRoaXMudGFyZ2V0cz10aGlzLnRhcmdldHN8fFtdLGYub3B0aW9ucy5uYW1lP3RoaXMuaHJlZj1mLm9wdGlvbnMubmFtZTp0aGlzLmhyZWY9bG9jYXRpb24uaG9zdG5hbWUrbG9jYXRpb24ucGF0aG5hbWUrbG9jYXRpb24uc2VhcmNoK2xvY2F0aW9uLmhhc2gsdGhpcy50YXJnZXRzPWEubWVyZ2UodGhpcy50YXJnZXRzLGIpLHRoaXMudGFyZ2V0cz1hLnVuaXF1ZSh0aGlzLnRhcmdldHMpLHRoaXMudGFyZ2V0cz1hKHRoaXMudGFyZ2V0cyksIXRoaXMuYnJvd3NlclN0b3JhZ2UuaXNBdmFpbGFibGUoKSlyZXR1cm4hMTt2YXIgZz1mLm9wdGlvbnMub25CZWZvcmVSZXN0b3JlLmNhbGwoZik7aWYoKHZvaWQgMD09PWd8fGcpJiZmLnJlc3RvcmVBbGxEYXRhKCksdGhpcy5vcHRpb25zLmF1dG9SZWxlYXNlJiZmLmJpbmRSZWxlYXNlRGF0YSgpLCFkLnN0YXJ0ZWRbdGhpcy5nZXRJbnN0YW5jZUlkZW50aWZpZXIoKV0paWYoZi5pc0NLRWRpdG9yUHJlc2VudCgpKXZhciBoPXNldEludGVydmFsKGZ1bmN0aW9uKCl7ZS5pc0xvYWRlZCYmKGNsZWFySW50ZXJ2YWwoaCksZi5iaW5kU2F2ZURhdGEoKSxkLnN0YXJ0ZWRbZi5nZXRJbnN0YW5jZUlkZW50aWZpZXIoKV09ITApfSwxMDApO2Vsc2UgZi5iaW5kU2F2ZURhdGEoKSxkLnN0YXJ0ZWRbZi5nZXRJbnN0YW5jZUlkZW50aWZpZXIoKV09ITB9LGlzQ0tFZGl0b3JQcmVzZW50OmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaXNDS0VkaXRvckV4aXN0cygpPyhlLmlzTG9hZGVkPSExLGUub24oXCJpbnN0YW5jZVJlYWR5XCIsZnVuY3Rpb24oKXtlLmlzTG9hZGVkPSEwfSksITApOiExfSxpc0NLRWRpdG9yRXhpc3RzOmZ1bmN0aW9uKCl7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV9LGZpbmRGaWVsZHNUb1Byb3RlY3Q6ZnVuY3Rpb24oYSl7cmV0dXJuIGEuZmluZChcIjppbnB1dFwiKS5ub3QoXCI6c3VibWl0XCIpLm5vdChcIjpyZXNldFwiKS5ub3QoXCI6YnV0dG9uXCIpLm5vdChcIjpmaWxlXCIpLm5vdChcIjpwYXNzd29yZFwiKS5ub3QoXCI6ZGlzYWJsZWRcIikubm90KFwiW3JlYWRvbmx5XVwiKX0sYmluZFNhdmVEYXRhOmZ1bmN0aW9uKCl7dmFyIGM9dGhpcztjLm9wdGlvbnMudGltZW91dCYmYy5zYXZlRGF0YUJ5VGltZW91dCgpLGMudGFyZ2V0cy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGQ9YihhKHRoaXMpKTtjLmZpbmRGaWVsZHNUb1Byb3RlY3QoYSh0aGlzKSkuZWFjaChmdW5jdGlvbigpe2lmKC0xIT09YS5pbkFycmF5KHRoaXMsYy5vcHRpb25zLmV4Y2x1ZGVGaWVsZHMpKXJldHVybiEwO3ZhciBlPWEodGhpcyksZj0oYy5vcHRpb25zLmxvY2F0aW9uQmFzZWQ/Yy5ocmVmOlwiXCIpK2QrYihlKStjLm9wdGlvbnMuY3VzdG9tS2V5U3VmZml4OyhlLmlzKFwiOnRleHRcIil8fGUuaXMoXCJ0ZXh0YXJlYVwiKSkmJihjLm9wdGlvbnMudGltZW91dHx8Yy5iaW5kU2F2ZURhdGFJbW1lZGlhdGVseShlLGYpKSxjLmJpbmRTYXZlRGF0YU9uQ2hhbmdlKGUpfSl9KX0sc2F2ZUFsbERhdGE6ZnVuY3Rpb24oKXt2YXIgYz10aGlzO2MudGFyZ2V0cy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGQ9YihhKHRoaXMpKSxmPXt9O2MuZmluZEZpZWxkc1RvUHJvdGVjdChhKHRoaXMpKS5lYWNoKGZ1bmN0aW9uKCl7dmFyIGc9YSh0aGlzKTtpZigtMSE9PWEuaW5BcnJheSh0aGlzLGMub3B0aW9ucy5leGNsdWRlRmllbGRzKXx8dm9pZCAwPT09Zy5hdHRyKFwibmFtZVwiKSYmdm9pZCAwPT09Zy5hdHRyKFwiaWRcIikpcmV0dXJuITA7dmFyIGg9KGMub3B0aW9ucy5sb2NhdGlvbkJhc2VkP2MuaHJlZjpcIlwiKStkK2IoZykrYy5vcHRpb25zLmN1c3RvbUtleVN1ZmZpeCxpPWcudmFsKCk7aWYoZy5pcyhcIjpjaGVja2JveFwiKSl7dmFyIGo9Zy5hdHRyKFwibmFtZVwiKTtpZih2b2lkIDAhPT1qJiYtMSE9PWouaW5kZXhPZihcIltcIikpe2lmKGZbal09PT0hMClyZXR1cm47aT1bXSxhKFwiW25hbWU9J1wiK2orXCInXTpjaGVja2VkXCIpLmVhY2goZnVuY3Rpb24oKXtpLnB1c2goYSh0aGlzKS52YWwoKSl9KSxmW2pdPSEwfWVsc2UgaT1nLmlzKFwiOmNoZWNrZWRcIik7Yy5zYXZlVG9Ccm93c2VyU3RvcmFnZShoLGksITEpfWVsc2UgaWYoZy5pcyhcIjpyYWRpb1wiKSlnLmlzKFwiOmNoZWNrZWRcIikmJihpPWcudmFsKCksYy5zYXZlVG9Ccm93c2VyU3RvcmFnZShoLGksITEpKTtlbHNlIGlmKGMuaXNDS0VkaXRvckV4aXN0cygpKXt2YXIgaz1lLmluc3RhbmNlc1tnLmF0dHIoXCJuYW1lXCIpXXx8ZS5pbnN0YW5jZXNbZy5hdHRyKFwiaWRcIildO2s/KGsudXBkYXRlRWxlbWVudCgpLGMuc2F2ZVRvQnJvd3NlclN0b3JhZ2UoaCxnLnZhbCgpLCExKSk6Yy5zYXZlVG9Ccm93c2VyU3RvcmFnZShoLGksITEpfWVsc2UgYy5zYXZlVG9Ccm93c2VyU3RvcmFnZShoLGksITEpfSl9KSxjLm9wdGlvbnMub25TYXZlLmNhbGwoYyl9LHJlc3RvcmVBbGxEYXRhOmZ1bmN0aW9uKCl7dmFyIGM9dGhpcyxkPSExO2MudGFyZ2V0cy5lYWNoKGZ1bmN0aW9uKCl7dmFyIGU9YSh0aGlzKSxmPWIoYSh0aGlzKSk7Yy5maW5kRmllbGRzVG9Qcm90ZWN0KGUpLmVhY2goZnVuY3Rpb24oKXtpZigtMSE9PWEuaW5BcnJheSh0aGlzLGMub3B0aW9ucy5leGNsdWRlRmllbGRzKSlyZXR1cm4hMDt2YXIgZT1hKHRoaXMpLGc9KGMub3B0aW9ucy5sb2NhdGlvbkJhc2VkP2MuaHJlZjpcIlwiKStmK2IoZSkrYy5vcHRpb25zLmN1c3RvbUtleVN1ZmZpeCxoPWMuYnJvd3NlclN0b3JhZ2UuZ2V0KGcpO251bGwhPT1oJiYoYy5yZXN0b3JlRmllbGRzRGF0YShlLGgpLGQ9ITApfSl9KSxkJiZjLm9wdGlvbnMub25SZXN0b3JlLmNhbGwoYyl9LHJlc3RvcmVGaWVsZHNEYXRhOmZ1bmN0aW9uKGEsYil7aWYodm9pZCAwPT09YS5hdHRyKFwibmFtZVwiKSYmdm9pZCAwPT09YS5hdHRyKFwiaWRcIikpcmV0dXJuITE7dmFyIGM9YS5hdHRyKFwibmFtZVwiKTshYS5pcyhcIjpjaGVja2JveFwiKXx8XCJmYWxzZVwiPT09Ynx8dm9pZCAwIT09YyYmLTEhPT1jLmluZGV4T2YoXCJbXCIpPyFhLmlzKFwiOmNoZWNrYm94XCIpfHxcImZhbHNlXCIhPT1ifHx2b2lkIDAhPT1jJiYtMSE9PWMuaW5kZXhPZihcIltcIik/YS5pcyhcIjpyYWRpb1wiKT9hLnZhbCgpPT09YiYmYS5wcm9wKFwiY2hlY2tlZFwiLCEwKTp2b2lkIDA9PT1jfHwtMT09PWMuaW5kZXhPZihcIltcIik/YS52YWwoYik6KGI9Yi5zcGxpdChcIixcIiksYS52YWwoYikpOmEucHJvcChcImNoZWNrZWRcIiwhMSk6YS5wcm9wKFwiY2hlY2tlZFwiLCEwKX0sYmluZFNhdmVEYXRhSW1tZWRpYXRlbHk6ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzO2lmKFwib25wcm9wZXJ0eWNoYW5nZVwiaW4gYT9hLmdldCgwKS5vbnByb3BlcnR5Y2hhbmdlPWZ1bmN0aW9uKCl7Yy5zYXZlVG9Ccm93c2VyU3RvcmFnZShiLGEudmFsKCkpfTphLmdldCgwKS5vbmlucHV0PWZ1bmN0aW9uKCl7Yy5zYXZlVG9Ccm93c2VyU3RvcmFnZShiLGEudmFsKCkpfSx0aGlzLmlzQ0tFZGl0b3JFeGlzdHMoKSl7dmFyIGQ9ZS5pbnN0YW5jZXNbYS5hdHRyKFwibmFtZVwiKV18fGUuaW5zdGFuY2VzW2EuYXR0cihcImlkXCIpXTtkJiZkLmRvY3VtZW50Lm9uKFwia2V5dXBcIixmdW5jdGlvbigpe2QudXBkYXRlRWxlbWVudCgpLGMuc2F2ZVRvQnJvd3NlclN0b3JhZ2UoYixhLnZhbCgpKX0pfX0sc2F2ZVRvQnJvd3NlclN0b3JhZ2U6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPXRoaXMsZT1kLm9wdGlvbnMub25CZWZvcmVTYXZlLmNhbGwoZCk7KHZvaWQgMD09PWV8fGUhPT0hMSkmJihjPXZvaWQgMD09PWM/ITA6Yyx0aGlzLmJyb3dzZXJTdG9yYWdlLnNldChhLGIpLGMmJlwiXCIhPT1iJiZ0aGlzLm9wdGlvbnMub25TYXZlLmNhbGwodGhpcykpfSxiaW5kU2F2ZURhdGFPbkNoYW5nZTpmdW5jdGlvbihhKXt2YXIgYj10aGlzO2EuY2hhbmdlKGZ1bmN0aW9uKCl7Yi5zYXZlQWxsRGF0YSgpfSl9LHNhdmVEYXRhQnlUaW1lb3V0OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcyxiPWEudGFyZ2V0cztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ZnVuY3Rpb24gYigpe2Euc2F2ZUFsbERhdGEoKSxzZXRUaW1lb3V0KGIsMWUzKmEub3B0aW9ucy50aW1lb3V0KX1yZXR1cm4gYn0oYiksMWUzKmEub3B0aW9ucy50aW1lb3V0KX0sYmluZFJlbGVhc2VEYXRhOmZ1bmN0aW9uKCl7dmFyIGM9dGhpcztjLnRhcmdldHMuZWFjaChmdW5jdGlvbigpe3ZhciBkPWEodGhpcyksZT1iKGQpO2EodGhpcykuYmluZChcInN1Ym1pdCByZXNldFwiLGZ1bmN0aW9uKCl7Yy5yZWxlYXNlRGF0YShlLGMuZmluZEZpZWxkc1RvUHJvdGVjdChkKSl9KX0pfSxtYW51YWxseVJlbGVhc2VEYXRhOmZ1bmN0aW9uKCl7dmFyIGM9dGhpcztjLnRhcmdldHMuZWFjaChmdW5jdGlvbigpe3ZhciBkPWEodGhpcyksZT1iKGQpO2MucmVsZWFzZURhdGEoZSxjLmZpbmRGaWVsZHNUb1Byb3RlY3QoZCkpfSl9LHJlbGVhc2VEYXRhOmZ1bmN0aW9uKGMsZSl7dmFyIGY9ITEsZz10aGlzO2Quc3RhcnRlZFtnLmdldEluc3RhbmNlSWRlbnRpZmllcigpXT0hMSxlLmVhY2goZnVuY3Rpb24oKXtpZigtMSE9PWEuaW5BcnJheSh0aGlzLGcub3B0aW9ucy5leGNsdWRlRmllbGRzKSlyZXR1cm4hMDt2YXIgZD1hKHRoaXMpLGU9KGcub3B0aW9ucy5sb2NhdGlvbkJhc2VkP2cuaHJlZjpcIlwiKStjK2IoZCkrZy5vcHRpb25zLmN1c3RvbUtleVN1ZmZpeDtnLmJyb3dzZXJTdG9yYWdlLnJlbW92ZShlKSxmPSEwfSksZiYmZy5vcHRpb25zLm9uUmVsZWFzZS5jYWxsKGcpfX19dmFyIGQ9e2luc3RhbnRpYXRlZDpbXSxzdGFydGVkOltdfSxlPXdpbmRvdy5DS0VESVRPUjtyZXR1cm57Z2V0SW5zdGFuY2U6ZnVuY3Rpb24oYSl7cmV0dXJuIGQuaW5zdGFudGlhdGVkW2FdfHwoZC5pbnN0YW50aWF0ZWRbYV09ZigpLGQuaW5zdGFudGlhdGVkW2FdLnNldEluc3RhbmNlSWRlbnRpZmllcihhKSxkLmluc3RhbnRpYXRlZFthXS5zZXRJbml0aWFsT3B0aW9ucygpKSxhP2QuaW5zdGFudGlhdGVkW2FdOmQuaW5zdGFudGlhdGVkW2FdfSxmcmVlOmZ1bmN0aW9uKCl7cmV0dXJuIGQ9e2luc3RhbnRpYXRlZDpbXSxzdGFydGVkOltdfSxudWxsfSx2ZXJzaW9uOlwiMS4xLjJcIn19KCl9KGpRdWVyeSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3dlYl9tb2R1bGVzL3Npc3lwaHVzLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudGVtaXR0ZXIzJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXQgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG5cdGNvbnN0cnVjdG9yKF9ob3N0KSB7XG5cdFx0c3VwZXIoKVxuXG5cdFx0dGhpcy5ob3N0ID0gX2hvc3RcblxuXHRcdHRoaXMuY29ubmVjdCBcdFx0XHQ9IHRoaXMuY29ubmVjdC5iaW5kKHRoaXMpXG5cdFx0dGhpcy5vbkNvbm5lY3QgXHRcdD0gdGhpcy5vbkNvbm5lY3QuYmluZCh0aGlzKVxuXHRcdHRoaXMub25EaXNjb25uZWN0ID0gdGhpcy5vbkRpc2Nvbm5lY3QuYmluZCh0aGlzKVxuXHRcdHRoaXMub25NZXNzYWdlIFx0XHQ9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcylcblx0fVxuXG5cdGNvbm5lY3QoKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coYFRyeWluZyB0byBjb25uZWN0ICR7V1NfSE9TVH1gKVxuXHRcdHRoaXMud3MgPSBuZXcgV2ViU29ja2V0KHRoaXMuaG9zdClcblx0XHR0aGlzLndzLm9ub3BlbiBcdD0gdGhpcy5vbkNvbm5lY3Rcblx0XHR0aGlzLndzLm9uY2xvc2UgPSB0aGlzLm9uRGlzY29ubmVjdFxuXHRcdHRoaXMud3Mub25lcm9yIFx0PSB0aGlzLm9uRGlzY29ubmVjdFxuXHR9XG5cblx0b25EaXNjb25uZWN0KCkge1xuXHRcdHRoaXMuZW1pdCgnZGlzY29ubmVjdCcpXG5cdFx0c2V0VGltZW91dCh0aGlzLmNvbm5lY3QsIDIwMDApXG5cdH1cblxuXHRvbkNvbm5lY3QoKSB7XG5cdFx0dGhpcy53cy5vbm1lc3NhZ2UgPSB0aGlzLm9uTWVzc2FnZVxuXHRcdHRoaXMuZW1pdCgnY29ubmVjdCcpXG5cdH1cblxuXHRvbk1lc3NhZ2UoZSkge1xuXHRcdC8vIHR5cGU6dmFsdWVcblx0XHRjb25zdCBkYXRhID0gZS5kYXRhLnNwbGl0KCc6Jylcblx0XHR0aGlzLmVtaXQoJ29ubWVzc2FnZScsIGRhdGFbMF0sIGRhdGFbMV0pXG5cdH1cblxuXHRzZW5kKG9iamVjdCkge1xuXHRcdHRoaXMud3Muc2VuZChKU09OLnN0cmluZ2lmeShvYmplY3QpKVxuXHR9XG5cblxuXG5cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc29ja2V0LmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIHtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblxuXHRcdHRoaXMuJGNhbnZhcyA9ICQoJy5jYW52YXMnKVswXVxuXHRcdHRoaXMuZGVza3RvcCA9ICQoJy5jYW52YXMtZGVza3RvcCcpWzBdXG5cdFx0dGhpcy4kZGVza3RvcCA9ICQoJy5jYW52YXMtZGVza3RvcCcpXG5cblx0XHR0aGlzLmZpbGwgPSB0aGlzLmZpbGwuYmluZCh0aGlzKVxuXHRcdHRoaXMub3BhY2l0eSA9IHRoaXMub3BhY2l0eS5iaW5kKHRoaXMpXG5cdFx0dGhpcy50b2dnbGVEZXNrdG9wID0gdGhpcy50b2dnbGVEZXNrdG9wLmJpbmQodGhpcylcblxuXHRcdHdpbmRvdy5kZXNrdG9wID0gdGhpcy5kZXNrdG9wXG5cblx0XHR0aGlzLnRvZ2dsZURlc2t0b3AoZmFsc2UpXG5cdH1cblxuXHRmaWxsKGNvbG9yKSB7XG5cdFx0dGhpcy4kY2FudmFzLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yXG5cdH1cblxuXHRvcGFjaXR5KGFscGhhKSB7XG5cdFx0dGhpcy4kZGVza3RvcC5jc3MoJ29wYWNpdHknLCBwYXJzZUZsb2F0KGFscGhhKSlcblx0fVxuXG5cdHRvZ2dsZURlc2t0b3AodmFsdWUpIHtcblx0XHRsZXQgZmxhZyA9IHZhbHVlID09IDFcblx0XHR0aGlzLmRlc2t0b3Auc3R5bGUudmlzaWJpbGl0eSA9IGZsYWcgPyAndmlzaWJsZScgOiAnaGlkZGVuJ1xuXHRcdHRoaXMuJGNhbnZhcy5zdHlsZS52aXNpYmlsaXR5ID0gZmxhZyA/ICdoaWRkZW4nIDogJ3Zpc2libGUnXG5cdH1cblxuXHR1cGRhdGVOYW1lKG5hbWUpIHtcblx0XHR0aGlzLmRlc2t0b3Auc3JjID0gJy4vZGVza3RvcC9kZXNrdG9wLnBuZydcblx0fVxuXG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jYW52YXMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9