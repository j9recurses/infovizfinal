d3.helper = {};

    d3.helper.tooltip = function(){
        var tooltipDiv;
        var bodyNode = d3.select('body').node();
        var attrs = {};
        var text = '';
        var styles = {};

        function tooltip(selection){

            selection.on('mouseover.tooltip', function(pD, pI){
                var name, value;
                // Clean up lost tooltips
                d3.select('body').selectAll('div.tooltip').remove();
                // Append tooltip
                tooltipDiv = d3.select('body').append('div');
                tooltipDiv.attr(attrs);
                tooltipDiv.style(styles);
                var absoluteMousePos = d3.mouse(bodyNode);
                tooltipDiv.style({
                    left: (absoluteMousePos[0] + 10)+'px',
                    top: (absoluteMousePos[1] - 15)+'px',
                    position: 'absolute',
                    'z-index': 1001
                });
                // Add text using the accessor function, Crop text arbitrarily
                tooltipDiv.style('width', function(d, i){ return (text(pD, pI).length > 80) ? '300px' : null; })
                    .html(function(d, i){return text(pD, pI);});
            })
            .on('mousemove.tooltip', function(pD, pI){
                // Move tooltip
                var absoluteMousePos = d3.mouse(bodyNode);
                tooltipDiv.style({
                    left: (absoluteMousePos[0] + 10)+'px',
                    top: (absoluteMousePos[1] - 15)+'px'
                });
                // Keep updating the text, it could change according to position
                tooltipDiv.html(function(d, i){ return text(pD, pI); });
            })
            .on('mouseout.tooltip', function(pD, pI){
                // Remove tooltip
                tooltipDiv.remove();
            });

        }

        tooltip.attr = function(_x){
            if (!arguments.length) return attrs;
            attrs = _x;
            return this;
        };

        tooltip.style = function(_x){
            if (!arguments.length) return styles;
            styles = _x;
            return this;
        };

        tooltip.text = function(_x){
            if (!arguments.length) return text;
            text = d3.functor(_x);
            return this;
        };

        return tooltip;
    };
            //Width and height
            var w = 400;
            var h = 400;

            //Define map projection
            var projection = d3.geo.mercator()
                                   .translate([w/2, h/2])
                                   .scale([600]);

            //Define path generator
            var path = d3.geo.path()
                             .projection(projection);

            //Create SVG' element
            console.log("here");
            var svg = d3.select("body").append("div").attr("id","#maincrimes")
                        .append("svg")
                        .attr("width", w)
                        .attr("height", h);

            var color = d3.scale.quantize()
                    .range(["rgb(254,232,200)", "rgb(1253,187,132)",
                                "rgb(227,74,51"]);


        d3.csv("all_crimes.csv", function(data) {
               color.domain([
                d3.min(data, function(d) {
                  morestuff = d
                  cool = d3.values(morestuff)
                  cool2 = parseFloat(cool[1])
                          return cool2; }),
                d3.max(data, function(d) { 
                  morestuff = d
                  cool = d3.values(morestuff)
                  cool2 = parseFloat(cool[1])
                          return cool2 })
                ]);


            d3.json("india_states.geojson", function(json) {

                  //Merge the ag. data and GeoJSON
                  //Loop through once for each ag. data value
                  for (var i = 0; i < data.length; i++) {
                  //Grab state name
                  var dataState = data[i].NAME_1;
                  morestuff = data[i]
                  cool = d3.values(morestuff)
                  cool2 = parseFloat(cool[1])
                  //Grab data value, and convert from string to float
                  var dataValue = cool2
                
                  
                  //Find the corresponding state inside the GeoJSON
                  for (var j = 0; j < json.features.length; j++) {

                      var jsonState = json.features[j].properties.NAME_1;
                    

                    if (dataState == jsonState) {
                      
                          //Copy the data value into the JSON
                        json.features[j].properties.value = dataValue;
                            //Stop looking through the JSON
                            break;

                        }
                    }
                }
   
           svg.selectAll("path")
                   .data(json.features)
                   .enter()
                   .append("path")
                   .attr("d", path)
                    .attr("transform", "translate(-800,200)")
                

                 .call(d3.helper.tooltip()
                .attr({class: function(d, i) { return d + ' ' +  i + ' A'; }})

                .style({color: 'blue'})
                .text(function(d, i){ 
                  return 'Name:' + d.properties.NAME_1 + '; Total Counts: '+d.properties.value ; })
            )


                   .style("fill", function(d) {
                        //Get data value
                    var value = d.properties.value;

                        if (value) {
                                        //If value exists…
                                        return color(value);
                                } else {
                                        //If value is undefined…
                                        return "#ccc";
                                }
                      });

                  });
      });


          
