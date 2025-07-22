class dataPasser{
    constructor(){
        this.canvas = document.getElementById("mapCanvas");
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.scale = 1;
        this.marker = false;
        this.origin_x = 0;
        this.origin_y = 0;
        this.showAxis = true;
        this.showBorder = true;
        this.renderChunk  = false;
        this.mode = "map2";
        this.chunkData = {
            "0,0":[{"x":0,"y":0,"color":"green","label":"New Delhi"}],
            "-2,1":[{"x":-1150,"y":-1350,"color":"purple","label":"Mumbai"}],
            "1,0":[{"x":1300,"y":-200,"color":"gold","label":"Kolkata"},{"x":1700,"y":-400,"color":"teal","label":"Cooch Behar"}],
            "1,2":[{"x":1330,"y":-2150,"color":"orange","label":"Chennai"},{"x":1150,"y":-2100,"color":"blue","label":"Bengaluru"}],
            "0,1":[{"x":950,"y":-1700,"color":"cyan","label":"Hyderabad"},{"x":600,"y":-1350,"color":"lime","label":"Nagpur"}],
            "-1,0":[{"x":-950,"y":-500,"color":"maroon","label":"Ahmedabad"},{"x":-200,"y":-750,"color":"gray","label":"Bhopal"}],
            "-3,2":[{"x":-2200,"y":-2300,"color":"darkslategray","label":"Kavaratti (Lakshadweep)"}],
            "2,2":[{"x":2500,"y":-2200,"color":"indigo","label":"Port Blair (Andaman)"}],
            "-3,-1":[{"x":-2200,"y":700,"color":"sienna","label":"Naliya (Western Gujarat Border)"}],
            "2,-2":[{"x":2700,"y":1500,"color":"darkblue","label":"Walong (Arunachal East)"},{"x":2000,"y":1100,"color":"lightcoral","label":"Itanagar"}],
            "0,-1":[{"x":0,"y":800,"color":"lightgreen","label":"Srinagar"},{"x":500,"y":450,"color":"teal","label":"Lucknow"},{"x":800,"y":200,"color":"brown","label":"Varanasi"}],
            "-2,-1":[{"x":-1600,"y":700,"color":"darkred","label":"Leh"}],
            "-2,0":[{"x":-1700,"y":-300,"color":"crimson","label":"Jaisalmer"}],
            "1,-1":[{"x":1800,"y":500,"color":"violet","label":"Guwahati"},{"x":1900,"y":700,"color":"yellowgreen","label":"Shillong"},{"x":1950,"y":900,"color":"khaki","label":"Gangtok"},{"x":1050,"y":200,"color":"navy","label":"Patna"}],
            "2,-1":[{"x":2100,"y":400,"color":"lightseagreen","label":"Aizawl"},{"x":2050,"y":500,"color":"plum","label":"Imphal"},{"x":2200,"y":800,"color":"peachpuff","label":"Kohima"},{"x":2300,"y":950,"color":"skyblue","label":"Agartala"}],
            "-1,-1":[{"x":-280,"y":300,"color":"pink","label":"Jaipur"}],
            "0,2":[{"x":900,"y":-2500,"color":"darkgreen","label":"Thiruvananthapuram"}],
            "10,0":[{"x":10000,"y":100,"color":"darkgreen","label":"Thiruvananthapuram"}],
        }

        this.loadState();
    }

    loadState(Key){
        this.scale = localStorage.getItem("scale");
        if (this.scale ==null){
            this.scale = 1;
            return;
        }
        // this.mode = localStorage.getItem("mode");
        // console.log(localStorage.getItem("renderChunk"))
        this.renderChunk = JSON.parse(localStorage.getItem("renderChunk"));
        this.chunkData = JSON.parse(localStorage.getItem("chunkData"));
        this.showBorder = localStorage.getItem("showBorder");
        if (this.showBorder === "true"){
            this.showBorder = true;
        } else{
            this.showBorder = false;
        }
        this.showAxis = localStorage.getItem("showAxis");
        if (this.showAxis === "true"){
            this.showAxis = true;
        } else{
            this.showAxis = false;
        }
        let origin = JSON.parse(localStorage.getItem("origin"));
        this.origin_x = origin[0];
        this.origin_y = origin[1];
        // console.log(typeof this.showBorder);
        // console.log(this.showBorder)
        // console.log(origin)
    }

    saveState(){
        localStorage.clear();
        localStorage.setItem("scale",this.scale);
        // localStorage.setItem("mode",this.mode);
        localStorage.setItem("renderChunk",JSON.stringify(this.renderChunk));
        localStorage.setItem("chunkData",JSON.stringify(this.chunkData));
        // localStorage.setItem(this.mode,JSON.stringify(this.chunkData))
        localStorage.setItem("showBorder",this.showBorder);
        localStorage.setItem("showAxis",this.showAxis);
        let origin = [this.origin_x,this.origin_y];
        localStorage.setItem("origin",JSON.stringify(origin));
    }

    modeChanger(newMode){
        localStorage.setItem(this.mode,this.chunkData)
        if (this.mode === "map1"){
        }
    }

}
