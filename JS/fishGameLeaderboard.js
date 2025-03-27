const fishGameLeaderboard_namespace = function () { // this keeps some names private, like the_number and the_leaderboard,
    // while making others visible by returning them as components of an object


// an empty leaderboard
var the_leaderboard = {names_scores:[], max_entries:6};



async function save_score() {

const name = document.getElementById("player_name").value;
const score = me.points;

// Use the JavaScript fetch() method to run the php program on the server
// Using GET to make it easier to send score, which isn't in a form.
const response = await fetch(`save_scoreFG.php?name=${name}&score=${score}`, {
method: 'GET'
})

if (response.ok) {

document.getElementById("response").innerHTML= `You scored ${score}.`

// refresh the leaderboard if the leaderboard is not full, or if the
// new score is greater than the lowest score on the leaderboard, 

if (the_leaderboard.names_scores.length < the_leaderboard.max_entries) {
display_leaderboard()

} else if (score > the_leaderboard.names_scores[the_leaderboard.names_scores.length - 1].score) {
display_leaderboard()   
}

} else {
document.getElementById("response").innerHTML= "I'm sorry, your score hasn't been saved."
}
}

// create a new row for the leaderboard that looks like <tr><td>player_name</td><td>player_score</td></tr>
function createLeaderBoardRow (player_name, player_score) {

const row = document.createElement("tr");

// the player name
const name_data = document.createElement("td");
name_data.innerHTML = player_name;
row.appendChild(name_data);

// the player score
const score_data = document.createElement("td");
score_data.innerHTML = player_score;
row.appendChild(score_data);

return row;
}

async function display_leaderboard () {
const top_scores = document.getElementById("top_scores1");

// remove all the names and scores from the body of the displayed leaderboard
while (top_scores.hasChildNodes()) { 
top_scores.removeChild(top_scores.firstChild)
}

// and clear the numeric scores from the_leaderboard
the_leaderboard.scores = [];

// Use fetch() to run php and obtain the scores data
const names_scores_response = await fetch(`top_n_scoresFG.php?n=${the_leaderboard.max_entries}`)
{
method: 'GET'
}

if (names_scores_response.ok) {

// names_scores_response is an entire HTTP response, encoded as JSON
// .json() extracts the json body part of the HTTP response, and returns a JavaScript object that we can work with
const names_scores = await names_scores_response.json();

// add a row to the leaderboard for each name and score
names_scores.forEach( 
function (value) {

// each entry in names_scores is a string like '("name","score")'

const name_score = value.replace('(','')  // so we remove the (
.replace(')','')                // and the )
.split(",");                    // and split the remaining string into an array: ["name","score"]

// so name_score now looks like ["name", "score"]
// which we can use to create a new row for the displayed leaderboard
top_scores.appendChild(createLeaderBoardRow(name_score[0],name_score[1]));

// an in-memory array that represents the leaderboard
// in this code, only the scores are used
the_leaderboard.names_scores.push({name: name_score[0], score: parseInt(name_score[1])});

}) // end forEach
}   
}

return {  // this object is assigned to random_leaderboard_namespace to make display_leaderboard etc. visible 
display_leaderboard: display_leaderboard,
save_score: save_score
}
}()