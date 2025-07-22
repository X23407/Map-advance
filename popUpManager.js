class popUpManager{
    constructor(data){
        this.context_div = false;
        this.main_div = false
        this.data = data;
        this.lastPointSearch = ["0 0"]
    }

    popupCreater(){
        this.main_div = document.createElement("div");
        // this.main_div.className = "prompt-overlay";
        this.main_div.className ="prompt-more-optn"
        this.main_div.style.display = "flex";
        document.body.appendChild(this.main_div);
        //Content div
        this.context_div = document.createElement("div");
        this.context_div.className = "prompt-box-popup";
        this.main_div.appendChild(this.context_div);
        // this.context_div = context_div;
        let buttons = {
            "ADD PLACE" :canvasM.addPoint ,
            // "SEARCH PLACE" : canvasM.pointSearcher,
            // "EXPORT DATA" : canvasM.dataExporter,
            // "IMPOER DATA " : canvasM.dataImport,
            "Debugg" : canvasM.debug,
            "Rename" : canvasM.rename,
        }
        for (let button in buttons){
            this.buttonCreater(button,buttons[button])
        }
        this.buttonCreater("Search Place",this.pointSearcher,true);
        this.buttonCreater("Import Data",this.dataImport,true);
        this.buttonCreater("Export Data",this.dataExporter,true);
        this.buttonCreater("Clear Data",this.clearData,true);
        this.buttonCreater("Hide",this.hidePopUp,true);
        // this.buttonCreater("Rename",this.rename,true);
        this.buttonCreater(this.data.mode,this.changeMode,true)
        this.showAxisBorder()

    }

    buttonCreater(key = "button-1",value = canvasM.dataExporter,local = false){
        let btn = document.createElement("input");
        btn.type = "button";
        // val//ue = canvasM.dataExporter;
        btn.value = key;
        btn.className ="prompt-button"
        let line_add = document.createElement("br");
        if (local){
            btn.onclick = (e) => {
                value.bind(this,e)();
            }
        }else{
            btn.onclick = (e) => {
                // canvasM.dataExporter();
                value.bind(canvasM)();
            }}
        // this.context_div.innerHTML += "<br>"
        // this.context_div.appendChild(document.createElement("br"))
        this.context_div.appendChild(line_add)
        this.context_div.appendChild(line_add)
        this.context_div.appendChild(btn);

    }

    showAxisBorder(){
        let div_temp = document.createElement("div");
        let showAxis = document.createElement("input");
        showAxis.type = "button";
        showAxis.value = "Axis";
        showAxis.className = "show-button"
        showAxis.style.width = "10ch";
        if (this.data.showAxis == true){
            showAxis.style.backgroundColor = "lime"
        }else{
           showAxis.style.backgroundColor = "pink" 
        }
        showAxis.onclick = (e) => {
            if (this.data.showAxis){
                this.data.showAxis = false;
                showAxis.style.backgroundColor = "pink"
            } else {
                this.data.showAxis = true;
                showAxis.style.backgroundColor = "lime"
            }
            alert("It do not have any functionality for now!");
            return;
            console.log(this.data.showAxis)
            canvasM.reload();
        }
        div_temp.appendChild(showAxis);
        let showBorder = document.createElement("input");
        showBorder.type = "button";
        showBorder.value = "Border";
        showBorder.className = "show-button"
        showBorder.style.width = "10ch";
        showBorder.onclick = (e) => {
            if (this.data.showBorder == true){
                this.data.showBorder = false;
                showBorder.style.backgroundColor = "pink";
            }else{
                this.data.showBorder = true;
                showBorder.style.backgroundColor = "lime"
            }
            canvasM.reload();
        }
        if (this.data.showBorder){
            showBorder.style.backgroundColor = "lime";
        }else{
            showBorder.style.backgroundColor = "pink";
        }
        div_temp.appendChild(showBorder)

        this.context_div.appendChild(div_temp)

    }

    hidePopUp(){
        this.main_div.style.display = "none";
        
    }
    clearData(){
        let result = confirm("Do you really want to delete all data?");
        if (result){
            this.data.chunkData = {}
            canvasM.reload();
        }
    }

    changeMode(event){
        let mode = ["map1","map2","map3"];
        let index = mode.indexOf(this.data.mode);
        index +=1;
        console.log(index)
        if (index >= mode.length){
            index = 0
            }
        event.target.value = mode[index];
        this.data.mode = mode[index]
        

    }

    rename(){
       document.getElementById('customPromptRename').style.display = 'flex'; 
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
        // console.log(file);
        reader.readAsText(file);
        // canvasM.reload();
        // canvasM.initate(0,0)

    }

    dataExporter(){
        let result = confirm("A file will be downloade on your device. Do you want to confirm?")
        if(!result){
            return
        }
        let name = prompt("Enter File Name.")
        let chunkData = JSON.stringify(this.data.chunkData);
        const blob = new Blob([chunkData],{type : "application/json"});
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        let now = new Date();
        let month = now.getMonth() +1;
        if (month.toString().length == 1){
            now = `${now.getDate()}-0${now.getMonth()+1}-${now.getFullYear()}`
        }else{
            now = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`
        }
        // now = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`
        console.log(now)
        if (name){
            name = name.replaceAll(" ","-")
            link.download = `${now}-${name}.json`
        }else{
            link.download = `${now}-Map-adv-data.json`
        }
        link.click();
        console.log(chunkData)
    }

    pointSearcher(){
        document.getElementById('promptInput').value = this.lastPointSearch[0];
        document.getElementById('customPrompt').style.display = 'flex';
        
    }

    submitSearch(mode){
        console.log(this.searchMode)
        if (mode == "close"){
            document.getElementById('customPrompt').style.display = 'none';
            return
        }
        if (this.searchMode == "Name"){
            if (this.poi){
                console.log(this.poi);
                canvasM.initate2(this.poi.x,this.poi.y);
                document.getElementById('customPrompt').style.display = 'none';
                return
            } else{
                alert(`No such ${document.getElementById('promptInput').value} place exist. Check for typo!`)
                return
            }
        }
        this.pointSearched = document.getElementById('promptInput').value;
        document.getElementById('customPrompt').style.display = 'none';
        if (!this.pointSearched || mode == "close"){
            return
        }
        // let pois = prompt("Enter the coordinate in x y",this.lastPointSearch);
        let poi = this.pointSearched.split(" ");
        console.log(poi + "  point")
        let n1 = Number(poi[0]);
        let n2 = Number(poi[1]);
        if (isNaN(n1) || isNaN(n2)){
            alert("n1 is not a number")
        } else{
            this.lastPointSearch.unshift(this.pointSearched)
            canvasM.initate2(n1,n2)
            
        }
    }
    
}
