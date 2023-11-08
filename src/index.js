import { fetchBreeds, fetchCatByBreed } from './cat-api';


refs = {
  select: document.querySelector('.breed-select'),
  textLoader: document.querySelector('.loader'),
  textError: document.querySelector('.error'),
  markupContainer: document.querySelector('.cat-info'),
}

function renderSelect(breeds) {
  const markup = breeds.map(breed => `<option value =${breed.id}>${breed.name}</option>`)
    .join('');
  refs.select.insertAdjacentHTML('beforeend', markup);
return markup
};

fetchBreeds()
  .then(breeds => {
    renderSelect(breeds)
  })
  .catch(error => console.log(error));

refs.select.addEventListener('input', onSelectBreed);

function onSelectBreed(e) {
  e.preventDefault();
  const catId = refs.select.options[refs.select.selectedIndex].value;


  fetchCatByBreed(catId)
    .then(catId => {
      renderCat(catId)
    })
  .catch(error => console.log(error));
};


function breedDescriptionMarking(breed) {


  const name = breed[0].breeds[0].name;
  
  const url = breed[0].url;
  const temperament = breed[0].breeds[0].temperament;
  const description = breed[0].breeds[0].description;


  return `
  <div class="container_img">
    <img
      class="cat_img"
      src="${url}"
      alt="${name}"
      width="300"
      height="300">
  </div>
  <div class="container_description">
  <h2 class="cat_breed">${name}</h2>
    <p class="cat_description">
    ${description}
    </p>
    <p class="cat_temperament">
    <b>Temperament:</b>
     ${temperament}
     </p>
  </div>`
};
   
 function renderCat(catId) {
   const markup = breedDescriptionMarking(catId);
   refs.markupContainer.innerHTML=markup;
}
