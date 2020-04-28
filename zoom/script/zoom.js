(function(root,funs){

    root.Rect=funs();



}(this,function(){
    return function(container,option={}){        
        let Data={
            container:{
                element:null,
                width:0,
                height:0
            },
            sourceimg:{
                element:null,
                width:0,
                height:0
            },
            zoomlen:{
                element:null,
                size:0,
            },
            zoomdiv:{
                element:null,
                size:0
            }
        }
        Data.container.element=container;
        Data.zoomdiv.size=option.size?option.size:100;
        Data.zoomlen.zoomsize=option.zoomsize?option.zoomsize:200;
        let w=Data.zoomdiv.size/2;
        let div=document.createElement("div");
         Data.zoomlen.element=document.querySelector(".zoom");  
        let img=document.querySelector(".sourceimg");
        let data=Data.container.element.getBoundingClientRect();

        Data.zoomlen.element.style.width=`${Data.zoomlen.zoomsize}px`;
        Data.zoomlen.element.style.height=`${Data.zoomlen.zoomsize}px`;

        let zoominfo= Data.zoomlen.element.getBoundingClientRect();
        let sizeX=zoominfo.width/Data.zoomdiv.size
        let sizeY=zoominfo.height/Data.zoomdiv.size;
        let zoomlens=Data.container.element.appendChild(div);
        Data.zoomlen.element.style.backgroundSize=`${data.width*sizeX}px ${data.height*sizeY}px`;
        zoomlens.style.width=`${Data.zoomdiv.size}px`;
        zoomlens.style.height=`${Data.zoomdiv.size}px`;
        zoomlens.style.backgroundColor="#cecece";
        zoomlens.style.position="absolute";  
        zoomlens.style.opacity=".2";
        zoomlens.style.display="none";
        Data.zoomlen.element.style.display="none";
        let clientx=data.left;
        let clienty=data.top;
        let display=false;
        Data.container.element.addEventListener("mousemove",event);
        Data.container.element.addEventListener("mouseenter",event)
        Data.container.element.addEventListener("mouseleave",event);
        function event(e)
        {
            switch(e.type)
            {
                case 'mouseleave':
                    mouseleave();
                    break;
                case 'mouseenter':
                    mouseenter();
                    break;
                case 'mousemove':  
                    mousemove();
                    break;
                
            }

            function mouseleave(){
                zoomlens.style.display="none";
                 Data.zoomlen.element.style.display="none";
            }
            function mouseenter(){
                 Data.zoomlen.element.style.display="block";
                zoomlens.style.display="block";
            }
            function mousemove(){
                zoomlens.style.top=getpos(e.clientY-clienty-w,data.height)+"px";
                zoomlens.style.left=getpos(e.clientX-clientx-w,data.width)+"px";
                let x=-getpos(e.clientX-clientx-w,data.width)*sizeX+"px"
                let y=-getpos(e.clientY-clienty-w,data.height)*sizeY+"px"
                Data.zoomlen.element.style.backgroundPosition =`${x} ${y}`;
            }
        }
        function getpos(e,size){
            if(e<0)
            {
                return 0;
            }
            else if(e>size-w*2)
            {
                return size-w*2;
            }
            else
            {
                return e;
            }
            return e;
        }
        this._getinfo=function()
        {
            return Data;
        }

    }
}));