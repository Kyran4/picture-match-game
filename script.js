const imagePairs = [...Array(10).keys()].map(i => `img${i}.jpg`);
const images = [...imagePairs, ...imagePairs]; // Duplicate each image to make 10 pairs
images.sort(() => Math.random() - 0.5); // Shuffle

const board = document.getElementById("game-board");
let selectedCards = [];
let matchedPairs = 0;

images.forEach(img => {
    const card = document.createElement("div");
    card.classList.add("card");

    const inner = document.createElement("div");
    inner.classList.add("card-inner");

    const front = document.createElement("div");
    front.classList.add("card-front");

    const back = document.createElement("div");
    back.classList.add("card-back");
    back.style.backgroundImage = `url('images/${img}')`;

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
});

function flipCard(card) {
    if (selectedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = selectedCards;
    if (card1.querySelector(".card-back").style.backgroundImage === card2.querySelector(".card-back").style.backgroundImage) {
        matchedPairs++;
        selectedCards = [];

        if (matchedPairs === images.length / 2) {
            alert("You won!");
        }
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            selectedCards = [];
        }, 1000);
    }
}

let turnCount = 0;
const turnCounter = document.getElementById("turn-counter");

function flipCard(card) {
    if (selectedCards.length < 2 && !card.classList.contains("flipped")) {
        card.classList.add("flipped");
        selectedCards.push(card);

        if (selectedCards.length === 2) {
            turnCount++;  // Increment turn count
            turnCounter.textContent = `Turns: ${turnCount}`;  // Update UI
            checkMatch();
        }
    }
}

document.getElementById("restart-btn").addEventListener("click", restartGame);
function restartGame() {
    // Reset variables
    selectedCards = [];
    matchedPairs = 0;
    turnCount = 0;
    turnCounter.textContent = "Turns: 0";
    
    // Clear existing cards
    board.innerHTML = "";

    // Shuffle images again
    images.sort(() => Math.random() - 0.5);

    // Recreate the cards
    images.forEach(img => {
        const card = document.createElement("div");
        card.classList.add("card");

        const inner = document.createElement("div");
        inner.classList.add("card-inner");

        const front = document.createElement("div");
        front.classList.add("card-front");

        const back = document.createElement("div");
        back.classList.add("card-back");
        back.style.backgroundImage = `url('images/${img}')`;

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);

        card.addEventListener("click", () => flipCard(card));
        board.appendChild(card);
    });
}