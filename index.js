/*
    Abel D Kuykendall
    CPROG       WPROG
        5/12/2026
*/

const tilesContainer = document.getElementById("card-tiles");
const tiles = document.querySelectorAll(".tile");
const newCardButton = document.getElementById("new-card");
const rewardNotification = document.getElementById("reward-notification");

const tilePool = [
    "one.png",
    "two.png",
    "three.png",
    "empty.png",
    "empty.png",
    "empty.png",
    "empty.png"
];

let tileResults = [];
let revealedTiles = 0;
let birdCount = 0;
let gameFinished = false;

function generateCard(){
    tileResults = [];
    revealedTiles = 0;
    birdCount = 0;
    gameFinished = false;

    rewardNotification.style.opacity = "0";

    tiles.forEach((tile) => {
        tile.src = "/resources/tiles/default.png";
        tile.dataset.revealed = "false";

        const randomTile =
            tilePool[Math.floor(Math.random() * tilePool.length)];

        tileResults.push(randomTile);
    });
    setTimeout(() => {
        tilesContainer.style.opacity = "1";
    }, 1000);
}

function revealTile(ele){
    if(gameFinished){
        return;
    }

    if(ele.dataset.revealed === "true"){
        return;
    }

    const index = Number(ele.id.split("-")[1]) - 1;

    ele.dataset.revealed = "true";

    const tileImage = tileResults[index];

    ele.src = `/resources/tiles/${tileImage}`;

    revealedTiles++;

    if(tileImage !== "empty.png"){
        birdCount++;
    }

    if(revealedTiles === 9){
        gameFinished = true;

        let reward = 0;

        if(birdCount === 3){
            reward = 20;
        }
        else if(birdCount === 4){
            reward = 27.5;
        }
        else if(birdCount >= 5 && birdCount <= 7){
            reward = 50;
        }
        else if(birdCount === 8){
            reward = 250;
        }
        else if(birdCount === 9){
            reward = 500;
        }

        displayReward(reward);
    }
}

function displayReward(amount){
    rewardNotification.style.opacity = "1";

    if(amount > 0){
        rewardNotification.innerHTML = `
            <div class="row">
                <p>
                    REWARD: You won
                    <span class="money">$${amount.toFixed(2)}</span>
                </p>
            </div>
        `;
    }
    else{
        rewardNotification.innerHTML = `
            <div class="row">
                <p>
                    No reward this round
                </p>
            </div>
        `;
    }

    setTimeout(() => {
        rewardNotification.style.opacity = "0";
    }, 4000);
}

tiles.forEach((tile) => {
    tile.addEventListener("click", () => {
        revealTile(tile);
    });
});

newCardButton.addEventListener("click", () => {
    tilesContainer.style.opacity = "0";
    generateCard();
});

generateCard();