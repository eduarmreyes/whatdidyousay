/**
* whatdidyousay Module
*
* Dashboard Module
*/
var aStatBoxes = [
	{
		bg_color: "aqua",
		stat_number: "150",
		name: "New Orders",
		icon: "ion ion-bag",
		url: "#"
	},
	{
		bg_color: "green",
		stat_number: "85%",
		name: "Bounce Rate",
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
(function() {
	var app = angular.module('whatdidyousay', []);

	app.controller("StatBoxesCtrl", function() {
		this.statBoxes = aStatBoxes;
	});
})();
