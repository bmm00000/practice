const DOG_URL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector(".breeds");

fetch(DOG_URL)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    const breedsObject = data.message;
    const breedsArray = Object.keys(breedsObject);
    
    for (let i = 0; i < breedsArray.length; i++) {
        const option = document.createElement("option");
        option.value = breedsArray[i];
        option.innerText = breedsArray[i];
        select.appendChild(option);
    }
})

select.addEventListener("change", function(event) {
    let BREED_URL = `https://dog.ceo/api/breed/${event.target.value}/images/random`;

    getDog(BREED_URL);
})

const image = document.querySelector(".dog-img");
const spinner = document.querySelector(".spinner");

function getDog(url) {
    spinner.classList.add("show");
    image.classList.remove("show");
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            image.src = data.message;
            image.alt = "Dog pic";
        })
}

image.addEventListener("load", function() {
    spinner.classList.remove("show");
    image.classList.add("show");
})

    