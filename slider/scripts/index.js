import Slider from './slider.js';
import './../scss/main.scss';



var newSlider = new Slider();

document.addEventListener("DOMContentLoaded", () => {
    newSlider.init('#slider');
});