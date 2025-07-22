class canvasShapeCreater{
    constructor(data){
        this.canvas = document.getElementById("mapCanvas");
        this.ctx = canvas.getContext("2d");
        this.data = data;
    }
    circle(centre_x = 100,centre_y = 100,radius = 50,color = "green",label = "Demo"){
        centre_y *= -1;
        radius  /= this.data.scale;
        this.ctx.beginPath();
        this.ctx.strokeStyle = "black";
        this.ctx.arc(centre_x,centre_y,radius,0,Math.PI*2,true);
        this.ctx.stroke();
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.fillStyle = "black";
        let fontsize = 16/this.data.scale;
        this.ctx.font = `${fontsize}px sans-serif`;
        this.ctx.fillText(label, centre_x + 15, centre_y);

    }

    rectangle(x=100,y= 100,width = 10,height = 10,color = "red",label = "Rectangle"){
        // x += this.origin_x;
        // y = this.origin_y - y;
        y *= -1;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x,y,width,height);
        this.ctx.fillStyle = "black";
        this.ctx.fillText(label,x+20,y + 10);

    }

    line(x1 = 0,y1 = 0, x2 = 0,y2 = 10,color = "black" , linestyle = [3,5]){
        //linsetyle dashed = [3,5]
        //solid = []
        y1 *= -1;
        y2 *= -1;
        // y2 = this.canvas.width;
        this.ctx.beginPath();
        this.ctx.lineWidth = 1/this.data.scale;
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(x1,y1);
        this.ctx.lineTo(x2,y2);
        // this.ctx.setLineDash([3,5]);
        this.ctx.setLineDash(linestyle);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    }

    copy(element,text = "Nothing To Copy"){
        navigator.clipboard.writeText(text);
        alert(`Succesfully copied the chunk <br> ${text}`)
        // element.innertext = "Copied"
    }

    dataImport(){
        let input = document.createElement("input");
        input.type = "file";
        input.click();
        input.addEventListener("change",(e)=>{
            console.clear()
            this.dataImportReal(e);
        })
    }

    dataImportReal(event){
        let file = event.target.files[0];
        if (!file){
            alert("No file has been selected");
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            let chunkData = e.target.result;
            try{
                chunkData = JSON.parse(chunkData);
                console.log(chunkData);
                this.data.chunkData = chunkData;
            }catch(error){
                console.log(error)
            }
        }
        console.log(file);
        reader.readAsText(file);

    }
}
