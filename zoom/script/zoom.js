(function(root,funs){

    root.Rect=funs();



}(this,function(){
    return function(option={}){        
        let Data={         
        }
        Data.size=option.size?option.size:100;
        Data.zoomsize=option.zoomsize?option.zoomsize:200;
        let w=Data.size/2;
        let div=document.createElement("div");
        let content=document.querySelector(".content");  
        let zoom=document.querySelector(".zoom");  
        zoom.style.width=`${Data.zoomsize}px`;
        zoom.style.height=`${Data.zoomsize}px`;
        let img=document.querySelector(".sourceimg");
        let data=content.getBoundingClientRect();
        let zoominfo=zoom.getBoundingClientRect();
        let sizeX=zoominfo.width/Data.size;
        let sizeY=zoominfo.height/Data.size;
        let zoomlens=content.appendChild(div);
        zoom.style.backgroundSize=`${data.width*sizeX}px ${data.height*sizeY}px`;
        zoomlens.style.width=`${Data.size}px`;
        zoomlens.style.height=`${Data.size}px`;
        zoomlens.style.backgroundColor="#cecece";
        zoomlens.style.position="absolute";  
        zoomlens.style.opacity=".2";
        zoomlens.style.display="none";
        let clientx=data.left;
        let clienty=data.top;
        let display=false;
        content.addEventListener("mousemove",event);
        content.addEventListener("mouseenter",event)
        content.addEventListener("mouseleave",event);
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
                zoom.style.display="none";
            }
            function mouseenter(){
                zoom.style.display="block";
                zoomlens.style.display="block";
            }
            function mousemove(){
                zoomlens.style.top=getpos(e.clientY-clienty-w,data.height)+"px";
                zoomlens.style.left=getpos(e.clientX-clientx-w,data.width)+"px";
                let x=-getpos(e.clientX-clientx-w,data.width)*sizeX+"px"
                let y=-getpos(e.clientY-clienty-w,data.height)*sizeY+"px"
                zoom.style.backgroundPosition =`${x} ${y}`;
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
