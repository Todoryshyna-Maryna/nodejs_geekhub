class Slider {
    constructor() {
        this.slider = null;
        this._scrolledContent = null;
        this._sliderContent = null;
        this._sliderImgs = null;

        this._contentWidth = 350;
        this._bodyWidth = 350;
        // this._slideWidth = 355;
    }

    init(sliderName) {
        this.slider = document.querySelector(sliderName);
        this._sliderContent = document.querySelector(`${sliderName} .slider-content`);
        this._scrolledContent = document.querySelector(`${sliderName} .scrolled-content`);
        this._sliderImgs = document.querySelectorAll(`${sliderName} .slide-image`);


        this._bodyWidth = this._checkBodyWidth() - 40;
        this._contentWidth = this._checkContentWidth(this._sliderImgs) + 40;

        this._scrolledContent.style.width = `${this._contentWidth}px`;
        this._sliderContent.style.width = `${this._bodyWidth}px`;

    }

    buttonClick(e) {

    }

    _checkBodyWidth() {
        let width = this.slider.offsetWidth;
        return width;
    }

    _checkContentWidth(imgs) {
        var result = 0;

        Array.prototype.forEach.call(imgs, (item, index) => {
            item.parentNode.style.width = `${this._bodyWidth}px`;
            result += this._bodyWidth;
            console.log(result);
        });

        return result;
    }

}


let slider = new Slider();
slider.init('#slider');