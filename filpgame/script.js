; (function (obj, create) {
    obj.filp = create();
}(this, function () {

        return function (container) {
            
            let hascardopen = false;
            let cardclick = true;
            let firstcard = null, secondcard = null;
            let Container=container;
            let clock;
            let numtime=0;
            let gamelevel;
            function flip(e) {
                if (cardclick) {
                    let open = e.currentTarget.dataset.open;
                    event.preventDefault();
                    if (open === "false") {
                        console.log(1);
                        this.classList.add("flip");
                        if (firstcard == null) {
                            firstcard = this;
                            firstcard.dataset.open = "true";


                        }
                        else {
                            secondcard = this;
                            secondcard.dataset.open = "true";
                            cardclick = false;
                            if (firstcard.dataset.key === secondcard.dataset.key) {
                                firstcard.removeEventListener("click", flip);
                                secondcard.removeEventListener("click", flip);
                                firstcard = null;
                                secondcard = null;
                                cardclick = true;
                            }
                            else {
                                setTimeout(function () {
                                    firstcard.classList.remove("flip");
                                    secondcard.classList.remove("flip");
                                    firstcard.dataset.open = "false";
                                    secondcard.dataset.open = "false";
                                    firstcard = null;
                                    secondcard = null;
                                    cardclick = true;
                                }, 1000);
                            }
                            if (win()) {
                                document.querySelector(".Mask").style.display = "block";
                                document.querySelector(".gamewin").innerText="Game Win";
                                clearInterval(clock);
                            }
                        }



                    }
                }


            }
            function win() {

                let cards = Array.from(document.querySelectorAll(".memory_card"));
                return cards.every((e) => {
                    return e.dataset.open == "true";
                });
            }
            function lose()
            {
                clearInterval(clock);
                document.querySelector(".gamewin").innerText="Game Over";
                document.querySelector(".Mask").style.display = "block";
            }
            function judge(parms)
            {
                console.log(parms);
                if(parms=="yes")
                {
                    Container.innerHTML="";
                    create(Container,gamelevel);
                    document.querySelector(".Mask").style.display="none";
                }

                else{
                    Container.innerHTML="";
                    document.querySelector(".menu").style.display="flex";
                    document.querySelector(".Mask").style.display="none";

                }
            }
            function reciprocal(obj)
            {
              let min=parseInt(numtime/60);
              let sec=numtime%60;
              let txtcolot;
              txtcolot=sec<10&&min==0?"<span style='color:red'>":"<span>";
              obj.innerHTML=txtcolot+"0"+min+":"+(sec<10?`<span style='color:red'>0${sec}</span>`:sec)+"</span>";
              if(numtime>0)
              {
                numtime--;
              }
              else
              {
                lose();
            
              }
               
            }
            function create(obj, level) {
                let num=0;  
                let h="",w="";
                let list = [];
                let gamecontainer=document.querySelector(".memory-game");
                switch(level)
                {
                    case 1:
                    num=8;
                    h="85px";
                    w="calc(25% - 10px)";
                    numtime=59;
                    break;
                    case 2:
                    num=10;
                    h="83px";
                    w="calc(25% - 10px)";
                    numtime=59;
                    break;
                    case 3:
                    num=12;
                    h="83px";
                    w="calc(25% - 10px)";
                    numtime=59;
                    break;
                }
                let timeclock = document.createElement("div");
                timeclock.className="time";
                for (let i = 0; i < num; i++) {
                    list.push(i);
                    list.push(i);
                }
                list.sort(function () {
                    return (0.5 - Math.random());
                    
                });
                for (let i = 0; i < num * 2; i++) {

                    let card = document.createElement("div");
                    let frontcard = document.createElement("img");
                    let backcard = document.createElement("img");
                    card.className = "memory_card";
                    card.style.width=w;
                    card.style.height=h;
                    card.dataset.key = list[i];
                    card.dataset.open = "false";
                    frontcard.className = "front_card";
                    backcard.className = "back_card";
                    frontcard.src = `img/${list[i]}.jpg`;
                    backcard.src = "img/card.jpg";
                    card.appendChild(frontcard);
                    card.appendChild(backcard);
                    obj.appendChild(card);
                    obj.appendChild(timeclock);
                }
                let cards = document.querySelectorAll(".memory_card");
                cards.forEach(e => e.addEventListener("click", flip));
                reciprocal(timeclock);
                clock=setInterval(reciprocal,1000,timeclock);
            }
            document.querySelector(".yes").addEventListener("click",function(){
                judge("yes");
              });
              document.querySelector(".no").addEventListener("click",function(){
                judge("no");
              });
           this.init=function(level)
           {
              Container.innerHTML="";
              create(Container,level);
              gamelevel=level;
             
           }



        }

    }));