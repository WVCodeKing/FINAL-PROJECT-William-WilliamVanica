let cnv;
let isVideoLoaded = false;
let currentSuperbowl = null;

let superbowls = [
  { year: 1967, rating: 41.1, start: 0, end: 7 },
  { year: 1968, rating: 36.8, start: 7, end: 15 },
  { year: 1969, rating: 36, start: 15, end: 23 },
  { year: 1970, rating: 39.4, start: 23, end: 31 },
  { year: 1971, rating: 39.9, start: 31, end: 39 },
  { year: 1972, rating: 44.2, start: 39, end: 47 },
  { year: 1973, rating: 42.7, start: 47, end: 55 },
  { year: 1974, rating: 41.6, start: 55, end: 63 },
  { year: 1975, rating: 42.4, start: 63, end: 71 },
  { year: 1976, rating: 42.3, start: 71, end: 78 },
  { year: 1977, rating: 44.4, start: 78, end: 86 },
  { year: 1978, rating: 47.2, start: 86, end: 94 },
  { year: 1979, rating: 47.1, start: 94, end: 102 },
  { year: 1980, rating: 46.3, start: 102, end: 110 },
  { year: 1981, rating: 44.4, start: 110, end: 118 },
  { year: 1982, rating: 49.1, start: 118, end: 126 },
  { year: 1983, rating: 48.6, start: 126, end: 134 },
  { year: 1984, rating: 46.4, start: 134, end: 142 },
  { year: 1985, rating: 46.4, start: 142, end: 150 },
  { year: 1986, rating: 48.3, start: 150, end: 158 },
  { year: 1987, rating: 45.8, start: 158, end: 165 },
  { year: 1988, rating: 41.9, start: 165, end: 173 },
  { year: 1989, rating: 43.5, start: 173, end: 181 },
  { year: 1990, rating: 39, start: 181, end: 188 },
  { year: 1991, rating: 41.9, start: 188, end: 196 },
  { year: 1992, rating: 40.3, start: 196, end: 204 },
  { year: 1993, rating: 45.1, start: 204, end: 221 },
  { year: 1994, rating: 45.5, start: 221, end: 228 },
  { year: 1995, rating: 41.3, start: 228, end: 234 },
  { year: 1996, rating: 46, start: 234, end: 242 },
  { year: 1997, rating: 43.3, start: 242, end: 258 },
  { year: 1998, rating: 44.5, start: 258, end: 267 },
  { year: 1999, rating: 40.2, start: 267, end: 274 },
  { year: 2000, rating: 43.3, start: 274, end: 282 },
  { year: 2001, rating: 40.4, start: 282, end: 295 },
  { year: 2002, rating: 40.4, start: 295, end: 320 },
  { year: 2003, rating: 40.7, start: 320, end: 330 },
  { year: 2004, rating: 41.4, start: 330, end: 340 },
  { year: 2005, rating: 41.1, start: 340, end: 357 },
  { year: 2006, rating: 41.6, start: 357, end: 375 },
  { year: 2007, rating: 42.6, start: 375, end: 383 },
  { year: 2008, rating: 43.1, start: 383, end: 394 },
  { year: 2009, rating: 42, start: 394, end: 405 },
  { year: 2010, rating: 45, start: 405, end: 414 },
  { year: 2011, rating: 46, start: 414, end: 420 },
  { year: 2012, rating: 47, start: 420, end: 431 },
  { year: 2013, rating: 46.4, start: 431, end: 445 },
  { year: 2014, rating: 46.7, start: 445, end: 452 },
  { year: 2015, rating: 47.5, start: 452, end: 460 },
  { year: 2016, rating: 46.6, start: 460, end: 470 },
  { year: 2017, rating: 45.3, start: 470, end: 480 },
  { year: 2018, rating: 43.1, start: 480, end: 486 },
  { year: 2019, rating: 41.1, start: 486, end: 492 },
  { year: 2020, rating: 41.6, start: 492, end: 504 },
  { year: 2021, rating: 38.2, start: 504, end: 514 },
  { year: 2022, rating: 36.9, start: 514, end: 523 },
  { year: 2023, rating: 40, start: 523, end: 530 },
]

function setup() {
  cnv = createCanvas(windowWidth, 400);
  cnv.parent("myP5");
  windowResized();
  vid = createVideo("https://jdeboi-public.s3.us-east-2.amazonaws.com/SuperBowlClips.mp4", vidLoad);
  vid.hide();
}

function draw() {
  if (isVideoLoaded == false) {
    displayLoading();
  }
  else (currentSuperbowl) 
    displaySuperbowl();
  }


function displayLoading() {
  background(255);
  text("loading video...", 100, 100);
}

function displayButtons() {
  background("blue");
}

function displaySuperbowl() {
  background(0);
  if (currentSuperbowl) {
    if (vid.time() > currentSuperbowl.end) {
      vid.pause();
      currentSuperbowl = null;
    }
    else {
      image(vid, 0, 0, width, height);
    }
  }

}



function mousePressed() {
  console.log("year", yearMouse)
  playSuperbowl(yearMouse - 1967);
}

function playSuperbowl(id) {
  if (isVideoLoaded) {
    currentSuperbowl = superbowls[id];
    console.log(currentSuperbowl);
    let year = select("#yearHTML");
    year.html(currentSuperbowl.year)
    let SB = select("#SBHTML");
    SB.html(id+1)
    let rating = select("#RHTML");
    rating.html(" " + currentSuperbowl.rating)
    vid.play()
    vid.time(currentSuperbowl.start);
  }
}

// This function is called when the video loads
function vidLoad() {
  console.log("video loaded");
  vid.volume(0);
  vid.size(500, 500);
  // vid.loop();
  isVideoLoaded = true;
}

// Chat GPT
function windowResized() {
  // When the window is resized, get the new dimensions of the parent div
  let canvasContainer = select("#myP5");
  let cW = canvasContainer.width;
  let cH = canvasContainer.height;
  resizeCanvas(cW, cH);
}