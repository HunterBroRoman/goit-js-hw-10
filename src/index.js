import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input#search-box');
const country = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  const countryName = e.target.value.trim();//получаем название страны

  if (countryName === '') {
    resetCountryInfo();// запускаем функцию 

    return;// если поле пустое - выходим
  }

  fetchCountries(countryName)
  .then(renderCountriesMarkup)
  .catch(onFetchError);
}

function renderCountriesMarkup(countries) {
  if (countries.length > 10) {
    resetCountryInfo();

    Notify.info('Too many matches found. Please enter a more specific name.');
  }

  if (countries.length >= 2 && countries.length <= 10) {
    const countriesListMarkup = countries
      .map(
        ({ flags, name }) =>
          `<li class="country__item">
            <img src=${flags.svg} alt=${name.common} width="25" height="25"/>
            <p class="country__name">${name.official}</p>
           </li>`
      )
      .join('');

    getCountryInfoVisible();

    country.innerHTML = `<ul class="country-list">${countriesListMarkup}</ul>`;
  }

  if (countries.length === 1) {
    const { flags, name, capital, population, languages } = countries[0];
    const langs = Object.values(languages).join(', ');

    getCountryInfoVisible();

    country.innerHTML = `
        <div class="title__wrapper">
        <img src="${flags.svg}" alt="${name.common}" width="55" height="35"/>
        <h1 class="title">${name.official}</h1>
                         
        <p class="country__properties">
            <span>Capital</span>: ${capital}
        </p>
        <p class="country__properties">
            <span>Population</span>: ${population}
        </p>
        <p class="country__properties">
            <span>Languages</span>: ${langs}
        </p>
        </div>`;
  }
}

function onFetchError(error) {
  resetCountryInfo();
  Notify.failure('Oops, there is no country with that name');
}

function resetCountryInfo() {
  country.classList.add('hidden');
  country.innerHTML = '';
}

function getCountryInfoVisible() {
  country.classList.remove('hidden');
}
