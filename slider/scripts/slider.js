class Slider {

    constructor() {
        this.slider = null;
        this._sliderName = '';

        this._scrolledContent = null;
        this._sliderContent = null;
        this._sliderImgs = null;

        this.fadeSlide = 0.1

        this._contentWidth = 350;
        this._bodyWidth = 350;
        this._slideWidth = 355;
        this._offsetLeft = 0;

        this._currentPos = 0;

        this.stopSwipe = this._stopSwipe.bind(this);
        this.moveSlide = this._moveSlide.bind(this);
    }


    init(sliderName) {

        this._sliderName = sliderName;
        this.slider = document.querySelector(sliderName);

        this._sliderContent = document.querySelector(`${sliderName} .slider-content`);
        this._scrolledContent = document.querySelector(`${sliderName} .scrolled-content`);
        this._sliderImgs = document.querySelectorAll(`${sliderName} .slide-image`);

        this._checkSliderWidthParams();

        let currentSlide = document.querySelector(`${sliderName} .slide-item[data-key="0"]`);
        currentSlide.style.opacity = 1;


        let btns = this.sliderImgs = document.querySelectorAll(`${sliderName} .btn`);


        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', (evt => this.buttonClick(evt)));
        }


        this._addSwiping();

        this._resize();
    }


    buttonClick(e) {
        e.preventDefault();

        if (e.target.classList.contains('-next')) {

            // this._offsetLeft -= this._slideWidth;
            this._replaceSlides('next');
            this._checkContentWidth();

        } else if (e.target.classList.contains('-prev')) {

            // this._offsetLeft += this._slideWidth;
            this._replaceSlides('prev');
            this._checkContentWidth();

        }

        // this._scrolledContent.style.marginLeft = this._offsetLeft + 'px';
    }

    _checkSliderWidthParams() {

        this._bodyWidth = this._checkBodyWidth() - 40;
        this._slideWidth = this._checkBodyWidth() - 40;

        this._offsetLeft = 0;
        this._scrolledContent.style.marginLeft = this._offsetLeft + 'px';
        this._contentWidth = this._checkContentWidth() + 40;

        this._scrolledContent.style.width = `${this._contentWidth}px`;
        this._sliderContent.style.width = `${this._bodyWidth}px`;

    }

    _addSwiping() {
        this._scrolledContent.style.marginLeft = 0;

        this.slider.addEventListener('mousedown', this._swipeStart.bind(this));
        this.slider.addEventListener('mouseup', this.stopSwipe);

        console.log('_addSwiping')
    }

    _swipeStart(e) {
        this._currentPos = e.clientX;
        this.slider.addEventListener('mousemove', this.moveSlide);
    }

    _moveSlide(e) {

        if (this._currentPos < e.clientX){

            // this._offsetLeft -= this._slideWidth;
            this._replaceSlides('prev');
            this._checkContentWidth();

        } else {

            // this._offsetLeft += this._slideWidth;
            this._replaceSlides('next');
            this._checkContentWidth();

        }


        // this._scrolledContent.style.marginLeft = this._offsetLeft + 'px';
        this._currentPos = e.clientX;
        this.slider.removeEventListener('mousemove', this.moveSlide);
    }

    _stopSwipe() {
        this.slider.removeEventListener('mousemove', this.moveSlide);
    }

    _checkBodyWidth() {
        return this.slider.offsetWidth;

    }

    _checkContentWidth() {
        var result = 0;

        Array.prototype.forEach.call(this._sliderImgs, (item, index) => {
            item.parentNode.style.width = `${this._bodyWidth}px`;
            item.parentNode.setAttribute('data-key', index);
            result += this._bodyWidth;
        });

        return result;
    }

    _replaceSlides(position) {
        let length = this._sliderImgs.length;

        if (position === 'prev') {

            this._sliderImgs[length - 1].parentNode.style.opacity = this.fadeSlide;
            this._sliderImgs[0].parentNode.style.opacity = this.fadeSlide;
            this._scrolledContent.insertBefore(this._sliderImgs[length - 1].parentNode, document.querySelector(`${this._sliderName} .slide-item`));
            setTimeout(() => {
                this._sliderImgs[0].parentNode.style.opacity = 1;
            }, 100);

        } else {

            this._sliderImgs[0].parentNode.style.opacity = this.fadeSlide;
            this._scrolledContent.appendChild(this._sliderImgs[0].parentNode);
            setTimeout(() => {
                this._sliderImgs[0].parentNode.style.opacity = 1;
            }, 100);
        }

        this._sliderImgs = document.querySelectorAll(`${this._sliderName} .slide-image`);
    }

    _resize(){
        window.onresize = ()=>{
            this._checkSliderWidthParams();
        }
    }

}

module.exports = Slider;