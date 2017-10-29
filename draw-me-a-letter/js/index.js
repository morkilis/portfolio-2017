"use strict";

window.onload = function(){
	$(function(){
		fade_toggle(2000);
	});
} 

$(document).on('keydown', function(){
   $(".start").remove();
   $(".circle").removeClass('hidden');
});

/*============================================
==============	SAVING AS PNG	==============
==============================================*/

d3.select("#save").on("click", function(){
  var html = d3.select("svg")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;
 
  // console.log("this "+html);
  var imgsrc = 'data:image/svg+xml;base64,'+ btoa(html);
  var img = '<img src="'+imgsrc+'">'; 
  d3.select("#svgdataurl").html(img);
 
  var canvas = document.querySelector("canvas"),
	  context = canvas.getContext("2d");
 
  var image = new Image;
  image.src = imgsrc;

  image.onload = function() {
	  context.drawImage(image, 0, 0);
 
	  var canvasdata = canvas.toDataURL("image/png");
 
	  var pngimg = '<img src="'+canvasdata+'">'; 
  	  d3.select("#pngdataurl").html(pngimg);
 
	  var a = document.createElement("a");
	  a.download = "a_letter.png";
	  a.href = canvasdata;
	  a.click();
  };
});

var insert_text = function(){
	var focus = document.getElementById("text-box").value;
	document.getElementById("text-box").innerHTML = focus;
}

insert_text(); //put the cursor in the textbox all the time basically

$(".title").click(function(){
	$("#map, #svgdataurl").children().remove();
	$(".text-box").val('');
	last_X_Pos = undefined;
	last_Y_Pos = undefined;
	choose_a_gradient();
	$('.circle').remove();
	document.getElementById('text-box').focus();
});

$('body').click(function(){
	document.getElementById('text-box').focus();   
});

$('#text_button').click(function(){
	event.preventDefault();
	$("#eye").toggleClass("hidden");
	$(".text-box").toggleClass("far-far-away");
	document.getElementById("text-box").focus();   
});

var clickedOn = {
	a: 65,
	b: 66,
	c: 67,
	d: 68,
	e: 69,
	f: 70,
	g: 71,
	h: 72,
	i: 73,
	j: 74,
	k: 75,
	l: 76,
	m: 77,
	n: 78,
	o: 79,
	p: 80,
	q: 81,
	r: 82,
	s: 83,
	t: 84,
	u: 85,
	v: 86,
	w: 87,
	x: 88,
	y: 89,
	z: 90,
	zero: 48,
	one: 49,
	two: 50,
	three: 51,
	four: 52,
	five: 53,
	six: 54,
	seven: 55,
	eight: 56,
	nine: 57,
	tab: 9,
	caps: 20,
	shift: 16,
	space: 32,
	left:37,
	up:38,
	right:39,
	down:40,
	enter: 13,
	backspace: 8,
	semi_colon: 186,
	equal_sign: 187,
	comma: 188,
	dash: 189,
	period: 190,
	forward_slash: 191,
	grave_accent: 192,
	open_bracket: 219,
	back_slash: 220,
	close_braket: 221,
	single_quote: 222,
}		
var lineNumber = 0; //line counter

var last_X_Pos;
var last_Y_Pos;
var new_X_Pos;
var new_Y_Pos;

var gradients = [
				 // {R:100, G:255, B:12},
				 // {R:40, G:50, B:200},
				 // {R:0, G:38, B:100},
				 {R:0, G:255, B:0},
				 {R:10, G:10, B:235},
				 {R:230, G:0, B:24},
				 {R:240, G:255, B:0},
				 ];

var chosen_gradient;
var nextGradient;
var gradient_name;


var fade_toggle = function(callback){
	function toggleMsg(callback) {
    $(".start").fadeToggle(
         'slow', function() {
            toggleMsg(callback) 
         });
 	}
	toggleMsg(toggleMsg);
}

var choose_a_gradient = function() { //do on page load or when the user erases the text and starts over.
	chosen_gradient = gradients[RandomfromArray(gradients)];
}

var advance_gradient = function () {
	if ( chosen_gradient == undefined ) {
		// console.log("no gradient!");
		choose_a_gradient();
	}

	if ( chosen_gradient == gradients[0] ) { 
		gradient_name = "lime to blue";
		// console.log("chosen gradient:" + gradient_name);
		chosen_gradient.R -= 2;
		chosen_gradient.G -= 2;
		chosen_gradient.B += 1;
		nextGradient = "rgb(" + chosen_gradient.R + "," + chosen_gradient.G + "," + chosen_gradient.B + ")"
	}
	if ( chosen_gradient == gradients[1] ) { 
		gradient_name = "blue to yellow";
		// console.log("chosen gradient:" + gradient_name);
		chosen_gradient.R += 1;
		chosen_gradient.G += 1;
		chosen_gradient.B -= 2;
		nextGradient = "rgb(" + chosen_gradient.R + "," + chosen_gradient.G + "," + chosen_gradient.B + ")"
	}
	if ( chosen_gradient == gradients[2] ) { 
		gradient_name = "red to yellow";
		// console.log("chosen gradient:" + gradient_name);
		chosen_gradient.R += 1;
		chosen_gradient.G += 1;
		chosen_gradient.B -= 2;
		nextGradient = "rgb(" + chosen_gradient.R + "," + chosen_gradient.G + "," + chosen_gradient.B + ")"
	}
	if ( chosen_gradient == gradients[3] ) { 
		gradient_name = "yellow to blue";
		// console.log("chosen gradient:" + gradient_name);
		chosen_gradient.R -= 1;
		chosen_gradient.G -= 1;
		chosen_gradient.B += 2;
		nextGradient = "rgb(" + chosen_gradient.R + "," + chosen_gradient.G + "," + chosen_gradient.B + ")"
	}
}

var RandomfromArray = function (array) {
	var i = parseInt(Math.random()*(array.length));
    return i;
}

var markStart = function(){
	//create a pulse circle that marks the beginning of the drawing
	advance_gradient();
	$('#circle-container').append('<div class="circle grow-circle " style="left:'+ new_X_Pos + '; top:' + new_Y_Pos + '; background-color:' + nextGradient + ';"></div>');
}

var draw_line = function(){
	advance_gradient();
	var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
	    newLine.setAttribute('id','line'+lineNumber);
	    newLine.setAttribute('x1',last_X_Pos);
	    newLine.setAttribute('y1',last_Y_Pos);
	    newLine.setAttribute('x2',new_X_Pos);
	    newLine.setAttribute('y2',new_Y_Pos);
	    newLine.setAttribute('style', 'stroke:' + nextGradient);
	    $("#map").append(newLine);
		lineNumber ++; //line counter
}

var key_mapper = function(input, keyX, keyY){
	if (event.keyCode == clickedOn.space) { 
			// choose_a_gradient(); // change a gradient every time you click on the space bar.
		}

	if (event.keyCode == input) { 
		$(document).one('keyup', function(){
			new_X_Pos = keyX;
			new_Y_Pos = keyY;
			if (last_X_Pos == undefined && last_Y_Pos == undefined){
				last_X_Pos = new_X_Pos;
				last_Y_Pos = new_Y_Pos;
				// console.log("first");
				markStart();
			}
			draw_line();
			last_X_Pos = new_X_Pos;
			last_Y_Pos = new_Y_Pos;
		});
	}
}

$(document).keydown(function(event) {
key_mapper(clickedOn.a,150,220);
key_mapper(clickedOn.b,430,280);
key_mapper(clickedOn.c,305,280);
key_mapper(clickedOn.d,272,220);
key_mapper(clickedOn.e,260,158);
key_mapper(clickedOn.f,335,220);
key_mapper(clickedOn.g,395,220);
key_mapper(clickedOn.h,460,220);
key_mapper(clickedOn.i,565,158);
key_mapper(clickedOn.j,525,220);
key_mapper(clickedOn.k,580,220);
key_mapper(clickedOn.l,645,220);
key_mapper(clickedOn.m,550,280);
key_mapper(clickedOn.n,490,280);
key_mapper(clickedOn.o,630,158);
key_mapper(clickedOn.p,690,158);
key_mapper(clickedOn.q,133,158);
key_mapper(clickedOn.r,320,158);
key_mapper(clickedOn.s,210,220);
key_mapper(clickedOn.t,380,158);
key_mapper(clickedOn.u,505,158);
key_mapper(clickedOn.v,365,280);
key_mapper(clickedOn.w,195,158);
key_mapper(clickedOn.x,242,280);
key_mapper(clickedOn.y,445,158);
key_mapper(clickedOn.z,320,158);

key_mapper(clickedOn.one,105,94);
key_mapper(clickedOn.two,165,94);
key_mapper(clickedOn.three,230,94);
key_mapper(clickedOn.four,290,94);
key_mapper(clickedOn.five,350,94);
key_mapper(clickedOn.six,415,94);
key_mapper(clickedOn.seven,475,94);
key_mapper(clickedOn.eight,535,94);
key_mapper(clickedOn.nine,600,94);
key_mapper(clickedOn.zero,660,94);

key_mapper(clickedOn.tab,62,258);
key_mapper(clickedOn.grave_accent,40,94);
key_mapper(clickedOn.space,430,340);
key_mapper(clickedOn.period,680,280);
key_mapper(clickedOn.comma,615,280);
key_mapper(clickedOn.semi_colon,706,220);
key_mapper(clickedOn.forward_slash,735,280);
key_mapper(clickedOn.back_slash,875,158);
key_mapper(clickedOn.equal_sign,785,94);
key_mapper(clickedOn.dash,722,94);

key_mapper(clickedOn.single_quote,770,220);
key_mapper(clickedOn.open_bracket,750,158);
key_mapper(clickedOn.close_braket,815,158);
key_mapper(clickedOn.left,752,357);
key_mapper(clickedOn.right,878,357);
key_mapper(clickedOn.up,815,325);
key_mapper(clickedOn.down,815,357);
key_mapper(clickedOn.enter,855,220);
key_mapper(clickedOn.backspace,865,94);
	
});

/*
x,y position of keys on keyboard:

`		40,94
1 		105,94
tab 		62,258
2 		165,94
q 		133,158
3 		230,94
w 		195,158
4 		290,94
e 		260,158
5 		350,94
r 		320,158
6 		415,94
t 		380,158
7 		475,94
y 		445,158
8 		535,94
u 		505,158
9 		600,94
i 		565,158
0 		660,94
o 		630,158
- 		722,94
p 		690,158
= 		785,94
[ 		750,158
<x 		865,94
] 		815,158
enter 	855,220
\ 		875,158
' 		770,220
R shift 	840,280
right 	878,357
up 		815,325
down		815,357
left		752,357
/ 		735,280
R option 690,340
; 		706,220 
. 		680,280
l 		645,220
, 		615,280
k 		580,220
m 		550,280
Rcommand 622,340
space 	430,340
n 		490,280
j 		525,220
h 		460,220
b 		430,280
g 		395,220
v 		365,280
f 		???????
c 		305,280
d 		272,220
x 		242,280
s 		210,220
z 		180,280
a 		150,220
CAPS 	65,220
L shift 	81,280
fn 		40,340
control 	105,340
Loption 	165,340
Lcommand 236,340



*/



/*
	if (event.keyCode == clickedOn.z) { 
		$(document).keyup(function(){
			new_X_Pos = 180;
			new_Y_Pos = 280;
			if (last_X_Pos == undefined && last_Y_Pos == undefined){
				last_X_Pos = new_X_Pos;
				last_Y_Pos = new_Y_Pos;
				// $("#map").css({stroke:transparent});
				console.log("first");
			}
			draw_line();
			last_X_Pos = new_X_Pos;
			last_Y_Pos = new_Y_Pos;
		});
	}

	if (event.keyCode == clickedOn.p) { 
		$(document).keyup(function(){
			new_X_Pos = 690;
			new_Y_Pos = 158;
			if (last_X_Pos == undefined && last_Y_Pos == undefined){
				last_X_Pos = new_X_Pos;
				last_Y_Pos = new_Y_Pos;
				// $("#map").css({stroke:transparent});
				console.log("first");
			}
			draw_line();
			last_X_Pos = new_X_Pos;
			last_Y_Pos = new_Y_Pos;
			console.log("last_X_Pos", last_X_Pos);
			console.log("last_Y_Pos", last_Y_Pos);
			console.log("new_X_Pos", new_X_Pos);
			console.log("new_Y_Pos", new_Y_Pos);
		});
	}

	if (event.keyCode == clickedOn.r) { 
		$(document).keyup(function(){
			new_X_Pos = 320;
			new_Y_Pos = 158;
			if (last_X_Pos == undefined && last_Y_Pos == undefined){
				last_X_Pos = new_X_Pos;
				last_Y_Pos = new_Y_Pos;
				// $("#map").css({stroke:transparent});
				console.log("first");
			}
			draw_line();
			last_X_Pos = new_X_Pos;
			last_Y_Pos = new_Y_Pos;
			console.log("last_X_Pos", last_X_Pos);
			console.log("last_Y_Pos", last_Y_Pos);
			console.log("new_X_Pos", new_X_Pos);
			console.log("new_Y_Pos", new_Y_Pos);
		});
	}
*/

