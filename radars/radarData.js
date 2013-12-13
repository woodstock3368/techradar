document.title = "Technology Radar Dec 2013";

// TODO:  need to replace with something that is more correct.  I.e. dynamic sizing
var h = (window.innerHeight || document.documentElement.clientHeight ||document.body.clientHeight); 
var w = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);

// If you want to add or change the names or locations of the Rings change the model here.
var Rings = {
  Adopt: {name:"Adopt",radius: {inner: 0, outer: 100}},    // well proven, safe choice
  Trial: {name:"Trial",radius: {inner: 100, outer: 200}},  // worked on small example, known good, does it meet our needs?
  Assess: {name:"Assess",radius: {inner: 200, outer:300}}, // new ideas on the periphery we should investigate and assess
  Hold:  {name:"Hold",radius: {inner: 300,outer:400}}      // in the past, but not suitable for any new projects
};

// If you want to add or change the colors, names or locations of the quadrants change the model here.
var Quadrants = {
  Tools: {name: "Tools", baseAngle: 0, left: (w-200+30), top: 18, color: "#DC6F1D"},
  Techniques: {name: "Techniques", baseAngle: 90, left: 45, top: 18, color: "#8FA227"},
  Platforms: {name: "Platforms", baseAngle: 180, left: 45, top: (h/2 + 18), color: "Purple"},
  Languages:  {name: "Languages and Frameworks", baseAngle: 270, left: (w-200+30), top: (h/2+18), color: "#587486"}
};

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Goto each of these methods
//    techniquesQuadrant(),
//    languagesQuadrant(),
//    toolsQuadrant(),
//    platformsQuadrant(),
// and replace with your data. 

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// From here are helper functions.
var Change = {
  none: 'c', // none means circle
  moved: 't' // moved means triagle
};

var arcs = function(ring) {
  return {
    "r": ring.radius.outer,
    "name": ring.name
  };
};

var radar_arcs = [
   arcs(Rings.Adopt)
  ,arcs(Rings.Trial)
  ,arcs(Rings.Assess)
  ,arcs(Rings.Hold)
                 ];

var makeCoords = function(depth, angle) {
  return {
    "r": depth,
    "t": angle
  };
}

var offset = function(base) {
  return function(ness) { return base + (100 - ness/100*100); };
};

var adopt = function(ness) {
  return offset(Rings.Adopt.radius.inner)(ness);
};

var trial = function(ness) {
  return offset(Rings.Trial.radius.inner)(ness);
};

var assess = function(ness) {
  return offset(Rings.Assess.radius.inner)(ness);
};

var hold = function(ness) {
  return offset(Rings.Hold.radius.inner)(ness);
};

var element = function(name, depth, baseAngle, percentageAngle, movement, url, blipSize) {
  var result = {
    "name": name,
    "pc":   makeCoords(depth, baseAngle + (90 * percentageAngle / 100)),
    "movement": movement
  };
 
  if (blipSize) {
    result["blipSize"] = blipSize;
  }

  if (url) {
    result["url"] = url;
  }

  return result;
}

var quadrantElement = function(quadrants, name, depth, percentageAngle, movement, url, blipSize) {
  return element(name, depth, quadrants.baseAngle, percentageAngle, movement, url, blipSize);
}

var addBlip = function(quadrant, name, depth, position, movement, url, blipSize) {
  return quadrantElement(quadrant, name, depth, position, movement, url, blipSize);
};

var quadrant = function(quadrant, items) {
  return {
        "quadrant": quadrant.name,
        "left" : quadrant.left,
        "top" : quadrant.top,
        "color" : quadrant.color,
        "items" : items
  }
};

var techniquesQuadrant = function() {
    var quad = Quadrants.Techniques;
    var items = [ 
      //addBlip(<quad>, <item name>, <adopt|trial|assess|hold>(<position in quad>), <percentage position in ring>, <Change.none|Change.moved>, <url>, <nul|size of blip>),
      // Working example
      addBlip(quad, "Peer Code Review", adopt(50), 30, Change.none, 'http://en.wikipedia.org/wiki/Code_review'),
      addBlip(quad, "Continuous Integration", adopt(40), 60, Change.none, 'http://www.martinfowler.com/articles/continuousIntegration.html'),
      addBlip(quad, "Boy Scout Rule", adopt(40), 80, Change.none, 'http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule'),
      addBlip(quad, "Collective Code Ownership", adopt(40), 90, Change.none, 'http://www.extremeprogramming.org/rules/collective.html'),
      addBlip(quad, "Configuration as Code", adopt(70), 10, Change.none),
      addBlip(quad, "Automatic Syntax Enforcement ", adopt(80), 30, Change.none),

      addBlip(quad, "Polyglot Programming", trial(100), 50, Change.none),
      addBlip(quad, "Continuous Deployment", trial(80), 25, Change.none),
      addBlip(quad, "Visible Architecture", trial(70), 50, Change.none),
      addBlip(quad, "Immutable Servers", trial(30), 30, Change.none),
      addBlip(quad, "Semantic Monitoring", trial(60), 30, Change.none),
      addBlip(quad, "Test Driven Development", trial(20), 20, Change.none),
      addBlip(quad, "Pair Programming", trial(60), 70, Change.none),
      addBlip(quad, "Deliberate Development", trial(40), 50, Change.none),
      addBlip(quad, "Behaviour Driven Development", trial(80), 65, Change.none),

      addBlip(quad, "Functional Programming", assess(50), 50, Change.none),

      addBlip(quad, "Exhaustive Browser Based Testing", hold(50), 50, Change.none)
    ];
  return quadrant(quad, items);
};

var languagesQuadrant = function() {
    var quad = Quadrants.Languages;
    var items = [ 
      //addBlip(<quad>, <item name>, <adopt|trial|assess|hold>(<position in quad>), <percentage position in ring>, <Change.none|Change.moved>, <url>, <nul|size of blip>),
      // Working example
      addBlip(quad,"C#", adopt(20), 20, Change.none), 
      addBlip(quad,"JavaScript", adopt(40), 90, Change.none),
      addBlip(quad,"NuGet", adopt(50), 60, Change.none),
      addBlip(quad,"CSS Frameworks", adopt(50), 20, Change.none),
 
      addBlip(quad,"OWIN", trial(70), 60, Change.none),
      addBlip(quad,"TypeScript", trial(50), 80, Change.none),
      addBlip(quad,"Ruby-on-Rails", trial(50), 40, Change.none),
      addBlip(quad,"node.js", trial(30), 20, Change.none),
      addBlip(quad,"Bootstrap", trial(20), 80, Change.none),
      addBlip(quad,"JS MV*", trial(80), 20, Change.none),
      addBlip(quad,"Cucumber", trial(10), 85, Change.none),
      addBlip(quad,"Ruby", trial(50), 15, Change.none),
      addBlip(quad,"Python", trial(10), 70, Change.none),

      addBlip(quad,"Clojure", assess(50), 20, Change.none),
      addBlip(quad,"Scala", assess(50), 70, Change.none),

      addBlip(quad,"CoffeeScript", hold(50), 50, Change.none),
      addBlip(quad,"Hand-written CSS", hold(50), 75, Change.none),
    ];
  return quadrant(quad, items);
};

var toolsQuadrant = function() {
    var quad = Quadrants.Tools;
    var items = [ 
      //addBlip(<quad>, <item name>, <adopt|trial|assess|hold>(<position in quad>), <percentage position in ring>, <Change.none|Change.moved>, <url>, <nul|size of blip>),
      // Working example
      addBlip(quad,"Visual Studio", adopt(10), 60, Change.none),
      addBlip(quad,"nCrunch", adopt(50), 30, Change.none, 'http://www.ncrunch.net'),
      addBlip(quad,"Git", adopt(30), 90, Change.none, 'http://www.github.com/'),
      addBlip(quad,"ASP.NET", adopt(60), 70, Change.none),

      addBlip(quad,"Chef", trial(25), 30, Change.none),
      addBlip(quad,"CFEngine", trial(25), 60, Change.none),
      addBlip(quad,"Puppet", trial(75), 50, Change.none),
      addBlip(quad,"IntelliJ", trial(50), 60, Change.none),
      addBlip(quad,"Graphite", trial(50), 90, Change.none),
 

      addBlip(quad,"WebStorm", assess(50), 60, Change.none),
      addBlip(quad,"Riemann", assess(50), 30, Change.none),
      addBlip(quad,"Log Stash", assess(75), 90, 'http://logstash.net/', Change.none),

      addBlip(quad,"Feature Usage Reporting", hold(50), 50, Change.none),
      addBlip(quad,"Mercurial", hold(30), 20, Change.none),
      addBlip(quad,"Subversion", hold(30), 90, Change.none),
      addBlip(quad,"WinForms", hold(50), 30, Change.none),
      addBlip(quad,"WPF", hold(50), 60, Change.none), 
    ];
  return quadrant(quad, items);
};

var platformsQuadrant = function() {
    var quad = Quadrants.Platforms;
    var items = [ 
      //addBlip(<quad>, <item name>, <adopt|trial|assess|hold>(<position in quad>), <percentage position in ring>, <Change.none|Change.moved>, <url>, <nul|size of blip>),
      // Working example
      addBlip(quad,"Azure", adopt(10), 60, Change.none),
      addBlip(quad,"EC2", adopt(20), 30, Change.none),
      addBlip(quad,"IIS", adopt(30), 85, Change.none),

      addBlip(quad,"Linux", trial(40), 50, Change.none),
      addBlip(quad,"Mongo", trial(60), 75, Change.none),
      addBlip(quad,"Redis", trial(80), 25, Change.none),
      addBlip(quad,"MySQL", trial(20), 20, Change.none),
      addBlip(quad,"PostgreSQL", trial(95), 40, Change.none),

      addBlip(quad,"Datamoic", assess(50), 50, Change.none),
      addBlip(quad,"Apache Cordova", assess(25), 25, Change.none),

      addBlip(quad,"Physical Machines", hold(50), 50, Change.moved, "http://somewhere", 100)
    ];
  return quadrant(quad, items);
};

// Define the data sets that will be used per quadrant.
var radar_data = [ 
    techniquesQuadrant(),
    toolsQuadrant(),
    platformsQuadrant(),
    languagesQuadrant()
];
