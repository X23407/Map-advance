class chunckSystem{
    constructor(data){
        this.curChunk = "1 1";
        this.chunkSize = 1000;
        this.data = data;


    }

    chunkFinder(x,y){
        //console.log(x +" " + y + " "+ this.chunkSize);
        y *= -1;
        return `${Math.floor(x/this.chunkSize)},${Math.floor(y/this.chunkSize)}`
    }

    border(chunk){
        // chunk = "0,5"
        chunk = chunk.split(",")
        // console.log(chunk);
        let x = parseInt(chunk[0])*this.chunkSize;
        let y = parseInt(chunk[1])*this.chunkSize;
        //inverting y for making it suitable for coorfinate canvas based
        y *= -1; 
        // console.log(x+ "  " + y)
        if (x == -this.chunkSize && y == -this.chunkSize){
            this.data.marker.line(x,y+ this.chunkSize,x+this.chunkSize,y+this.chunkSize,"green",[]);
            this.data.marker.line(x+ this.chunkSize,y,x+this.chunkSize,y+this.chunkSize,"green",[]);
            return;
        } else if (y == -this.chunkSize){
            this.data.marker.line(x,y+ this.chunkSize,x+this.chunkSize,y+this.chunkSize,"green",[]);
            if (this.data.showBorder && this.data.scale*1000 > 100){
                this.data.marker.line(x+ this.chunkSize,y,x+this.chunkSize,y+this.chunkSize);
            }           
            return
        } else if (x == -this.chunkSize){
            this.data.marker.line(x+ this.chunkSize,y,x+this.chunkSize,y+this.chunkSize,"green",[]);
            if (this.data.showBorder && this.data.scale*1000 > 100){
                this.data.marker.line(x,y+ this.chunkSize,x+this.chunkSize,y+this.chunkSize);
            }

        }else if (this.data.scale*1000 < 100){
            return
        } else if (this.data.showBorder){
            this.data.marker.line(x,y+ this.chunkSize,x+this.chunkSize,y+this.chunkSize);
            this.data.marker.line(x+ this.chunkSize,y,x+this.chunkSize,y+this.chunkSize);
            return;
        }


    }

    chunkNo(mouse_x,mouse_y){
        let debug = {}
        let width = this.data.width;
        let screenLeft = mouse_x;
        let screenRight = this.data.width - mouse_x;
        let screenbottom = this.data.height - mouse_y;
        let screenup = mouse_y;

        let visibleleft = screenLeft/this.data.scale;
        let visibleright = screenRight/this.data.scale;
        let visibleup = screenup/this.data.scale;
        let visibledown = screenbottom/this.data.scale;

        let chunkleft = Math.ceil(visibleleft/this.chunkSize) //+3;
        let chunkright = Math.ceil(visibleright/this.chunkSize) //+3;
        let chunkup = Math.ceil(visibleup/this.chunkSize)//+3;
        let chunkdown = Math.ceil(visibledown/this.chunkSize)// +3;

        let world_x = (mouse_x - this.data.origin_x) / this.data.scale;
        let world_y = (mouse_y - this.data.origin_y) / this.data.scale;
        // world_y *= -1;

        let curChunkx = Math.floor(world_x/this.chunkSize);
        let curChunky = Math.floor(world_y/this.chunkSize);
        let x_range = this.intB2No(curChunkx - chunkleft , curChunkx + chunkright);
        let y_range = this.intB2No(curChunky - chunkup , curChunky + chunkdown );
        let chunkToRender = [];
        for (let i of x_range){
            for (let j of y_range){
                chunkToRender.push(`${i},${j}`)

            }

        }
        debug["mousex"] = mouse_x;
        debug["mousey"] = mouse_y;
        debug["sceen"] = {"screenleft": screenLeft,"screeright": screenRight,"screenup": screenup,"screendown" : screenbottom};
        debug["overworld"] = {"worldd_x": world_x,"world_y":world_y };
        debug["origin"] = [this.data.origin_x,this.data.origin_y];
        debug["curChunk"] = [curChunkx,curChunky];
        debug["curChunkData"] = this.chunkFinder(world_x,world_y*-1);
        debug["chunk"] = [chunkleft,chunkright,chunkup,chunkdown];
        debug["range"] = {"x_range": x_range,"y_range": y_range};
        debug["chunktorender"] = chunkToRender;
        // console.log(JSON.stringify(debug))

        return chunkToRender;

        // return `${chunkleft},${chunkright} :: ${chunkup},${chunkdown}` + "  " + this.curChunk;
    }

    intB2No(start , end){
        let result = [];
        while (start <= end){
            result.push(start);
            start ++;
        }
        return result;
    }
}


// debugg = {
//     "mousex":14,"mousey":16,
//     "sceen":{"screenleft":14,"screeright":730,"screenup":16,"screendown":289},
//     "overworld":{"worldd_x":14,"world_y":-16},
//     "origin":[1.1199999999999992,1.2799999999999994],
//     "curChunk":[0,-1],
//     "curChunkData":"0,-1",
//     "chunk":[2,3,2,2],
//     "range":{"x_range":[-2,-1,0,1,2,3],"y_range":[-3,-2,-1,0,1]},
//     "chunktorender":[
//         "-2,-3","-2,-2","-2,-1","-2,0","-2,1",
//         "-1,-3","-1,-2","-1,-1","-1,0","-1,1",
//         "0,-3","0,-2","0,-1","0,0","0,1",
//         "1,-3","1,-2","1,-1","1,0","1,1",
//         "2,-3","2,-2","2,-1","2,0","2,1",
//         "3,-3","3,-2","3,-1","3,0","3,1"]}

//  [
//     '-2,-3', '-2,-2', '-2,-1', '-2,0', '-2,1',
//      '-1,-3', '-1,-2', '-1,-1', '-1,0', '-1,1',
//      '0,-3', '0,-2', '0,-1', '0,0', '0,1', 
//      '1,-3', '1,-2', '1,-1', '1,0', '1,1',
//      '2,-3', '2,-2', '2,-1', '2,0', '2,1',
//      '3,-3', '3,-2', '3,-1', '3,0', '3,1']
// // let c = new chunckSystem();
// let res = c.intB2No(0,5);
// console.log(res)
// console.log(c.chunkFinder(500,500));
// console.log(c.chunkFinder(501,500));
// console.log(c.chunkFinder(-10,-10));
// console.log(c.chunkFinder(10,-10));

//{"0,0":[{"x":0,"y":0,"color":"green","label":"New Delhi"}],"-3,2":[{"x":-1150,"y":-1350,"color":"purple","label":"Mumbai"}],"2,0":[{"x":1300,"y":-200,"color":"gold","label":"Kolkata"}],"2,4":[{"x":1330,"y":-2150,"color":"orange","label":"Chennai"},{"x":1150,"y":-2100,"color":"blue","label":"Bengaluru"}],"1,3":[{"x":950,"y":-1700,"color":"cyan","label":"Hyderabad"}],"-2,1":[{"x":-950,"y":-500,"color":"maroon","label":"Ahmedabad"}],"-5,4":[{"x":-2200,"y":-2300,"color":"darkslategray","label":"Kavaratti (Lakshadweep)"}],"5,4":[{"x":2500,"y":-2200,"color":"indigo","label":"Port Blair (Andaman)"}],"-5,-2":[{"x":-2200,"y":700,"color":"sienna","label":"Naliya (Western Gujarat Border)"}],"5,-3":[{"x":2700,"y":1500,"color":"darkblue","label":"Walong (Arunachal East)"}],"0,-2":[{"x":0,"y":800,"color":"lightgreen","label":"Srinagar"}],"-4,-2":[{"x":-1600,"y":700,"color":"darkred","label":"Leh"}],"3,0":[{"x":1700,"y":-400,"color":"teal","label":"Cooch Behar"}],"-4,0":[{"x":-1700,"y":-300,"color":"crimson","label":"Jaisalmer"}],"3,-1":[{"x":1800,"y":500,"color":"violet","label":"Guwahati"}],"3,-2":[{"x":1900,"y":700,"color":"yellowgreen","label":"Shillong"},{"x":1950,"y":900,"color":"khaki","label":"Gangtok"}],"4,-3":[{"x":2000,"y":1100,"color":"lightcoral","label":"Itanagar"}],"4,-1":[{"x":2100,"y":400,"color":"lightseagreen","label":"Aizawl"},{"x":2050,"y":500,"color":"plum","label":"Imphal"}],"4,-2":[{"x":2200,"y":800,"color":"peachpuff","label":"Kohima"},{"x":2300,"y":950,"color":"skyblue","label":"Agartala"}],"-1,-1":[{"x":-280,"y":300,"color":"pink","label":"Jaipur"}],"1,-1":[{"x":500,"y":450,"color":"teal","label":"Lucknow"},{"x":800,"y":200,"color":"brown","label":"Varanasi"}],"-1,1":[{"x":-200,"y":-750,"color":"gray","label":"Bhopal"}],"1,2":[{"x":600,"y":-1350,"color":"lime","label":"Nagpur"}],"2,-1":[{"x":1050,"y":200,"color":"navy","label":"Patna"}],"1,5":[{"x":900,"y":-2500,"color":"darkgreen","label":"Thiruvananthapuram"}]}

// {
//   "0,0": [
//     {
//       "x": 0,
//       "y": 0,
//       "color": "green",
//       "label": "New Delhi"
//     }
//   ],
//   "-3,2": [
//     {
//       "x": -1150,
//       "y": -1350,
//       "color": "purple",
//       "label": "Mumbai"
//     }
//   ],
//   "2,0": [
//     {
//       "x": 1300,
//       "y": -200,
//       "color": "gold",
//       "label": "Kolkata"
//     }
//   ],
//   "2,4": [
//     {
//       "x": 1330,
//       "y": -2150,
//       "color": "orange",
//       "label": "Chennai"
//     },
//     {
//       "x": 1150,
//       "y": -2100,
//       "color": "blue",
//       "label": "Bengaluru"
//     }
//   ],
//   "1,3": [
//     {
//       "x": 950,
//       "y": -1700,
//       "color": "cyan",
//       "label": "Hyderabad"
//     }
//   ],
//   "-2,1": [
//     {
//       "x": -950,
//       "y": -500,
//       "color": "maroon",
//       "label": "Ahmedabad"
//     }
//   ],
//   "-5,4": [
//     {
//       "x": -2200,
//       "y": -2300,
//       "color": "darkslategray",
//       "label": "Kavaratti (Lakshadweep)"
//     }
//   ],
//   "5,4": [
//     {
//       "x": 2500,
//       "y": -2200,
//       "color": "indigo",
//       "label": "Port Blair (Andaman)"
//     }
//   ],
//   "-5,-2": [
//     {
//       "x": -2200,
//       "y": 700,
//       "color": "sienna",
//       "label": "Naliya (Western Gujarat Border)"
//     }
//   ],
//   "5,-3": [
//     {
//       "x": 2700,
//       "y": 1500,
//       "color": "darkblue",
//       "label": "Walong (Arunachal East)"
//     }
//   ],
//   "0,-2": [
//     {
//       "x": 0,
//       "y": 800,
//       "color": "lightgreen",
//       "label": "Srinagar"
//     }
//   ],
//   "-4,-2": [
//     {
//       "x": -1600,
//       "y": 700,
//       "color": "darkred",
//       "label": "Leh"
//     }
//   ],
//   "3,0": [
//     {
//       "x": 1700,
//       "y": -400,
//       "color": "teal",
//       "label": "Cooch Behar"
//     }
//   ],
//   "-4,0": [
//     {
//       "x": -1700,
//       "y": -300,
//       "color": "crimson",
//       "label": "Jaisalmer"
//     }
//   ],
//   "3,-1": [
//     {
//       "x": 1800,
//       "y": 500,
//       "color": "violet",
//       "label": "Guwahati"
//     }
//   ],
//   "3,-2": [
//     {
//       "x": 1900,
//       "y": 700,
//       "color": "yellowgreen",
//       "label": "Shillong"
//     },
//     {
//       "x": 1950,
//       "y": 900,
//       "color": "khaki",
//       "label": "Gangtok"
//     }
//   ],
//   "4,-3": [
//     {
//       "x": 2000,
//       "y": 1100,
//       "color": "lightcoral",
//       "label": "Itanagar"
//     }
//   ],
//   "4,-1": [
//     {
//       "x": 2100,
//       "y": 400,
//       "color": "lightseagreen",
//       "label": "Aizawl"
//     },
//     {
//       "x": 2050,
//       "y": 500,
//       "color": "plum",
//       "label": "Imphal"
//     }
//   ],
//   "4,-2": [
//     {
//       "x": 2200,
//       "y": 800,
//       "color": "peachpuff",
//       "label": "Kohima"
//     },
//     {
//       "x": 2300,
//       "y": 950,
//       "color": "skyblue",
//       "label": "Agartala"
//     }
//   ],
//   "-1,-1": [
//     {
//       "x": -280,
//       "y": 300,
//       "color": "pink",
//       "label": "Jaipur"
//     }
//   ],
//   "1,-1": [
//     {
//       "x": 500,
//       "y": 450,
//       "color": "teal",
//       "label": "Lucknow"
//     },
//     {
//       "x": 800,
//       "y": 200,
//       "color": "brown",
//       "label": "Varanasi"
//     }
//   ],
//   "-1,1": [
//     {
//       "x": -200,
//       "y": -750,
//       "color": "gray",
//       "label": "Bhopal"
//     }
//   ],
//   "1,2": [
//     {
//       "x": 600,
//       "y": -1350,
//       "color": "lime",
//       "label": "Nagpur"
//     }
//   ],
//   "2,-1": [
//     {
//       "x": 1050,
//       "y": 200,
//       "color": "navy",
//       "label": "Patna"
//     }
//   ],
//   "1,5": [
//     {
//       "x": 900,
//       "y": -2500,
//       "color": "darkgreen",
//       "label": "Thiruvananthapuram"
//     }
//   ]
// }

