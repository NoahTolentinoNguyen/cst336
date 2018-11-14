var selectedWord = "";
var selectedHint = "";
var showHint = false;
var board = [];
var remainingGuesses = 6;
var words = [{word: "snake",  hint: "It's a reptile" }, 
             {word: "monkey", hint: "It's a mammal" },
             {word: "beetle",  hint: "It's an insect" }];
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 
                'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];


window.onload = startGame();

$(document).on("click", ".letter", function() {
    checkLetter($(this).attr("id"));
    disableButton($(this));
});

$(".replayBtn").on("click", function() {
    location.reload();
})

$(document).on("click","#hintBtn", function() {
    $(this).hide();
    $(".hint").show();
    showHint = true;
    remainingGuesses-=1;
    updateMan();
})
  
function startGame() {
    pickWord();
    initBoard();
    updateBoard();
    createLetters();
}

function initBoard() {
    for(var letter in selectedWord) {
            board.push("_");
    }
    
}

function updateBoard() {
    $("#word").empty();
    
    for(var i=0; i < board.length; i++) {
        $("#word").append(board[i] + " ");
    }
    
    $("#word").append("<br>");
   
    $("#word").append("<span class='hint'>Hint: " + selectedHint + "</span>");

    if(!showHint) {
        $(".hint").hide();
        $("#word").append("<button id='hintBtn'>Get Hint</button>");
    }
}

function pickWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
}

function createLetters() {
    for(var letter of alphabet) {
        $("#letters").append("<button class='letter btn btn-success' id='" + letter + "'>" + letter + "</button>");
    }
}

function checkLetter(letter) {
    var positions = new Array();
    for(var i = 0; i < selectedWord.length; i++) {
        console.log(selectedWord)
        if(letter == selectedWord[i]) {
            positions.push(i);
        }
    }
    
    if(positions.length > 0) {
        updateWord(positions, letter);
        
        if(!board.includes('_')) {
            endGame(true);
        }
    }
    else {
        remainingGuesses -=1;
        updateMan();
    }
  
}

function updateWord(positions, letter) {
    for(var pos of positions) {
        board[pos] = letter;
    }
    updateBoard();
}

function disableButton(btn) {
    btn.prop("disbled", true);
    btn.attr("class", "btn btn-danger");
}

function updateMan() {
    $("#hangImg").attr("src", "img/stick_" + (6-remainingGuesses) + ".png");
    if(remainingGuesses <= 0) {
        $(".hint").hide();
        $("#hintBtn").hide();
        endGame(false);
    }
}

function endGame(win) {
    $("#letters").hide();
    if(win) {
        $('#won').show();
        
    }
    else {
        $('#lost').show();
    }
}