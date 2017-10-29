"use use strict";

$(window).load(function () {
    var DataUrl;

    document.getElementById('content').innerHTML = content_generator.which_phrase();
    $('main').css('margin-top','0');
    $('p').fadeIn(800);

    $('#download').mouseenter(function(){
        $('a').css('color', '#453c2d');
        $('#info > a').css('color', 'transparent');
        html2canvas(document.body, {
            onrendered: function(canvas) {
                DataUrl = canvas.toDataURL();
                $('#download').attr({
                    href     : DataUrl,
                    download : 'test.png'
                });
            }
        });
    }).mouseleave(function() {
        $('a').css('color', 'transparent');
    });
    console.log(flip);

    setTimeout(function(){
       window.location.reload(1);
    }, 20000);
});

var content_generator;
content_generator = {
    which_phrase: function () {
        this.dice();
        if ( flip >= 0 && flip <= 3 ) {
            return this.phrase_one();
        }
        if ( flip >= 4 && flip <= 11 ) {
            return this.phrase_two();
        }
        if ( flip >= 12 && flip <= 14 ) {
            return this.phrase_three();
        }
        if ( flip >= 15 && flip <= 20 ) {
            return this.phrase_four();
        }

    },

    phrase_one: function () {
        console.log("one");
        return this.getInTheMood() + " " +
            this.verb() + " a" +
            this.noun() +  ". Think about it when you try to " +
            this.visual_verb() + " what you see.";

    },

    phrase_two: function () {
        console.log("two");
        return this.verb() + " a" +
            this.noun() + " and " +
            this.visual_verb1() + " what you see using " +
            this.drawing_tool() + ".";
    },

    phrase_three: function () {
        console.log("three");
        return "call " +  this.who() + ". While you talk, " +
            this.verb() + " a" +
            this.noun() + " and " +
            this.visual_verb() + " it.";
    },

    phrase_four: function () {
        console.log("four");
        return "measure a" +
            this.noun() + ". On a canvas similar in dimensions " +
            this.visual_verb1() + " a" +
            this.noun() + " using " +
            this.drawing_tool() +  ".";
    },

    getInTheMood: function () {
        return this.randomItemFrom(this.getInTheMoods);
    },

    visual_verb: function () {
        return this.randomItemFrom(this.visual_verbs);
    },

    visual_verb1: function () {
        return this.randomItemFrom(this.visual_verbs1);
    },

    verb: function () {
        return this.randomItemFrom(this.verbs);
    },

    noun: function () {
        return this.randomItemFrom(this.nouns);
    },

    who: function () {
        return this.randomItemFrom(this.whos);
    },

    drawing_tool: function () {
        return this.randomItemFrom(this.drawing_tools);
    },

    randomItemFrom: function (array) {
        return array[(this.randomNumber(0, (array.length - 1)))];
    },
    randomNumber: function (minNumber, maxNumber) {

        if (minNumber > maxNumber) {
            minNumber = 1;
            maxNumber = 10;
        }

        var randomNumber = (Math.floor(Math.random() * maxNumber)) + minNumber;
        return randomNumber;
    },
    dice: function () {
        flip = Math.floor(Math.random() * 20);
        return flip;
    },

    nouns: [
        " plastic bag",
        " shoe",
        " toothbrush",
        " photo you love",
        " meaningful object",
        " piece of paper",
        " section from a poem you love",
        " blue object you find in the kitchen",
        " green object",
        " red object",
        " kettle",
        "n interesting story",
        "n object you recently purchased",
        "n ugly photo of your friend",
        "n object you from your favorite room at home",
        " map of a place you’ve never been to",
        " picture of a place you love",
        " small wooden object",
        "n object that is meaningful to you",
        "n object you used to hate",
        " bed",
        " photo you found",
        " book",
        " pair of sun glasses",
        " candle",
        " scotch tape",
        " fork",
        " needle",
        " few leaves you found outside",
        " favorite shirt",
        " light",
        " pillow",
        " chair",
        " fake flower",
        " deodorant",
        " checkbook",
        " disposable cup",
        " remote control",
        " colored thread",
        " tomato",
        " wallet no one uses",
        " cleaning tool",
        " dirty towel",
        " bottle",
        " flower",
        " couple of band aids",
        " piece of hair",
        " glass of water",
        " window",
        " collection of different types of fruit",
        " few apples",
        " pair of unused socks"
    ],
    verbs: [
        "find",
        "arrange",
        "fold",
        "break",
        "take",
        "play with",
        "pretend you are",
        "touch",
        "search for",
        "examine",
        "observe",
        "analyze",
        "borrow",
        "decorate",
        "fix"
    ],

    getInTheMoods: [
        "try to not eat for two hours. Then ",
        "dance a little and then ",
        "move around the room for 5 minutes. Then  ",
        "call one of your friends and "
    ],

    visual_verbs: [
        "draw",
        "sketch",
        "depict",
        "paint",
        "take a picture of",
        "make a drawing of",
        "illustrate",
        "draw a picture of"
    ],

    visual_verbs1: [
        "draw",
        "sketch",
        "depict",
        "paint",
        "make a drawing of",
        "illustrate",
        "draw a picture of"
    ],

    whos: [
        "your mom",
        "your dad",
        "your sibling",
        "one of your friends",
        "someone you haven’t spoken with for a while",
        "your best friend",
        "a colleague of yours",
        "a family member"
    ],

    drawing_tools: [
        "only pencils",
        "a digital drawing tool",
        "a black pen",
        "a blue marker",
        "a black sharpie",
        "whatever drawing tool you find",
        "crayons",
        "only three colors",
        "only one color",
        "only two colors",
        "only straight lines",
        "only dots",
        "just curvy lines",
        "your fingerprints",
        "just 10 lines",
        "just horizontal and vertical lines",
        "only diagonal lines",
        "3 different drawing tools",
        ""

    ],

    adverbs: [
        "up",
        "",
        "out",
        "without a reason",
        "now",
        "then",
        "more",
        "also",
        "here",
        "well",
        "only",
        "at night",
        "under a table",
        "back",
        "there",
        "down",
        "still",
        "",
        "",
        "too",
        "",
        "never",
        "really soon",
        "without hesitation",
        "twice",
        "a bathtub full",
        "excessively",
        "until the sun sets",
        "because the paper got wet",
        "until she couldn&#8217;t see it anymore",
        "for about an hour",
        "while talking on the phone with the waitress",
        "continuously",
        "all the way to the moon",
        "until they or someone else interrupts",
        "forever",
        "even if the printer laughed",
        "until the camera broke down",
        "? not necessarily",
        "or if someone else did it first",
        "before it starts to stink",
        "at most"
    ],
    times: [
        "at night",
        "before going to bed",
        "later today",
        "at sunset",
        "next time you brush your teeth",
        "after you wake up in the morning",
        "after reading this",
        "next time you use Google Maps"
    ]
};