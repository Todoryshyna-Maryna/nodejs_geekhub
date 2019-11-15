import Slider from './slider.js';
import './../scss/main.scss';



var newSlider = null;

document.addEventListener("DOMContentLoaded", () => {
    newSlider = new Slider();
    newSlider.createSlider('.slider')
});