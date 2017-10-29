// ##################################
// #### Scoring #####################
// ##################################

// Edit this function to take on your own roll scoring
// method. In this case we are summing the dice roll
// values and pushing the total to the current player's
// roll score.
var randomDiceNum;
var randomDayOrNight;

function set_roll_score() {

    console.log("dice values: " + players[Game.current_player].roll_results);
    var even = true; // checks to see if I'm talking about the first value or second value of the dice roll (or in other words 0 or 1 in the array of the two dice results)
    var roll_score = 0;
    $(players[Game.current_player].roll_results).each(function(index, value) {
        roll_score += value;
        console.log(value);
       
        // checks to see if I'm talking about the first value or second value of the dice roll (or in other words 0 or 1 in the array of the two dice results)
        if (even==true) { 
            // you are in dice roll 1 -> Dice Number
            randomDiceNum = 'url(' + diceNumber[value-1] + ')'; //picks the correct dice number image
            even = false;
        } else {
            //you are in dice roll 2 -> Day or Night
            randomDayOrNight = 'url(' +  DayNight[value-1] + ')'; //picks the correct day/night image

        }
        
        

    });
    players[Game.current_player].roll_scores.push(roll_score);
    console.log("dice sum: " + players[Game.current_player].roll_scores);


}

// Edit this function to take on your own turn scoring method.
// In this case, we are subtracting every other roll from the
// one that precedes it.
function set_turn_score() {
    $(players[Game.current_player].roll_scores).each(function(index, value) {
        if ((index + 1) % 2 == 0) {
            players[Game.current_player].total_score -= value;
        } else {
            players[Game.current_player].total_score += value;
        }

        //if score is less than 0, set score equal to 0
        if (players[Game.current_player].total_score < 0) {
            players[Game.current_player].total_score = 0;
        }
    });
    console.log("round score: " + players[Game.current_player].total_score);
}