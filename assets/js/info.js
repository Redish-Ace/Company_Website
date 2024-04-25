const img = document.querySelectorAll(".menu_content_wrapper");
for(let i=0;i < img.length; i++){
    img[i].addEventListener('click', () =>{
        const menu_content = document.querySelector(".menu_content");
        const info = document.createElement('div');
        info.classList.add("information");
        
        if(document.getElementsByClassName("information").item(0) != null){
            clearInfo();
        }

        let name;
    
        const h3Element = img[i].querySelector('div h3');
        name = h3Element.textContent || h3Element.innerText;
        
        getInfo(name, info);

        menu_content.append(info);

        let bodyRect = document.body.getBoundingClientRect();
        let elemRect = info.getBoundingClientRect();
        let offset = elemRect.top - bodyRect.top - 75;

        window.scrollTo(0, offset);
    });
}

function clearInfo(){
    const info = document.querySelector(".information");
    info.remove();
}

function getInfo(name, info) {

    let xmlDoc;
    const xmlFile = "./assets/xml/info.xml";

    if (typeof window.DOMParser != "undefined") {
        const xmlhttp=new XMLHttpRequest();
        xmlhttp.open("GET",xmlFile,true);
        if (xmlhttp.overrideMimeType) {
            xmlhttp.overrideMimeType('text/xml');
        }
        xmlhttp.onload = function() {
            xmlDoc=xmlhttp.responseXML;
            processXML(xmlDoc, name, info);
        };
        xmlhttp.send();
    }
    else {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async="false";
        xmlDoc.load(xmlFile);
        processXML(xmlDoc, name, info);
    }
}

function processXML(xmlDoc, name, info) {
    const descDiv = document.createElement("div");
    descDiv.classList.add("description");
    const desc = document.createElement("p");
    const ingDiv = document.createElement("div");
    ingDiv.classList.add("ingredient");
    const ing = document.createElement("p");

    descDiv.classList.add("info-desc");
    ingDiv.classList.add("info-desc");

    let tagObj=xmlDoc.getElementsByTagName("dessert");
    for (let i = 0; i < tagObj.length; i++) {
        let nameValue = tagObj[i].getElementsByTagName("name")[0].childNodes[0].nodeValue;
        if(nameValue == name){
            let descriptionValue = tagObj[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
            let ingredientValue = tagObj[i].getElementsByTagName("ingredients")[0].childNodes[0].nodeValue;

            splitText(descriptionValue, desc);
            splitText(ingredientValue, ing);

            descDiv.innerHTML += "<h2>" + name + ":</h2><br>";

            descDiv.append(desc);
            ingDiv.innerHTML += "<h3>Ingrediente:</h3><br>";
            ingDiv.append(ing);

            info.append(descDiv);
            info.innerHTML+= "<hr>"
            info.append(ingDiv);
            break;
        }
    }
}

function splitText(text, parag){
    let arr = text.split("/e");
    for(let i=0; i<arr.length; i++){
        parag.innerHTML += arr[i] + "<br>";
    }
}