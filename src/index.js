import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';


const DEBOUNCE_DELAY = 300;

// .then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();




// "Too many matches found. Please enter a more specific name."
// "Oops, there is no country with that name"