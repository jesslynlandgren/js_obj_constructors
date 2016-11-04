describe('Card', function() {

    it('should instantiate a card with a point and a suit', function() {
        var card = new Card(5, 'diamonds');
        expect(card.point).toEqual(5);
        expect(card.suit).toEqual('diamonds');
    });

    it('image URL works for 2-10', function() {
        var card = new Card(2, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/2_of_diamonds.png');
        card = new Card(3, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/3_of_diamonds.png');
        card = new Card(4, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/4_of_diamonds.png');
        card = new Card(5, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/5_of_diamonds.png');
        card = new Card(6, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/6_of_diamonds.png');
        card = new Card(7, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/7_of_diamonds.png');
        card = new Card(8, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/8_of_diamonds.png');
        card = new Card(9, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/9_of_diamonds.png');
        card = new Card(10, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/10_of_diamonds.png');
    });

    it('image URL works for jack, queen, king and ace', function() {
        var card = new Card(11, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/jack_of_diamonds.png');
        card = new Card(12, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/queen_of_diamonds.png');
        card = new Card(13, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/king_of_diamonds.png');
        card = new Card(1, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/ace_of_diamonds.png');
    });

    it('image URL works for different suits', function() {
        var card = new Card(11, 'diamonds');
        expect(card.getImageUrl()).toEqual('images/jack_of_diamonds.png');
        card = new Card(11, 'clubs');
        expect(card.getImageUrl()).toEqual('images/jack_of_clubs.png');
        card = new Card(11, 'spades');
        expect(card.getImageUrl()).toEqual('images/jack_of_spades.png');
        card = new Card(11, 'hearts');
        expect(card.getImageUrl()).toEqual('images/jack_of_hearts.png');
    });

});

describe('Hand', function() {

    it('should instantiate a deck of Card objects', function() {
        var hand = new Hand();
        expect(hand.cards).toEqual([]);
        expect(hand.points).toEqual(0);
    });

    it('only contains objects of class Card', function() {
        var hand = new Hand();
        var card = new Card(5, 'diamonds');
        expect(hand.addCard(card)).toEqual('Added card');
        card = {
            point: 3,
            suit: 'diamonds'
        };
        expect(hand.addCard(card)).toEqual('Invalid card');
        card = [];
        expect(hand.addCard(card)).toEqual('Invalid card');
        card = null;
        expect(hand.addCard(card)).toEqual('Invalid card');
        card = undefined;
        expect(hand.addCard(card)).toEqual('Invalid card');
    });

    it('size is equal to number of cards in Hand', function() {
        var hand = new Hand();
        var card = new Card(5, 'diamonds');
        hand.addCard(card);
        expect(hand.cards.length).toEqual(1);
        card = new Card(10, 'clubs');
        hand.addCard(card);
        expect(hand.cards.length).toEqual(2);
        card = {
            point: 3,
            suit: 'diamonds'
        };
        hand.addCard(card);
        expect(hand.cards.length).toEqual(2);
        card = [];
        hand.addCard(card);
        expect(hand.cards.length).toEqual(2);
        card = null;
        hand.addCard(card);
        expect(hand.cards.length).toEqual(2);
        card = undefined;
        hand.addCard(card);
        expect(hand.cards.length).toEqual(2);
        card = new Card(4, 'hearts');
        hand.addCard(card);
        expect(hand.cards.length).toEqual(3);
    });

    it('total point value is equal to the sum of cards in Hand', function() {
        var hand = new Hand();
        var card = new Card(5, 'diamonds');
        hand.addCard(card);
        expect(hand.getPoints()).toEqual(5);
        card = new Card(10, 'clubs');
        hand.addCard(card);
        expect(hand.getPoints()).toEqual(15);
        card = new Card(1, 'clubs');
        hand.addCard(card);
        expect(hand.getPoints()).toEqual(16);
        card = [];
        hand.addCard(card);
        expect(hand.getPoints()).toEqual(16);
        card = null;
        hand.addCard(card);
        expect(hand.getPoints()).toEqual(16);
        card = undefined;
        hand.addCard(card);
        expect(hand.getPoints()).toEqual(16);
        card = new Card(4, 'hearts');
        hand.addCard(card);
        expect(hand.getPoints()).toEqual(20);
    });
});


describe('Deck', function() {

    it('should instantiate a deck of 52 distinct Card objects', function() {
        var deck = new Deck();
        expect(deck.cards.length).toEqual(52);
        var printDeck = deck.cards.map(function(card) {
            return card.point + ' of ' + card.suit;
        }).join(',');
        expect(printDeck).toEqual('1 of spades,1 of hearts,1 of clubs,1 of diamonds,2 of spades,2 of hearts,2 of clubs,2 of diamonds,3 of spades,3 of hearts,3 of clubs,3 of diamonds,4 of spades,4 of hearts,4 of clubs,4 of diamonds,5 of spades,5 of hearts,5 of clubs,5 of diamonds,6 of spades,6 of hearts,6 of clubs,6 of diamonds,7 of spades,7 of hearts,7 of clubs,7 of diamonds,8 of spades,8 of hearts,8 of clubs,8 of diamonds,9 of spades,9 of hearts,9 of clubs,9 of diamonds,10 of spades,10 of hearts,10 of clubs,10 of diamonds,11 of spades,11 of hearts,11 of clubs,11 of diamonds,12 of spades,12 of hearts,12 of clubs,12 of diamonds,13 of spades,13 of hearts,13 of clubs,13 of diamonds');
    });

    it('draw chooses the top card and removes it from deck', function() {
        var deck = new Deck();
        expect(deck.cards[deck.numCardsLeft() - 1].printCard()).toEqual('13 of diamonds');
        var dealt = deck.draw().printCard();
        expect(dealt).toEqual('13 of diamonds');
        expect(deck.cards[deck.numCardsLeft() - 1].printCard()).toEqual('13 of clubs');
    });

    it('shuffle puts the cards in random order in relation to original order of deck', function() {
        var same = 0;
        var deck_ref = new Deck();
        var deck = new Deck();
        deck.shuffle();
        for (var i = 0; i < 52; i++) {
            if (deck.cards[i].printCard() == deck_ref.cards[i].printCard()){
                same++;
            }
        }
        console.log(same);
        expect(same<1).toEqual(true);
    });

    it('starts with 52 cards and size decreases with each draw', function() {
        var deck = new Deck();
        expect(deck.numCardsLeft()).toEqual(52);
        deck.draw();
        expect(deck.numCardsLeft()).toEqual(51);
        deck.draw();
        expect(deck.numCardsLeft()).toEqual(50);
        var deck2 = new Deck();
        expect(deck2.numCardsLeft()).toEqual(52);
        expect(deck.numCardsLeft()).toEqual(50);
    });

});
