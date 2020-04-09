class Game {
  constructor(totalTime, cards) {
    this.totalTime = totalTime;
    this.cards = cards;
    this.timeRemaining = totalTime
    this.timer = $("#time")
  }
  startGame() {
    this.cardToCheck = null;
    this.timeRemaining = this.totalTime;
    this.matchedCards = [];
    this.countDown = this.startCountDown();
    this.busy = true;
    setTimeout(_ => this.busy = false, 500);
    this.hideCards();
    this.timer.text = this.timeRemaining;
  }
  hideCards() {
    this.cards.each((i, card) => {
      $(card).removeClass("visible");
    })
  }
  flipCard(card) {
    if(this.canFlipCard(card)) {
      $(card).addClass("visible");

      if(this.cardToCheck) {
        this.checkForCardMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }
  checkForCardMatch(card) {
    if(this.getCardType(card) === this.getCardType(this.cardToCheck)) {
      this.cardMatch(card, this.cardToCheck);
    } else {
      this.cardMisMatch(card, this.cardToCheck);
    }

    this.cardToCheck = null;
  }
  cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);

    if(this.matchedCards.length === this.cards.length) {
      this.win();
    }
  } 
  cardMisMatch(card1, card2) {
    this.busy = true;
    setTimeout(_ => {
      $(card1).removeClass("visible");
      $(card2).removeClass("visible");
      this.busy = false;
    }, 700);
  }
  getCardType(card) {
    return $(card).find(".card-front img").attr("src");
  }
  startCountDown() {
    return setInterval(_ => {
      this.timeRemaining--;
      this.timer.each((i, timer) => {
        $(timer).text(this.timeRemaining);
      });
      
      if(this.timeRemaining === 0) {
        this.gameOver();
      } 
    }, 1000);
  }
  gameOver() {
    clearInterval(this.countDown);
    $("#game-over-txt").addClass("visible");
  }
  win() {
    clearInterval(this.countDown);
    $("#win-txt").addClass("visible");
  }
  canFlipCard(card) {
    return true;
    // return (!this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck);
  }
}


$(function() {

  let titleDiv = $(".page-title");

  const colors = ["#1F5282", "#006494", "#2684AD", "#1B98E0", "#43A4EF"];

  const title = "MATCH";
  let letters = title.split(''); 

  letters.forEach((l, i) => {
    titleDiv.append($('<span id="' + i + '"></span>'));
    $(".page-title #" + i).text(l)
      .css("color", colors[i])
  
  });

  let gamesContainer = $(".game-container");
  for(var i=0; i< 16; i++) {
    let card = $("<div class='card '><div class='card-face card-back'><img src='assets/icons/anchor.svg' alt='anchor'></div><div class='card-face card-front'><img src='' alt=''></div></div></div>");
    gamesContainer.append(card);
  }
$(".card-front").each((i, front) => {
  $(front).prop("id", i)
});

$(".card-front").each((i, front) => {
  switch (i) {
    case 0:
      $(front).find("img").prop("src", "assets/icons/starfish.svg").prop("alt", "starfish");
      break;
    case 1:
      $(front).find("img").prop("src", "assets/icons/turtle.svg").prop("alt", "turtle");
      break;
    case 2:
      $(front).find("img").prop("src", "assets/icons/shark.svg").prop("alt", "shark");
      break;
    case 3:
      $(front).find("img").prop("src", "assets/icons/coral.svg").prop("alt", "coral");
      break;
    case 4:
      $(front).find("img").prop("src", "assets/icons/turtle.svg").prop("alt", "turtle");
      break;
    case 5: 
      $(front).find("img").prop("src", "assets/icons/fish1.svg").prop("alt", "fish");
      break;
    case 6:
      $(front).find("img").prop("src", "assets/icons/jellyfish.svg").prop("alt", "jellyfish");
      break;
    case 7: 
      $(front).find("img").prop("src", "assets/icons/shark.svg").prop("alt", "shark");
      break;
    case 8:
      $(front).find("img").prop("src", "assets/icons/jellyfish.svg").prop("alt", "jellyfish");
      break;
    case 9:
      $(front).find("img").prop("src", "assets/icons/coral.svg").prop("alt", "coral");
      break;
    case 10: 
      $(front).find("img").prop("src", "assets/icons/fish1.svg").prop("alt", "fish");
      break;
    case 11:
      $(front).find("img").prop("src", "assets/icons/crab.svg").prop("alt", "crab");
      break;
    case 12:
      $(front).find("img").prop("src", "assets/icons/starfish.svg").prop("alt", "starfish");
      break;
    case 13:
      $(front).find("img").prop("src", "assets/icons/fish2.svg").prop("alt", "fish");
      break;
    case 14:
      $(front).find("img").prop("src", "assets/icons/crab.svg").prop("alt", "crab");
      break;
    case 15:
      $(front).find("img").prop("src", "assets/icons/fish2.svg").prop("alt", "fish");
      break;
  }
});

let cards = $(".card");
let overlays = $(".overlay-text");

let game = new Game(100, cards);

overlays.each((i, overlay) => {
  $(overlay).click(_ => {
    $(overlay).removeClass("visible");
    game.startGame();
  })
});


cards.each((i, card) => {
  $(card).click(_ => {
    game.flipCard(card);
  })
});


});