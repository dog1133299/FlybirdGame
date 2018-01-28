
function s(e) {

	return document.getElementById(e);

};
var background =s("background");
var score=s("score");
var bestScore=s("bestScore");
var scoreDistance=0;
var headTitle =s("head");
var headBird=s("headBird");
var gameover=s("gameOver");
var gameRunning=false;

var grass1=s("grass1");
var grass2=s("grass2");

var startButton=s("startButton");

var birdFlyImage=["src/img/bird0.png","src/img/bird1.png"];
var birdFlyIndex=0;
var Wave=3;

var blocksArray=[];
var blockDistance=baseObj.randomNum(130,250);//之間的距離


var headWaveTimer = setInterval(headWave,200);
var grassRollTimer=setInterval(grassRoll,30); 

function headWave(){
	Wave*=-1;
	headTitle.style.top=headTitle.offsetTop+Wave+"px";
	headBird.src=birdFlyImage[birdFlyIndex++];
	birdFlyIndex=birdFlyIndex%2;

};

function grassRoll(){

	scoreDistance++;
	score.innerHTML=Math.ceil(scoreDistance*0.1)+ " m";
	if (grass1.offsetLeft<=-343) {
		grass1.style.left="343px";
	}
	if (grass2.offsetLeft<=-343) {
		grass2.style.left="343px";
	}

	//console.log(grass2.offsetLeft);
	grass1.style.left=grass1.offsetLeft-3+'px';
	grass2.style.left=grass2.offsetLeft-3+'px';


	if (blocksArray.length) {
		for (var i = 0; i < blocksArray.length; i++) {
			blocksArray[i].moveBlock();
			var x = baseObj.crashExamine(blocksArray[i].downDivWrap,bird.div);
			var y = baseObj.crashExamine(blocksArray[i].upDivWrap,bird.div);
			var z = bird.div.offsetTop>=390;//鳥掉到地上

			if (x||y||z) {//lose
				window.clearInterval(grassRollTimer);
				bird.fallSpeed=0;
				background.onclick=null;
				bestScore.innerHTML=Math.ceil(scoreDistance*0.1)+ " m";
				startButton.style.backgroundImage="url(src/img/ok.jpg)";
				score.style.display="none";
				gameOver.style.display="block";
				bestScore.style.display="block";
				startButton.style.display="block";
				for (var i = 0; i < blocksArray.length; i++) {
					blocksArray[i].upDivWrap.style.display="none";
				}


			}
		}

		//創新的block
		if (blocksArray[blocksArray.length-1].downDivWrap.offsetLeft<(450-blockDistance)) {
			blockDistance=baseObj.randomNum(130,250);
			var newBlock=new Block();
			newBlock.createBlock();
			blocksArray.push(newBlock);
		}

		if (blocksArray[0].downDivWrap.offsetLeft<-50) {
			background.removeChild(blocksArray[0].downDivWrap);
			background.removeChild(blocksArray[0].upDivWrap);
			blocksArray.shift(blocksArray[0]);
		}

	}
};

startButton.onclick=function(){
	headTitle.style.display="none";
	headBird.style.display="none";
	gameOver.style.display="none";
	bestScore.style.display="none";
	startButton.style.display="none";
	score.style.display="block";
	scoreDistance=0;
	clearInterval(headWaveTimer);
	if (bird.flyTimer!=null) {
		clearInterval(bird.flyTimer);
		clearInterval(bird.wingTimer);
	}
	bird.fallSpeed=0;
	bird.showBird(background);
	bird.flyBird();
	bird.wingWave();
	background.onclick=function(){bird.fallSpeed=-8;};
	if (gameRunning) {
	grassRollTimer=setInterval(grassRoll,30);
	}
	gameRunning=true;

	if (blocksArray!=null) {
		for (var i = 0; i < blocksArray.length; i++) {
			background.removeChild(blocksArray[i].downDivWrap);
			background.removeChild(blocksArray[i].upDivWrap);
		}
		blocksArray=[];
	}
	var b= new Block();
	b.createBlock();
	blocksArray.push(b);


};