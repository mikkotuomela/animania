// Global constants
const animalNames = ["piki", "nita", "pentu", "ostikka", "venla", "viivi"];
const animals_n = 60; // How many of each animal type
const axes = ["x", "y", "z", "r"];
const imageWidth = 256;
const maxZ = 60;
const minZ = 0.4;  
const zoom = 3;
const fps = 60;
const scrollFps = 10;
const referenceSize = 300;
let scrollText = "                          RAVEL AND CHAIN CHOMP PRESENT AT SKROLLI PARTY 2026           ANIMANIA          HTML5+JQUERY DEMO AS ALWAYS          GREETINGS TO ALL ANIMAL LOVERS AT SKROLLI PARTY!       CODE: RAVEL  PHOTOGRAPHY: RAVEL AND CHAIN CHOMP  SOUNDTRACK: RAVEL            ALSO GREETINGS TO KALEDRIINA SLEBER EID AND BEN GROSSER WHO TAUGHT ME JQUERY!             OH GOD HOW DID THIS GET HERE I AM NOT GOOD WITH COMPUTER               REMEMBER THAT THE ONLY WINNING MOVE IS NOT TO PLAY AND ALSO THAT MEOW MEOW WOOF BARK MIAU VOUVOUVOUUUU :3 :3 :3 :3         THE REAL PARTY IS INSIDE YOUR HEART      HELLO #UUSIKANAVA #KASVUA #SUOMISCENE #SKROLLI #ALTPARTY #DOT #HARMU #NETHACK     MENE ULOS POTKIMAAN PALLOA ÄLÄKÄ OLE KOKO AJAN TIETOKONEEN ÄÄRELLÄ                           ";
const scrollTextSpaces = " _~.-^=";
const scrollTextMovement = 50;
const scrollTextY = 0;
const scrollTextYbase = 20;
const scrollTextVisible = 30;
const outOfScreen = 150;
const partLength = 600;
const scrollTextColors = ["red", "green", "lightblue", "white", "yellow", "lightpurple"];

// Global variables
let animals = {};
let scrollTextPosition = 0;
let frame = 0;
let part = 1;
let demoLength = 6;
let screenInterval
let scrolltextInterval

// Translate animal coordinates into (relative) screen doordinates
function translateCoords(animalId) {
    const x = animals[animalId]["x"];
    const y = animals[animalId]["y"];
    const z = animals[animalId]["z"];
    return [zoom * x / z + 50, zoom * y / z + 50, zoom * imageWidth / z];
}

// Button has been clicked, start demo
function startDemo() {
    console.log("Starting demo...");
    // Hide the button and initialize
    $("#start").hide();
    initAnimals();
    $("#screen").html(getAnimalsHtml());
    initPart();

    // Set update intervals
    scrolltextInterval = setInterval(updateScrolltext, Math.floor(1000 / scrollFps));
    screenInterval = setInterval(update, Math.floor(1000 / fps));

    // Everything is ready, show the main screen
    $("#main").show();
    console.log("Demo has been started");
}

// Update scrolltext and move it
function updateScrolltext() {
    const displayText = scrollText.substring(scrollTextPosition, scrollTextPosition + scrollTextVisible);
    $("#scrolltext p").text(displayText);
    scrollTextPosition++;
    if (scrollTextPosition > scrollText.length - scrollTextVisible) 
        scrollTextPosition = 0;
}

// Produce enough animals of each type
function getAnimalsHtml() {
    let animalsHtml = "";
    Object.keys(animals).forEach((animalId) => {
        const animalName = animals[animalId]["name"];
        animalsHtml += `<img id="${animalId}" class="animal" src="img/${animalName}.png" alt="" />`;
    });
    return animalsHtml;
}

// Initialize new part
function initPart() {
    console.log(`Initializing part ${part}...`);
    // Change background and scrolltext space
    $("#screen").css({ "background-image": `url(bgimg/${part}.jpg)` });
    scrollText = scrollText.replaceAll(scrollTextSpaces[part - 1], scrollTextSpaces[part]);
    $("#scrolltext p").css({ color: scrollTextColors[part] });

    // Change animal movements etc.
    Object.keys(animals).forEach((animalId) => {

        if (part == 1) {
            animals[animalId]["x"] = rand(-referenceSize, referenceSize);
            animals[animalId]["y"] = rand(-referenceSize, referenceSize);
            animals[animalId]["z"] = rand(minZ, maxZ);
            animals[animalId]["dz"] = -0.05;
        } else if (part == 2) {
            const animalStep = (maxZ - minZ) / animalNames.length;
            const animal_i = animals[animalId]["index"] + 1;
            const imgindex = animals[animalId]["imgindex"] % (animals_n / 4);
            const animalsPerRing = animals_n / 4;
            animals[animalId]["x"] = 0.3 * referenceSize * Math.sin(imgindex * 2 * Math.PI / animalsPerRing);
            animals[animalId]["y"] = 0.3 * referenceSize * -Math.cos(imgindex * 2 * Math.PI / animalsPerRing);
            animals[animalId]["z"] = minZ + animalStep * (animal_i + Math.floor(imgindex / 4));
            animals[animalId]["dz"] = -0.5;
            animals[animalId]["dr"] = -1;
        } else if (part == 3) {
            const animalStep = (maxZ - minZ) / animalNames.length;
            const animal_i = animals[animalId]["index"] + 1;
            const imgindex = animals[animalId]["imgindex"] % (animals_n / 4);
            const animalsPerRing = animals_n / 4;
            animals[animalId]["x"] = 0.1 * referenceSize * Math.sin(imgindex * 2 * Math.PI / animalsPerRing);
            animals[animalId]["y"] = 0.1 * referenceSize * -Math.cos(imgindex * 2 * Math.PI / animalsPerRing);
            animals[animalId]["z"] = minZ + animalStep * (animal_i + Math.floor(imgindex / 4));
            animals[animalId]["dz"] = -0.5;
            animals[animalId]["dr"] = 5;
        } else if (part == 4) {
            const animalStep = (maxZ - minZ) / animalNames.length;
            const animal_i = animals[animalId]["index"] + 1;
            animals[animalId]["x"] = 0.2 * rand(-referenceSize, referenceSize);
            animals[animalId]["y"] = 0.2 * rand(-referenceSize, referenceSize);
            animals[animalId]["z"] = minZ + animalStep * animal_i;
            animals[animalId]["dz"] = 0.1;
            animals[animalId]["r"] = 0;
            animals[animalId]["dr"] = 0;
        } else if (part == 5) {
            const animalStep = referenceSize / animalNames.length;
            const animal_i = animals[animalId]["index"] + 1;
            animals[animalId]["x"] = -0.5 * referenceSize + animal_i * animalStep;
            animals[animalId]["dx"] = rand(-0.5, 0.5);
            animals[animalId]["y"] = 0.2 * rand(-referenceSize, referenceSize);
            animals[animalId]["dy"] = rand(-0.5, 0.5);
            animals[animalId]["z"] = rand(minZ, maxZ);
            animals[animalId]["dz"] = 0.05;
            animals[animalId]["r"] = 0;
            animals[animalId]["dr"] = rand(-10, 10);
        } else if (part == 6) {
            animals[animalId]["x"] = rand(-referenceSize, referenceSize);
            animals[animalId]["y"] = rand(-referenceSize, referenceSize);
            animals[animalId]["z"] = rand(minZ, maxZ);
            animals[animalId]["dx"] = rand(-2, 2);
            animals[animalId]["dy"] = rand(-2, 2);
            animals[animalId]["dz"] = 0.3;
            animals[animalId]["dr"] = rand(-30, 30);
        }

    });
}

// Initialize animal coordinates
function initAnimals() {
    // Create axes for each animal
    let currentAnimal = 0;
    animalNames.forEach((animalName) => {
        for (let animal_i = 0; animal_i < animals_n; animal_i++) {
            const animalId = `${animalName}${animal_i}`;
            animals[animalId] = {
                name: animalName,
                index: currentAnimal,
                imgindex: animal_i,
                x: 0, y: 0, z: 0, dx: 0, dy: 0, dz: -0, r: 0, dr: 0
            };
        }
        currentAnimal++;
    });
}

// Return a random value between min and max
function rand(min, max) {
    return min + (max - min) * Math.random();
}

// Add deltas to each axis
function moveAnimal(animalId) {
    axes.forEach((axis) => {
        animals[animalId][axis] += animals[animalId][`d${axis}`];
    });
    if (animals[animalId]["z"] < minZ)
        wrapAnimal(animalId);
    else if (animals[animalId]["z"] > maxZ)
        wrapAnimalReverse(animalId);
}

// Move animals on screen
function updateAnimalPosition(animalId) {
    let [x, y, size] = translateCoords(animalId);
    const opacity = (maxZ - animals[animalId]["z"]) / maxZ;
    $(`#${animalId}`).css({
        left:      `${x}%`,
        top:       `${y}%`,
        width:     `${size}px`,
        transform: `rotate(${animals[animalId]["r"]}deg`,
        opacity:   `${opacity}`,
        "z-index": Math.floor((maxZ - animals[animalId]["z"]) * 10)
    });
    // If animal is too close and out of screen, wrap it
    //if (x < -outOfScreen || x > outOfScreen || y < -outOfScreen || y > outOfScreen)
    //    wrapAnimal(animalId);
}

// Update animal coordinates based on deltas
function update() {

    // Update and move animals
    Object.keys(animals).forEach((animalId) => {
        moveAnimal(animalId);
        updateAnimalPosition(animalId);
    });

    // Also move scrolltext here
    const scrollTextY = scrollTextYbase + scrollTextMovement * Math.sin(frame / 10);
    $("#scrolltext").css("top", `${scrollTextY}px`);
    frame++;

    // Handle parts and end of demo
    if (frame % 600 == 0) {
        part++;
        part > demoLength ? endDemo() : initPart();
    }
}

// End demo and clean up
function endDemo() {
    console.log("Ending demo...")
    clearInterval(screenInterval);
    clearInterval(scrolltextInterval);
    $("#screen").hide();
    $("#scrolltext").hide();
    $("#end").show();
}

// Randomize animal's X and Y
function animalRandomXY(animalId) {
    animals[animalId]["x"] = rand(-referenceSize, referenceSize);
    animals[animalId]["y"] = rand(-referenceSize, referenceSize);
}
// Wrap animal back to background and randomize position
function wrapAnimal(animalId) {
    if (part == 1)
        animalRandomXY(animalId);
    animals[animalId]["z"] = maxZ;
}
function wrapAnimalReverse(animalId) {
    if (part == 1)
        animalRandomXY(animalId);
    animals[animalId]["z"] = minZ;
}

// Create animals when demo starts
function createAnimals() {
    console.log("Creating animals...");
    initAnimals();
    $("#screen").html(getAnimalsHtml());
    console.log("Animals have been created.");
}

// Initialize
$(document).ready(function() {

    // Activate start button
    $("#start").show();
    $("#startdemo").on("click", startDemo);

    console.log("Start button activated.");
});