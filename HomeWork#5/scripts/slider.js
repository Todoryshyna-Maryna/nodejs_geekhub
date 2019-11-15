class Slider {
    constructor(options = {}) {
        this.slidesCount = options.slidesCount || 3;
        this.dots = options.dots || true;
        this.arrows = options.arrows || true;
        this.slideWidth = 371;
        this.sliderContentWidth = 371;
        this.slider = null;
        this.sliderContent = null;
        this.sliderImgs = null;
        this.buttons = null;
    }

    createSlider(sliderSelector) {
        this.slider = document.querySelector(sliderSelector);
        this.sliderContent = document.querySelector(sliderSelector + ' .slider-content');
        this.sliderImgs = document.querySelectorAll(sliderSelector + ' .slide-image');
        this.slidesCount = this.sliderImgs.length;

        this.sliderContentWidth = this.sumWidthOfSlides();
        this.sliderContent.style.width = this.sliderContentWidth + 'px';

        let btns =  this.sliderImgs = document.querySelectorAll(sliderSelector + ' .btn');


        for (let i = 0; i <btns.length; i++) {
           btns[i].addEventListener('click', (evt => this.handleBtnClick(evt)));
        }
    }

    sumWidthOfSlides() {
        let result = 0;
        for (let i = 0; i < this.slidesCount; i++) {
            result += this.slideWidth + 21;
        }

        return result;
    }

    handleBtnClick(e) {
        let marginLeft = parseFloat(this.sliderContent.style.marginLeft);

        if (!marginLeft) {
            this.sliderContent.style.marginLeft = 0;
            marginLeft = 0;
        }

        if (e.target.classList.contains('-prev') && marginLeft < 0) {
            this.sliderContent.style.marginLeft = (marginLeft + this.slideWidth) + 'px';

        } else if (e.target.classList.contains('-next') && marginLeft < this.slideWidth && marginLeft > 0 - this.sliderContentWidth / 2) {
            this.sliderContent.style.marginLeft = (marginLeft - this.slideWidth) + 'px';
        }

    }

}

module.exports = Slider;