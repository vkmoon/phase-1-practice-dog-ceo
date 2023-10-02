document.addEventListener("DOMContentLoaded", init)

function init() {
    const selectId = document.getElementById("breed-dropdown");
    selectId.addEventListener("change", (e) => {
        dropDown(e);
    });
    const blank = document.createElement("option");
    blank.innerText = "";
    selectId.prepend(blank);
    selectId.selectedIndex = 0;
    

    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(res => res.json())
    .then(data => displayImage(data.message))
    .catch(error => "Error: " + error)

    fetch("https://dog.ceo/api/breeds/list/all")
    .then(res => res.json())
    .then(data => addBreeds(data.message))
    .catch(error => "Error: " + error)

}

function displayImage(imgUrls) {
   const imgContainer = document.getElementById("dog-image-container");
    
   imgUrls.forEach(imgUrl => {
    const img = document.createElement("img");
    
    img.src = imgUrl;
    imgContainer.appendChild(img);
   });
}

function addBreeds(breeds) {
    const breedsContainer = document.getElementById("dog-breeds");
    for (let breed in breeds){
        if (breeds.hasOwnProperty(breed) && breeds[breed] != "") {
            const breedNames = breeds[breed];

            breedNames.forEach(breedName => {
                const li = document.createElement("li");
                li.innerText = breedName;
                li.addEventListener("mouseover", () => mouseover(li));
                li.onclick = function() {
                    colorChange(li);
            };
            breedsContainer.appendChild(li);
        });
        }
    }
}

function mouseover(li) {
    li.style.cursor = "crosshair";
}

function colorChange(li) {
    li.style.color = "red";
    li.onclick = function() {
        colorChangeBack(li);
    }
}

function colorChangeBack(li) {
    li.style.color = "black";
    li.onclick = function() {
        colorChange(li)
    }
}

function dropDown(e) {
    let letter = e.target.value.toLowerCase();
    const ul = document.getElementById("dog-breeds");
    const listOfLists = ul.querySelectorAll("li");

    for (let li of listOfLists) {
        const breedName = li.innerText.toLowerCase();
        if (breedName.startsWith(letter)) {
            li.style.display = "list-item";
        }
        else {
            li.style.display = "none";
        }
    }
}
