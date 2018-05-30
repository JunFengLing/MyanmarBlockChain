(function ($) {
    var data = [
        {
            "name": "Joey",
            "log_type": "LOG_CLIENT_CONNECTED",
            "log_message": "log client connected",
            "time": 1525506418023,
            "data": null
        },
        {
            "name": "Andy",
            "log_type": "LOG_CLIENT_CONNECTED",
            "log_message": "log client connected",
            "time": 1525506461621,
            "data": null
        },
        {
            "name": "Andy",
            "log_type": "NEW_PEERS",
            "log_message": "connected to new peers",
            "time": 1525506466369,
            "data": [
                {
                    "id": "99996e00-5038-11e8-91df-5154e9d88aeb",
                    "name": "Joey",
                    "ip": "172.29.224.48:6001",
                    "connectport": 6001
                }
            ]
        },
        {
            "name": "Panex",
            "log_type": "LOG_CLIENT_CONNECTED",
            "log_message": "log client connected",
            "time": 1525506483004,
            "data": null
        },
        {
            "name": "Panex",
            "log_type": "NEW_PEERS",
            "log_message": "connected to new peers",
            "time": 1525506486894,
            "data": [
                {
                    "id": "a5d37710-5038-11e8-ace5-fdbf1866ce6c",
                    "name": "Joey",
                    "ip": "172.29.224.48:6001",
                    "connectport": 6001
                }
            ]
        },
        {
            "name": "Panex",
            "log_type": "NEW_PEERS",
            "log_message": "connected to new peers",
            "time": 1525506487576,
            "data": [
                {
                    "id": "a5d37710-5038-11e8-ace5-fdbf1866ce6c",
                    "name": "Joey",
                    "ip": "172.29.224.48:6001",
                    "connectport": 6001
                },
                {
                    "id": "a6733980-5038-11e8-ace5-fdbf1866ce6c",
                    "name": "Andy",
                    "ip": "172.29.224.13:6001"
                }
            ]
        },
        {
            "name": "Joey",
            "log_type": "NEW_BLOCK",
            "log_message": "New block has been appended",
            "time": 1525506525864,
            "data": {
                "index": 1,
                "hash": "74e8f1766e6b68074e4dbe8db094f838284583bb47926e41f8532ff43e55e774"
            }
        },
        {
            "name": "Panex",
            "log_type": "NEW_BLOCK",
            "log_message": "New block has been appended",
            "time": 1525506526340,
            "data": {
                "index": 1,
                "hash": "74e8f1766e6b68074e4dbe8db094f838284583bb47926e41f8532ff43e55e774"
            }
        },
        {
            "name": "Andy",
            "log_type": "NEW_BLOCK",
            "log_message": "New block has been appended",
            "time": 1525506526271,
            "data": {
                "index": 1,
                "hash": "74e8f1766e6b68074e4dbe8db094f838284583bb47926e41f8532ff43e55e774"
            }
        },
        {
            "name": "Panex",
            "log_type": "NEW_BLOCK",
            "log_message": "New block has been appended",
            "time": 1525506542158,
            "data": {
                "index": 2,
                "hash": "1fb86ecacf80642c10c81063af6ab267d5768743e74bb7790bef98fd41a61b2b"
            }
        },
        {
            "name": "Joey",
            "log_type": "NEW_BLOCK",
            "log_message": "New block has been appended",
            "time": 1525506542072,
            "data": {
                "index": 2,
                "hash": "1fb86ecacf80642c10c81063af6ab267d5768743e74bb7790bef98fd41a61b2b"
            }
        },
        {
            "name": "Andy",
            "log_type": "NEW_BLOCK",
            "log_message": "New block has been appended",
            "time": 1525506542269,
            "data": {
                "index": 2,
                "hash": "1fb86ecacf80642c10c81063af6ab267d5768743e74bb7790bef98fd41a61b2b"
            }
        },
        {
            "name": "Andy",
            "log_type": "NEW_BLOCK",
            "log_message": "New block has been appended",
            "time": 1525506565662,
            "data": {
                "index": 3,
                "hash": "b107b9902dafbfd15db5da13a28cd3a67074b370380d49a04b329d42bca932cb"
            }
        },
        {
            "name": "Joey",
            "log_type": "INVALID_BLOK",
            "log_message": "Received an invalid block.",
            "time": 1525506565672,
            "data": {
                "index": 3,
                "hash": "b107b9902dafbfd15db5da13a28cd3a67074b370380d49a04b329d42bca932cb"
            }
        },
        {
            "name": "Panex",
            "log_type": "INVALID_BLOK",
            "log_message": "Received an invalid block.",
            "time": 1525506565928,
            "data": {
                "index": 3,
                "hash": "b107b9902dafbfd15db5da13a28cd3a67074b370380d49a04b329d42bca932cb"
            }
        },
        {
            "name": "Joey",
            "log_type": "NEW_BLOCK",
            "log_message": "New block has been appended",
            "time": 1525506589350,
            "data": {
                "index": 3,
                "hash": "1def7e3c4ca2371c45896d9d3ce8066b87dc7f83cbb7af9532de68fdd34c0dae"
            }
        },
        {
            "name": "Panex",
            "log_type": "NEW_BLOCK",
            "log_message": "New block has been appended",
            "time": 1525506589833,
            "data": {
                "index": 3,
                "hash": "1def7e3c4ca2371c45896d9d3ce8066b87dc7f83cbb7af9532de68fdd34c0dae"
            }
        },
        {
            "name": "Panex",
            "log_type": "NEW_BLOCK",
            "log_message": "New block has been appended",
            "time": 1525506604701,
            "data": {
                "index": 4,
                "hash": "7e384af8c687e1e8f0576b0995bfd513397049325500f80763f5230dbd79f00c"
            }
        },
        {
            "name": "Joey",
            "log_type": "NEW_BLOCK",
            "log_message": "New block has been appended",
            "time": 1525506604721,
            "data": {
                "index": 4,
                "hash": "7e384af8c687e1e8f0576b0995bfd513397049325500f80763f5230dbd79f00c"
            }
        },
        {
            "name": "Andy",
            "log_type": "NEW_BLOCK",
            "log_message": "New block has been appended",
            "time": 1525506604741,
            "data": {
                "index": 4,
                "hash": "7e384af8c687e1e8f0576b0995bfd513397049325500f80763f5230dbd79f00c"
            }
        }
    ];

    var indexColorArray = ["orange", "blue", "lightgreen", "Orchid"];
    var indexOverrideColorArray = ["orange", "blue", "green", "Orchid"];

    var Renderer = function (canvas) {
        var canvas = $(canvas).get(0);
        var ctx = canvas.getContext("2d");
        var gfx = arbor.Graphics(canvas);
        var particleSystem;

        var that = {
            init: function (system) {
                //
                // the particle system will call the init function once, right before the
                // first frame is to be drawn. it's a good place to set up the canvas and
                // to pass the canvas size to the particle system
                //
                // save a reference to the particle system for use in the .redraw() loop
                particleSystem = system

                // inform the system of the screen dimensions so it can map coords for us.
                // if the canvas is ever resized, screenSize should be called again with
                // the new dimensions
                particleSystem.screenSize(canvas.width, canvas.height)
                particleSystem.screenPadding(80) // leave an extra 80px of whitespace per side

                // set up some event handlers to allow for node-dragging
                //that.initMouseHandling()
            },

            redraw: function () {
                console.log("redrawing");
                // 
                // redraw will be called repeatedly during the run whenever the node positions
                // change. the new positions for the nodes can be accessed by looking at the
                // .p attribute of a given node. however the p.x & p.y values are in the coordinates
                // of the particle system rather than the screen. you can either map them to
                // the screen yourself, or use the convenience iterators .eachNode (and .eachEdge)
                // which allow you to step through the actual node objects but also pass an
                // x,y point in the screen's coordinate system
                // 
                ctx.fillStyle = "white"
                ctx.fillRect(0, 0, canvas.width, canvas.height)

                var nodeBoxes = {}

                particleSystem.eachEdge(function (edge, pt1, pt2) {
                    // edge: {source:Node, target:Node, length:#, data:{}}
                    // pt1:  {x:#, y:#}  source position in screen coords
                    // pt2:  {x:#, y:#}  target position in screen coords

                    // draw a line from pt1 to pt2
                    ctx.strokeStyle = "rgba(0,0,0, .333)"
                    ctx.lineWidth = 1
                    ctx.beginPath()
                    ctx.moveTo(pt1.x, pt1.y)
                    ctx.lineTo(pt2.x, pt2.y)
                    ctx.stroke()
                })

                particleSystem.eachNode(function (node, pt) {
                    // node: {mass:#, p:{x,y}, name:"", data:{}}
                    // pt:   {x:#, y:#}  node position in screen coords

                    if (node.data.invisible) return;

                    // determine the box size and round off the coords if we'll be 
                    // drawing a text label (awful alignment jitter otherwise...)
                    var label = node.name || ""
                    var w = ctx.measureText("" + label).width + 10
                    if (!("" + label).match(/^[ \t]*$/)) {
                        pt.x = Math.floor(pt.x)
                        pt.y = Math.floor(pt.y)
                    } else {
                        label = null
                    }

                    // draw a rectangle centered at pt
                    if (node.data.color)
                        ctx.fillStyle = node.data.color
                    else
                        ctx.fillStyle = "rgba(0,0,0,.2)"
                    if (node.data.color == 'none') ctx.fillStyle = "white"

                    if (node.data.shape == 'dot') {
                        gfx.oval(pt.x - w / 2, pt.y - w / 2, w, w, { fill: ctx.fillStyle })
                        nodeBoxes[node.name] = [pt.x - w / 2, pt.y - w / 2, w, w]
                    } else {
                        gfx.rect(pt.x - w / 2, pt.y - 10, w, 20, 4, { fill: ctx.fillStyle })
                        nodeBoxes[node.name] = [pt.x - w / 2, pt.y - 11, w, 22]
                    }

                    if (node.data.index) {
                        ctx.fillText(node.data.index, pt.x - 20, pt.y - 12);
                    }

                    // draw the text
                    if (label) {
                        ctx.font = "12px Helvetica"
                        ctx.textAlign = "center"
                        ctx.fillStyle = "black"
                        if (node.data.color == 'none') ctx.fillStyle = '#333333'
                        ctx.fillText(label || "", pt.x, pt.y + 4)
                        ctx.fillText(label || "", pt.x, pt.y + 4)
                    }
                })
            }
        }

        return that;
    };

    var start = 0;
    var timeInterval = 3000;
    var times = 1;

    var step = true;

    var warningNode = {};

    $(document).ready(function () {
        var sys = arbor.ParticleSystem(1000, 600, 0.5) // create the system with sensible repulsion/stiffness/friction
        sys.parameters({ gravity: true }) // use center-gravity to make the graph settle nicely (ymmv)
        sys.renderer = Renderer("#viewport") // our newly created renderer will have its .init() method called shortly by sys...
        
        var sortedTimeList = data.map(d => d.time).sort((a, b) => a - b);
        var stepIndex;
        if (step) {
            stepIndex = 0;
            start = sortedTimeList[stepIndex];
        }
        else {
            start = sortedTimeList[0];
        }

        setInterval(() => {

            console.log(start);

            var endTime = step && (++stepIndex < sortedTimeList.length) ? sortedTimeList[stepIndex] : start + timeInterval;
            console.log(endTime);

            sys.addNode('a', { alone: true, invisible: true });
            sys.addNode('b', { alone: true, invisible: true });

            var newDataList = data.filter(d => d.time >= start && d.time < endTime);

            var newNodes = newDataList.filter(d => d.log_type == "LOG_CLIENT_CONNECTED");
            var newEdges = newDataList.filter(d => d.log_type == "NEW_PEERS");
            var nodeChanges = newDataList.filter(d => d.log_type == "NEW_BLOCK");
            var invalidWarnings = newDataList.filter(d => d.log_type == "INVALID_BLOK");

            $.each(newNodes, (i, node) => {
                var addedNode = sys.addNode(node.name, { alone: true });

                console.log("node added:" + node.name);
            });

            $.each(newEdges, (i, node) => {
                $.each(node.data, (j, targetNode) => {
                    if (node.name && targetNode.name) {
                        var addedEdge = sys.addEdge(node.name, targetNode.name);

                        console.log("edge added, from:" + node.name + ", to:" + targetNode.name);
                    }
                });
            });

            $.each(invalidWarnings, (i, node) => {
                var gotNode = sys.getNode(node.name);
                gotNode.data.color = "red";
                warningNode.index = node.data.index;
                warningNode.hash = node.data.hash;
                gotNode.data.index = node.data.index;
                console.log("color change for " + gotNode.name + ": " + gotNode.data.color);
            });

            $.each(nodeChanges, (i, node) => {
                var gotNode = sys.getNode(node.name);
                var colorArray = (node.data.index == warningNode.index && node.data.hash != warningNode.hash) ?
                    indexOverrideColorArray : indexColorArray;

                gotNode.data.color = colorArray[node.data.index - 1];
                gotNode.data.index = node.data.index;
                console.log("color change for " + gotNode.name + ": " + gotNode.data.color);
            });

            start = endTime;

            sys.renderer.redraw();

        }, timeInterval / times);

        // or, equivalently:
        //
        // sys.graft({
        //   nodes:{
        //     f:{alone:true, mass:.25}
        //   }, 
        //   edges:{
        //     a:{ b:{},
        //         c:{},
        //         d:{},
        //         e:{}
        //     }
        //   }
        // })

    })
})(this.jQuery) 