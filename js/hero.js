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

	var strengthList = "";
	for (var i = 0; i < strength.length; i++) {
		var imageSrc = "img/hero/" + strength[i].Hero + ".png";
		strengthList += "<div class='herobox'>";
		strengthList += "<img id='#" + strength[i].Name + "' src='" + imageSrc + "' />";
		strengthList += "</div>";
	}
	$("#strength").html(strengthList);

	var agilityList = "";
	for (var i = 0; i < agility.length; i++) {
		var imageSrc = "img/hero/" + agility[i].Hero + ".png";
		agilityList += "<div class='herobox'>";
		agilityList += "<img id='#" + agility[i].Name + "' src='" + imageSrc + "' />";
		agilityList += "</div>";
	}
	$("#agility").html(agilityList);

	var intelligenceList = "";
	for (var i = 0; i < intelligence.length; i++) {
		var imageSrc = "img/hero/" + intelligence[i].Hero + ".png";
		intelligenceList += "<div class='herobox'>";
		intelligenceList += "<img id='#" + intelligence[i].Name + "' src='" + imageSrc + "' />";
		intelligenceList += "</div>";
	}
	$("#intelligence").html(intelligenceList);

	var appearMax = d3.max(data.map(function(d){
		return parseInt(d.PTimes);
	}));
	
	var xAppearScale = d3.scale.linear()
					.domain([0, appearMax])
					.range([0, width_1 - padding.left - padding.right]);

	var yWinScale = d3.scale.linear()
					.domain([0, 1])
					.range([height_1 - padding.top - padding.bottom, 0]);

	var xAppearAxis = d3.svg.axis()
					.scale(xAppearScale)
					.orient("bottom");

	var yWinAxis = d3.svg.axis()
					.scale(yWinScale)
					.orient("left");

	var div = d3.select("body").append("div")	
    		.attr("class", "tooltip")				
    		.style("opacity", 0);

	// var tip = d3.tip()
	//   .attr('class', 'd3-tip')
	//   .offset([-10, 0])
	//   .html(function(d) {
	//     return "<strong>Name:</strong> <span style='color:red'>name</span>";
	// });

	var lineRange = 5 / 56 * (width_1 - padding.left - padding.right);
	var lineHeightRange = (height_1 - padding.top - padding.bottom) / 10;

	var lineHeight = height_1 - padding.top - padding.bottom;
	var lineWidth = width_1 - padding.right - padding.left;

	var linePoints = [lineRange, lineRange * 2, lineRange * 3, lineRange * 4, lineRange * 5, lineRange * 6, lineRange * 7, lineRange * 8, lineRange * 9, lineRange * 10, lineRange * 11, width_1 - padding.left - padding.right];
	var linePoints_2 = [0, lineHeightRange, lineHeightRange * 2, lineHeightRange * 3, lineHeightRange * 4, lineHeightRange * 5, lineHeightRange * 6, lineHeightRange * 7, lineHeightRange * 8, lineHeightRange * 9];

	var lines = winRateSvg.selectAll(".y Lines")
			.data(linePoints)
			.enter()
			.append("line")
				.attr("class", "y Lines")
				.attr("transform", "translate(" + padding.left + "," + padding.top + ")")
				.attr("x1", function(d) {
					return d;
				})
				.attr("y1", 0)
				.attr("x2", function(d){
					return d;
				})
				.attr("y2", lineHeight)
				.style("stroke", "lightgrey");

	var lines_2 = winRateSvg.selectAll(".x Lines")
			.data(linePoints_2)
			.enter()
			.append("line")
				.attr("class", "x Lines")
				.attr("transform", "translate(" + padding.left + "," + padding.top + ")")
				.attr("x1", 0)
				.attr("y1", function(d){
					return d;
				})
				.attr("x2", lineWidth)
				.attr("y2", function(d){
					return d;
				})
				.style("stroke", "lightgrey");

	var points = winRateSvg.selectAll(".HeroPoints")
				.data(data)
				.enter()
				.append("circle")
					.attr("class", "HeroPoints")
					.attr("transform", "translate(" + padding.left + "," + padding.top + ")")
					.attr("cx", function(d){
						return xAppearScale(d.PTimes);
					})
					.attr("cy", function(d){
						return yWinScale(d.WinRate);
					})
					.attr("r", 7)
					.attr("fill", "steelblue")
				.on("mouseover", function(d) {		
		            div.transition()		
		                .duration(200)		
		                .style("opacity", .9);		
		            div	.html("<img float='left' width='120' height='auto' src='img/hero/" + d.Hero + ".png' />"
		            			+ "<br>"
		            			+ "<p><strong>Hero: " + d.Name + "</strong></p>"
		            			+ "<p><strong>Appearance: " + d.Games + "</strong></p>"
		            			+ "<p><strong>Win: " + d.W + "</strong></p>"
		            			+ "<p><strong>Lose: " + d.L + "</strong></p>"
		            			+ "<p><strong>Win Rate: " + d.WinRate * 100 + "%</strong></p>"
		            		)	
		                .style("left", (d3.event.pageX + 10) + "px")		
		                .style("top", (d3.event.pageY - 20) + "px");	
		        })
		        .on("mouseout", function(d) {		
            		div.transition()		
                		.duration(500)		
                		.style("opacity", 0);	
        		});		

	winRateSvg
		.append("g")
	 		.attr("class", "axis")
	 		.attr("transform", "translate(" + padding.left + "," + padding.top + ")")
	 		.call(yWinAxis);
	 	// .append("text")
   //     		.attr("transform", "rotate(90)")
   //     		.attr("y", 6)
   //     		.attr("dy", ".71em")
   //     		.style("text-anchor", "center")
   //     		.text("Win Rate");

    winRateSvg
    	.append("g")
       		.attr("class", "axis")
       		.attr("transform", "translate(" + padding.left + "," + (height_1 - padding.bottom) + ")")
       		.call(xAppearAxis);

    // winRateSvg
    // 	.append("text")
    // 		.attr("transform", "translate(" + padding.left / 2 + "," + (padding.top + height_1 / 2) + ")")
    // 		.attr("transform", "rotate(270)")
    // 		.attr("x", 200)
    // 		.attr("y", 200)
    // 		.attr("stroke-width", 2)
    // 		.text("Win Rate");

    var xBpScale = d3.scale.linear()
    			.rangeRound([0, width_2 - padding_2.left - padding_2.right]);

    var yHeroScale = d3.scale.ordinal()
    			.rangeRoundBands([0, height_2 - padding_2.top - padding_2.bottom], .1);

    var color = d3.scale.ordinal()
    			.range(["#43BFC7", "#C74C44"]);

    var xBpAxis = d3.svg.axis()
    			.scale(xBpScale)
    			.orient("bottom");

    var yHeroAxis = d3.svg.axis()
    			.scale(yHeroScale)
    			.orient("left");

    color.domain(d3.keys(data[0]).filter(function(key) {
    	return (key === "PTimes" || key === "BTimes");
    }));

    data.forEach(function(d){
    	var y0 = 0;
    	d.bp = color.domain().map(function(name){
    		return {
    			name: name,
    			y0: y0,
    			y1: y0 += +d[name]
    		};
    	});
    	d.total = d.bp[d.bp.length - 1].y1;
    });

    yHeroScale.domain(data.map(function(d){
    	return d.Name;
    }));

    xBpScale.domain([0, d3.max(data, function(d){
    	return d.total;
    })]);

    var bp = bpSvg.selectAll(".HeroBp")
    		.data(data)
    		.enter().append("g")
    		.attr("class", "g")
    		.attr("transform", function(d){
    			return "translate(" + padding_2.left + "," + (padding_2.top + yHeroScale(d.Name)) + ")";
    		});

    bp.selectAll("rect")
    	.data(function(d){
    		return d.bp;
    	})
    	.enter()
    	.append("rect")
    	.attr("height", yHeroScale.rangeBand())
    	.attr("width", function(d){
    		return xBpScale(d.y1) - xBpScale(d.y0);
    	})
    	.attr("x", function(d){
    		return xBpScale(d.y0);
    	})
    	.style("fill", function(d){
    		return color(d.name);
    	});

    bpSvg.append("g")
    	.attr("class", "yhero axis")
    	.attr("transform", "translate(" + padding_2.left + "," + padding_2.top + ")")
    	.call(yHeroAxis);

    bpSvg.append("g")
    	.attr("class", "xhero axis")
    	.attr("transform", "translate(" + padding_2.left + "," + (height_2 - padding_2.bottom) + ")")
    	.call(xBpAxis);




	// var xScale = d3.scale.linear()
	// 				.domain([0, 1])
	// 				.range([0, width - padding.left - padding.right]);

	// var yScale = d3.scale.ordinal()
	// 				.domain(d3.range(data.length))
	// 				.rangeRoundBands([0, height - padding.top - padding.bottom]);

	// var rectPadding = 4;

	// var winRateRects = svg.selectAll(".WinRateRects")
	// 			.data(data)
	// 			.enter()
	// 			.append("rect")
	// 			.attr("class", "WinRateRects")
	// 			.attr("x", 0)
	// 			.attr("y", function(d,i){
	// 				return yScale.rangeBand() * i;
	// 			})
	// 			.attr("width", function(d, i){
	// 				return xScale(d.WinRate);
	// 			})
	// 			.attr("height", yScale.rangeBand() - rectPadding);

});

var color = [ "#ffffb2", "#fee391", "#fec44f", "#fe9929", "#ec7014", "#cc4c02", "#8c2d04", "#3A0A00" ];

var colorScale = d3.scale.linear()
		.domain([0, 0.14, 0.29, 0.43, 0.57, 0.71, 0.86, 1])
		.range(color);

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