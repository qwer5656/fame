
create(document.querySelector(".memory-game"),6);
let hascardopen=false;
let cardclick=true;
let firstcard=null,secondcard=null;
function flip(e)
{
    if(cardclick)
    {
    let open=e.currentTarget.dataset.open;
    event.preventDefault();
    if(open==="false")
    {
        console.log(1);
        this.classList.add("flip");
        if(firstcard==null)
        {
            firstcard=this;
            firstcard.dataset.open="true";

            
        }
        else
        {
            secondcard=this;
            secondcard.dataset.open="true";
            cardclick=false;
            if(firstcard.dataset.key===secondcard.dataset.key)
            {
             firstcard.removeEventListener("click",flip);
             secondcard.removeEventListener("click",flip);
             firstcard=null;
             secondcard=null;
             cardclick=true;
            }
            else{
                setTimeout(function(){
                firstcard.classList.remove("flip");
                secondcard.classList.remove("flip");
                firstcard.dataset.open="false";
                secondcard.dataset.open="false";
                firstcard=null;
                secondcard=null;
                cardclick=true;
                },1000);
            }
            if(win())
            {
                document.querySelector(".winwrap").style.display="block";
            }
        }



    }
 }

 
}
function win()
{
  
    let cards= Array.from(document.querySelectorAll(".memory_card"));
    return cards.every((e)=>{
        return e.dataset.open=="true";
    });
}
function create(obj,num)
{
    let list=[];
    for(let i=0;i<num;i++)
    {
        list.push(i);
        list.push(i);
    }
    list.sort(function() {
        return (0.5-Math.random());
    });
   
    for(let i=0;i<num*2;i++)
    {
        
        let card=document.createElement("div");
        let frontcard=document.createElement("img");
        let backcard=document.createElement("img");
        card.className="memory_card";
        card.dataset.key=list[i];
        card.dataset.open="false";
        frontcard.className="front_card";
        backcard.className="back_card";
        frontcard.src=`img/${list[i]}.jpg`;
        backcard.src="img/card.jpg";
        card.appendChild(frontcard);
        card.appendChild(backcard);
        obj.appendChild(card);
    }
    let cards=document.querySelectorAll(".memory_card");
    cards.forEach(e=>e.addEventListener("click",flip));
}
