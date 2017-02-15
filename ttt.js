//Global for now. Perhaps a better solution?
var turn = "X";
var turns = 0;
var winner = "";
var xScore = 0;
var oScore = 0;

//Function called whenever one of the buttons(spots) is clicked. Will fill the spot with an X or O...
//...depending on whose turn it is.
function chooseSpot(spotID) {
  require(["dojo/dom"], function(dom){
    var messageNode = dom.byId("message");
    var xScoreNode = dom.byId("xScore");
    var oScoreNode = dom.byId("oScore");
    var spotNode = dom.byId(spotID);

    if(turns === 9) {
      if(checkForWinner(dom)) {
        messageNode.innerHTML = "Game Over! " + winner + " is the winner!";
        if(winner === "X") {
          xScore++;
        }
        else {
          oScore++;
        }
        xScoreNode.innerHTML = xScore;
        oScoreNode.innerHTML = oScore;
      }
      else {
        messageNode.innerHTML = "Game Over! No winner!";
      }
    }
    else if(winner === ""){
      if(spotFree(spotID, dom)) {
        spotNode.innerHTML = turn;
        if(checkForWinner(dom)) {
          messageNode.innerHTML = "Game Over! " + winner + " is the winner!";
          if(winner === "X") {
            xScore++;
          }
          else {
            oScore++;
          }
          xScoreNode.innerHTML = xScore;
          oScoreNode.innerHTML = oScore;
        }
        else {
          if(turn === "X") {
            turn = "O";
          }
          else {
            turn = "X";
          }
          messageSwitch(dom);
          turns++;

          if(turns == 9) {
            if(checkForWinner(dom)) {
              messageNode.innerHTML = "Game Over! " + winner + " is the winner!";
              if(winner == "X") {
                xScore++;
              }
              else {
                oScore++;
              }
              xScoreNode.innerHTML = xScore;
              oScoreNode.innerHTML = oScore;
            }
            else {
              messageNode.innerHTML = "Game Over! No winner!";
            }
          }
        }
      }
      else {
        messageNode.innerHTML = "Spot Taken Player " + turn + ". Try again!";
      }
    }
  });
}

//Small helper function. Checks if a spot has been taken.
function spotFree(spotID, dom) {
  if(dom.byId(spotID).innerHTML === "") {
    return true;
  }
  return false;
}

//Helper function. Checks to see if victory has happened. Likely a better solution.
function checkForWinner(dom) {
  
    var vals = ["placeholder", dom.byId("1").innerHTML, dom.byId("2").innerHTML, dom.byId("3").innerHTML, dom.byId("4").innerHTML, 
      dom.byId("5").innerHTML, dom.byId("6").innerHTML, dom.byId("7").innerHTML, dom.byId("8").innerHTML, dom.byId("9").innerHTML];
	
    if(allTheSame(vals[1], vals[2], vals[3])) {
      winner = vals[1];
      paintWinningCombo(dom,1,2,3);
      return true;
    }
    else if(allTheSame(vals[4], vals[5], vals[6])) {
      winner = vals[4];
      paintWinningCombo(dom,4,5,6);
      return true;
    }
    else if(allTheSame(vals[7], vals[8], vals[9])) {
      winner = vals[7];
      paintWinningCombo(dom,7,8,9);
      return true;
    }
    else if(allTheSame(vals[1], vals[4], vals[7])) {
      winner = vals[1];
      paintWinningCombo(dom,1,4,7);
      return true;
    }
    else if(allTheSame(vals[2], vals[5], vals[8])) {
      winner = vals[2];
      paintWinningCombo(dom,2,5,8);
      return true;
    }
    else if(allTheSame(vals[3], vals[6], vals[9])) {
      winner = vals[3];
      paintWinningCombo(dom,3,6,9);
      return true;
    }
    else if(allTheSame(vals[1], vals[5], vals[9])) {
      winner = vals[1];
      paintWinningCombo(dom,1,5,9);
      return true;
    }
    else if(allTheSame(vals[3], vals[5], vals[7])) {
      winner = vals[3];
      paintWinningCombo(dom,3,5,7);
      return true;
    }
    return false;
  
}

//Helper function. Checks if three strings are the same and also not empty.
function allTheSame(str1, str2, str3) {
  if(str1 === str2 && str1 === str3 && str1 !== "") {
    return true;
  }
  return false;
}

//Helper Function. Paints the winning combination red.
function paintWinningCombo(dom, x, y, z) {
  dom.byId(x+"").style.color = 'red';
  dom.byId(y+"").style.color = 'red';
  dom.byId(z+"").style.color = 'red';
}

//Small function to swap the message seen at the bottom of the page. 
function messageSwitch(dom) {
  currentMessage = dom.byId("message").innerHTML;
  if(currentMessage.includes("X")) {
    dom.byId("message").innerHTML = "Player Two (O). Choose a Spot!";
  }
  else {
    dom.byId("message").innerHTML = "Player One (X). Choose a Spot!";
  }
}

function setRandomColor(dom) {
  require(["dojo/dom-style"], function(domStyle){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var color = "rgb(" + r + ", " + g + ", " + b + ")";
	var color2 = "rgb(" + (255-r) + ", " + (255-g) + ", " + (255-b) + ")";
	dojo.style("body", {"background-color": color});
	dojo.style("message", {"color": color2});
	dojo.style("scoresX", {"color": color2});
	dojo.style("scoresO", {"color": color2});
	dojo.style("xScore", {"color": color2});
	dojo.style("oScore", {"color": color2});
  });
  
}


//Function to reset the game without reloading the page itself.
function resetGame() {
  require(["dojo", "dojo/dom"], function(dom){
    turn = "X";
    turns = 0;
    winner = "";
    for(i = 1; i < 10; i++) {
      dom.byId(i+"").innerHTML = "";
      dom.byId(i+"").style.color = 'black';
    }
    dom.byId("message").innerHTML = "Player One (X). Choose a Spot!";
	setRandomColor(dom);
  });
}