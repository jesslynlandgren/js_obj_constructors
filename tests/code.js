Card = function(point,suit){
  this.point = point;
  this.suit = suit;
  this.getImageUrl = function(){
    var cardType = this.point;
    if(this.point==11){
      cardType = "jack";
    }
    if(this.point==12){
      cardType = "queen";
    }
    if(this.point==13){
      cardType = "king";
    }
    if(this.point==1){
      cardType = "ace";
    }
    return "images/"+cardType+"_of_"+this.suit+".png";
  }
}
