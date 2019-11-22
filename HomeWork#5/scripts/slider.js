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

        this._currentPos = 0;
    }

    addSwiping() {
        this.slider.addEventListener('mousedown', this._swipeStart.bind(this));
        this.slider.addEventListener('mouseup', this._stopSwipe.bind(this));

        console.log('addSwiping')
    }

    _swipeStart(e) {
        this._currentPos = e.clientX;
        this.slider.addEventListener('mousemove', this._moveSlide.bind(this));
    }

    _moveSlide(e){
        console.log(e.clientX)
        let marginLeft = parseFloat(this.sliderContent.style.marginLeft);

        if(this._currentPos > window.innerWidth/2) {
            this.sliderContent.style.marginLeft = (marginLeft - this.slideWidth) + 'px';
            console.log('_moveSlide')

        } else {
            this.sliderContent.style.marginLeft = (marginLeft + this.slideWidth) + 'px';

        }

        this._currentPos = e.clientX;
        this.slider.removeEventListener('mousemove', this._moveSlide.bind(this));
    }

    _stopSwipe() {
        this._currentPos = 0;
        this.slider.removeEventListener('mousemove', this._moveSlide.bind(this));
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

        this.addSwiping();
    }

    sumWidthOfSlides() {
        let result = 0;
        for (let i = 0; i < this.slidesCount; i++) {
            result += this.slideWidth;
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

        }  else if (e.target.classList.contains('-prev') && marginLeft >= 0) {
            this.sliderContent.style.marginLeft = 0 - this.sliderContentWidth/2 + 'px';

        } else if (e.target.classList.contains('-next') && marginLeft < this.slideWidth && marginLeft <= 0 - this.sliderContentWidth / 2) {
            this.sliderContent.style.marginLeft = 0;

        }

    }

}

module.exports = Slider;