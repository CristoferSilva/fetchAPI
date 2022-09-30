//#region Statics Variables
var btnSendRequest;
var requestReactangle;
var btnMinimizeButton;
var spinnerImgID;
var starWarsImgID;
var requestDivID;
var minimizeButtonID;
//#endregion
//#region Domain

function initializeAtributes() {
    btnSendRequest = document.getElementById("sendRequest");
    requestReactangle = document.getElementById("requestReactangle");
    btnMinimizeButton = document.getElementById("minimizeButton");
    spinnerImgID = "spinnerImg";
    starWarsImgID = "starWarsImg";
    requestDivID = "RequestDiv";
    minimizeButtonID = "minimizeButton";
}

async function sendRequest() {
    initializeAtributes();
    btnSendRequest.disabled = true;
    btnMinimizeButton.disabled = true;

    setVisibleVisibility(spinnerImgID)
    setHiddenVisibility(starWarsImgID)
    setVisibleVisibility(requestDivID);

    requestReactangle.style["height"] = "auto";


    let requestDiv = document.getElementById(requestDivID);
    requestDiv.innerHTML = "";

    let userInput = document.getElementById("ActorID");
    let actorID = userInput.value;
    let getActorsJson = await getActorJson(actorID);
    let actorObject = await creatActorObject(getActorsJson);

    createDOMElements(actorObject);
    setHiddenVisibility(spinnerImgID)
    setVisibleVisibility(minimizeButtonID)

    btnSendRequest.disabled = false;
    btnMinimizeButton.disabled = false;
}

function createDOMElements(actorObject) {
    let requestDiv = document.getElementById(requestDivID);

    putAtributeIntoDOM(requestDiv, "Name", actorObject.name);
    putAtributeIntoDOM(requestDiv, "Heigh", actorObject.height);
    putAtributeIntoDOM(requestDiv, "Mass", actorObject.mass);
    putAtributeIntoDOM(requestDiv, "Homeworld", actorObject.homeworld);
    putAtributeIntoDOM(requestDiv, "Films", "");
    putAtributeInLineFormIntoDOM(actorObject, requestDiv);
}

function putAtributeInLineFormIntoDOM(actorObject, DOMelement) {
    actorObject.films.forEach(element => {
        let atributeValue = document.createElement("p");
        atributeValue.innerHTML = element;
        DOMelement.appendChild(atributeValue);
    });
}

function putAtributeIntoDOM(DOMelement, atributeName, value) {
    let atributeTitle = document.createElement("h5");
    atributeTitle.innerHTML = `${atributeName}: `;
    let atributeValue = document.createElement("p");
    atributeValue.innerHTML = value;

    DOMelement.appendChild(atributeTitle);
    DOMelement.appendChild(atributeValue);
}

async function getActorJson(actorID) {
    const response = await fetch(`https://swapi.dev/api/people/${actorID}`);
    const data = await response.json();
    return data;
}

async function getJson(addressRequest) {
    const response = await fetch(addressRequest);
    const data = await response.json();
    return data;
}

async function creatActorObject(actorJson) {
    let auxHomeworld = await getJson(actorJson.homeworld);
    let auxFilms = await getActorsFilms(actorJson.films);
    const actor = {
        name: actorJson.name,
        height: actorJson.height,
        mass: actorJson.mass,
        homeworld: auxHomeworld.name,
        films: auxFilms
    }
    return actor;
}

async function getActorsFilms(films) {
    let filmsArrayString = [];
    for (let index = 0; index < films.length; index++) {
        let filme = await getJson(films[index]);
        let title = await filme.title;
        filmsArrayString.push(title);
    }
    return filmsArrayString;
}

function setHiddenVisibility(elementID) {
    document.getElementById(elementID).style.visibility = "hidden";
}

function setVisibleVisibility(elementID) {
    document.getElementById(elementID).style.visibility = "visible";
}
//#endregion
//#region Front-End Logic
function changeRequestDivVisibility() {
    let visibility = document.getElementById(requestDivID).style.visibility;

    if (visibility == "visible" || visibility == "") {
        setHiddenVisibility(requestDivID);
        requestReactangle.style["height"] = "60px";
        requestReactangle.style.animation  = "changeWidth 3s";
        setVisibleVisibility(starWarsImgID)
    
    } else {
        setHiddenVisibility(starWarsImgID)
        setVisibleVisibility(requestDivID);
        requestReactangle.style["height"] = " 571.719px";
    }

}
//#endregion

