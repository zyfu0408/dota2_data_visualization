(function(){

	var app = angular.module('hero', []);

	app.controller('TabController', function(){
		this.tab = 1;

		this.setTab = function(setTab){
			this.tab = setTab;
		};

		this.selectedTab = function(selectedTab){
			return this.tab === selectedTab;
		}

	});
})();


d3.csv("data/hero.csv", function(error, data){
	data = data.sort(compareByName);
	console.log(data);

	var strength = [];
	var agility = [];
	var intelligence = [];

	for (var i = 0; i < data.length; i++) {
		if (data[i].HeroType === "S") {
			strength.push(data[i]);
		} else if (data[i].HeroType === "A") {
			agility.push(data[i]);
		} else {
			intelligence.push(data[i]);
		}
	}

	console.log(strength);
	console.log(agility);
	console.log(intelligence); 

	var strengthList = "";
	for (var i = 0; i < strength.length; i++) {
		var imageSrc = "img/hero/" + strength[i].Hero + ".png";
		strengthList += "<div class='herobox'>";
		strengthList += "<img src='" + imageSrc + "' />";
		strengthList += "</div>";
	}
	$("#strength").html(strengthList);

	var agilityList = "";
	for (var i = 0; i < agility.length; i++) {
		var imageSrc = "img/hero/" + agility[i].Hero + ".png";
		agilityList += "<div class='herobox'>";
		agilityList += "<img src='" + imageSrc + "' />";
		agilityList += "</div>";
	}
	$("#agility").html(agilityList);

	var intelligenceList = "";
	for (var i = 0; i < intelligence.length; i++) {
		var imageSrc = "img/hero/" + intelligence[i].Hero + ".png";
		intelligenceList += "<div class='herobox'>";
		intelligenceList += "<img src='" + imageSrc + "' />";
		intelligenceList += "</div>";
	}
	$("#intelligence").html(intelligenceList);



	// for (var i = 0; i < data.length; i++) {
	// 	var imageSrc = "img/hero/" + data[i].Hero + ".png";
	// 	herolist += "<div class='herobox'>";
	// 	herolist += "<img class='img-circle' src='" + imageSrc + "' />";
	// 	herolist += "</div>";
	// }
	// $("#herolist").html(herolist);
	
});


function compareByName(a, b) {
	if (a.Name < b.Name) {
		return -1;
	}
	if (a.Name > b.Name) {
		return 1;
	}
	return 0;
}

function compareByBpRate(a, b) {
	if (a.BPRates > b.BPRates) {
		return -1;
	}
	if (a.BPRates < b.BPRates) {
		return 1;
	}
	return 0;
}

function compareByWinRate(a, b) {
	if (a.WinRate > b.WinRate) {
		return -1;
	}
	if (a.WinRate < b.WinRate) {
		return 1;
	}
	return 0;
}