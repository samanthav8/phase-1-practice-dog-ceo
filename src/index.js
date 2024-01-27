console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    dogImages();
    dogBreeds();
    const breedFilter = document.getElementById('breed-dropdown');
    breedFilter.addEventListener('change', (event) => {
    const selectedLetter = event.target.value;
    filterBreeds(selectedLetter);
})
})

function dogImages(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetch(imgUrl)
    .then(response => response.json())
    .then(json => renderImg(json))
}

function renderImg(images) {
    const imgContainer = document.getElementById('dog-image-container');
    images.message.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        imgContainer.appendChild(img);
    });
}

function dogBreeds(){
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    fetch(breedUrl)
    .then(response => response.json())
    .then(json => renderBreed(json))
    .catch(error => console.log(error))
}

function renderBreed(breeds){
    const breedContainer = document.getElementById('dog-breeds');
    const breedNames = Object.keys(breeds.message);
    breedNames.forEach(breed => {
        const li = document.createElement('li');
        li.innerHTML = breed;
        breedContainer.appendChild(li);

        li.addEventListener('click', (event) => {
            const changeColor = event.target;
            changeColor.style.color = 'pink'
        });
    });
}


function filterBreeds(selectedLetter) {
    const breedsList = document.getElementById('dog-breeds');
    const breeds = Array.from(breedsList.getElementsByTagName('li'));
    for (let i=0; i < breeds.length; i++) {
        const breed = breeds[i];
        const breedName = breed.innerHTML;
        if (selectedLetter === 'all' || breedName.startsWith(selectedLetter)){
            breed.style.display = 'list-item';
        } else {
            breed.style.display = 'none';
        }
    }
}