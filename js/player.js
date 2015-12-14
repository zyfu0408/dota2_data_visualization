angular.module('dota2', [])
  .constant('TEAMS', [
  	"OG", "Secret", "EHOME", "EvilGeniuses", "VP", "VG", "LGD.cn",
  	"CDEC", "Vega", "Mineski", "C9", "Newbee.Y","Nb","Fnatic.MY",
  	"Team Unknown", "Alliance"
  ])
  .constant('COLORS', [
    "#00004D", "#04824C", "#000000", "#00778b", "#C41E3A", "#6E263C",
    "#0B60AD", "#4B90CC", "#00519A", "#04529C", "#C5001E", "#092C57",
    "#CC0033", "#5C2F83", "#182D59", "#000000"
  ])
  .controller('MainCtrl', function($http, TEAMS, $filter) {

    this.positions = [
      { id: undefined, name: '(All)'},
      { id: 'Midlane', name: 'Midlane'},
      { id: 'Offlane', name: 'Offlane'},
      { id: 'Carry', name: 'Carry'},
      { id: 'Support', name: 'Support'}
    ];

    this.teams = TEAMS.map(function(t) { return { id: t, name: t}; });
    this.teams.unshift({id: undefined, name: '(All)'});


    this.filter = {};

    this.refilter = function() {
      this.rows = $filter('filter')(this.csv, this.filter);
    };

    var self = this;

    this.onHover = function(item) {
      self.hover = item;
    };

    $http.get('data/PlayerTradi1.csv').then(function(resp) {
      var csv = d3.csv.parse(resp.data);
      self.csv = csv;
      self.rows = self.csv;
    });

  })

  .directive('chart', function(TEAMS, COLORS) {
    return {
      replace: false,
      scope: {
        league: '=',
        data: '=',
        hover: '&',
      },
      link: function(scope, elem, attrs) {
        var tooltip = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);

        var e = elem[0];
        var margin = {
          top:    20,
          left:   40,
          right:  20,
          bottom: 20
        };
        var width  = width_forPlayer, height = height_forPlayer;
        // var width  = 1000, height = 500;
        // var width  = 500, height = 300;
        var cwidth = width - margin.left - margin.right,
        cheight = height - margin.top - margin.bottom;
        var svg = d3.select(e)
          .attr('width',  width)
          .attr('height', height)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
// Plot 1
        var paddingAxis = 40;
        var xValue = function(d) { return parseInt(d.GPM); };
        var xScale = d3.scale.linear().range([0, cwidth / 2]);
        var xMap   = function(d) { return xScale(xValue(d)); };
        var xAxis  = d3.svg.axis().scale(xScale).orient('bottom')
          .tickSize(-cheight, 0);

        var yValue = function(d) { return parseInt(d.DmgPM); };
        var yScale = d3.scale.linear().range([cheight, 0]);
        var yMap   = function(d) { return yScale(yValue(d)); };
        var yAxis  = d3.svg.axis().scale(yScale).orient('left')
          .tickSize(-cwidth / 2, 0);
// Plot 2
        var xValue2 = function(d) { return parseInt(d.GoldSpent); };
        var xScale2 = d3.scale.linear().range([(cwidth / 2 + paddingAxis), cwidth]);
        var xMap2   = function(d) { return xScale2(xValue2(d)); };
        var xAxis2  = d3.svg.axis().scale(xScale2).orient('bottom')
          .tickSize(-cheight, 0);

        var yValue2 = function(d) { return parseInt(d.TotalDamage); };
        var yScale2 = d3.scale.linear().range([cheight, 0]);
        var yMap2   = function(d) { return yScale2(yValue2(d)); };
        var yAxis2  = d3.svg.axis().scale(yScale2).orient('left')
          .tickSize(-cwidth / 2 + paddingAxis, 0);

        var color = d3.scale.ordinal()
          .domain(TEAMS)
          .range(COLORS);


        function linearReg(data) {
          var sum = [0, 0, 0, 0, 0], n = 0, results = [];

          for (; n < data.length; n++) {
            if (data[n][1]) {
              sum[0] += data[n][0];
              sum[1] += data[n][1];
              sum[2] += data[n][0] * data[n][0];
              sum[3] += data[n][0] * data[n][1];
              sum[4] += data[n][1] * data[n][1];
            }
          }

          var gradient = (n * sum[3] - sum[0] * sum[1]) / (n * sum[2] - sum[0] * sum[0]);
          var intercept = (sum[1] / n) - (gradient * sum[0]) / n;

          for (var i = 0, len = data.length; i < len; i++) {
            var coordinate = [data[i][0], data[i][0] * gradient + intercept];
            results.push(coordinate);
          }

          var string = 'y = ' + Math.round(gradient*100) / 100 + 'x + ' + Math.round(intercept*100) / 100;

          return {equation: [gradient, intercept], points: results, string: string};
        }

        scope.$watch('league', function(newVal, oldVal) {
          if (newVal === oldVal) { return; }
          rows = newVal;
          xScale.domain([parseInt(d3.min(rows, xValue)) - 50, parseInt(d3.max(rows, xValue)) + 50]);
          yScale.domain([parseInt(d3.min(rows, yValue)) - 50, parseInt(d3.max(rows, yValue)) + 50]);
          xScale2.domain([parseInt(d3.min(rows, xValue2)) - 1000, parseInt(d3.max(rows, xValue2)) + 1000]);
          yScale2.domain([parseInt(d3.min(rows, yValue2)) - 1000, parseInt(d3.max(rows, yValue2)) + 1000]);

          //svg.selectAll('*').remove();

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + cheight + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", cwidth / 2)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("Gold Per Minute");

          svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Damage Per Minute");

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + cheight + ")")
            .call(xAxis2)
            .append("text")
            .attr("class", "label")
            .attr("x", cwidth)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("Gold Spent");

          svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(" + (cwidth / 2 + paddingAxis) + ", 0)")
            .call(yAxis2)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Total Damage");


        });

        scope.$watch('data', function(newVal, oldVal) {
          if (newVal === oldVal) { return; }
          var rows = newVal;
          var dots = svg.selectAll('.dot2')
            .data(rows, function(d) { return d.Player; });
          
          dots.exit()
            .transition()
            .style('opacity', 0.0)
            .remove();

          dots.enter()
            .append('circle')
            .attr("class", 'dot2')
            .attr('r', 5)
            .style('opacity', 0.0)
            .transition()
            .style('opacity', 1.0);

          dots
            .attr('cx', xMap)
            .attr('cy', yMap)
            .style('fill', function(d) { return color(d.Team); })
            .on("mouseover", function(d) {
              scope.$apply(function() {
                scope.hover({item: d});
              });
              d3.select(this)
                .transition()
                .duration(200)
                .style('fill', function(d) { return d3.rgb(color(d.Team)).brighter(2.0); });

              tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
              tooltip.html('<strong>' + d.Team + "." + d.Player + ' ' + d.Position + '</strong>' +
                           '<br>Gold Per Minute: ' + d.GPM +
                           '<br>Damage Per Minute: ' + d.DmgPM
                          )
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
              scope.$apply(function() {
                scope.hover({item: null });
              });

              d3.select(this)
                .style('fill', function(d) { return color(d.Team); });

              tooltip.transition()
                .style("opacity", 0);
            });


           var dots2 = svg.selectAll('.dot')
            .data(rows, function(d) { return d.Player; });
          
          dots2.exit()
            .transition()
            .style('opacity', 0.0)
            .remove();

          dots2.enter()
            .append('circle')
            .attr("class", 'dot')
            .attr('r', 5)
            .style('opacity', 0.0)
            .transition()
            .style('opacity', 1.0);

          dots2
            .attr('cx', xMap2)
            .attr('cy', yMap2)
            .style('fill', function(d) { return color(d.Team); })
            .on("mouseover", function(d) {
              scope.$apply(function() {
                scope.hover({item: d});
              });
              d3.select(this)
                .transition()
                .duration(200)
                .style('fill', function(d) { return d3.rgb(color(d.Team)).brighter(2.0); });

              tooltip.transition()
                .duration(200)
                .style("opacity", 0.9);
              tooltip.html('<strong>' + d.Team + "." + d.Player + ' ' + d.Position + '</strong>' +
                           '<br>Gold Spent: ' + d.GoldSpent +
                           '<br>Total Damage: ' + d.TotalDamage
                          )
                .style("left", (d3.event.pageX + 5) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
              scope.$apply(function() {
                scope.hover({item: null });
              });

              d3.select(this)
                .style('fill', function(d) { return color(d.Team); });

              tooltip.transition()
                .style("opacity", 0);
            });

        });




      }
    };
  })
        
  .directive('fallbackImg', function() {
    return {
      scope: {
        'fallbackImg': '@'
      },
      link: function(scope, elem, attrs) {
        elem.on('error', function() {
          scope.$apply(function() {
            elem.attr('src', scope.fallbackImg);
          });
        });
      }
    };
  });

