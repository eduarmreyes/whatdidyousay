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
		idElement: "Q1",
		question: "What is the first person of the pronound?",
		answeres: {
			first: {
				text: "I",
				correct: true,
				target: "#Q1",
				next: "#Q2"
			},
			second: {
				text: "You",
				correct: false
			}
		},
		correctAnswer: 1
	},
	{
		idElement: "Q2",
		question: "How many WH-questions are?",
		answeres: {
			first: {
				text: "8",
				correct: false
			},
			second: {
				text: "9",
				correct: true,
				target: "#Q2",
				next: "#Q3"
			}
		},
		correctAnswer: 1
	},
	{
		idElement: "Q3",
		question: "Select the correct preposition inside parenthesis: I'm working (to/at) McDonald's",
		answeres: {
			first: {
				text: "to",
				correct: true,
				target: "#Q3",
				next: "#Q4"
			},
			second: {
				text: "at",
				correct: false
			}
		},
		correctAnswer: 1
	},
	{
		idElement: "Q4",
		question: "Do you like this game?",
		answeres: {
			first: {
				text: "Yes",
				correct: true,
				target: "#Q4",
				next: "#Q5"
			},
			second: {
				text: "No",
				correct: false
			}
		},
		correctAnswer: 1
	},
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
