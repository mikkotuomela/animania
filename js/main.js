// Number of different animals
const animalNames = ["piki", "nita"];
const animals_n = 10;
let animals = {};
let t = 0;
let animalSize = 256;


function getAnimalCoords() {
    var z = MAX_Z - (letter_i - 1) * STEP_Z;
	var x = 20 + ZOOM * BASE_X / z;
	var y = ZOOM * BASE_Y / z;
	var font_size = ZOOM * BASE_FONT_SIZE / z;
}

function startDemo() {
    $("#start").hide();
    $("#main").show();
    createAnimals();
    console.log("Demo has been started");
}

function updateScrolltext() {
    $("#scrolltext").text(t);
    t++;
}

function updateScreen() {

}

function resizeAnimals() {
    animals.forEach((animal) => {
        for (let animal_i = 0; animal_i < animals_n; animal_i++)
            $(`#${animal}${animal_i}`).width(animalSize).height(animalSize);
    });

    animalSize--;
    if (animalSize == 0)
        animalSize = 256;
}

// Produce enough animals of each type
function getAnimalsHtml(animal) {
    let animalsHtml = "";
    for (let animal_i = 0; animal_i < animals_n; animal_i++) {
        const animalX = Math.floor(Math.random() * 700);
        const animalY = Math.floor(Math.random() * 700);
        animalsHtml += `<img id="${animal}${animal_i}" class="animal" src="img/${animal}.png" style="left: ${animalX}px; top: ${animalY}px" alt="" />`;
    }
    return animalsHtml;
}

// Create animals when demo starts
function createAnimals() {
    console.log("Creating animals...");
    let animalsHtml = "";
    animals.forEach((animalNames) => { animalsHtml += getAnimalsHtml(animal); });
    $("#screen").html(animalsHtml);
    console.log("Animals have been created.");
}

// Initialize
$(document).ready(function() {

    // Activate start button
    $("#start").show();
    $("#startdemo").on("click", startDemo);

    console.log("Start button activated.");
    setInterval(updateScrolltext, 1000);
    setInterval(resizeAnimals, 100);
});