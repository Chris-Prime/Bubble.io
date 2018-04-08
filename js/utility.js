function clamp(num, min, max) {
  return num <= min ? min : num >= max ? max : num;
}

// Calculates the distance between the RGB values.
// We need to know the distance between two colors
// so that we can calculate the increment values for R, G, and B.
function calculateDistance(ccolor, tcolor) {
	var distance = [];
	for (var i = 0; i < tcolor.levels.length; i++) {
		distance.push(Math.abs(ccolor.levels[i] - tcolor.levels[i]));
	}
	return distance;
}

// Calculates the increment values for R, G, and B using distance, fps, and duration.
// This calculation can be made in many different ways.
function calculateIncrement(distanceArray, fps, duration) {
	var fps			= fps || 30;
	var duration	= duration || 1;
	var increment	= [];
	for (var i = 0; i < distanceArray.length; i++) {
		var incr = Math.abs(Math.floor(distanceArray[i] / (fps * duration)));
		if (incr == 0) {
			incr = 1;
		}
		increment.push(incr);
	}
	return increment;
}

/* ==================== Transition Calculator ==================== */

// Transisions between two colors by increment
// returns boolean, true if transision ended
function transition(ccolor, tcolor, increment) {
	for(var i = 0; i < increment.length; i++) {
    	if (ccolor.levels[i] > tcolor.levels[i]) {
    		ccolor.levels[i] -= increment[i];
    		if (ccolor.levels[i] <= tcolor.levels[i]) {
    			ccolor.levels[i] = tcolor.levels[i];
    			increment[i] = 0;
    		}
    	} else {
    		ccolor.levels[i] += increment[i];
    		if (ccolor.levels[i] >= tcolor.levels[i]) {
    			ccolor.levels[i] = tcolor.levels[i];
    			increment[i] = 0;
    		}
    	}
	}

	// transition ended. start a new one
	if (increment[0] == 0 && increment[1] == 0 && increment[2] == 0) {
		return true;
	} else {
	    return false;
	}
}

function rgb2hex(rgb){
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4) ? "#" +
		("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function heatColor(value, min, max, s, b) {
	colorMode(HSB);
	var c = color(map(value, min, max, 0, 360), s || 100, b || 100);
	colorMode(RGB);
	return c;
}