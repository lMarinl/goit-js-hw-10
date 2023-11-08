
const API_KEY = '?api_key=live_yewu3WMBpxEneAY6qBSDfsQelEtc6lCKXeE8v4pJO8f1wUtEWyhx3m9W065njKWG';
const BASE_URL = 'https://api.thecatapi.com/v1';


const options = {
  headers: {
    'x-api_key': API_KEY
  },
};


export function fetchBreeds() {
  const END_POINT = '/breeds';
  const url = `${BASE_URL}${END_POINT}`;

  return fetch(url)
    .then(response => {
    if (!response.ok) {
      throw new Error(response.status)
    }
    
   return response.json()});
};

export function fetchCatByBreed(breedId) {
  const END_POINT = '/images/search';
  const PARAMS = `&breed_ids=${breedId}`;
  const url = BASE_URL + END_POINT + API_KEY + PARAMS
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    };
    return response.json();
  })

};
