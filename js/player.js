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


d3.csv("data/PlayerTradi1.csv", function(error, data){
	// data = data.sort(compareByName);
	//console.log(data);

	var alliance = [];
	var ehome = [];
	var nb = [];
	var og = [];
	var nby = [];
	var lgd = [];
	var cdec = [];
	var secret = [];
	var eg = [];
	var vg = [];
	var mineski = [];
	var unknown = [];
	var fnatic = [];
	var c9 = [];
	var vega = [];
	var vp = [];


	for (var i = 0; i < data.length; i++) {
		if (data[i].Team === "OG") {
			og.push(data[i]);
		} else if (data[i].Team === "Secret") {
			secret.push(data[i]);
		} else if (data[i].Team === "EHOME") {
			ehome.push(data[i]);
		} else if (data[i].Team === "EG") {
			eg.push(data[i]);
		} else if (data[i].Team === "VP") {
			vp.push(data[i]);
		} else if (data[i].Team === "LGD.cn") {
			lgd.push(data[i]);
		} else if (data[i].Team === "VG") {
			vg.push(data[i]);
		} else if (data[i].Team === "CDEC") {
			cdec.push(data[i]);
		} else if (data[i].Team === "Vega") {
			vega.push(data[i]);
		} else if (data[i].Team === "Mineski") {
			mineski.push(data[i]);
		} else if (data[i].Team === "C9") {
			c9.push(data[i]);
		} else if (data[i].Team === "Nb") {
			nb.push(data[i]);
		} else if (data[i].Team === "Newbee.Y") {
			nby.push(data[i]);
		} else if (data[i].Team === "Fnatic.MY") {
			fnatic.push(data[i]);
		} else if (data[i].Team === "Alliance") {
			alliance.push(data[i]);
		} else if (data[i].Team === "Team Unknown") {
			unknown.push(data[i]);
		}
	}

	var allianceList = "";
	for (var i = 0; i < alliance.length; i++) {
		var imageSrc = "img/Player/" + alliance[i].Player + ".jpg";
		allianceList += "<div class='playerbox'>";
		allianceList += "<img id='" + alliance[i].Player + "' src='" + imageSrc + "' />";
		allianceList += "</div>";
	}
	$("#Alliance").html(allianceList);

	var cdecList = "";
	for (var i = 0; i < cdec.length; i++) {
		var imageSrc = "img/Player/" + cdec[i].Player + ".jpg";
		cdecList += "<div class='playerbox'>";
		cdecList += "<img id='" + cdec[i].Player + "' src='" + imageSrc + "' />";
		cdecList += "</div>";
	}
	$("#CDEC").html(cdecList);

	var c9List = "";
	for (var i = 0; i < c9.length; i++) {
		var imageSrc = "img/Player/" + c9[i].Player + ".jpg";
		c9List += "<div class='playerbox'>";
		c9List += "<img id='" + c9[i].Player + "' src='" + imageSrc + "' />";
		c9List += "</div>";
	}
	$("#Cloud9").html(c9List);

	var ehomeList = "";
	for (var i = 0; i < ehome.length; i++) {
		var imageSrc = "img/Player/" + ehome[i].Player + ".jpg";
		ehomeList += "<div class='playerbox'>";
		ehomeList += "<img id='" + ehome[i].Player + "' src='" + imageSrc + "' />";
		ehomeList += "</div>";
	}
	$("#Ehome").html(ehomeList);

	var egList = "";
	for (var i = 0; i < eg.length; i++) {
		var imageSrc = "img/Player/" + eg[i].Player + ".jpg";
		egList += "<div class='playerbox'>";
		egList += "<img id='" + eg[i].Player + "' src='" + imageSrc + "' />";
		egList += "</div>";
	}
	$("#EG").html(egList);

	var fnaticList = "";
	for (var i = 0; i < fnatic.length; i++) {
		var imageSrc = "img/Player/" + fnatic[i].Player + ".jpg";
		fnaticList += "<div class='playerbox'>";
		fnaticList += "<img id='" + fnatic[i].Player + "' src='" + imageSrc + "' />";
		fnaticList += "</div>";
	}
	$("#Fnatic").html(fnaticList);

	var lgdList = "";
	for (var i = 0; i < lgd.length; i++) {
		var imageSrc = "img/Player/" + lgd[i].Player + ".jpg";
		lgdList += "<div class='playerbox'>";
		lgdList += "<img id='" + lgd[i].Player + "' src='" + imageSrc + "' />";
		lgdList += "</div>";
	}
	$("#LGD").html(lgdList);

	var mineskiList = "";
	for (var i = 0; i < mineski.length; i++) {
		var imageSrc = "img/Player/" + mineski[i].Player + ".jpg";
		mineskiList += "<div class='playerbox'>";
		mineskiList += "<img id='" + mineski[i].Player + "' src='" + imageSrc + "' />";
		mineskiList += "</div>";
	}
	$("#Mineski").html(mineskiList);

	var nbyList = "";
	for (var i = 0; i < nby.length; i++) {
		var imageSrc = "img/Player/" + nby[i].Player + ".jpg";
		nbyList += "<div class='playerbox'>";
		nbyList += "<img id='" + nby[i].Player + "' src='" + imageSrc + "' />";
		nbyList += "</div>";
	}
	$("#NBY").html(nbyList);


	var nbList = "";
	for (var i = 0; i < nb.length; i++) {
		var imageSrc = "img/Player/" + nb[i].Player + ".jpg";
		nbList += "<div class='playerbox'>";
		nbList += "<img id='" + nb[i].Player + "' src='" + imageSrc + "' />";
		nbList += "</div>";
	}
	$("#NB").html(nbList);

	var ogList = "";
	for (var i = 0; i < og.length; i++) {
		var imageSrc = "img/Player/" + og[i].Player + ".jpg";
		ogList += "<div class='playerbox'>";
		ogList += "<img id='" + og[i].Player + "' src='" + imageSrc + "' />";
		ogList += "</div>";
	}
	$("#OG").html(ogList);

	var secretList = "";
	for (var i = 0; i < og.length; i++) {
		var imageSrc = "img/Player/" + secret[i].Player + ".jpg";
		secretList += "<div class='playerbox'>";
		secretList += "<img id='" + secret[i].Player + "' src='" + imageSrc + "' />";
		secretList += "</div>";
	}
	$("#Secret").html(secretList);

	var unknownList = "";
	for (var i = 0; i < og.length; i++) {
		var imageSrc = "img/Player/" + unknown[i].Player + ".jpg";
		unknownList += "<div class='playerbox'>";
		unknownList += "<img id='" + unknown[i].Player + "' src='" + imageSrc + "' />";
		unknownList += "</div>";
	}
	$("#Unknown").html(unknownList);

	var vegaList = "";
	for (var i = 0; i < og.length; i++) {
		var imageSrc = "img/Player/" + vega[i].Player + ".jpg";
		vegaList += "<div class='playerbox'>";
		vegaList += "<img id='" + vega[i].Player + "' src='" + imageSrc + "' />";
		vegaList += "</div>";
	}
	$("#Vega").html(vegaList);

	var vgList = "";
	for (var i = 0; i < og.length; i++) {
		var imageSrc = "img/Player/" + vg[i].Player + ".jpg";
		vgList += "<div class='playerbox'>";
		vgList += "<img id='" + vg[i].Player + "' src='" + imageSrc + "' />";
		vgList += "</div>";
	}
	$("#VG").html(vgList);

	var vpList = "";
	for (var i = 0; i < og.length; i++) {
		var imageSrc = "img/Player/" + vp[i].Player + ".jpg";
		vpList += "<div class='playerbox'>";
		vpList += "<img id='" + vp[i].Player + "' src='" + imageSrc + "' />";
		vpList += "</div>";
	}
	$("#VP").html(vpList);


	$("img").on("click", function(d){
		for (var i = 0; i < data.length; i++) {
			if ($(this).attr("id") === data[i].Player) {

				if ($(this).parent().css("border-color") === "rgb(0, 0, 255)") {
					$(this).parent().css({"border-color": "rgb(51,51,51)", "border-width": 0});
					$("#" + data[i].Player + "Panel").remove();
					break;

				} else {
					$(this).parent().css({ "border-style": "solid", "border-color": "blue", "border-width": 3});

					var playerPanel = "";
					playerPanel += "<div id='" + data[i].Player + "Panel' class='panel panel-default'>";
					playerPanel += "<div class='panel-body'>";
					playerPanel += "<h4><img postion='relative' src='img/Player/" + data[i].Player + ".jpg' /> <span class='heroName'><strong>" + data[i].Team + "."+ data[i].Player + "</strong><span></h4>";

					playerPanel += "<div class='well well-sm list-group'>";
					playerPanel += "<h4 class='list-group-item-heading'>Total Number of Matches</h4>";
					playerPanel += "<p class='list-group-item-text'><span class='lead'>" + data[i].Games + "</span> <em>Matches</em></p></div>";

					playerPanel += "<div class='well well-sm list-group'>";
					playerPanel += "<h4 class='list-group-item-heading'>Kills Per Match</h4>";
					playerPanel += "<p class='list-group-item-text'><span class='lead'>" + data[i].K + "</span> <em>Kills</em></p></div>";

					playerPanel += "<div class='well well-sm list-group'>";
					playerPanel += "<h4 class='list-group-item-heading'>Deaths Per Match</h4>";
					playerPanel += "<p class='list-group-item-text'><span class='lead'>" + data[i].D + "</span> <em>Deaths</em></p></div>";

					playerPanel += "<div class='well well-sm list-group'>";
					playerPanel += "<h4 class='list-group-item-heading'>Assists Per Match</h4>";
					playerPanel += "<p class='list-group-item-text'><span class='lead'>" + data[i].A + "</span> <em>Assists</em></p></div>";

					playerPanel += "<div class='well well-sm list-group'>";
					playerPanel += "<h4 class='list-group-item-heading'>Gold Per Minute</h4>";
					playerPanel += "<p class='list-group-item-text'><span class='lead'>" + data[i].GPM + "</span> <em>Golds</em></p></div>";

					playerPanel += "<div class='well well-sm list-group'>";
					playerPanel += "<h4 class='list-group-item-heading'>Experiences Per Minute</h4>";
					playerPanel += "<p class='list-group-item-text'><span class='lead'>" + data[i].XPM + "</span> <em>Experiences</em></p></div>";

					playerPanel += "</div></div>";

					if ($("#subplayerdata").children().length <= 4) {
						$("#subplayerdata").prepend(playerPanel);
					} else {
						var word = $("#subplayerdata").children().last().attr("id");
						var wordlength = $("#subplayerdata").children().last().attr("id").length;
						var substring = word.substring(0, wordlength - 5);
						console.log(substring);
						$("#" + substring).parent().css({"border-color": "rgb(51,51,51)", "border-width": 0});
						$("#subplayerdata").children().last().remove();
						$("#subplayerdata").prepend(playerPanel);
					};
					
					break;
				}
			}
		}
	});

});