module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/browser";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _reactRouter = __webpack_require__(2);

	var _path = __webpack_require__(3);

	var _path2 = _interopRequireDefault(_path);

	var _setup_react_serve = __webpack_require__(4);

	var _setup_react_serve2 = _interopRequireDefault(_setup_react_serve);

	var _routes = __webpack_require__(13);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var router = _express2.default.Router();

	router.get('/', function (request, response) {
	  return response.sendFile(_path2.default.join(__dirname, '../../public/LoggedOutPage.html'));
	});

	router.use(function (request, response) {
	  return (0, _reactRouter.match)({ routes: _routes2.default, location: request.url }, (0, _setup_react_serve2.default)(request, response));
	});

	module.exports = router;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(6);

	var _template = __webpack_require__(7);

	var _template2 = _interopRequireDefault(_template);

	var _requestPromise = __webpack_require__(8);

	var _requestPromise2 = _interopRequireDefault(_requestPromise);

	var _reactRouter = __webpack_require__(2);

	var _data_wrapper = __webpack_require__(9);

	var _data_wrapper2 = _interopRequireDefault(_data_wrapper);

	var _config = __webpack_require__(10);

	var _moment = __webpack_require__(12);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var config = (0, _config.readConfig)().GITHUB_URLS;
	// import goals from '../../mock_data/github.json'


	var requestOptions = function requestOptions(github_access_token) {
	  return {
	    method: 'GET',
	    url: config.GUILDCRAFTS_GOALS_URL,
	    headers: {
	      'user-agent': 'node.js',
	      'authorization': 'Token ' + github_access_token
	    }
	  };
	};

	var templateOptions = function templateOptions(renderProps, goals) {
	  return {
	    title: 'Goals',
	    body: (0, _server.renderToString)(_react2.default.createElement(
	      _data_wrapper2.default,
	      { goals: JSON.parse(goals) },
	      _react2.default.createElement(_reactRouter.RouterContext, renderProps)
	    )),
	    initialState: goals
	  };
	};

	var clientRequest = function clientRequest(request, response, next) {
	  return function (error, redirectLocation, renderProps) {
	    switch (request.url) {
	      case '/goals':
	        var github_access_token = request.session.github_access_token;


	        (0, _requestPromise2.default)(requestOptions(github_access_token)).then(function (goals) {
	          var parsedGoals = JSON.parse(goals);

	          var modifiedGoals = parsedGoals.map(function (goal) {
	            return Object.assign({}, goal, { from_now: (0, _moment2.default)(goal.created_at).fromNow() });
	          });

	          response.status(200).send((0, _template2.default)(templateOptions(renderProps, JSON.stringify(modifiedGoals))));
	        });
	        break;
	      case redirectLocation:
	        response.redirect(302, redirectLocation.pathname + redirectLocation.search);
	      default:
	        next;
	    }
	  };
	};

	exports.default = clientRequest;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (_ref) {
	  var body = _ref.body,
	      title = _ref.title,
	      initialState = _ref.initialState;
	  return '\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <script>window.__APP_INITIAL_STATE__ = ' + initialState + '</script>\n        <title>' + title + '</title>\n        <link href="//cdn.muicss.com/mui-0.9.8/css/mui.min.css" rel="stylesheet" type="text/css" media="screen" />\n        <link rel="stylesheet" href="/stylesheets/style.css" />\n      </head>\n\n      <body>\n        <div id="root">' + (process.env.NODE_ENV === 'production' ? body : '<div>' + body + '</div>') + '</div>\n      </body>\n\n      <script src="/dist/bundle.js"></script>\n    </html>\n  ';
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("request-promise");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DataWrapper = function (_Component) {
	  _inherits(DataWrapper, _Component);

	  function DataWrapper() {
	    _classCallCheck(this, DataWrapper);

	    return _possibleConstructorReturn(this, (DataWrapper.__proto__ || Object.getPrototypeOf(DataWrapper)).apply(this, arguments));
	  }

	  _createClass(DataWrapper, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return { goals: this.props.goals };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.props.children;
	    }
	  }]);

	  return DataWrapper;
	}(_react.Component);

	DataWrapper.childContextTypes = {
	  goals: _react2.default.PropTypes.array.isRequired
	};

	exports.default = DataWrapper;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var path = __webpack_require__(3);
	var fs = __webpack_require__(11);

	var config = void 0;

	var env = function env() {
	  return process.env.NODE_ENV || 'development';
	};
	var isProduction = function isProduction() {
	  return env() === 'production';
	};
	var testEnv = function testEnv() {
	  return process.env.NODE_ENV || 'test';
	};

	var readConfig = function readConfig() {
	  if (config) {
	    return config;
	  } else {
	    var _env = env();
	    var filepath = path.join(__dirname, './' + _env + '.json');
	    try {
	      config = JSON.parse(fs.readFileSync(filepath).toString());
	      return config;
	    } catch (e) {
	      throw new Error('Error reading config file : ' + filepath);
	    }
	  }
	};

	exports.readConfig = readConfig;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("moment");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(2);

	var _App = __webpack_require__(14);

	var _App2 = _interopRequireDefault(_App);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Routes = _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/goals', component: _App2.default },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _App2.default })
	);

	exports.default = Routes;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _GoalPanel = __webpack_require__(15);

	var _GoalPanel2 = _interopRequireDefault(_GoalPanel);

	var _react3 = __webpack_require__(26);

	var _container = __webpack_require__(19);

	var _container2 = _interopRequireDefault(_container);

	var _row = __webpack_require__(27);

	var _row2 = _interopRequireDefault(_row);

	var _fetch_method = __webpack_require__(24);

	var _fetch_method2 = _interopRequireDefault(_fetch_method);

	var _panel = __webpack_require__(17);

	var _panel2 = _interopRequireDefault(_panel);

	var _button = __webpack_require__(18);

	var _button2 = _interopRequireDefault(_button);

	var _col = __webpack_require__(16);

	var _col2 = _interopRequireDefault(_col);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_Component) {
	  _inherits(App, _Component);

	  function App(props) {
	    _classCallCheck(this, App);

	    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	    _this.state = {
	      goals: props.routes[0].goals ? props.routes[0].goals : [],
	      labels: [],
	      milestones: [],
	      filterBy: 0,
	      filterType: 0
	    };
	    return _this;
	  }

	  _createClass(App, [{
	    key: 'filterGoal',
	    value: function filterGoal(goals) {
	      var rows = [];
	      var _state = this.state,
	          filterBy = _state.filterBy,
	          filterType = _state.filterType;


	      var containsMilestone = function containsMilestone(title) {
	        return title === filterBy;
	      };

	      var containsLabel = function containsLabel(goal) {
	        var found = false;
	        for (var i = 0; i < goal.labels.length; i++) {
	          if (goal.labels[i].name === filterBy) {
	            found = true;
	            break;
	          }
	        }

	        return found;
	      };

	      var filteredGoals = goals.filter(function (goal) {
	        if (!filterBy) return true;

	        if (filterType === 'label') {
	          return containsLabel(goal);
	        }

	        if (filterType === 'milestone' && goal.milestone) {
	          return containsMilestone(goal.milestone.title);
	        }
	      });

	      return filteredGoals;
	    }
	  }, {
	    key: 'setRowGoals',
	    value: function setRowGoals(goals) {
	      var rows = [];

	      goals.forEach(function (goal, index) {
	        var row = Math.floor(index / 3);
	        if (!rows[row]) rows[row] = [];

	        rows[row].push(_react2.default.createElement(_GoalPanel2.default, { key: goal.id, goal: goal }));
	      });

	      return rows.map(function (row, index) {
	        return _react2.default.createElement(
	          _row2.default,
	          { key: 'row-' + index },
	          row
	        );
	      });
	    }
	  }, {
	    key: 'getLabels',
	    value: function getLabels() {
	      var _this2 = this;

	      return (0, _fetch_method2.default)('GET', '/api/v1/goals/all_labels', null, function (labels) {
	        return _this2.setState({ labels: JSON.parse(labels) });
	      });
	    }
	  }, {
	    key: 'getMilestones',
	    value: function getMilestones() {
	      var _this3 = this;

	      return (0, _fetch_method2.default)('GET', '/api/v1/goals/all_milestones', null, function (milestones) {
	        return _this3.setState({ milestones: JSON.parse(milestones) });
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.getLabels();
	      this.getMilestones();
	    }
	  }, {
	    key: 'renderMilestones',
	    value: function renderMilestones() {
	      var _this4 = this;

	      var milestones = this.state.milestones;


	      return milestones.map(function (milestones, index) {
	        return _react2.default.createElement(
	          _button2.default,
	          {
	            key: milestones.title + '-' + index,
	            color: 'primary',
	            onClick: function onClick() {
	              return _this4.setState({
	                filterBy: milestones.title,
	                filterType: 'milestone'
	              });
	            } },
	          milestones.title
	        );
	      });
	    }
	  }, {
	    key: 'renderLabels',
	    value: function renderLabels() {
	      var _this5 = this;

	      var labels = this.state.labels;


	      return labels.map(function (label, index) {
	        return _react2.default.createElement(
	          _button2.default,
	          {
	            key: label.name + '-' + index,
	            style: { backgroundColor: '#' + label.color },
	            onClick: function onClick() {
	              return _this5.setState({
	                filterBy: label.name,
	                filterType: 'label'
	              });
	            } },
	          label.name
	        );
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this6 = this;

	      var _state2 = this.state,
	          goals = _state2.goals,
	          filterBy = _state2.filterBy;

	      var currentGoalsState = !filterBy ? goals : this.filterGoal(goals);

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(_react3.Appbar, null),
	        _react2.default.createElement('br', null),
	        _react2.default.createElement(
	          _container2.default,
	          null,
	          _react2.default.createElement(
	            _row2.default,
	            null,
	            _react2.default.createElement(
	              _panel2.default,
	              null,
	              'Filter By:',
	              _react2.default.createElement(
	                _container2.default,
	                null,
	                _react2.default.createElement(
	                  _button2.default,
	                  {
	                    color: 'primary',
	                    onClick: function onClick() {
	                      return _this6.setState({ filterBy: null });
	                    } },
	                  'All'
	                ),
	                this.renderLabels(),
	                this.renderMilestones()
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            null,
	            this.setRowGoals(currentGoalsState)
	          )
	        )
	      );
	    }
	  }]);

	  return App;
	}(_react.Component);

	exports.default = App;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _col = __webpack_require__(16);

	var _col2 = _interopRequireDefault(_col);

	var _panel = __webpack_require__(17);

	var _panel2 = _interopRequireDefault(_panel);

	var _button = __webpack_require__(18);

	var _button2 = _interopRequireDefault(_button);

	var _container = __webpack_require__(19);

	var _container2 = _interopRequireDefault(_container);

	var _muicss = __webpack_require__(20);

	var _muicss2 = _interopRequireDefault(_muicss);

	var _GoalDetails = __webpack_require__(21);

	var _GoalDetails2 = _interopRequireDefault(_GoalDetails);

	var _reactModal = __webpack_require__(25);

	var _reactModal2 = _interopRequireDefault(_reactModal);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GoalsGrid = function (_Component) {
	  _inherits(GoalsGrid, _Component);

	  function GoalsGrid(props) {
	    _classCallCheck(this, GoalsGrid);

	    var _this = _possibleConstructorReturn(this, (GoalsGrid.__proto__ || Object.getPrototypeOf(GoalsGrid)).call(this, props));

	    _this.state = {
	      goal: props.goal,
	      modalIsOpen: false
	    };
	    return _this;
	  }

	  _createClass(GoalsGrid, [{
	    key: 'mapLabels',
	    value: function mapLabels() {
	      var goalLabels = this.state.goal.labels;

	      return goalLabels.map(function (label, index) {
	        return _react2.default.createElement(
	          _button2.default,
	          { key: index, style: { backgroundColor: '#' + label.color } },
	          label.name
	        );
	      });
	    }
	  }, {
	    key: 'openModal',
	    value: function openModal() {
	      this.setState({ modalIsOpen: true });
	    }
	  }, {
	    key: 'closeModal',
	    value: function closeModal() {
	      this.setState({ modalIsOpen: false });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var goal = this.state.goal;
	      var modalStyles = {
	        width: '1000px',
	        height: '800px',
	        margin: '100px auto',
	        backgroundColor: '#fff'
	      };

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _reactModal2.default,
	          {
	            style: modalStyles,
	            isOpen: this.state.modalIsOpen,
	            onRequestClose: function onRequestClose() {
	              return _this2.closeModal();
	            },
	            contentLabel: 'Example Modal'
	          },
	          _react2.default.createElement(_GoalDetails2.default, { closeModal: function closeModal() {
	              return _this2.closeModal();
	            }, goal: this.state.goal })
	        ),
	        _react2.default.createElement(
	          _col2.default,
	          { md: '4' },
	          _react2.default.createElement(
	            _panel2.default,
	            null,
	            _react2.default.createElement(
	              'div',
	              { className: 'mui--text-center' },
	              _react2.default.createElement(
	                'div',
	                { className: 'mui--text-display5' },
	                _react2.default.createElement(
	                  'strong',
	                  null,
	                  goal.title,
	                  ' #',
	                  goal.number
	                )
	              )
	            ),
	            _react2.default.createElement(
	              _container2.default,
	              { fluid: true },
	              this.mapLabels()
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'mui--text-center' },
	              _react2.default.createElement(
	                'div',
	                null,
	                'Written by: ',
	                goal.user.login
	              )
	            ),
	            _react2.default.createElement(
	              _col2.default,
	              { md: '4' },
	              goal.milestone ? goal.milestone.title : null
	            ),
	            _react2.default.createElement(
	              _col2.default,
	              { md: '2', 'md-offset': '6' },
	              _react2.default.createElement(
	                'a',
	                { onClick: function onClick() {
	                    return _this2.openModal();
	                  } },
	                'Details'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return GoalsGrid;
	}(_react.Component);

	exports.default = GoalsGrid;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("muicss/lib/react/col");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("muicss/lib/react/panel");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("muicss/lib/react/button");

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("muicss/lib/react/container");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("muicss");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _button = __webpack_require__(18);

	var _button2 = _interopRequireDefault(_button);

	var _showdown = __webpack_require__(22);

	var _Comment = __webpack_require__(23);

	var _Comment2 = _interopRequireDefault(_Comment);

	var _fetch_method = __webpack_require__(24);

	var _fetch_method2 = _interopRequireDefault(_fetch_method);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var converter = new _showdown.Converter();

	var GoalDetails = function (_Component) {
	  _inherits(GoalDetails, _Component);

	  function GoalDetails(props) {
	    _classCallCheck(this, GoalDetails);

	    var _this = _possibleConstructorReturn(this, (GoalDetails.__proto__ || Object.getPrototypeOf(GoalDetails)).call(this, props));

	    _this.state = {
	      goal: props.goal,
	      comments: null
	    };
	    return _this;
	  }

	  _createClass(GoalDetails, [{
	    key: 'mapLabels',
	    value: function mapLabels() {
	      var goalLabels = this.state.goal.labels;

	      return goalLabels.map(function (label, index) {
	        return _react2.default.createElement(
	          _button2.default,
	          { key: index, style: { backgroundColor: '#' + label.color } },
	          label.name
	        );
	      });
	    }
	  }, {
	    key: 'fetchComments',
	    value: function fetchComments() {
	      var _this2 = this;

	      var url = '/api/v1/comments/' + this.state.goal.number;
	      var callback = function callback(comments) {
	        return _this2.setState({ comments: JSON.parse(comments) });
	      };

	      return (0, _fetch_method2.default)('GET', url, null, callback);
	    }
	  }, {
	    key: 'renderComments',
	    value: function renderComments() {
	      var goalComments = this.state.comments;
	      return goalComments.map(function (comment, index) {
	        return _react2.default.createElement(_Comment2.default, { key: index, comment: comment });
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      if (!this.state.comments) this.fetchComments();
	      var comments = this.state.comments ? this.renderComments() : null;

	      var goal = this.state.goal;
	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          'div',
	          { className: 'mui--text-right', onClick: this.props.closeModal },
	          'X'
	        ),
	        _react2.default.createElement(
	          'div',
	          { style: { float: 'right', margin: '20px', marginRight: '-5px' } },
	          _react2.default.createElement('img', { style: { borderRadius: "2px" }, src: goal.user.avatar_url, height: '50px', width: '50px' })
	        ),
	        _react2.default.createElement(
	          'h1',
	          null,
	          goal.title,
	          ' #',
	          goal.number
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          goal.user.login,
	          ' created this goal ',
	          goal.from_now
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          goal.milestone ? goal.milestone.title : null
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          this.mapLabels()
	        ),
	        _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: converter.makeHtml(this.state.goal.body) } }),
	        _react2.default.createElement(
	          'h2',
	          null,
	          'Comments'
	        ),
	        _react2.default.createElement('hr', null),
	        comments
	      );
	    }
	  }]);

	  return GoalDetails;
	}(_react.Component);

	exports.default = GoalDetails;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("showdown");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _panel = __webpack_require__(17);

	var _panel2 = _interopRequireDefault(_panel);

	var _showdown = __webpack_require__(22);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var converter = new _showdown.Converter();

	var Comment = function (_Component) {
	  _inherits(Comment, _Component);

	  function Comment(props) {
	    _classCallCheck(this, Comment);

	    var _this = _possibleConstructorReturn(this, (Comment.__proto__ || Object.getPrototypeOf(Comment)).call(this, props));

	    _this.state = {
	      comment: props.comment
	    };
	    return _this;
	  }

	  _createClass(Comment, [{
	    key: 'render',
	    value: function render() {
	      var comment = this.state.comment;

	      return _react2.default.createElement(
	        _panel2.default,
	        null,
	        _react2.default.createElement(
	          'div',
	          { style: { float: 'right' } },
	          _react2.default.createElement('img', { style: { borderRadius: '5px' }, src: comment.user.avatar_url, height: '50px', width: '50px' })
	        ),
	        _react2.default.createElement(
	          'div',
	          null,
	          comment.user.login,
	          ' commented ',
	          comment.from_now
	        ),
	        _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: converter.makeHtml(comment.body) } })
	      );
	    }
	  }]);

	  return Comment;
	}(_react.Component);

	exports.default = Comment;

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (method, path, values, callback) {
	  var myHeaders = new Headers();
	  myHeaders.append('Content-Type', 'application/json');

	  var options = {
	    method: method,
	    headers: myHeaders,
	    mode: 'cors',
	    cache: 'default',
	    credentials: 'same-origin'
	  };

	  if (values) {
	    options.body = JSON.stringify(values);
	  }

	  return fetch(path, options).then(function (response) {
	    return response.json();
	  }).then(callback);
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = require("react-modal");

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = require("muicss/react");

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = require("muicss/lib/react/row");

/***/ }
/******/ ]);