function Block() {
	 
	this.upDivWrap=null;//上管
	this.downDivWrap=null;//下管
	

	this.downHeight=baseObj.randomNum(0,150);
	this.gapHeight=baseObj.randomNum(150,160);
	this.upHeight=312-this.downHeight-this.gapHeight;

	//生成div 管子的一部份
	this.createDiv=function(url,height,positionType,left,top){
		var newDiv=document.createElement("div");
		newDiv.style.width = "62px";
        newDiv.style.height = height;
        newDiv.style.position = positionType;
        newDiv.style.left = left;
        newDiv.style.top = top;
        newDiv.style.backgroundImage = url;  //"url(/img/0.jpg)"
        this.display=1;

        return newDiv;
	};
	//生成上下兩個管子
	this.createBlock=function(){
		var upDiv1 = this.createDiv("url(src/img/up_mod.png)", this.upHeight + "px");
        var upDiv2 = this.createDiv("url(src/img/up_pipe.png)", "60px"); 
        this.upDivWrap = this.createDiv(null, null, "absolute", "450px");
        this.upDivWrap.appendChild(upDiv1);
        this.upDivWrap.appendChild(upDiv2);//生成上方管子
        if(baseObj.randomNum(1,3)==3){
        upDiv1.style.display="none";
     	upDiv2.style.display="none";
     	this.upDivWrap.display=0;}

        var downDiv1=this.createDiv("url(src/img/down_pipe.png)","60px");
        var downDiv2=this.createDiv("url(src/img/down_mod.png)",this.downHeight+"px");
		this.downDivWrap = this.createDiv(null, null, "absolute", "450px", 363 - this.downHeight + "px");
		this.downDivWrap.appendChild(downDiv1);
		this.downDivWrap.appendChild(downDiv2); //生成下方管子
		if(baseObj.randomNum(1,3)==3){
        downDiv1.style.display="none";
     	downDiv2.style.display="none";
     	this.downDivWrap.display=0;}



		background.appendChild(this.upDivWrap);
		background.appendChild(this.downDivWrap);

		

	};

	this.moveBlock =function(){
		this.upDivWrap.style.left =this.upDivWrap.offsetLeft-3+"px";
		this.downDivWrap.style.left =this.downDivWrap.offsetLeft-3+"px";
	};
}