class canvasManager{
    constructor(marker,chunk,data){
        this.canvas = document.getElementById("mapCanvas");
        this.context = this.canvas.getContext("2d");
        this.clabel = document.getElementById("coord");
        this.dlabel = document.getElementById("overlay");
        //this.data.scale = 1;
        // this.data.origin_y = 0;
        this.dragStartX = 0;
        this.dragStartY = 0;
        this.isDragging = false;
        this.debugging = false;
        this.rect = this.canvas.getBoundingClientRect();
        //this.width = this.canvas.width;
        //this.data.height = this.canvas.height;
        this.Record =  [
  // Central Reference
  { x: 0, y: 0, color: "green", label: "New Delhi" },

  // Core Metros
  { x: -1150, y: -1350, color: "purple", label: "Mumbai" },
  { x: 1300, y: -200, color: "gold", label: "Kolkata" },
  { x: 1330, y: -2150, color: "orange", label: "Chennai" },
  { x: 1150, y: -2100, color: "blue", label: "Bengaluru" },
  { x: 950, y: -1700, color: "cyan", label: "Hyderabad" },
  { x: -950, y: -500, color: "maroon", label: "Ahmedabad" },

  // Corners of the Country
  { x: -2200, y: -2300, color: "darkslategray", label: "Kavaratti (Lakshadweep)" },
  { x: 2500, y: -2200, color: "indigo", label: "Port Blair (Andaman)" },
  { x: -2200, y: 700, color: "sienna", label: "Naliya (Western Gujarat Border)" },
  { x: 2700, y: 1500, color: "darkblue", label: "Walong (Arunachal East)" },

  // Border/Edge Cities
  { x: 0, y: 800, color: "lightgreen", label: "Srinagar" },
  { x: -1600, y: 700, color: "darkred", label: "Leh" },
  { x: 1700, y: -400, color: "teal", label: "Cooch Behar" },
  { x: -1700, y: -300, color: "crimson", label: "Jaisalmer" },

  // Northeast (Key Cities)
  { x: 1800, y: 500, color: "violet", label: "Guwahati" },
  { x: 1900, y: 700, color: "yellowgreen", label: "Shillong" },
  { x: 2000, y: 1100, color: "lightcoral", label: "Itanagar" },
  { x: 2100, y: 400, color: "lightseagreen", label: "Aizawl" },
  { x: 2050, y: 500, color: "plum", label: "Imphal" },
  { x: 2200, y: 800, color: "peachpuff", label: "Kohima" },
  { x: 2300, y: 950, color: "skyblue", label: "Agartala" },
  { x: 1950, y: 900, color: "khaki", label: "Gangtok" },

  // Tier 2/3 cities
  { x: -280, y: 300, color: "pink", label: "Jaipur" },
  { x: 500, y: 450, color: "teal", label: "Lucknow" },
  { x: 800, y: 200, color: "brown", label: "Varanasi" },
  { x: -200, y: -750, color: "gray", label: "Bhopal" },
  { x: 600, y: -1350, color: "lime", label: "Nagpur" },
  { x: 1050, y: 200, color: "navy", label: "Patna" },
  { x: 900, y: -2500, color: "darkgreen", label: "Thiruvananthapuram" }
]
        this.marker = marker;
        this.chunk = chunk;
        this.data = data;
        this.systemContent = {
            "axis" : false,
        }
        this.slabel = document.getElementById("scale");
        this.activeWidth = this.canvas.width;
        this.activeHeight = this.canvas.height;
        this.canvas.addEventListener("wheel",(e) => this.zoom(e));
        this.canvas.addEventListener("mousedown", (e) => {
            this.isDragging = true;
            this.dragStartX = e.clientX - this.data.origin_x;
            this.dragStartY = e.clientY - this.data.origin_y;});

        this.canvas.addEventListener("touchstart", (e) => {
            this.isDragging = true;
            this.dragStartX = e.clientX - this.data.origin_x;
            this.dragStartY = e.clientY - this.data.origin_y;});
        this.canvas.addEventListener("mousemove", (e) => {
            if (this.isDragging) {
                this.data.origin_x = e.clientX - this.dragStartX;
                this.data.origin_y = e.clientY - this.dragStartY;
                this.initate(this.data.origin_x,this.data.origin_y);
            }
        });
        this.canvas.addEventListener("touchmove", (e) => {
            if (this.isDragging) {
                this.data.origin_x = e.clientX - this.dragStartX;
                this.data.origin_y = e.clientY - this.dragStartY;
                this.initate(this.data.origin_x,this.data.origin_y);
            }
        });
        this.canvas.addEventListener("click",(event) =>
        this.showPosition(event));
        this.canvas.addEventListener("touch",(event) =>
            this.showPosition(event.touches[0]));
        window.addEventListener("keydown",(event) => {
            if (event.ctrlKey && event.key == "a"){
                event.preventDefault()
                console.log("debugging")
                this.debug()

            }
        })
            

        

        this.canvas.addEventListener("mouseup", () => this.isDragging = false);
        this.canvas.addEventListener("touchend", () => this.isDragging = false);
        this.canvas.addEventListener("mouseleave", () => this.isDragging = false);
        this.canvas.addEventListener("touchcancel", () => this.isDragging = false);
        window.addEventListener("resize", (e) => this.resize())

        
    }




    initate(x,y){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.save();
        this.context.translate(this.data.origin_x, this.data.origin_y);
        this.context.scale(this.data.scale, this.data.scale);
        this.draw(x,y);
        this.marker.line();
        // this.showAxis(true);
        this.context.restore();
        let temp = {};
        // for  (let poi of this.Record){
        //     // conforsole.log(poi)
        //     let c = this.chunk.chunkFinder(poi.x,poi.y);
        //     if (temp.hasOwnProperty(c)){
        //         temp[c].push(poi);
        //     } else{
        //         temp[c] = [poi];

        //     }

        // }
        // console.log(JSON.stringify(temp));
        
    }
    draw(x,y){
        let renderChunk = this.chunk.chunkNo(x,y);
        this.data.renderChunk = renderChunk;
        for (let chunk of renderChunk){
            this.chunk.border(chunk);
            if (this.data.chunkData.hasOwnProperty(chunk)){
                let pois = this.data.chunkData[chunk];
                // console.log(JSON.stringify(pois))
                // pois = [{"x":500,"y":450,"color":"teal","label":"Lucknow"},{"x":800,"y":200,"color":"brown","label":"Varanasi"}]
                if (this.data.scale*1000 <= 250){
                    // console.log(pois[0])
                    let poi = pois[0];
                    self.marker.circle(poi.x,poi.y,10,poi.color,poi.label);
                } else {
                    for (let poi of pois){
                    // console.log(poi);
                    self.marker.circle(poi.x,poi.y,10,poi.color,poi.label);
                }

                }
                
            }

        // this.showAxis()
        // for (let poi of this.Record){
        //     // console.log(poi);
        //     self.marker.circle(poi.x,poi.y,10,poi.color,poi.label);
        // }

        
    }}

    showPosition(event){
        const xScreen = event.clientX - this.rect.left;
        const yScreen = event.clientY - this.rect.top;
        const xMap = (xScreen - this.data.origin_x) / this.data.scale;
        const yMap = (yScreen - this.data.origin_y) / this.data.scale;
        this.clabel.innerHTML = `coord : ${Math.round(xMap)} ${Math.round(yMap)*-1} ${this.chunk.chunkFinder(xMap,yMap)}`;
        return
    }
    resize(){
        this.canvas.width = window.innerWidth - window.innerWidth *(2.9/100);
        this.canvas.height = window.innerHeight - window.innerHeight *(5/100);
        this.data.width = this.canvas.width;
        this.data.height = this.canvas.height;
        //console.log(this.data.width + "  resixing " + this.data.height);
        this.rect = this.canvas.getBoundingClientRect();
        this.initate();
    }
    showAxis(override = false){
        if (this.systemContent["axis"] == true && override == false){
            this.systemContent["axis"] = false;
            //console.log("clearing");
            this.context.clearRect(0,0,this.data.width,this.data.height);
            return;}
        this.context.beginPath();
        this.context.setLineDash([3,5]);
        //x axis
        this.context.moveTo(0,0);
        this.context.lineTo(this.data.width*(10 -this.data.scale),0);
        //y axis
        this.context.moveTo(this.data.width/2,0);
        this.context.lineTo(this.data.width/2,this.data.height);
        this.context.stroke();
        this.context.closePath();
        this.systemContent["axis"] = true;
        
    }

    zoom(e){
        e.preventDefault();
        //console.log(this.data.scale*this.data.width);
        const zoom = e.deltaY < 0 ? 1.08 : 0.92;
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;
        
        const x = (mouseX - this.data.origin_x) / this.data.scale;
        const y = (mouseY - this.data.origin_y) / this.data.scale;
        this.data.scale *= zoom;
        //this.slabel.innerHTML = "Scale : "  + Math.floor(this.data.scale*1000);
        this.slabel.innerHTML =  Math.floor(this.data.scale*1000) ;
        if (Math.floor(this.data.scale*1000) < 1){
            this.data.scale = 1/1000;
            this.slabel.innerHTML =  Math.floor(this.data.scale*1000);
            return
            this.slabel.innerHTML = "Scale : "  + 100 + "  (min)";
            return
        } else if(Math.floor(this.data.scale*1000) > 2500){
            this.data.scale = 2500/1000;
            this.slabel.innerHTML ="Scale : "  +  2500 +" (max)";
            return
        }
        this.data.origin_x = mouseX - x * this.data.scale;
        this.data.origin_y = mouseY - y * this.data.scale;
        this.activeHeight = this.data.height/this.data.scale;
        this.activeWidth = this.data.width/this.data.scale;
        //console.log(this.activeWidth + "  " + this.activeHeight);

        this.initate(this.data.origin_x,this.data.origin_y,x,y);
    }
     debug(){
        if (this.debugging){
            this.dlabel.style.display = "none" ;
            this.debugging = false;
        }else{
            let text = "";
            // this.data.renderChunk = ["-24,-23","-24,-22","-24,-21","-24,-20","-24,-19","-24,-18","-24,-17","-24,-16","-24,-15","-24,-14","-24,-13","-24,-12","-24,-11","-24,-10","-24,-9","-24,-8","-24,-7","-24,-6","-24,-5","-24,-4","-24,-3","-24,-2","-23,-23","-23,-22","-23,-21","-23,-20","-23,-19","-23,-18","-23,-17","-23,-16","-23,-15","-23,-14","-23,-13","-23,-12","-23,-11","-23,-10","-23,-9","-23,-8","-23,-7","-23,-6","-23,-5","-23,-4","-23,-3","-23,-2","-22,-23","-22,-22","-22,-21","-22,-20","-22,-19","-22,-18","-22,-17","-22,-16","-22,-15","-22,-14","-22,-13","-22,-12","-22,-11","-22,-10","-22,-9","-22,-8","-22,-7","-22,-6","-22,-5","-22,-4","-22,-3","-22,-2","-21,-23","-21,-22","-21,-21","-21,-20","-21,-19","-21,-18","-21,-17","-21,-16","-21,-15","-21,-14","-21,-13","-21,-12","-21,-11","-21,-10","-21,-9","-21,-8","-21,-7","-21,-6","-21,-5","-21,-4","-21,-3","-21,-2","-20,-23","-20,-22","-20,-21","-20,-20","-20,-19","-20,-18","-20,-17","-20,-16","-20,-15","-20,-14","-20,-13","-20,-12","-20,-11","-20,-10","-20,-9","-20,-8","-20,-7","-20,-6","-20,-5","-20,-4","-20,-3","-20,-2","-19,-23","-19,-22","-19,-21","-19,-20","-19,-19","-19,-18","-19,-17","-19,-16","-19,-15","-19,-14","-19,-13","-19,-12","-19,-11","-19,-10","-19,-9","-19,-8","-19,-7","-19,-6","-19,-5","-19,-4","-19,-3","-19,-2","-18,-23","-18,-22","-18,-21","-18,-20","-18,-19","-18,-18","-18,-17","-18,-16","-18,-15","-18,-14","-18,-13","-18,-12","-18,-11","-18,-10","-18,-9","-18,-8","-18,-7","-18,-6","-18,-5","-18,-4","-18,-3","-18,-2","-17,-23","-17,-22","-17,-21","-17,-20","-17,-19","-17,-18","-17,-17","-17,-16","-17,-15","-17,-14","-17,-13","-17,-12","-17,-11","-17,-10","-17,-9","-17,-8","-17,-7","-17,-6","-17,-5","-17,-4","-17,-3","-17,-2","-16,-23","-16,-22","-16,-21","-16,-20","-16,-19","-16,-18","-16,-17","-16,-16","-16,-15","-16,-14","-16,-13","-16,-12","-16,-11","-16,-10","-16,-9","-16,-8","-16,-7","-16,-6","-16,-5","-16,-4","-16,-3","-16,-2","-15,-23","-15,-22","-15,-21","-15,-20","-15,-19","-15,-18","-15,-17","-15,-16","-15,-15","-15,-14","-15,-13","-15,-12","-15,-11","-15,-10","-15,-9","-15,-8","-15,-7","-15,-6","-15,-5","-15,-4","-15,-3","-15,-2","-14,-23","-14,-22","-14,-21","-14,-20","-14,-19","-14,-18","-14,-17","-14,-16","-14,-15","-14,-14","-14,-13","-14,-12","-14,-11","-14,-10","-14,-9","-14,-8","-14,-7","-14,-6","-14,-5","-14,-4","-14,-3","-14,-2","-13,-23","-13,-22","-13,-21","-13,-20","-13,-19","-13,-18","-13,-17","-13,-16","-13,-15","-13,-14","-13,-13","-13,-12","-13,-11","-13,-10","-13,-9","-13,-8","-13,-7","-13,-6","-13,-5","-13,-4","-13,-3","-13,-2","-12,-23","-12,-22","-12,-21","-12,-20","-12,-19","-12,-18","-12,-17","-12,-16","-12,-15","-12,-14","-12,-13","-12,-12","-12,-11","-12,-10","-12,-9","-12,-8","-12,-7","-12,-6","-12,-5","-12,-4","-12,-3","-12,-2","-11,-23","-11,-22","-11,-21","-11,-20","-11,-19","-11,-18","-11,-17","-11,-16","-11,-15","-11,-14","-11,-13","-11,-12","-11,-11","-11,-10","-11,-9","-11,-8","-11,-7","-11,-6","-11,-5","-11,-4","-11,-3","-11,-2","-10,-23","-10,-22","-10,-21","-10,-20","-10,-19","-10,-18","-10,-17","-10,-16","-10,-15","-10,-14","-10,-13","-10,-12","-10,-11","-10,-10","-10,-9","-10,-8","-10,-7","-10,-6","-10,-5","-10,-4","-10,-3","-10,-2","-9,-23","-9,-22","-9,-21","-9,-20","-9,-19","-9,-18","-9,-17","-9,-16","-9,-15","-9,-14","-9,-13","-9,-12","-9,-11","-9,-10","-9,-9","-9,-8","-9,-7","-9,-6","-9,-5","-9,-4","-9,-3","-9,-2","-8,-23","-8,-22","-8,-21","-8,-20","-8,-19","-8,-18","-8,-17","-8,-16","-8,-15","-8,-14","-8,-13","-8,-12","-8,-11","-8,-10","-8,-9","-8,-8","-8,-7","-8,-6","-8,-5","-8,-4","-8,-3","-8,-2","-7,-23","-7,-22","-7,-21","-7,-20","-7,-19","-7,-18","-7,-17","-7,-16","-7,-15","-7,-14","-7,-13","-7,-12","-7,-11","-7,-10","-7,-9","-7,-8","-7,-7","-7,-6","-7,-5","-7,-4","-7,-3","-7,-2","-6,-23","-6,-22","-6,-21","-6,-20","-6,-19","-6,-18","-6,-17","-6,-16","-6,-15","-6,-14","-6,-13","-6,-12","-6,-11","-6,-10","-6,-9","-6,-8","-6,-7","-6,-6","-6,-5","-6,-4","-6,-3","-6,-2","-5,-23","-5,-22","-5,-21","-5,-20","-5,-19","-5,-18","-5,-17","-5,-16","-5,-15","-5,-14","-5,-13","-5,-12","-5,-11","-5,-10","-5,-9","-5,-8","-5,-7","-5,-6","-5,-5","-5,-4","-5,-3","-5,-2","-4,-23","-4,-22","-4,-21","-4,-20","-4,-19","-4,-18","-4,-17","-4,-16","-4,-15","-4,-14","-4,-13","-4,-12","-4,-11","-4,-10","-4,-9","-4,-8","-4,-7","-4,-6","-4,-5","-4,-4","-4,-3","-4,-2","-3,-23","-3,-22","-3,-21","-3,-20","-3,-19","-3,-18","-3,-17","-3,-16","-3,-15","-3,-14","-3,-13","-3,-12","-3,-11","-3,-10","-3,-9","-3,-8","-3,-7","-3,-6","-3,-5","-3,-4","-3,-3","-3,-2","-2,-23","-2,-22","-2,-21","-2,-20","-2,-19","-2,-18","-2,-17","-2,-16","-2,-15","-2,-14","-2,-13","-2,-12","-2,-11","-2,-10","-2,-9","-2,-8","-2,-7","-2,-6","-2,-5","-2,-4","-2,-3","-2,-2","-1,-23","-1,-22","-1,-21","-1,-20","-1,-19","-1,-18","-1,-17","-1,-16","-1,-15","-1,-14","-1,-13","-1,-12","-1,-11","-1,-10","-1,-9","-1,-8","-1,-7","-1,-6","-1,-5","-1,-4","-1,-3","-1,-2","0,-23","0,-22","0,-21","0,-20","0,-19","0,-18","0,-17","0,-16","0,-15","0,-14","0,-13","0,-12","0,-11","0,-10","0,-9","0,-8","0,-7","0,-6","0,-5","0,-4","0,-3","0,-2","1,-23","1,-22","1,-21","1,-20","1,-19","1,-18","1,-17","1,-16","1,-15","1,-14","1,-13","1,-12","1,-11","1,-10","1,-9","1,-8","1,-7","1,-6","1,-5","1,-4","1,-3","1,-2","2,-23","2,-22","2,-21","2,-20","2,-19","2,-18","2,-17","2,-16","2,-15","2,-14","2,-13","2,-12","2,-11","2,-10","2,-9","2,-8","2,-7","2,-6","2,-5","2,-4","2,-3","2,-2","3,-23","3,-22","3,-21","3,-20","3,-19","3,-18","3,-17","3,-16","3,-15","3,-14","3,-13","3,-12","3,-11","3,-10","3,-9","3,-8","3,-7","3,-6","3,-5","3,-4","3,-3","3,-2","4,-23","4,-22","4,-21","4,-20","4,-19","4,-18","4,-17","4,-16","4,-15","4,-14","4,-13","4,-12","4,-11","4,-10","4,-9","4,-8","4,-7","4,-6","4,-5","4,-4","4,-3","4,-2","5,-23","5,-22","5,-21","5,-20","5,-19","5,-18","5,-17","5,-16","5,-15","5,-14","5,-13","5,-12","5,-11","5,-10","5,-9","5,-8","5,-7","5,-6","5,-5","5,-4","5,-3","5,-2","6,-23","6,-22","6,-21","6,-20","6,-19","6,-18","6,-17","6,-16","6,-15","6,-14","6,-13","6,-12","6,-11","6,-10","6,-9","6,-8","6,-7","6,-6","6,-5","6,-4","6,-3","6,-2","7,-23","7,-22","7,-21","7,-20","7,-19","7,-18","7,-17","7,-16","7,-15","7,-14","7,-13","7,-12","7,-11","7,-10","7,-9","7,-8","7,-7","7,-6","7,-5","7,-4","7,-3","7,-2","8,-23","8,-22","8,-21","8,-20","8,-19","8,-18","8,-17","8,-16","8,-15","8,-14","8,-13","8,-12","8,-11","8,-10","8,-9","8,-8","8,-7","8,-6","8,-5","8,-4","8,-3","8,-2","9,-23","9,-22","9,-21","9,-20","9,-19","9,-18","9,-17","9,-16","9,-15","9,-14","9,-13","9,-12","9,-11","9,-10","9,-9","9,-8","9,-7","9,-6","9,-5","9,-4","9,-3","9,-2","10,-23","10,-22","10,-21","10,-20","10,-19","10,-18","10,-17","10,-16","10,-15","10,-14","10,-13","10,-12","10,-11","10,-10","10,-9","10,-8","10,-7","10,-6","10,-5","10,-4","10,-3","10,-2","11,-23","11,-22","11,-21","11,-20","11,-19","11,-18","11,-17","11,-16","11,-15","11,-14","11,-13","11,-12","11,-11","11,-10","11,-9","11,-8","11,-7","11,-6","11,-5","11,-4","11,-3","11,-2","12,-23","12,-22","12,-21","12,-20","12,-19","12,-18","12,-17","12,-16","12,-15","12,-14","12,-13","12,-12","12,-11","12,-10","12,-9","12,-8","12,-7","12,-6","12,-5","12,-4","12,-3","12,-2","13,-23","13,-22","13,-21","13,-20","13,-19","13,-18","13,-17","13,-16","13,-15","13,-14","13,-13","13,-12","13,-11","13,-10","13,-9","13,-8","13,-7","13,-6","13,-5","13,-4","13,-3","13,-2","14,-23","14,-22","14,-21","14,-20","14,-19","14,-18","14,-17","14,-16","14,-15","14,-14","14,-13","14,-12","14,-11","14"]
            text += "<h1>Parameters</h1>";
            text += `<h10>Show Axis : ${this.data.showAxis}<br>`;
            text += `<h10>Show Border : ${this.data.showBorder}<br>`;
            let data = JSON.stringify(this.data.renderChunk)
            text += `<h10>Chunk :${this.data.renderChunk.length} <span onclick = "${this.marker.copy(data)}">Copy<span>`;
            document.getElementById("paraDebugg").innerHTML = text;
            this.dlabel.style.display = "flex" ;
            this.debugging = true;
        }
     }

     renderChunkFormatter(renderChunk){
        for (let chunk of renderChunk){
        }
     }




}
