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
var aQuestions = [
	{
		question: "What is the first person of the pronound",
		answeres: {
			first: "I",
			second: "You"
		},
		correctAnswer: 1
	}
];
(function() {
	var app = angular.module("whatdidyousay", []);

	app.controller("StatBoxesCtrl", function() {
		this.statBoxes = aStatBoxes;
	});

	app.controller("QuestionsCtrl", function() {
		this.questions = aQuestions;
	});
})();
