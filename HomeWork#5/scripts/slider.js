class Slider {
    constructor(options = {}) {
        this.slidesCount = options.slidesCount || 3;
        this.dots = options.dots || true;
        this.arrows = options.arrows || true;
        this._slideWidth = 354;
        this._sliderContentWidth = 354;
        this._slider = null;
        this.sliderContent = null;
        this.sliderImgs = null;

        this._currentPos = 0;
        this.stopSwipe = this._stopSwipe.bind(this);
        this.moveSlide = this._moveSlide.bind(this);
    }

    _addSwiping() {
        this.sliderContent.style.marginLeft = 0;

        this._slider.addEventListener('mousedown', this._swipeStart.bind(this));
        this._slider.addEventListener('mouseup', this.stopSwipe);

        console.log('_addSwiping')
    }

    _swipeStart(e) {
        this._currentPos = e.clientX;
        this._slider.addEventListener('mousemove', this.moveSlide);
    }

    _moveSlide(e) {
        let marginLeft = parseFloat(this.sliderContent.style.marginLeft);

        if (this._currentPos < e.clientX){
            if (marginLeft < 0) {
                this.sliderContent.style.marginLeft = (marginLeft + this._slideWidth) + 'px';
            } else if (marginLeft >= 0) {
                this.sliderContent.style.marginLeft = 0 - this._sliderContentWidth / 2 + 'px';
            }

        } else  if (this._currentPos > e.clientX) {

            if(marginLeft < this._slideWidth && marginLeft > 0 - this._sliderContentWidth / 2) {
                this.sliderContent.style.marginLeft = (marginLeft - this._slideWidth) + 'px';
            } else {
                this.sliderContent.style.marginLeft = 0;
            }

        }


        this._currentPos = e.clientX;
        this._slider.removeEventListener('mousemove', this.moveSlide);
    }

    _stopSwipe() {
        this._slider.removeEventListener('mousemove', this.moveSlide);
    }

    _sumWidthOfSlides() {
        let result = 0;
        for (let i = 0; i < this.slidesCount; i++) {
            result += this._slideWidth;
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
            this.sliderContent.style.marginLeft = (marginLeft + this._slideWidth) + 'px';

        } else if (e.target.classList.contains('-next') && marginLeft < this._slideWidth && marginLeft > 0 - this._sliderContentWidth / 2) {
            this.sliderContent.style.marginLeft = (marginLeft - this._slideWidth) + 'px';

        } else if (e.target.classList.contains('-prev') && marginLeft >= 0) {
            this.sliderContent.style.marginLeft = 0 - this._sliderContentWidth / 2 + 'px';

        } else if (e.target.classList.contains('-next') && marginLeft < this._slideWidth && marginLeft <= 0 - this._sliderContentWidth / 2) {
            this.sliderContent.style.marginLeft = 0;

        }

    }

    createSlider(sliderSelector) {
        this._slider = document.querySelector(sliderSelector);
        this.sliderContent = document.querySelector(sliderSelector + ' .slider-content');
        this.sliderImgs = document.querySelectorAll(sliderSelector + ' .slide-image');
        this.slidesCount = this.sliderImgs.length;

        this._sliderContentWidth = this._sumWidthOfSlides();
        this.sliderContent.style.width = this._sliderContentWidth + 'px';

        let btns = this.sliderImgs = document.querySelectorAll(sliderSelector + ' .btn');


        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', (evt => this.handleBtnClick(evt)));
        }

        this._addSwiping();
    }

}

module.exports = Slider;