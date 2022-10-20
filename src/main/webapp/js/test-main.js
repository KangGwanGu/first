window.addEventListener("DOMContentLoaded", function () {

    init();

});


const originUrl = window.location.origin;

let progressState = [];

let elementList = null;

let premiumSeq = 1, surrenderSeq = 1, benefitContentsSeq = 1, benefitDisbursementSeq = 1;


const ProductFlow = {

    URL: "/v1/tenants/KOREA/product/products/products",

    METHOD: "GET"

};

const ProductPremiumFlow = {

    URL: "/v1/tenants/KOREA/product/products/premiums",

    METHOD: "POST"

};

const ProductSurrendersFlow = {

    URL: "/v1/tenants/KOREA/product/products/surrenders",

    METHOD: "POST"

};

const ProductBenefitsFlow = {

    URL: "/v1/tenants/KOREA/product/products/benefits",

    METHOD: "POST"

};

const CustomerTypeCode = {

    "korName": "고객구분코드",

    "11": "계약자",

    "21": "주피보험자",

    "23": "종피보험자",

    "51": "사망시수익자",

    "91": "대표친권자",

    "92": "공동친권자"

};

const InsuranceTypeCode = {

    "korName": "보종구분코드",

    "01": "주보험",

    "02": "독립특약",

    "03": "종속특약",

    "04": "보험료증액특약",

    "09": "변액초과보험료",

    "10": "추가납입특약"

};

const BillingFrequencyCode = {

    "korName": "납입주기코드",

    "00": "일시납",

    "01": "월납",

    "03": "3개월납",

    "06": "6개월납",

    "12": "연납"

};

const PeriodTypeCode = {

    "korName": "기간구분코드",

    "Y": "년형",

    "A": "세형"

};


const getReverseObj = obj => Object.fromEntries(Object.entries(obj).map(a => a.reverse()));


const getConstant = (key) => {

    switch (key) {

        case "product" :

            return ProductFlow;

        case "premium" :

            return ProductPremiumFlow;

        case "surrender" :

            return ProductSurrendersFlow;

        case "benefit" :

            return ProductBenefitsFlow;

    }
    ;

};


const getIllustration = (id) => {

    let data = document.querySelector('#' + id).innerText;

    return data.replaceAll(/\n/g, "").replaceAll(/\s*/g, "");

};


const premiumBtn = document.querySelector("#btnPremium");

premiumBtn.addEventListener("click", () => {

    progressBarDisplay(0, "Y");

    const targetPattern = getConstant(premiumBtn.dataset['code']);

    let illustration = getIllustration("view2json");


    console.log(`url : ${targetPattern.URL} \nmethod : ${targetPattern.METHOD}`);


    //fetch api

    fetch(originUrl + targetPattern.URL, {

        method: targetPattern.METHOD,

        body: targetPattern.METHOD === "GET" ? null : illustration,

        headers: {

            "Content-Type": "application/json"

        }
    }).then((response) => {

        return new Promise((resolve) => response.json()

            .then((responseData) => resolve({

                status: response.status,

                responseData

            })));

    }).then(({status, responseData}) => {

        switch (status) {

            case 200 :

                premiumCallback(illustration, responseData);

                break;

            case 400 :

                progressBarDisplay(0, "N");

                console.log("error : " + responseData.errors[0].element);

                alert(`요청 실패 : ${responseData.errors[0].element}`);

                break;

            default :

                progressBarDisplay(0, "N");

                console.log("error : " + responseData.message);

                alert(`요청 실패 : ${responseData.message}`);

                break;

        }

    });

});


const premiumCallback = (illustration, responseData) => {

    let requestData = JSON.parse(illustration);

    const targetId = `#${premiumBtn.dataset['code']}TblBd`;


    document.querySelector("#responseJson").innerText = JSON.stringify(responseData).replace("\"item\":", "\"illustration\":");


    elementList = new Array();

    createElement(elementList, "th", premiumSeq++);

    createElement(elementList, "td", responseData.item.productCode);

    createElement(elementList, "td", responseData.item.productName);

    createElement(elementList, "td", responseData.item.insurances[0].insuranceCode);

    createElement(elementList, "td", responseData.item.beforeDiscountPremiumSum.amount);

    createElement(elementList, "td", responseData.item.afterInsuredBirthPremiumSum.amount);

    createElement(elementList, "td", "");

    displayResponse(targetId, elementList);

    progressBarDisplay(0, "N");

};


const surrenderBtn = document.querySelector("#btnSurrender");

surrenderBtn.addEventListener("click", () => {

    progressBarDisplay(1, "Y");

    const targetPattern = getConstant(surrenderBtn.dataset['code']);

    let illustration = getIllustration("view2json");


    console.log(`url : ${targetPattern.URL} \nmethod : ${targetPattern.METHOD}`);


    //fetch api

    fetch(originUrl + targetPattern.URL, {

        method: targetPattern.METHOD,

        body: targetPattern.METHOD === "GET" ? null : illustration,

        headers: {

            "Content-Type": "application/json"

        }
    }).then((response) => {

        return new Promise((resolve) => response.json()

            .then((responseData) => resolve({

                status: response.status,

                responseData

            })));

    }).then(({status, responseData}) => {

        switch (status) {

            case 200 :

                surrenderCallback(illustration, responseData);

                break;

            case 400 :

                progressBarDisplay(1, "N");

                console.log("error : " + responseData.errors[0].element);

                alert(`요청 실패 : ${responseData.errors[0].element}`);

                break;

            default :

                progressBarDisplay(1, "N");

                console.log("error : " + responseData.message);

                alert(`요청 실패 : ${responseData.message}`);

                break;

        }

    });

});


const surrenderCallback = (illustration, responseData) => {

    let requestData = JSON.parse(illustration);

    const targetId = `#${surrenderBtn.dataset['code']}TblBd`;


    document.querySelector("#responseJson").innerText = JSON.stringify(responseData).replace("\"item\":", "\"illustration\":");


    responseData.item.surrenderList.forEach(surrender => {

        elementList = new Array();

        createElement(elementList, "th", surrenderSeq++);

        createElement(elementList, "td", requestData.illustration.productCode);

        createElement(elementList, "td", requestData.illustration.productName);

        createElement(elementList, "td", requestData.illustration.insurances[0].insuranceCode);

        createElement(elementList, "td", surrender.passedYear);

        createElement(elementList, "td", surrender.insuredPersonAge);

        createElement(elementList, "td", surrender.mainAccumedPremium);

        createElement(elementList, "td", surrender.mainSurrender);

        createElement(elementList, "td", surrender.mainSurrenderRate);

        createElement(elementList, "td", "");

        displayResponse(targetId, elementList);

    });


    progressBarDisplay(1, "N");

};


const benefitBtn = document.querySelector("#btnBenefits");

benefitBtn.addEventListener("click", () => {

    progressBarDisplay(2, "Y");

    const targetPattern = getConstant(benefitBtn.dataset['code']);

    let illustration = getIllustration("view2json");


    console.log(`url : ${targetPattern.URL} \nmethod : ${targetPattern.METHOD}`);


    //fetch api

    fetch(originUrl + targetPattern.URL, {

        method: targetPattern.METHOD,

        body: targetPattern.METHOD == "GET" ? null : illustration,

        headers: {

            "Content-Type": "application/json"

        }
    }).then((response) => {

        return new Promise((resolve) => response.json()

            .then((responseData) => resolve({

                status: response.status,

                responseData

            })));

    }).then(({status, responseData}) => {

        switch (status) {

            case 200 :

                benefitCallback(illustration, responseData);

                break;

            case 400 :

                progressBarDisplay(2, "N");

                console.log("error : " + responseData.errors[0].element);

                alert(`요청 실패 : ${responseData.errors[0].element}`);

                break;

            default :

                progressBarDisplay(2, "N");

                console.log("error : " + responseData.message);

                alert(`요청 실패 : ${responseData.message}`);

                break;

        }

    });

});


const benefitCallback = (illustration, responseData) => {

    if (responseData.item[0].benefitContents == null) return;


    let requestData = JSON.parse(illustration);

    const targetContentId = `#${benefitBtn.dataset['code']}ContentsTblBd`;

    const targetDisbursementId = `#${benefitBtn.dataset['code']}DisbursementNotesTblBd`;


    document.querySelector("#responseJson").innerText = JSON.stringify(responseData).replace("\"item\":", "\"illustration\":");


    responseData.item[0].benefitContents.forEach(benefitContent => {

        elementList = new Array();

        createElement(elementList, "th", benefitContentsSeq++);

        createElement(elementList, "td", requestData.illustration.productCode);

        createElement(elementList, "td", requestData.illustration.productName);

        createElement(elementList, "td", requestData.illustration.insurances[0].insuranceCode);

        createElement(elementList, "td", benefitContent.benefitAmountContent);

        createElement(elementList, "td", benefitContent.benefitAmountContentRemark);

        createElement(elementList, "td", benefitContent.benefitContent);

        createElement(elementList, "td", benefitContent.benefitDivisionName);

        createElement(elementList, "td", "");

        displayResponse(targetContentId, elementList);

    })


    responseData.item[0].benefitDisbursementNotes.forEach(benefitDisbursementNote => {

        elementList = new Array();

        createElement(elementList, "th", benefitDisbursementSeq++);

        createElement(elementList, "td", requestData.illustration.productCode);

        createElement(elementList, "td", requestData.illustration.productName);

        createElement(elementList, "td", requestData.illustration.insurances[0].insuranceCode);

        createElement(elementList, "td", benefitDisbursementNote.disbursementNote);

        createElement(elementList, "td", "");

        displayResponse(targetDisbursementId, elementList);

    })


    progressBarDisplay(2, "N");

};


const createElement = (instance, tag, value) => {

    let td = document.createElement(tag);

    td.appendChild(document.createTextNode(value));

    instance.push(td);

};


const displayResponse = (instance, node) => {

    let tableBody = document.querySelector(instance);

    let tr = document.createElement("tr");

    node.forEach(td => tr.appendChild(td));

    tableBody.appendChild(tr);

};


const view2json = (id) => {

    document.querySelector("#view2json").innerText = "";

    const data = el2Obj(document.querySelector("#" + id));

    const jsonData = JSON.stringify(data);

    document.querySelector("#view2json").innerText = jsonData;

};


const json2view = (id) => {

    document.querySelector("#json-data").innerHTML = "";

    const data = getIllustration(id);

    const elTxt = obj2El(JSON.parse(data));

    if (elTxt !== false) {

        document.querySelector("#json-data").innerHTML = elTxt;

    }

};


// Element -> Object({}) 형식으로 변경

const el2Obj = (data) => {

    const type = data.dataset.type;

    const name = data.dataset.name;

    let rtData;


    if (type === "main") {

        const nodes = data.childNodes;

        let subData = {}

        for (let i = 0; i < nodes.length; i++) {

            const obj = nodes[i];

            if ("DIV" === obj.nodeName) {

                const subRtData = el2Obj(obj);

                subData = {...subData, ...subRtData};

            }

        }

        rtData = subData;

    } else if (type === "object") {

        rtData = {};

        const nodes = data.childNodes;

        let subData = {}

        for (let i = 0; i < nodes.length; i++) {

            const obj = nodes[i];

            if ("DIV" === obj.nodeName) {

                const subRtData = el2Obj(obj);

                subData = {...subData, ...subRtData};

            }

        }

        if (undefined !== name && "" !== name)

            rtData[name] = subData;

        else {

            rtData = {};

            rtData = {...subData};

        }

    } else if (type === "value") {

        rtData = {};

        const valueType = data.dataset.valuetype;

        let value = data.innerText;

        if (valueType === "number") {

            value = Number(value);

            //value = parseInt(value);

        } else if (valueType === "boolean") {

            if ("true" === value) {

                value = true;

            } else if ("false" === value) {

                value = false;

            }

        }

        if (undefined === name || "" === name) {

            rtData = value;

        } else {

            rtData[name] = value;

        }

    } else if (type === "select") {

        rtData = {};

        const valueType = data.dataset.valuetype;

        let value = data.dataset.code;

        if (valueType === "number") {

            value = Number(value);

            //value = parseInt(value);

        } else if (valueType === "boolean") {

            if ("true" === value) {

                value = true;

            } else if ("false" === value) {

                value = false;

            }

        }

        if (undefined === name || "" === name) {

            rtData = value;

        } else {

            rtData[name] = value;

        }

    } else if (type === "dataBox") {

        rtData = {};

        const nodes = data.childNodes;

        for (let i = 0; i < nodes.length; i++) {

            const obj = nodes[i];

            if (obj.dataset.type === "value") {


                const valueType = obj.dataset.valuetype;

                let value = obj.innerText;

                if (valueType === "number") {

                    value = Number(value);

                    //value = parseInt(value);

                } else if (valueType === "boolean") {

                    if ("true" === value) {

                        value = true;

                    } else if ("false" === value) {

                        value = false;

                    }

                }

                if (undefined === name || "" === name) {

                    rtData = value;

                } else {

                    rtData[name] = value;

                }


                break;

            } else if (obj.dataset.type === "object" || obj.dataset.type === "array") {

                const subRtData = el2Obj(obj);

                rtData = subRtData;

                break;

            }

        }

    } else if (type === "array") {

        rtData = {};

        const nodes = data.childNodes;

        let subData = new Array();

        for (let i = 0; i < nodes.length; i++) {

            const obj = nodes[i];

            if ("DIV" === obj.nodeName) {

                const subRtData = el2Obj(obj);

                subData.push(subRtData);

            }

        }

        //rtData[name] = subData;

        if (undefined !== name && "" !== name) {

            rtData[name] = subData;

        } else {

            rtData = {};

            rtData = {...subData};

        }

    } else {

        const nodes = data.childNodes;

        let subData = new Array();

        let cnt = 0;

        for (let i = 0; i < nodes.length; i++) {

            const obj = nodes[i];

            if ("DIV" === obj.nodeName) {

                const subRtData = el2Obj(obj);

                if (undefined === subRtData) continue;

                cnt++;

                //subData = {...subData, ...subRtData}

                subData.push(subRtData);

            }

        }

        if (cnt > 0) rtData = subData;

    }

    return rtData;

};


const modifyValues = (id, code, data) => {

    const targetObj = document.querySelector("#" + id);


    targetObj.dataset.code = code;

    targetObj.children[0].innerText = data;


    //hide modal

    const modal = document.querySelector("#modal");

    modal.style.display = "none";


    view2json('json-data');

};


const makeModal = (instanceId, instance) => {

    //show modal

    const modal = document.querySelector("#modal");

    modal.style.display = "flex";


    //modal title

    const modalTitle = document.querySelector("#modalTitle");

    modalTitle.innerHTML = `<strong><h3># ${instance.korName}</h3></strong>`;


    //modal content

    const modalContent = document.querySelector("#modalContent");


    const keySet = Object.keys(instance).sort();

    let text = "";

    for (let i = 0; i < keySet.length; i++) {

        if (keySet[i] == "korName") continue;


        text += "<div class=\"form-check\" onclick=\"modifyValues(\'" + instanceId + "\', \'" + keySet[i] + "\', \'" + instance[keySet[i]] + "\')\">";

        text += "<input class=\"form-check-input\" type=\"checkbox\" name=\"flexRadioDefault\" id=\"flexRadioDefault1\" onclick=\"modifyValues(\'" + instanceId + "\', \'" + keySet[i] + "\', \'" + instance[keySet[i]] + "\')\">";

        text += "<label class=\"form-check-label\" >" + instance[keySet[i]] + "</label>";

        text += "</div>";

    }


    modalContent.innerHTML = text;

};


// Object -> Element 형식으로 변환

const obj2El = (data, objName, isArray) => {

    let rtElTxt = "";

    if (data == undefined || (Array.isArray(data) == true && data == "") || (!Array.isArray(data) == true && JSON.stringify(data) == "{}")) return;

    const id = createId();

    const rId = createId();

    const objTypeof = typeof data;


    const remove = '<div id="' + rId + '" class="removeBox" data-type="dataBox"><div class="removeItem removeBtn" onClick=\'removeData("' + rId + '")\'>-</div>${div}</div>';


    if ("string" === objTypeof || "number" === objTypeof || "boolean" === objTypeof) {

        rtElTxt = '<div id="' + id + '" data-type="value" data-name="${dataName}" contenteditable="true" data-valuetype="' + objTypeof + '" onfocus="selector(this)">${data}</div>';


        if (objName === "customerTypeCode") {

            rtElTxt = '<div id="' + id + '" data-type="select" data-name="${dataName}" contenteditable="false" data-code="${data}" data-valuetype="' + objTypeof + '">' +

                '<span class="addCodeBtn" onClick=\'makeModal("' + id + '",CustomerTypeCode)\'>' + CustomerTypeCode[data] + '</span></div>';

        }

        if (objName === "insuranceTypeCode") {

            rtElTxt = '<div id="' + id + '" data-type="select" data-name="${dataName}" contenteditable="false" data-code="${data}" data-valuetype="' + objTypeof + '">' +

                '<span class="addCodeBtn" onClick=\'makeModal("' + id + '", InsuranceTypeCode)\'>' + InsuranceTypeCode[data] + '</span></div>';

        }

        if (objName === "billingFrequencyCode") {

            rtElTxt = '<div id="' + id + '" data-type="select" data-name="${dataName}" contenteditable="false" data-code="${data}" data-valuetype="' + objTypeof + '">' +

                '<span class="addCodeBtn" onClick=\'makeModal("' + id + '", BillingFrequencyCode)\'>' + BillingFrequencyCode[data] + '</span></div>';

        }

        if (objName === "insuredPeriodTypeCode") {

            rtElTxt = '<div id="' + id + '" data-type="select" data-name="${dataName}" contenteditable="false" data-code="${data}" data-valuetype="' + objTypeof + '">' +

                '<span class="addCodeBtn" onClick=\'makeModal("' + id + '", PeriodTypeCode)\'>' + PeriodTypeCode[data] + '</span></div>';

        }

        if (objName === "billingPeriodTypeCode") {

            rtElTxt = '<div id="' + id + '" data-type="select" data-name="${dataName}" contenteditable="false" data-code="${data}" data-valuetype="' + objTypeof + '">' +

                '<span class="addCodeBtn" onClick=\'makeModal("' + id + '", PeriodTypeCode)\'>' + PeriodTypeCode[data] + '</span></div>';

        }


        if ("string" === objTypeof) {

            rtElTxt = rtElTxt.replace('${data}', data.replaceAll('\n', '</br>'));

        } else {

            rtElTxt = rtElTxt.replace('${data}', data);

        }

    } else if ("object" === objTypeof) {

        const keys = Object.keys(data);

        const isArray = Array.isArray(data);

        let elList = new Array();

        let addObj;

        for (let i = 0; i < keys.length; i++) {

            const key = keys[i];

            if (undefined === addObj) {

                addObj = initValue(data[key]);

            }

            let subElTxt = "";

            subElTxt = obj2El(data[key], isArray ? "" : key, isArray);

            if (subElTxt === false) return false;

            subElTxt = getValueObj(key, subElTxt);

            elList.push(subElTxt);

        }

        if (undefined === addObj) {

            alert('화면 전환시 배열값이 필요합니다!!!!');

            return false;

        }

        const typeName = isArray ? "array" : "object";

        let click = '<span class="addBtn" onClick=\'addData("' + id + '","${data}")\'>+</span>';

        click = click.replace('${data}', JSON.stringify(addObj).replaceAll('"', '\\"'));

        if (!isArray) click = "";

        rtElTxt = '<div id="' + id + '" data-type="' + typeName + '" data-name="${dataName}" data-comment="">' + click + ' ${data}</div>';

        rtElTxt = rtElTxt.replace('${data}', elList.join("\n"));

    }

    if (isArray) rtElTxt = remove.replace('${div}', rtElTxt);

    return getValueObj(objName, rtElTxt)

};


const getValueObj = (name, elTxt) => {

    if (null == elTxt || undefined === elTxt) return "";

    return elTxt.replace('${dataName}', name == null || name === undefined ? "" : name);

};


const initValue = (obj) => {

    let rtValue;

    if ("object" === typeof obj) {

        const isArray = Array.isArray(obj);

        const keys = Object.keys(obj);

        if (isArray) rtValue = new Array();

        else rtValue = {};

        for (let i = 0; i < keys.length; i++) {

            if (isArray) rtValue.push(initValue(obj[keys[i]]));

            else rtValue[keys[i]] = initValue(obj[keys[i]]);

        }

    } else if ("string" === typeof obj) {

        rtValue = "";

    } else if ("number" === typeof obj) {

        rtValue = 0;

    } else if ("boolean" === typeof obj) {

        rtValue = false;

    }

    return rtValue;

};


const addData = (id, obj) => {

    const el = document.querySelector("#" + id);

    const addEl = obj2El(JSON.parse(obj), null, true);

    el.innerHTML = el.innerHTML + addEl;

};


const removeData = (id) => {

    const el = document.querySelector("#" + id);

    if (el.parentNode) {

        el.parentNode.removeChild(el);

    }

};


const createId = () => {

    return 'A' + uuidv4().replace('-', '');

};


const uuidv4 = () => {

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {

        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);

        return v.toString(16);

    });

};


const init = () => {

    addData("customers", "{\"customerTypeCode\":\"11\",\"customerName\":\"최현욱\",\"socialSecurityNumber\":\"8104151\"}");

    addData("customers", "{\"customerTypeCode\":\"21\",\"customerName\":\"여현택\",\"socialSecurityNumber\":\"2107073\"}");

    //addData("insurances","{\"insuranceCode\":\"11624\",\"insuranceName\":\"무배당 더해주고 채워주는 정기보험\",\"insuranceTypeCode\":\"01\",\"billingFrequencyCode\":\"01\",\"billInfos\":[{\"faceAmount\":500000000,\"insuredPeriod\":90,\"insuredPeriodTypeCode\":\"A\",\"billingPeriod\":80,\"billingPeriodTypeCode\":\"A\"}]}");

    addData("insurances", "{\"insuranceCode\":\"11656\",\"insuranceName\":\"iLove아이보험\",\"insuranceTypeCode\":\"01\",\"billingFrequencyCode\":\"00\",\"billInfos\":[{\"faceAmount\":5000000,\"insuredPeriod\":1,\"insuredPeriodTypeCode\":\"Y\",\"billingPeriod\":0,\"billingPeriodTypeCode\":\"Y\"}]}");

    view2json('json-data');

};


const copyToClip = function (event) {

    let jsonData = document.querySelector("#" + event.target.dataset.target).innerText;

    navigator.clipboard.writeText(jsonData)

        .then(() => {

            alert("클립보드에 복사되었습니다.")

        }).catch(err => {

        console.log("copy fail..", err);

    })

};


const selector = (id) => {

    window.getSelection().selectAllChildren(id);

};


const jsonCopyBtn = document.querySelector("#btnJsonCopy");

jsonCopyBtn.addEventListener("click", e => copyToClip(e));


const modalJsonCopy = document.querySelector("#btnModalJsonCopy");

modalJsonCopy.addEventListener("click", e => copyToClip(e));


const viewToJsonBtn = document.querySelector("#view2json");

viewToJsonBtn.addEventListener("click", e => viewJson(e));


const responseJsonBtn = document.querySelector("#responseJson");

responseJsonBtn.addEventListener("click", e => viewJson(e));


const viewJson = (event) => {

    const modalJson = document.querySelector("#modalJson");

    modalJson.style.display = "flex";


    const modalJsonContentTextarea = document.querySelector("#modalJsonContentTextarea");

    const text = event.target.innerText;

    modalJsonContentTextarea.innerText = JSON.stringify(JSON.parse(text), null, 4);

};


const premiumInitBtn = document.querySelector("#btnPremiumInit");

premiumInitBtn.addEventListener("click", () => {

    const tableBody = document.querySelector(`#${premiumInitBtn.dataset['code']}TblBd`);

    tableBody.innerHTML = null;

    premiumSeq = 1;

});


const surrenderInitBtn = document.querySelector("#btnSurrenderInit");

surrenderInitBtn.addEventListener("click", () => {

    const tableBody = document.querySelector(`#${surrenderInitBtn.dataset['code']}TblBd`);

    tableBody.innerHTML = null;

    surrenderSeq = 1;

});


const benefitContentsInitBtn = document.querySelector("#btnBenefitContentsInit");

benefitContentsInitBtn.addEventListener("click", () => {

    const tableBody = document.querySelector(`#${benefitContentsInitBtn.dataset['code']}TblBd`);

    tableBody.innerHTML = null;

    benefitContentsSeq = 1;

});


const benefitDisbursementNotesInitBtn = document.querySelector("#btnBenefitDisbursementNotesInit");

benefitDisbursementNotesInitBtn.addEventListener("click", () => {

    const tableBody = document.querySelector(`#${benefitDisbursementNotesInitBtn.dataset['code']}TblBd`);

    tableBody.innerHTML = null;

    benefitDisbursementSeq = 1;

});


const modal = document.querySelector("#modal");

modal.addEventListener("click", e => {

    const target = e.target;

    if (target.classList.contains("modal-overlay")) {

        modal.style.display = "none";

    }
    ;

});


const modalJson = document.querySelector("#modalJson");

modalJson.addEventListener("click", e => {

    const target = e.target;

    if (target.classList.contains("modal-json-overlay")) {

        modalJson.style.display = "none";

    }
    ;

});


const modalTable = document.querySelector("#modalTable");

modalTable.addEventListener("click", e => {

    const target = e.target;

    if (target.classList.contains("modal-table-overlay")) {

        modalTable.style.display = "none";

    }
    ;

});


window.addEventListener("keyup", e => {

    if (e.key === "Escape") {

        if (modal.style.display === "flex") modal.style.display = "none";

        if (modalJson.style.display === "flex") modalJson.style.display = "none";

        if (modalTable.style.display === "flex") modalTable.style.display = "none";

    }
    ;

});


const modalCloseBtn = document.querySelector("#btnModalClose");

modalCloseBtn.addEventListener("click", () => {

    modal.style.display = "none";

});


const modalJsonCloseBtn = document.querySelector("#btnModalJsonClose");

modalJsonCloseBtn.addEventListener("click", () => {

    modalJson.style.display = "none";

});


const modalTableCloseBtn = document.querySelector("#btnModalTableClose");

modalTableCloseBtn.addEventListener("click", () => {

    modalTable.style.display = "none";

});


const progressBar = document.querySelector("#progressBar");

const progressBarDisplay = (index, state) => {

    progressState[index] = state;


    console.log(progressState + ", " + progressState.indexOf("Y"));


    if (progressState.indexOf("Y") > -1) {

        progressBar.style.display = "flex";

    } else {

        progressBar.style.display = "none";

    }

};


const premiumCsvBtn = document.querySelector("#btnPremiumCsv");

premiumCsvBtn.addEventListener("click", e => makeCsv(e.target.dataset['code']));


const surrenderCsvBtn = document.querySelector("#btnSurrenderCsv");

surrenderCsvBtn.addEventListener("click", e => makeCsv(e.target.dataset['code']));


const benefitContentsBtn = document.querySelector("#btnBenefitContentsCsv");

benefitContentsBtn.addEventListener("click", e => makeCsv(e.target.dataset['code']));


const benefitDisbursementNotesBtn = document.querySelector("#btnBenefitDisbursementNotesCsv");

benefitDisbursementNotesBtn.addEventListener("click", e => makeCsv(e.target.dataset['code']));


const modalTableCsvBtn = document.querySelector("#btnModalTableCsv");

modalTableCsvBtn.addEventListener("click", e => makeCsv(e.target.dataset['code']));


const makeCsv = code => {

    const target = document.querySelector(`#${code}Tbl`);


    let csvFile, csvData, csvObj;


    csvData = "\uFEFF" + target.innerText.replaceAll("\t", ",");

    csvData = csvData.replace(",\n\n", "\n");


    csvFile = new Blob([csvData], {type: "text/csv;charset=UTF-8"});


    csvObj = document.createElement("a");

    csvObj.download = target.getAttribute("aria-label");

    csvObj.href = window.URL.createObjectURL(csvFile);

    csvObj.style.display = "none";

    document.body.appendChild(csvObj);


    csvObj.click();

};


const premiumModalBtn = document.querySelector("#btnPremiumModal");

premiumModalBtn.addEventListener("click", e => viewTableModal(e.target.dataset['code']));


const surrenderModalBtn = document.querySelector("#btnSurrenderModal");

surrenderModalBtn.addEventListener("click", e => viewTableModal(e.target.dataset['code']));


const benefitContentsModalBtn = document.querySelector("#btnBenefitContentsModal");

benefitContentsModalBtn.addEventListener("click", e => viewTableModal(e.target.dataset['code']));


const benefitDisbursementNotesModalBtn = document.querySelector("#btnBenefitDisbursementNotesModal");

benefitDisbursementNotesModalBtn.addEventListener("click", e => viewTableModal(e.target.dataset['code']));


const viewTableModal = (code) => {

    modalTable.style.display = "flex";


    document.querySelector("#modalTableContentTextarea").innerHTML = null;

    document.querySelector("#modalTableContentTextarea").innerHTML = document.querySelector(`#${code}Tbl`).outerHTML;


    document.querySelectorAll("#modalTableContentTextarea th").forEach(th => {

        if (th.dataset['btnCol']) th.style.display = "none";

    });


    document.querySelector("#btnModalTableCsv").dataset.code = event.target.dataset['code'];

};






