let xhttp = new XMLHttpRequest();

let jsonData = "";

xhttp.onreadystatechange = function () {
    if(xhttp.readyState === 4 && xhttp.status === 200){
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

    const tagetId = "surrenderTableBody";
    for(let i=0; i<json.item.surrenderList.length; i++){
        const tdList = [];
        createElement(tdList, "th", i + 1);
        createElement(tdList, "td", json.item.plicd);
        createElement(tdList, "td", json.item.pliNm);
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


const csvBtn = document.querySelector("#csvBtn");
csvBtn.click();
csvBtn.addEventListener("click", async function() {
    const target = document.querySelector("#surrenderTable");
    console.log(target);
});

class ToCSV {
    constructor() {
        // CSV 버튼에 이벤트 등록
        document.querySelector('#csvBtn').addEventListener('click', e => {
            e.preventDefault()
            this.getCSV('mycsv.csv')
        })
    }

    downloadCSV(csv, filename) {
        let csvFile;
        let downloadLink;

        const BOM = "\uFEFF";
        csv = BOM + csv

        console.log(csv)

        // CSV 파일을 위한 Blob 만들기
        csvFile = new Blob([csv], {type: "text/csv;charset=UTF-8"})

        // Download link를 위한 a 엘리먼스 생성
        downloadLink = document.createElement("a")

        // 다운받을 csv 파일 이름 지정하기
        downloadLink.download = filename;

        // 위에서 만든 blob과 링크를 연결
        downloadLink.href = window.URL.createObjectURL(csvFile)

        // 링크가 눈에 보일 필요는 없으니 숨겨줍시다.
        downloadLink.style.display = "none"

        // HTML 가장 아래 부분에 링크를 붙여줍시다.
        document.body.appendChild(downloadLink)

        // 클릭 이벤트를 발생시켜 실제로 브라우저가 '다운로드'하도록 만들어줍시다.
        downloadLink.click();
    }

    getCSV(filename) {
        // csv를 담기 위한 빈 Array를 만듭시다.
        const csv = []
        const rows = document.querySelectorAll("#surrenderTable tr")



        for (let i = 0; i < rows.length; i++) {
            const row = [], cols = rows[i].querySelectorAll("td, th")

            for (let j = 0; j < cols.length; j++)
                row.push(cols[j].innerText)

            csv.push(row.join(","))
        }

        // Download CSV
        this.downloadCSV(csv.join("\n"), filename)
    }
}

document.addEventListener('DOMContentLoaded', e => {
    new ToCSV()
})