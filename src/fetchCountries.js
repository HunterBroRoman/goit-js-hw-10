
const BASE_URL = 'https://restcountries.com/v3.1';//данные из библиотеки

export function fetchCountries(name) {
  const url = `${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`;
//создали переменную с адресом сайта(запрос)
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
//формула проверки фетч запросов на ошибку
      return response.json();
    })
    .then(countries => countries);
}

