
import { fetchBreeds, fetchCatByBreed } from './cat-api';
// import Notiflix from 'notiflix';
const refs = {
  select: document.querySelector('.breed-select'),
 catInfo: document.querySelector('.cat-info'),
 textLoader: document.querySelector('.loader'),
 textError: document.querySelector('.error'),
};


refs.select.classList.add('is-hidden');
refs.catInfo.classList.remove('cat-info');
refs.catInfo.classList.add('is-hidden');

fetchBreeds()
.then(breeds => {

    renderSelect(breeds)
    refs.select.classList.remove('is-hidden');
    refs.select.classList.add('breed-select');
    refs.textLoader.classList.remove('loader')
    refs.textLoader.classList.add('is-hidden')
}

)
.catch(error => {
    refs.textLoader.classList.remove('loader')
    refs.textLoader.classList.add('is-hidden')
    refs.textError.classList.add('error-no-hidden');
    refs.textError.classList.remove('error');
    refs.select.classList.add('is-hidden');
refs.catInfo.classList.remove('cat-info');
 refs.catInfo.classList.add('is-hidden');
 console.log(error);
})
    


function renderSelect (breeds) {
    const markup = breeds.map(breed => { 
        return `<option value=${breed.id}>${breed.name}</option>`;
    }).join('');
    refs.select.insertAdjacentHTML('beforeend', markup);
    
}



refs.select.addEventListener('input', onClick); 

function onClick (e) {
    e.preventDefault();
    refs.textLoader.classList.add('loader');
    refs.textLoader.classList.remove('is-hidden');
    refs.catInfo.classList.remove('cat-info');
     refs.catInfo.classList.add('is-hidden');
    const cat = refs.select.options[refs.select.selectedIndex].value;
    fetchCatByBreed(cat).then(cat => {


        
     renderCat(cat)
     refs.catInfo.classList.add('cat-info');
     refs.catInfo.classList.remove('is-hidden');
     refs.textLoader.classList.remove('loader');
     refs.textLoader.classList.add('is-hidden');
        
    }).catch(error => {
      refs.textLoader.classList.remove('loader')
      refs.textLoader.classList.add('is-hidden')
        refs.textError.classList.add('error-no-hidden');
        refs.textError.classList.remove('error');
refs.catInfo.classList.remove('cat-info');
     refs.catInfo.classList.add('is-hidden');
        console.log(error)});

}

  
  function heroTemplate(breeds) {
    const temperament = breeds[0].breeds[0].temperament;
    const description =  breeds[0].breeds[0].description;
    const name = breeds[0].breeds[0].name;
    const url = breeds[0].url;
    return `
    <div class="cat-card">
        <div class="image-container">
          <img
            src="${url}"
            alt="cat-image"
            class="cat-image"
            width="300px"
            height="300px"
          />
        </div>
        <div class="cat-body">
          <h2 class="breed-name">${name}</h2>
          <p class="cat-descr">
            ${description} 
          </p>
          <p class="cat-temperament">
            <b>Temperament</b>: ${temperament} 
          </p>
        </div>
      </div>
    `;
  }
  
  function renderCat(cat) {
    const markup = heroTemplate(cat);
    refs.catInfo.innerHTML = markup;
};