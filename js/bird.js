
var bird={
	flyTimer:null,
	wingTimer:null,

	div:document.createElement("div"),
	showBird:function(parent){
		this.div.style.width = "40px";
        this.div.style.height = "28px";
        this.div.style.backgroundImage = "url(src/img/bird0.png)";
        this.div.style.backgroundRepeat = "no-repeat";
        this.div.style.position = "absolute";
        this.div.style.left = "50px";
        this.div.style.top = "200px";
        this.div.style.zIndex = "1";
		parent.appendChild(this.div);
	},

	fallSpeed:0,
	flyBird:function(){
		bird.flyTimer=setInterval(fly,40);

		function fly(){
			bird.div.style.top=bird.div.offsetTop+bird.fallSpeed++ +'px';

			if (bird.div.offsetTop<0) {
				bird.fallSpeed=6;
			}
			if (bird.div.offsetTop>=395) {
				bird.fallSpeed=0;
				clearInterval(bird.flyTimer);
				clearInterval(bird.wingTimer);
			}
			if (bird.fallSpeed>12) {
				bird.fallSpeed=12;
			}

			console.log(bird.fallSpeed);
		}
	},

	wingWave: function(){
		var up = ["url(src/img/up_bird0.png)", "url(src/img/up_bird1.png)"];
        var down = ["url(src/img/down_bird0.png)", "url(src/img/down_bird1.png)"];
        var i=0,j=0;
        bird.wingTimer=setInterval(wing,120);

        function wing(){
        	if (bird.fallSpeed>0) {
        		bird.div.style.backgroundImage=down[i++];
        		i=i%2;
        	}
        	if (bird.fallSpeed<0) {
        		bird.div.style.backgroundImage=up[j++];
        		j=j%2;
        		 
        	}
        }

	},


};
