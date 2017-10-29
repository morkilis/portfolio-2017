$('.roll').click(function() {
    begin_roll();
});


// ##################################
// #### Game Board ##################
// ##################################


// Draws the game board on page load
function initialize_game_board() {
    
}


// Redraws the current player's portion of the game
// board at the end of their turn
function render_roll() {
 if (isRunning == false) {
        isRunning = true;
//if it's night
if ((players[Game.current_player].roll_results[1]) % 2 == 0) { 
$('.dream').html(Dreams[players[Game.current_player].roll_results[0]-1]); //picks a dream from the dreams array
$('span.dream-number').html(players[Game.current_player].roll_results[0]); //writes the relevant night dice number
console.log(players[Game.current_player].roll_results[0])

}
//if it's day
else{ 
 $('.day-image').append('<img id="day-image" src="'+ Days[players[Game.current_player].roll_results[0]-1][Math.floor(Math.random()*Days[players[Game.current_player].roll_results[0]-1].length)] +'">'); //picks an image/gif/text from the Day array
 $('span.day-number').html(players[Game.current_player].roll_results[0]); //writes the relevant day dice number
}
isRunning = false;
}

// else{ 
//  $('.day-image').css('background-image','url(' + Days[players[Game.current_player].roll_results[0]-1][Math.floor(Math.random()*Days[players[Game.current_player].roll_results[0]-1].length)
// ] + ')'); //picks an image/gif/text from the Day array
//  $('span.day-number').html(players[Game.current_player].roll_results[0]); //writes the relevant day dice number
// }



}


// If there is a winner, draw the results
function announce_winner() {
    $('.roll').html('Game over');
    Game.end = true;
    alert('GAME OVER, check logs for winner(s)!');
    $(Game.winning_player).each(function(x) {
        var player = '.player-' + Game.winning_player[x];
        $(player).css({ 'background': '#0f0'});
        console.log('Player ' + Game.winning_player[x] + ' wins with a score of ' + players[Game.winning_player[x]].total_score + '!');
    });
}