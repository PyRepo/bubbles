var margin = 20,
    diameter = 960;

var color = d3.scale.linear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

var pack = d3.layout.pack()
    .padding(2)
    .size([diameter - margin, diameter - margin])
    .value(function(d) { return d.size; })

var svg = d3.select("body").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

var root = getData();


  var focus = root,
      nodes = pack.nodes(root),
      view;

  var circle = svg.selectAll("circle")
      .data(nodes)
    .enter().append("circle")
      .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
      .style("fill", function(d) { return d.children ? color(d.depth) : null; })
      .on("click", function(d) { if (focus !== d) zoom(d), d3.event.stopPropagation(); });

  var text = svg.selectAll("text")
      .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? null : "none"; })
      .text(function(d) { return d.name; });

  var node = svg.selectAll("circle,text");

  d3.select("body")
      .style("background", color(-1))
      .on("click", function() { zoom(root); });

  zoomTo([root.x, root.y, root.r * 2 + margin]);

  function zoom(d) {
    var focus0 = focus; focus = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .each("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .each("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }
  function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });

};

function getData() {
    return {
        "name": "flare",
            "children": [{
            "name": "analytics",
                "children": [{
                "name": "cluster",
                    "children": [{
                    "name": "AgglomerativeCluster",
                    "size": 3938
                }, {
                    "name": "CommunityStructure",
                    "size": 3812
                }, {
                    "name": "HierarchicalCluster",
                    "size": 6714
                }, {
                    "name": "MergeEdge",
                    "size": 743
                }]
            }, {
                "name": "graph",
                    "children": [{
                    "name": "BetweennessCentrality",
                    "size": 3534
                }, {
                    "name": "LinkDistance",
                    "size": 5731
                }, {
                    "name": "MaxFlowMinCut",
                    "size": 7840
                }, {
                    "name": "ShortestPaths",
                    "size": 5914
                }, {
                    "name": "SpanningTree",
                    "size": 3416
                }]
            }, {
                "name": "optimization",
                    "children": [{
                    "name": "AspectRatioBanker",
                    "size": 7074
                }]
            }]
        }, {
            "name": "animate",
                "children": [{
                "name": "interpolate",
                    "children": [{
                    "name": "ArrayInterpolator",
                    "size": 1983
                }, {
                    "name": "ColorInterpolator",
                    "size": 2047
                }, {
                    "name": "DateInterpolator",
                    "size": 1375
                }, {
                    "name": "Interpolator",
                    "size": 8746
                }, {
                    "name": "MatrixInterpolator",
                    "size": 2202
                }, {
                    "name": "NumberInterpolator",
                    "size": 1382
                }, {
                    "name": "ObjectInterpolator",
                    "size": 1629
                }, {
                    "name": "PointInterpolator",
                    "size": 1675
                }, {
                    "name": "RectangleInterpolator",
                    "size": 2042
                }]
            }, {
                "name": "ISchedulable",
                "size": 1041
            }, {
                "name": "Parallel",
                "size": 5176
            }, {
                "name": "Pause",
                "size": 449
            }, {
                "name": "Scheduler",
                "size": 5593
            }, {
                "name": "Sequence",
                "size": 5534
            }, {
                "name": "Transition",
                "size": 9201
            }, {
                "name": "Transitioner",
                "size": 19975
            }, {
                "name": "TransitionEvent",
                "size": 1116
            }, {
                "name": "Tween",
                "size": 6006
            }]
        }, {
            "name": "data",
                "children": [{
                "name": "converters",
                    "children": [{
                    "name": "Converters",
                    "size": 721
                }, {
                    "name": "DelimitedTextConverter",
                    "size": 4294
                }, {
                    "name": "GraphMLConverter",
                    "size": 9800
                }, {
                    "name": "IDataConverter",
                    "size": 1314
                }, {
                    "name": "JSONConverter",
                    "size": 2220
                }]
            }, {
                "name": "DataField",
                "size": 1759
            }, {
                "name": "DataSchema",
                "size": 2165
            }, {
                "name": "DataSet",
                "size": 586
            }, {
                "name": "DataSource",
                "size": 3331
            }, {
                "name": "DataTable",
                "size": 772
            }, {
                "name": "DataUtil",
                "size": 3322
            }]
        }]
    };
}