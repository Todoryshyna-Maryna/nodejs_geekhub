class Slider {
    constructor() {
        this.slider = null;
        this._sliderContent = null;
        this._images = null;

        this._contentWidth = 350;
        this._slideWidth = 355;
    }

    init(sliderName) {
        this.slider = document.querySelector(sliderName);
        this._sliderContent = document.querySelector(`${sliderName} .scrolled-content`);
        this._sliderImgs = document.querySelectorAll(`${sliderName} .slide-image`);

        this._contentWidth = this._checkContentWidth(this._sliderImgs);
        console.log(this._contentWidth);

        this._sliderContent.style.width = `${this._contentWidth}px`;
    }

    _checkContentWidth(imgs) {
        var result = 0;

        Array.prototype.forEach.call(imgs, (item, index)=>{
            console.log(result);
            result += this._slideWidth;
        });

        return result;
    }

}



let slider = new Slider();
slider.init('#slider');