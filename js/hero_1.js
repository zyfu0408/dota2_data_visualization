var strength = [];
var agility = [];
var intelligence = [];
var heroData = [];

d3.csv("data/hero.csv", function(error, data){

	data = data.sort(compareByName);

	for (var i = 0; i < data.length; i++) {

		if (data[i].HeroType === "S") {
			strength.push(data[i]);
		} else if (data[i].HeroType === "A") {
			agility.push(data[i]);
		} else {
			intelligence.push(data[i]);
		}
		heroData.push(data[i]);
	}

	drawHero();
	drawOverlay();
	drawHeroPanel();
	drawWinLosePie();
	drawWinRateChart();

});

function drawHero() {

	var strengthList = "";
	for (var i = 0; i < strength.length; i++) {
		var imageSrc = "img/hero/" + strength[i].Hero + ".png";
		strengthList += "<div class='herobox'>";
		strengthList += "<img id='" + strength[i].Hero + "' src='" + imageSrc + "' />";
		strengthList += "</div>";
	}
	$(".strength").html(strengthList);

	var agilityList = "";
	for (var i = 0; i < agility.length; i++) {
		var imageSrc = "img/hero/" + agility[i].Hero + ".png";
		agilityList += "<div class='herobox'>";
		agilityList += "<img id='" + agility[i].Hero + "' src='" + imageSrc + "' />";
		agilityList += "</div>";
	}
	$(".agility").html(agilityList);

	var intelligenceList = "";
	for (var i = 0; i < intelligence.length; i++) {
		var imageSrc = "img/hero/" + intelligence[i].Hero + ".png";
		intelligenceList += "<div class='herobox'>";
		intelligenceList += "<img id='" + intelligence[i].Hero + "' src='" + imageSrc + "' />";
		intelligenceList += "</div>";
	}
	$(".intelligence").html(intelligenceList);
}


function prepareToDrawHeroPanel() {
	var selection = d3.select("#heroPanel");

	width_well = selection[0][0].clientWidth * 0.67;
	height_well = 15;

	gpmMax = d3.max(heroData.map(function(d){
		return parseInt(d.GPM);
	}));

	xpmMax = d3.max(heroData.map(function(d){
		return parseInt(d.XPM);
	}));

	kdaMax = d3.max(heroData.map(function(d){
		return parseInt(d.KDA);
	}));

	damageMax = d3.max(heroData.map(function(d){
		return parseInt(d.HeroDamage);
	}));
}

function drawPenelContent(panelContent, hero, name, gpm, xpm, kda, damage) {
	panelContent += "<div id='" + hero + "Panel' class='panel panel-default'>";
	panelContent += "<div class='panel-body'>";
	panelContent += "<h4 style='color:white'><img postion='relative' src='img/hero/" + hero + ".png' /> <span class='heroName'><strong>" + name + "</strong><span></h4>";
	panelContent += "<div id='gpm' class='well well-sm list-group'>";
	panelContent += "<h4 class='list-group-item-heading'>GPM</h4>";
	panelContent += "<p class='list-group-item-text'><span class='lead'>" + gpm + "</span> <em>gold per minute</em></p>";
	panelContent += "<svg height='" + height_well + "' width='" + width_well + "'>";
	panelContent += "<line x1='0' y1='8' x2='" + parseFloat(gpm) / gpmMax * width_well + "' y2='8' style='stroke:#e7ba52;stroke-width:4' />"
	panelContent += "</svg>";
	panelContent += "</div>";
	panelContent += "<div id='xpm' class='well well-sm list-group'>";
	panelContent += "<h4 class='list-group-item-heading'>XPM</h4>";
	panelContent += "<p class='list-group-item-text'><span class='lead'>" + xpm + "</span> <em>experience per minute</em></p>";
	panelContent += "<svg height='" + height_well + "' width='" + width_well + "'>";
	panelContent += "<line x1='0' y1='8' x2='" + parseFloat(xpm) / xpmMax * width_well + "' y2='8' style='stroke:#1f77b4;stroke-width:4' />"
	panelContent += "</svg></div>";
	panelContent += "<div id='kda' class='well well-sm list-group'>";
	panelContent += "<h4 class='list-group-item-heading'>KDA</h4>";
	panelContent += "<p class='list-group-item-text'><span class='lead'>" + kda + "</span> <em>(kills + assists) / deaths</em></p>";
	panelContent += "<svg height='" + height_well + "' width='" + width_well + "'>";
	panelContent += "<line x1='0' y1='8' x2='" + parseFloat(kda) / kdaMax * width_well + "' y2='8' style='stroke:#2ca02c;stroke-width:4' />"
	panelContent += "</svg></div>";
	panelContent += "<div id='damage' class='well well-sm list-group'>";
	panelContent += "<h4 class='list-group-item-heading'>Hero Damage</h4>";
	panelContent += "<p class='list-group-item-text'><span class='lead'>" + damage + "</span> <em>damage per game</em></p>";
	panelContent += "<svg height='" + height_well + "' width='" + width_well + "'>";
	panelContent += "<line x1='0' y1='8' x2='" + parseFloat(damage) / damageMax * width_well + "' y2='8' style='stroke:#d62728;stroke-width:4' />"
	panelContent += "</svg>";
	panelContent += "</div></div>";

	return panelContent;
}

function drawHeroPanel() {
	$(".herolist img").click(function(){
		prepareToDrawHeroPanel();

		for (var i = 0; i < heroData.length; i++) {
			if ($(this).attr("id") === heroData[i].Hero) {
				heroPanel = "";
				heroPanel = drawPenelContent(heroPanel, heroData[i].Hero, heroData[i].Name, heroData[i].GPM, heroData[i].XPM, heroData[i].KDA, heroData[i].HeroDamage);
				$("#heroPanel").html(heroPanel);
				break;
			}
		}
	});
}


function drawHeroPanelByPoint() {
	prepareToDrawHeroPanel();

	newHeroPanel = "";	
	newHeroPanel = drawPenelContent(newHeroPanel, clickedPoint, clickedName, clickedGPM, clickedXPM, clickedKDA, clickedDamage);
}

function preparedToDrawPie() {
	var selection = d3.select("#winlose"); 
	
	width_winlose = selection[0][0].clientWidth * 0.92;
	height_winlose = width_winlose * 1.25;

	padding_winlose = {
    	top: height_winlose * 0.16,
    	right: width_winlose / 20,
    	bottom: height_winlose / 25,
    	left: width_winlose / 20
  	};

  	r = (width_winlose - padding_winlose.right * 2) / 2;

  	fontsize = width_winlose / 24 + "px";

  	pieColor = ["#1f77b4", "#ff9896"];

  	winloseSvg = d3.select("#winlosePie")
      .append("svg")
        .attr("width", width_winlose)
        .attr("height", height_winlose);

	winloseArray = [];
}

function drawPie() {
	var pie = d3.layout.pie().sort(null);
	var piedata = pie(winloseArray);

	var arc = d3.svg.arc()
				.outerRadius(r);

	var arcs = winloseSvg.selectAll("g")
				.data(piedata)
				.enter()
				.append("g")
				.attr("transform", "translate(" + width_winlose / 2 + "," + (100 + width_winlose / 2) + ")");

	arcs.append("path")
		.attr("fill", function(d, i){
			return pieColor[i];
		})
		.transition()
			.ease("linear")
			.duration(1000)
			.attrTween("d", tweenPie)
	  	.transition()
		    .ease("linear")
		    .duration(750)
		    .attrTween("d", tweenDonut);

	var arcTemp = d3.svg.arc()
				.outerRadius(r)
				.innerRadius(r * .5);

	var arcsTemp = winloseSvg.selectAll("g")
				.data(piedata)
				.enter()
				.append("g")
				.attr("transform", "translate(" + width_winlose / 2 + "," + (100 + width_winlose / 2) + ")");

	arcsTemp.append("path")
		.attr("fill", function(d, i){
			return pieColor[i];
		})
		.attr("d",function(d){
			return arcTemp(d);
		})
		.style("opacity", "0");

	arcsTemp.append("text")
		.attr("transform",function(d){
			xText = arcTemp.centroid(d)[0];
			yText = arcTemp.centroid(d)[1];
			return;
		});

	arcs.append("text")
		.transition()
			.delay(1700)
			.ease("exp")
			.duration(500)
		.attr("transform",function(d){
			xText = arcTemp.centroid(d)[0];
			yText = arcTemp.centroid(d)[1];
			return "translate(" + xText + "," + yText + ")";
		})
		.attr("text-anchor","middle")
		.text(function(d, i){
			if (winloseArray[i] != '0') {
					return winloseArray[i];
				}
			})
		.style("fill", "white")
		.style("font-size", "24px");


	function tweenPie(b) {
		b.innerRadius = 0;
			var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
			return function(t) { return arc(i(t)); };
	}

	function tweenDonut(b) {
			b.innerRadius = r * .5;
			var i = d3.interpolate({innerRadius: 0}, b);
			return function(t) { return arc(i(t)); };
	}

	var rectsArray = [
		{
			x: width_winlose * 0.9,
			y: height_winlose * 0.06,
			rectWidth: width_winlose / 20,
			rectHeight: width_winlose / 20
		},
		{
			x: width_winlose * 0.9,
			y: height_winlose * 0.14,
			rectWidth: width_winlose / 20,
			rectHeight: width_winlose / 20
		}
	];

	var winloseTextArray = [
		{
			text: "Win",
			x: width_winlose * 4.09 / 5,
			y: height_winlose * 11 / 125,
		},
		{
			text: "Lose",
			x: width_winlose * 31.7 / 40,
			y: height_winlose * 21 / 125,
		}
	];

	var rects = winloseSvg.selectAll(".MyRects")
				.data(rectsArray)
				.enter()
				.append("rect")
					.attr("class", "Myrects")
					.attr("x", function(d){
						return d.x;
					})
					.attr("y", function(d){
						return d.y;
					})
					.attr("width", function(d){
						return d.rectWidth;
					})
					.attr("height", function(d){
						return d.rectHeight;
					})
					.attr("fill", function(d, i){
						return pieColor[i];
					})

	var winloseText = winloseSvg.selectAll(".MyWinLoseText")
				.data(winloseTextArray)
				.enter()
				.append("text")
					.attr("x", function(d){
						return d.x;
					})
					.attr("y", function(d){
						return d.y;
					})
					.text(function(d){
						return d.text;
					})
					.style("fill", "white")
					.style("font-size", fontsize);	
}


function drawWinLosePie() {
	$(".herolist img").click(function(){

		preparedToDrawPie();

		for (var i = 0; i < heroData.length; i++) {
			if ($(this).attr("id") === heroData[i].Hero) {
				winloseArray.push(heroData[i].W);
				winloseArray.push(heroData[i].L);
				break;
			}
		}
		
		drawPie();
	});	
}

function drawWinLosePieByPoint() {
	preparedToDrawPie();

	winloseArray = [clickedWin, clickedLose];  

	drawPie();  
}

var clickedPoint = "", clickedName = "", clickedGPM = "", clickedXPM = "", clickedKDA = "", clickedDamage = "", clickedWin = "", clickedLose = "";

function prepareToDrawWinRateChart() {
	var selection = d3.select("#winrate"); 
		
	width_winrate = selection[0][0].clientWidth * 0.93;
	height_winrate = width_winrate;

    padding_winrate = {
    	top: height_winrate / 24,
    	right: width_winrate / 25,
    	bottom: height_winrate / 13,
    	left: width_winrate / 10
  	};

	winrateSvg = d3.select("#winrateContent")
      .append("svg")
      .attr("class", "MyWinRateSvg")
      .attr("width", width_winrate)
      .attr("height", height_winrate);

	appearMax = d3.max(heroData.map(function(d){
		return parseInt(d.PTimes);
	}));

	xAppearScale = d3.scale.linear()
					.domain([0, appearMax])
					.range([0, width_winrate - padding_winrate.left - padding_winrate.right]);

	yWinScale = d3.scale.linear()
					.domain([0, 1])
					.range([height_winrate - padding_winrate.top - padding_winrate.bottom, 0]);

	xAppearAxis = d3.svg.axis()
					.scale(xAppearScale)
					.orient("bottom");

	yWinAxis = d3.svg.axis()
					.scale(yWinScale)
					.orient("left")
					.ticks(10, "%");

	lineRange = 5 / 56 * (width_winrate - padding_winrate.left - padding_winrate.right);
	lineHeightRange = (height_winrate - padding_winrate.top - padding_winrate.bottom) / 10;

	lineHeight = height_winrate - padding_winrate.top - padding_winrate.bottom;
	lineWidth = width_winrate - padding_winrate.right - padding_winrate.left;

	linePoints = [lineRange, lineRange * 2, lineRange * 3, lineRange * 4, lineRange * 5, lineRange * 6, lineRange * 7, lineRange * 8, lineRange * 9, lineRange * 10, lineRange * 11, width_winrate - padding_winrate.left - padding_winrate.right];
	linePoints_2 = [0, lineHeightRange, lineHeightRange * 2, lineHeightRange * 3, lineHeightRange * 4, lineHeightRange * 5, lineHeightRange * 6, lineHeightRange * 7, lineHeightRange * 8, lineHeightRange * 9];

	lines = winrateSvg.selectAll(".y Lines")
			.data(linePoints)
			.enter()
			.append("line")
				.attr("class", "y Lines")
				.attr("transform", "translate(" + padding_winrate.left + "," + padding_winrate.top + ")")
				.attr("x1", function(d) {
					return d;
				})
				.attr("y1", 0)
				.attr("x2", function(d){
					return d;
				})
				.attr("y2", lineHeight)
				.style("stroke", "white");

	lines_2 = winrateSvg.selectAll(".x Lines")
			.data(linePoints_2)
			.enter()
			.append("line")
				.attr("class", "x Lines")
				.attr("transform", "translate(" + padding_winrate.left + "," + padding_winrate.top + ")")
				.attr("x1", 0)
				.attr("y1", function(d){
					return d;
				})
				.attr("x2", lineWidth)
				.attr("y2", function(d){
					return d;
				})
				.style("stroke", "white");

	tooltip_width = width_winrate * 0.275;
	tooltip_height = tooltip_width * 1.2;
	
	div_selected = d3.select("#winrate").append("div")	
		.attr("class", "selectedTooltip")				
		.style("opacity", 0)
		.style("width", tooltip_width + "px") 
		.style("height", "auto")
		// .style("height", tooltip_height + "px")
		.style("top", width_winrate * 0.26 + "px")
		.style("right", width_winrate * 0.07 + "px");


	div = d3.select("#winrate").append("div")
			.attr("class", "tooltip")
			.style("opacity", 0)
			.style("width", tooltip_width + "px") 
    		.style("height", tooltip_height + "px")
    		.style("top", tooltip_height * 0.895 + "px")
    		.style("right", (tooltip_width * 0.23 + tooltip_width) + "px");

	winrateSvg.append("g")
 		.attr("class", "y axis")
 		.attr("transform", "translate(" + padding_winrate.left + "," + padding_winrate.top + ")")
 		.attr("stroke", "white")
 		.call(yWinAxis);

    winrateSvg.append("g")
   		.attr("class", "x axis")
   		.attr("transform", "translate(" + padding_winrate.left + "," + (height_winrate - padding_winrate.bottom) + ")")
   		.attr("stroke", "white")
   		.call(xAppearAxis);

   	winrateFontSize = width_winrate / 48 + "px";

	winrateSvg.append("text")
		.attr("class", "winrateText")
		.attr("text-anchor", "middle")
		.attr("transform", "translate("+ (padding_winrate.left / 4.8) + "," + (height_winrate / 16) + ")rotate(-90)")
        .text("Win Rate")
        .style("fill", "white")
        .style("font-family", "sans-serif")
        .style("font-size", winrateFontSize);

    winrateSvg.append("text")
    	.attr("class", "winrateText")
        .attr("text-anchor", "middle") 
        .attr("transform", "translate("+ (width_winrate - padding_winrate.left * 0.8) + "," + (height_winrate - padding_winrate.top * 0.35) + ")") 
        .text("Appearances")
        .attr("class", "winrateText")
        .style("fill", "white")
		.style("font-family", "sans-serif")
        .style("font-size", winrateFontSize);


}

function drawPoints(selected) {
	var div = d3.select("body").append("div")	
		.attr("class", "tooltip")				
		.style("opacity", 0);

	var points = winrateSvg.selectAll(".HeroPoints")
		.data(heroData)
		.enter()
		.append("circle")
			.attr("class", "HeroPoints")
			.attr("id", function(d){
				return d.Hero + "Point";
			})
			.attr("transform", "translate(" + padding_winrate.left + "," + padding_winrate.top + ")")
			.attr("cx", function(d){
				return xAppearScale(d.PTimes);
			})
			.attr("cy", function(d){
				return yWinScale(d.WinRate);
			})
			.attr("r", function(d, i){
				if (d.Hero !== selected) {
					return 4;
				} 
			})
			.attr("fill", function(d, i){
				if (d.Hero !== selected) {
					return "#aec7e8";
				}
			})
			.on("mouseover", function(d){
				$("#" + d.Hero + "Point")
					.attr("fill", "yellow")
					.attr("r", 6);

				div.transition()		
		           	.duration(200)		
		            .style("opacity", .8);

		        div.html("<p><strong>" + d.Name + "&nbsp;&nbsp;</strong><img width='80' height='auto' src='img/hero/" + d.Hero + ".png' /></p>"
		        		+ "<p><strong>Win: " +  d.W + "&nbsp;&nbsp;&nbsp;<strong>Lose: " +  d.L + "</p>"
		        		+ "<p><strong>Win Rate: &nbsp;&nbsp;&nbsp;" + (parseFloat(d.WinRate) * 100).toFixed(1) + "%</p>"
		        	)
		        	.style("left", (d3.event.pageX - 130) + "px")		
		            .style("top", (d3.event.pageY + 20) + "px");	
			})
			.on("mouseout", function(d){
				$("#" + d.Hero + "Point")
					.attr("fill", "#aec7e8")
					.attr("r", 4);

				div.transition()		
                	.duration(200)		
                	.style("opacity", 0);	
			})
			.on("click", function(d){
				div.transition()		
                	.duration(200)		
                	.style("opacity", 0);	

				clickedPoint = d.Hero;
				clickedName = d.Name;
				clickedGPM = d.GPM;
				clickedXPM = d.XPM;
				clickedKDA = d.KDA;
				clickedDamage = d.HeroDamage;
				clickedWin = d.W;
				clickedLose = d.L;
				clickedWinRate = d.WinRate;
				clickedPTimes = d.PTimes;

				console.log(clickedName);
				drawHeroPanelByPoint();
				cleanOverlay();
				$("#heroPanel").html(newHeroPanel);
				newHeroPanel = "";
				drawWinLosePieByPoint();
				drawWinRateChartByPoint();
			})	
}

function drawSelectedPoint(ptimes, winrate, hero, name, win, lose) {
	var selectPoint = winrateSvg.append("circle")
				.attr("transform", "translate(" + padding_winrate.left + "," + padding_winrate.top + ")")
				.attr("cx", xAppearScale(ptimes))
				.attr("cy", yWinScale(winrate))
				.attr("r", 6)
				.attr("fill", "red");

	div_selected.transition()
    		.transition()		
            .duration(2000)
            .ease("linear")		
            .style("opacity", .9);	

    div_selected
    	.html("<img float='left' width='120' height='auto' src='img/hero/" + hero + ".png' />"
			+ "<br>"
			+ "<p><strong>Hero: " + name + "</strong></p>"
			+ "<p><strong>Appearance: " + ptimes + "</strong></p>"
			+ "<p><strong>Win: " + win + "</strong></p>"
			+ "<p><strong>Lose: " + lose + "</strong></p>"
			+ "<p><strong>Win Rate: " + (parseFloat(winrate) * 100).toFixed(1) + "%</strong></p>"
    )	
}

function drawWinRateChart() {
	$(".herolist img").click(function(){

		prepareToDrawWinRateChart();

		for (var i = 0; i < heroData.length; i++) {
			if ($(this).attr("id") === heroData[i].Hero) {
				id = heroData[i].Hero;
				name = heroData[i].Name;
				selectedX = heroData[i].PTimes;
				selectedY = heroData[i].WinRate;
				winPoint = heroData[i].W;
				losePoint = heroData[i].L;
				break;
			}
		}		

		drawPoints(id);

		drawSelectedPoint(selectedX, selectedY, id, name, winPoint, losePoint);

					// .on("mouseover", function(d) {		
			  //           div.transition()		
			  //               .duration(200)		
			  //               .style("opacity", .9);		
			  //           div.html("<img float='left' width='120' height='auto' src='img/hero/" + d.Hero + ".png' />"
			  //           			+ "<br>"
			  //           			+ "<p><strong>Hero: " + d.Name + "</strong></p>"
			  //           			+ "<p><strong>Appearance: " + d.Games + "</strong></p>"
			  //           			+ "<p><strong>Win: " + d.W + "</strong></p>"
			  //           			+ "<p><strong>Lose: " + d.L + "</strong></p>"
			  //           			+ "<p><strong>Win Rate: " + (parseFloat(d.WinRate) * 100).toFixed(1) + "%</strong></p>"
			  //           		)
		   //      	})
			  //       .on("mouseout", function(d) {		
	    //         		div.transition()		
	    //             		.duration(500)		
	    //             		.style("opacity", 0);	
	    //     		});	
    	
	})

}

function drawWinRateChartByPoint() {
	prepareToDrawWinRateChart();	

	drawPoints(clickedPoint);

	drawSelectedPoint(clickedPTimes, clickedWinRate, clickedPoint, clickedName, clickedWin, clickedLose);
}

function cleanOverlay() {
	$("#heroPanel").empty();
	$("#winlosePie").empty();
	$("#winrateContent").empty();
	$(".selectedTooltip").remove();
}

function drawOverlay() {
	var $overlay = $(
			"<div id='overlay'>" +
				"<img id='closeIcon' src='img/dota_icon/close-button.png'>" +
				"<div class='row overlayContent'>" +
					"<div id='heroPanel' class='col-md-3'></div>" +
					"<div id='winlose' class='col-md-4'>" +
					"<h2 id='winloseTitle' style='color:white'>Win VS Lose</h2>" + 
					"<div id='winlosePie'></div>" + 
					"</div>" +
					"<div id='winrate' class='col-md-5'>" + 
					"<h2 style='color:white' id='winrateTitle'>Win Rate with Appearances</h2>" + 
					"<div id='winrateContent'></div>" +
					"</div>" +
				"</div>" +
			"</div>"
		);

	$("body").append($overlay);
	$(".herolist img").click(function(){
		$overlay.show();

		if (($("#overlay").css("display")) === "block") {
			$("body").css("overflow", "hidden");
		}		
	})

	$("#closeIcon").click(function(){
		$("#winlosePie").empty();
		$("#winrateContent").empty();
		$overlay.hide();
		$("body").css("overflow", "visible");
	})
}

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