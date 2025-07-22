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
        // console.log(mouse_x+"  "+mouse_y)
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

    chunkLoad(world_x,world_y){
        let mouse_x = this.data.width/2;
        let mouse_y = this.data.height/2
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

        // let world_x = (mouse_x - this.data.origin_x) / this.data.scale;
        // let world_y = (mouse_y - this.data.origin_y) / this.data.scale;
        
        
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

        return chunkToRender;
    }

    nearChunk(x,y,chunkDist = 20){
        let curChunk_x = Math.floor(x/this.chunkSize);
        let curChunk_y = Math.floor(y/this.chunkSize);

        let x_range = this.intB2No(curChunk_x - chunkDist,curChunk_x+chunkDist);
        let y_range = this.intB2No(curChunk_y - chunkDist,curChunk_y + chunkDist);

        let chunkToRender = [];
        for (let i of x_range){
            for (let j of y_range){
                chunkToRender.push(`${i},${j}`)

            }}
        return chunkToRender;

    }
}
