let xhttp = new XMLHttpRequest();

let jsonData = "";

xhttp.onreadystatechange = function () {
    if(xhttp.readyState == 4 && xhttp.status == 200){
        jsonData = this.responseText;
        // jsonfunc(this.responseText); //this = xhttp
//		jsonfunc(xhttp.responseText); // 둘다 가능
    }
}
xhttp.open("GET","data.json", true);
xhttp.send();

const surrenderButton = document.querySelector("#surrenderButton");
surrenderButton.addEventListener("click", async function() {
    let json = JSON.parse(jsonData); // String -> json으로 변환

    document.querySelector("#progressBar").style.visibility = "visible";

    const surrenderButton = document.querySelector("#surrenderButton");
    console.log("data : " + surrenderButton.dataset.code);

    const surrenderField = document.querySelector("#surrenderField");
    // surrenderField.style.display = "none";

    let delayres = await delay(3000);

    const tagetId = "surrenderTableBody";
    for(i=0; i<json.item.surrenderList.length; i++){
        const tdList = new Array();
        createElement(tdList, "th", i + 1);
        createElement(tdList, "td", json.item.surrenderList[i].year);
        createElement(tdList, "td", json.item.surrenderList[i].mainsurrender);
        displayResponse(tagetId, tdList);
    }
    // surrenderField.style.display = "block";
    document.querySelector("#progressBar").style.visibility = "hidden";
});

const createElement = (instance, tag, value) => {
    let td = document.createElement(tag);
    td.appendChild(document.createTextNode(value));
    instance.push(td);
}

async function delay(delayInms) {
    return new Promise(resolve  => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}

const displayResponse = (instance, node) => {
    let tableBody = document.querySelector("#" + instance);
    let tr = document.createElement("tr");
    node.forEach(td => tr.appendChild(td));
    tableBody.appendChild(tr);
    tableBody.appendChild(tr);
}

const clearBody = (instance) => {
    let tableBody = document.querySelector("#" + instance);
    tableBody.innerHTML = "";
}