import {load, depdateClick,backClick, generateClick} from './js/app.js';
import './styles/style.scss'

window.addEventListener('load', load);
document.querySelector("#depdate").addEventListener("input", depdateClick);
document.querySelector(".rmv").addEventListener("click", backClick);
document.querySelector("#generate").addEventListener("click", generateClick);


export{load, depdateClick,backClick, generateClick}