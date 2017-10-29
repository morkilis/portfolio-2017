var windowheight = window.innerHeight // height of browser window
var info = document.getElementsByTagName('a');
var INFO_STATE = false;


$(window).load(function () {
  $('#info').blindRightToggle('fast');
   font_size();
   $('#content').focus();

    $('#right-arrow').click(function() {
       $('body').addClass('black-background white-text');
       $('a').css({'color' : 'white', 'border-bottom' : '1px solid white'});
       document.getElementById('content').innerHTML = content_generator.which_phrase();
       font_size();
       
    });

    $('#left-arrow').click(function(){
        $('body').removeClass('black-background white-text');
        $('a').css({'color' : 'black', 'border-bottom' : '1px solid black'});
        document.getElementById('content').innerHTML = content_generator.which_phrase();
        font_size();
       
    });

    $(document).keydown(function(e) {
       switch(e.which) {
           case 37: // left
             $('body').removeClass('black-background white-text');
             $('a').css({'color' : 'black', 'border-bottom' : '1px solid black'});
              document.getElementById('content').innerHTML = content_generator.which_phrase();
              font_size();
             
           break;

           case 39: // right
            $('body').addClass('black-background white-text');
            $('a').css({'color' : 'white', 'border-bottom' : '1px solid white'});
             document.getElementById('content').innerHTML = content_generator.which_phrase();
             font_size();
             
           break;

           default: return; // exit this handler for other keys
       }
       e.preventDefault(); // prevent the default action (scroll / move caret)
   });

   $('a').click(function () {
    $('footer').toggleClass('black-text');
    $(info[1]).toggleClass('a_info');
      if ( INFO_STATE == false ) {
        $('#info').removeClass('hidden').blindRightToggle('slow');
        info[1].innerHTML = "&#215";
        INFO_STATE = true;
      } else {
        $('#info').blindRightToggle('slow');
        info[1].innerHTML = "info";
        INFO_STATE = false;
      }
    });
});

jQuery.fn.blindRightToggle = function (duration, easing, complete) {
    return this.animate({
        marginLeft: -(parseFloat(this.css('marginLeft'))) < 0 ? 0 : this.outerWidth()
    }, jQuery.speed(duration, easing, complete));
};


var font_size = function () {
   var string_length = document.getElementById('content').innerHTML.length;

   var styling_to_size = function(size, top_pos){
      $('#content').removeClass('xxxl xxl xl l m s').addClass(size).css({ 'margin-top' : windowheight/2 - top_pos + 'px'});;
   }

         if( string_length < 6 ){
            styling_to_size('xxxl', 400);
          }

          else if( string_length < 9 ){
            styling_to_size('xxl', 200);
          }

         else if( string_length < 30 ){
            styling_to_size('xxl', 300);
          }

         else if( string_length < 40 ){
            styling_to_size('xl', 180);
          }

         else if( string_length < 50){
            styling_to_size('l', 120);
          }

         else if( string_length < 60){
            styling_to_size('m', 70);
          }
          
         else if( string_length < 200){
            styling_to_size('s', 50);
          }
    
}



var content_generator = {
   which_phrase    : function() {
      this.dice();
      if (flip == 0){
         return this.phrase_one();
      }
      if (flip == 1){
         return this.phrase_two();
      }
      if (flip == 2){
         return this.phrase_three();
      }
      if (flip == 3){
         return this.phrase_four();
      }
   },

   phrase_one      : function() {
      return   this.verb()  + " " + 
               this.noun() + " " + 
               this.adverb() + 
               this.punctuation();
   },

   phrase_two      : function() {
      return   this.noun() + " " + 
               this.verb()  + " " +
               this.adverb() + 
               this.punctuation();
   },

   phrase_three      : function() {
      return   this.noun() + " and " + 
               this.noun() + " " +
               this.verb()  + " " +
               this.adverb() + 
               this.punctuation();
   },

   phrase_four      : function() {
      return   this.verb() +
               this.punctuation();
   },

   verb        : function() {
      return this.randomItemFrom(this.verbs);
   }, 

   noun        : function() {
      return this.randomItemFrom(this.nouns);
   }, 
   
   adverb       : function() {
      return this.randomItemFrom(this.adverbs);
   },
   punctuation           : function() {
      return this.randomItemFrom(this.punctuations);
   }, 
   
   randomItemFrom    : function(array) {
      return array[(this.randomNumber(0, (array.length - 1) ))];
   },
   randomNumber      : function(minNumber, maxNumber) {
      
      if ( minNumber > maxNumber ) {
           minNumber                      = 1;
           maxNumber                      = 10;
      }

       var randomNumber                   = (Math.floor(Math.random() * maxNumber)) + minNumber;
       return randomNumber;
   },
   dice        : function() {
      flip                             = Math.floor(Math.random() * 4);
      return flip;
   },

   nouns             : [
         "A PLASTIC BAG",
         "ELECTRIC WIRES",
         "THE SCREEN",
         "THIS JACKET",
         "ALL OF THE HANGERS",
         "",
         "",
         "",
         "COLD ZIPPERS",
         "THE BOOKS",
         "CHILDREN LIKE TO ",
         "STRONG ROPES USED FOR SAILING VAST WATERS",
         "EYES THAT CANT SEE",
         "YOU SHOULD",
         "3 LIGHT BULBS",
         "DIRTY SHEETS and WET UMBRELLAS",
         "4 FOOT THREAD",
         "CRY IN CASE WE ",
         "PROJECTED LIGHTS",
         "THE GOVERNMENT",
         "MAGNETS",
         "DIRT COLLECTED ON THE SOLES OF YOUR SHOES AFTER A LONG DAY WALKING THROUGH THE CITY",
         "WATER ABSORBED IN A PLASTIC RAP THAT ONCE COVERED ME",
         "A PROBLEM CAN&#8217;T",
         "THE SOFTEST TISSUE PAPER YOU CAN FIND",
         "ANYONE IS ABLE TO",
         "A BOTTLE OF TEARS",
         "ACOUSTICS",
         "",
         "",
         "",
         "",
         "",
         "BAND AID",
         "SKIN",
         "PEOPLE WHO BELIEVE IN THE BLUE SKY",
         "TONGUES WITH HOLES",
         "HUMAN HAIR",
         "GOLDEN GATES",
         "WHEN BOUNDARIES",
         "ANY BREAKFAST PREPARED BY A THOUGHT",
         "A CABBAGE",
         "HELP",
         "CALCULATORS",
         "SWIM IN FRESH AIR AFTER YOU",
         "AND",
         "THE CREATOR",
         "80 CEMETARIES",
         "DON&#8217;T CRY TO THE SOUND OF A SLAMMING DOOR.",
         "A NEVER-ENDING WALL",
         "",
         "APPLES and DATES",
         "5 VERY SMALL FEATHERS",
         "THE TRAIN",
         "THE CONTROL ROOM",
         "A TRACE OF CONFUSION LED MS. ROBINSON TO",
         "A FEW REFUGEES",
         "THE BEST COMMUNICATOR SHOULD",
         "",
         ""
      ],
   verbs             : [
         "add",
         "allow",
         "ask",
         "bake",
         "bang",
         "be",
         "call",
         "chase",
         "come",
         "damage",
         "do",
         "drop",
         "end",
         "escape",
         "fasten",
         "feel",
         "find",
         "fix",
         "gather",
         "get",
         "give",
         "go",
         "grab",
         "hang",
         "have",
         "hug",
         "imagine",
         "itch",
         "jog",
         "jump",
         "kick",
         "knit",
         "know",
         "land",
         "leave",
         "lock",
         "look",
         "make",
         "march",
         "mix",
         "name",
         "notice",
         "obey",
         "open",
         "pass",
         "promise",
         "question",
         "reach",
         "rinse",
         "say",
         "scatter",
         "see",
         "seem",
         "stay",
         "take",
         "talk",
         "tell",
         "think",
         "try",
         "turn",
         "untie",
         "use",
         "vanish",
         "visit",
         "walk",
         "want",
         "work",
         "yawn",
         "yell",
         "zip",
         "zoom"
      ],
   adverbs        : [
            "up",
            "",
            "out",
            "without a reason",
            "now",
            "",
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
   punctuations      : [
         ".",
         ".",
         ".",
         ".",
         ".",
         ".",
         "?",
         "!",
         "!"
      ]
};



