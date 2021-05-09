// Commonly used values

const api_url = "https://www.superheroapi.com/api.php/338148107599656/";
const favFalse = '../assets/images/white_star.png';
const favTrue = '../assets/images/red_star.png';

driver();

async function driver(){
    const id = extractId();
    const data = await getInfo(id);
    renderPage(data);
}

// Handling the click events
document.addEventListener('click', (event) => {
    // Fav button
    if(event.target.id == 'fav_btn'){
        var id = event.target.parentNode.parentNode.name;
        var favs = JSON.parse(localStorage.getItem('superheroFavs'));
        if (favs.indexOf(id) != -1){            // Remove from fav
            favs = favs.filter((item) => item!=id);
            localStorage.setItem('superheroFavs',JSON.stringify(favs));
            event.target.src = favFalse;
            customAlert('failure','Removed from fav');
        }
        else{                                   // Add to fav
            favs.push(id);
            localStorage.setItem('superheroFavs',JSON.stringify(favs));
            event.target.src = favTrue;
            customAlert('success','Added to fav');
        }
    }
});



//Extracting ID from url
function extractId(){
    const url = location.search;
    return url.substring(url.indexOf('=')+1);
}

// Function to call the API
async function getInfo(id){
    let response = await fetch(api_url+id);
    if(response.ok){
        var jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    }
    else{
        alert("HTTP-Error: ",response.status);
    }
}


function renderPage(data){
    document.getElementById('data-container').name = data.id;

    // Setting image of the hero
    var image = document.getElementById('image');
    image.firstElementChild.src = `${data.image.url}`;
    
    // Setting the fav icon
    var favs = JSON.parse(localStorage.getItem('superheroFavs'));
    if(favs.indexOf(data.id) != -1){
        image.lastElementChild.src = favTrue;
    }
    else{
        image.lastElementChild.src = favFalse;
    }


    // Powerstats
   var combat = document.getElementsByClassName('combat');
    let combatValue = data.powerstats.combat > 0 ? data.powerstats.combat : "N/A";
    let combatPercent = data.powerstats.combat > 0 ? data.powerstats.combat : 0;
    combat[0].innerHTML = `${combatValue}`;
    combat[0].style = `width: ${combatPercent}%;`;

    var durability = document.getElementsByClassName('durability');
    let durabilityValue = data.powerstats.durability > 0 ? data.powerstats.durability : "N/A";
    let durabilityPercent = data.powerstats.durability > 0 ? data.powerstats.durability : 0;
    durability[0].innerHTML = `${durabilityValue}`;
    durability[0].style = `width: ${durabilityPercent}%;`;

    var intelligence = document.getElementsByClassName('intelligence');
    let intelligenceValue = data.powerstats.intelligence > 0 ? data.powerstats.intelligence : "N/A";
    let intelligencePercent = data.powerstats.intelligence > 0 ? data.powerstats.intelligence : 0;
    intelligence[0].innerHTML = `${intelligenceValue}`;
    intelligence[0].style = `width: ${intelligencePercent}%;`;

    var power = document.getElementsByClassName('power');
    let powerValue = data.powerstats.power > 0 ? data.powerstats.power : "N/A";
    let powerPercent = data.powerstats.power > 0 ? data.powerstats.power : 0;
    power[0].innerHTML = `${powerValue}`;
    power[0].style = `width: ${powerPercent}%;`;

    var speed = document.getElementsByClassName('speed');
    let speedValue = data.powerstats.speed > 0 ? data.powerstats.speed : "N/A";
    let speedPercent = data.powerstats.speed > 0 ? data.powerstats.speed : 0;
    speed[0].innerHTML = `${speedValue}`;
    speed[0].style = `width: ${speedPercent}%;`;

    var strength = document.getElementsByClassName('strength');
    let strengthValue = data.powerstats.strength > 0 ? data.powerstats.strength : "N/A";
    let strengthPercent = data.powerstats.strength > 0 ? data.powerstats.strength : 0;
    strength[0].innerHTML = `${strengthValue}`;
    strength[0].style = `width: ${strengthPercent}%;`;

    // Appearance
    document.getElementById('appearance').innerHTML = makePresentable(data.appearance);
    // Biography
    document.getElementById('biography').innerHTML = makePresentable(data.biography);
    // Occupation
    document.getElementById('occupation').innerHTML = makePresentable(data.work);
    // Connections
    document.getElementById('connections').innerHTML = makePresentable(data.connections);
}

// Converting JSON objects to paragraph
function makePresentable(jsonData){
    var str='';
    for (var key in jsonData){
        str += 
            "<p style='color:black;'><b style='color:black;'>"+key.charAt(0).toUpperCase()+key.slice(1) +"</b> : "+ jsonData[key]+ "</p>";
    }
    return str;
}

// For changing visibility of alert box
function customAlert(type, message){
    var element = document.getElementsByClassName(type);
    element[0].innerHTML = message;
    element[0].style.visibility = "visible"
    setTimeout(() => {
        element[0].style.visibility = "hidden";
    }, 1500);
}
