function Card(num, suit) {
    this.point = num;
    this.suit = suit;
}

Card.prototype.getImageUrl = function() {
  var name = this.point;
  if (this.point === 11) {
    name = 'jack';
} else if (this.point === 12) {
    name = 'queen';
} else if (this.point === 13) {
    name = 'king';
} else if (this.point === 1) {
    name = 'ace';
  }
  return 'images/' + name + '_of_' + this.suit + '.png';
};

Card.prototype.printCard = function(){
    var stringCard = this.point + ' of ' + this.suit;
    return stringCard;
};

function Hand() {
    this.cards = [];
    this.points = 0;
}

Hand.prototype.addCard = function(card_obj) {
    if (card_obj instanceof Card){
        this.cards.push(card_obj);
        return 'Added card';
    } else {
        return "Invalid card";
    }
};

Hand.prototype.getPoints = function() {
    this.points = 0;
    for (var idxCard in this.cards){
        this.points += this.cards[idxCard].point;
    }
    return this.points;
};


function Deck() {
    this.cards = [];
    for (var idxNumber = 1; idxNumber <= 13; idxNumber++) {
      for (var idxSuit = 0; idxSuit < 4; idxSuit++) {
        if (idxSuit === 0) {
          suit = "spades";
        } else if (idxSuit === 1) {
          suit = "hearts";
        } else if (idxSuit == 2) {
          suit = "clubs";
        } else {
          suit = "diamonds";
        }
        this.cards.push(new Card(idxNumber, suit));
      }
    }
}

Deck.prototype.draw = function() {
    var card1 = this.cards.pop();
    return card1;
};

Deck.prototype.shuffle = function() {
    var shuffled = [];
    var deckLength = this.cards.length;
    while (deckLength > 0){
        var j = Math.floor(Math.random() * deckLength);
        var randCard = this.cards.splice(j,1);
        shuffled.push(randCard[0]);
        deckLength -= 1;
    }
    this.cards = shuffled;
};

Deck.prototype.numCardsLeft = function() {
    return this.cards.length;
};
//
// var myCard = new Card(5, 'diamonds');
// console.log(myCard.point);
// console.log(myCard.suit);
// console.log(myCard.getImageUrl());
//
// var myHand = new Hand();
// myHand.addCard(new Card(5, 'diamonds'));
// console.log(myHand);
//
// myHand.addCard(new Card(13, 'spades'));
// console.log(myHand);
//
// console.log(myHand.getPoints());
//
//
// var myDeck = new Deck();
// console.log(myDeck.numCardsLeft());
//
// console.log(myDeck.draw());
// console.log(myDeck.numCardsLeft());
//
// console.log(myDeck.draw());
// console.log(myDeck.numCardsLeft());
//
// // console.log(myDeck);
// myDeck.shuffle();
// // console.log(myDeck);
//
// console.log(myDeck.numCardsLeft());
