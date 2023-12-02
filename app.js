
var dealerSum=0;
var playerSum=0;
var dealerAmount=500;
var playerAmount=500
var dealerAceCount=0;
var playerAceCount= 0;
var betAmount;
var hidden; 
var deck;
let dealerCardLength = 0;

var canPlay=true;


document.getElementById('start').addEventListener('click',initialiseGame)



function initialiseGame(){
   
    selectMode();
      
    
}

document.querySelector('#restart').addEventListener('click',restartBtn)
function restartBtn(){
   
    // let addedCards=document.querySelectorAll('.addedCard').length;

    //  for(let i=0;i<addedCards;i++){
    //     document.querySelector('.addedCard').remove();
        
    //  }
    
     
    location.reload()

     document.querySelector("#start").removeAttribute("class", "none");
     document.querySelector("#restart").classList.add('none')

}


function selectMode(){
      document.querySelector(".mode-box").classList.remove("none");
    if(document.querySelector('.modalBack').classList.contains('screen'))
    document.querySelector(".modalBack").classList.remove("screen");
else
document.querySelector(".modalBack").classList.add('screen');

document.querySelector('.yes').addEventListener('click',function(){
     document.querySelector(".modalBack").classList.remove("screen");
     document.querySelector(".mode-box").classList.add("none");
     document.querySelector(".playerBet").classList.remove("none");
     document.querySelector(".dealerBet").classList.remove("none");
     buildDeck();
     shuffleDeck();
     playGame();
})

    document.querySelector(".no").addEventListener("click", function () {
    document.querySelector(".modalBack").classList.remove("screen");
    document.querySelector(".mode-box").classList.add("none");

  
    document.querySelector('#start').setAttribute('class','none');
    document.querySelector("#restart").removeAttribute("class", "none");
    buildDeck();
    shuffleDeck();
    playGame();
});

 

}

function buildDeck(){
    let values=['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    let types=['C','D','S','H'];

    deck=[];
    for(let i=0; i<types.length;i++){
        for(let j=0;j<values.length;j++){
            deck.push(`${values[j]}-${types[i]}`);
        }
    }
   
}

function shuffleDeck(){
    for(let i =0; i<deck.length;i++){
        let j=Math.floor(Math.random()*deck.length);
        let temp=deck[i];
        deck[i]=deck[j];
        deck[j]=temp;
    }
    
}


function playGame(){
    
    hidden=deck.pop();
    dealerSum+=getValue(hidden);
    dealerAceCount+=checkAce(hidden);

    console.log(hidden)
    console.log(dealerSum)

    while(dealerSum<17){
    
        let cardImg=document.createElement("img");
        let card=deck.pop();
        cardImg.src=`./cards/${card}.png`;
        cardImg.className='addedCard';
        dealerSum+=getValue(card);
        dealerAceCount+=checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    
    
            }

    for(let i=0; i<2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = `./cards/${card}.png`;
        playerSum += getValue(card);
        cardImg.className = "addedCard";
        playerAceCount  += checkAce(card);
        document.getElementById("player-cards").append(cardImg);
    }

    document.getElementById('open').addEventListener('click',play)
    
    document.getElementById("check").addEventListener("click", check);
}


function play(){

    if(!canPlay){
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = `./cards/${card}.png`;
    cardImg.className = "addedCard";
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    document.getElementById("player-cards").append(cardImg);

    if(reduceAce(playerSum,playerAceCount)>21){
        canPlay=false;
    }
     
   
}
function check(){
    dealerSum=reduceAce(dealerSum,dealerAceCount);
    playerSum = reduceAce(playerSum, playerAceCount);
    canPlay=false;
    document.getElementById("hidden").src=`./cards/${hidden}.png`;

    let message=""
    if(playerSum>21){
        message="You Lose!"
    }else if(dealerSum>21){
        message="You Win!"
    }else if(playerSum==dealerSum){
        message="Tie!"
    }else if(playerSum>dealerSum){
          message = "You Win!";
    }else "You Lose!"

      document.getElementById("dealer-sum").innerText = dealerSum;
      
      document.getElementById("player-sum").innerText = playerSum;
    

    document.getElementById('result').innerText=message;
    
}
function getValue(card){
    let data= card.split("-");
    let value=data[0];

    if(isNaN(value)){
        if(value=="A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}
function checkAce(card){
    if(card[0]=="A"){
        return 1
    }
    return 0

}
function reduceAce(playerSum, playerAceCount){
    if(playerSum>21&&playerAceCount>0){
        playerSum-=10;
        playerAceCount-=1;
    }return playerSum;
}