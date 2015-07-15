/**
* whatdidyousay Module
*
* Dashboard Module
*/
var aStatBoxes = [
	{
		bg_color: "aqua",
		stat_number: "150",
		name: "Users playing",
		icon: "ion ion-game-controller-a",
		url: "#"
	},
	{
		bg_color: "green",
		stat_number: "85%",
		name: "Questions answered",
		icon: "ion ion-stats-bars",
		url: "#"
	},
	{
		bg_color: "yellow",
		stat_number: "44",
		name: "User Registrations",
		icon: "ion ion-person-add",
		url: "#"
	},
	{
		bg_color: "red",
		stat_number: "65",
		name: "Unique Visitors",
		icon: "ion ion-pie-graph",
		url: "#"
	}
];
var aUsersStats = [
	{
		user_name: "Eduardo Mejía",
		user_stat: 15
	},
	{
		user_name: "Jacobito Clará",
		user_stat: 7
	},
	{
		user_name: "John Lenon",
		user_stat: 3
	},
	{
		user_name: "Carlos Aranzamendi",
		user_stat: 1
	},
	{
		user_name: "Dorothi Eldivar",
		user_stat: 0
	}
];
(function() {
	var app = angular.module("whatdidyousay", []);

	// Constants
	app.constant("AUTH_EVENTS", {
		loginSuccess: "auth-login-success",
		loginFailed: "auth-login-failed",
		logoutSuccess: "auth-logout-success",
		sessionTimeout: "auth-session-timeout",
		notAuthenticated: "auth-not-authenticated",
		notAuthorized: "auth-not-authorized"
	});

	// Constants
	app.constant("USER_ROLES", {
		all: "*",
		admin: "admin",
		editor: "editor",
		guest: "guest"
	});

	// AuthService factory
	app.factory("AuthService", function ($http, Session) {
		var authService = {};

		authService.login = function (credentials) {
			var aData = JSON.stringify(credentials);
			return $http
			.post("RESTWhatdidyousay/login.php", aData)
			.then(function (res) {
				Session.create(res.data[0].user_id, res.data[0].user_full_name, res.data[0].user_username);
				return res.data;
			});
		};

		authService.isAuthenticated = function () {
			console.log(Session);
			return !!Session.userUsername;
		};

		authService.isAuthorized = function (authorizedRoles) {
			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}
			return (authService.isAuthenticated());
		};

		return authService;
	});

	app.service("Session", function () {
		this.create = function (sessionId, userFullName, userUsername) {
			this.id = sessionId;
			this.userFullName = userFullName;
			this.userUsername = userUsername;
		};
		this.destroy = function () {
			this.id = null;
			this.userFullName = null;
			this.userUsername = null;
		};
		return this;
	});

	app.controller("StatBoxesCtrl", function() {
		this.statBoxes = aStatBoxes;
	});

	app.controller("GameCtrl", function($scope, $http, USER_ROLES, AuthService) {
		var aData = {
			get: "true",
			random: "true"
		};
		var aQuestions = [];
		$http
		.post("RESTWhatdidyousay/questions.php", JSON.stringify(aData))
		.then(function (res) {
			aQuestions = angular.forEach(res.data.records, function (value, i) {
				var iNext = i + 1;
				if (value.answer_1_correct === "1") {
					var iCorrectAnswer = 1;
				} else{
					var iCorrectAnswer = 2;
				}
				$scope.questions.push({
					idElement: "Q" + i,
					question: value.qes_question,
					answeres: {
						first: {
							text: value.answer_1,
							correct: value.answer_1_correct,
							target: "#Q" + i,
							next: "#Q" + iNext
						},
						second: {
							text: value.answer_2,
							correct: value.answer_2_correct,
							target: "#Q" + i,
							next: "#Q" + iNext
						}
					},
					correctAnswer: iCorrectAnswer
				});
			});
		});
		$scope.questions = aQuestions;
		// Scope functions
		// fn to get those correct answered questions, :P
		$scope.sendTrivia = function (aAnsweres) {
			aAnsweres.user = $scope.currentUser
			$http
			.post("RESTWhatdidyousay/trivia.php", JSON.stringify(aAnsweres))
			.then(function (res) {
				var aJsonData = res.data;
				if (aJsonData.message_list.length === 0) {
					$scope.setCurrentUser(aJsonData.records);
				} else{
					angular.forEach(aJsonData.message_list, function (value, i) {
						fnNotify("Error", value, "error", "fa fa-warning");
					});
				}
			});
		}
	});

	app.controller("UsersStatsCtrl", function() {
		this.usersStats = aUsersStats;
	});

	app.controller("LoginCtrl", function($scope, $rootScope, AUTH_EVENTS, AuthService) {
		$scope.credentials = {
			username: "",
			password: ""
		};
		$scope.login = function(credentials) {
			AuthService.login(credentials).then(function(user) {
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				$scope.setCurrentUser(user);
				$("#modal1").modal("hide");
			}, function() {
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			});
		}
	});

	app.controller("ApplicationCtrl", function ($scope, USER_ROLES, AuthService) {
		$scope.currentUser = null;
		$scope.userRoles = USER_ROLES;
		$scope.isAuthenticated = AuthService.isAuthenticated;
		$scope.isAuthorized = AuthService.isAuthorized;

		$scope.setCurrentUser = function (user) {
			console.log(user);
			if (typeof user.message_list !== "undefined") {
				fnNotify("Error", user.message_list, "error", "fa fa-warning");
			} else{
				$scope.currentUser = user[0];
			}
		};
	});

})();
