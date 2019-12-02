class Slider {
    constructor() {
        this.slider = null;
        this._sliderName = '';
        this._scrolledContent = null;
        this._sliderContent = null;
        this._sliderImgs = null;

        this._contentWidth = 350;
        this._bodyWidth = 350;
        this._slideWidth = 355;

        this.firstSlides = null;
        this.lastSlides = null;

        this._offsetLeft = 0;
    }

    init(sliderName) {
        this._sliderName = sliderName;
        this.slider = document.querySelector(sliderName);
        this._sliderContent = document.querySelector(`${sliderName} .slider-content`);
        this._scrolledContent = document.querySelector(`${sliderName} .scrolled-content`);
        this._sliderImgs = document.querySelectorAll(`${sliderName} .slide-image`);


        // console.log('_sliderImgs', this._sliderImgs[0, 1])

        this._bodyWidth = this._checkBodyWidth() - 40;
        this._slideWidth = this._checkBodyWidth() - 40;

        this._cloneSlides();

        this._offsetLeft = this._offsetLeft - (this._bodyWidth * 2);
        this._scrolledContent.style.marginLeft = this._offsetLeft + 'px';

        this._contentWidth = this._checkContentWidth() + 40;

        this._scrolledContent.style.width = `${this._contentWidth}px`;
        this._sliderContent.style.width = `${this._bodyWidth}px`;

    }


    buttonClick(e) {

        if (e.target.classList.contains('-next')) {
            this._replaceSlides('next');
            this._offsetLeft -= this._slideWidth;
            this._cloneSlides();
            this._contentWidth = this._checkContentWidth() + 40;
            this._scrolledContent.style.width = `${this._contentWidth}px`;
            this._sliderContent.style.width = `${this._bodyWidth}px`;

            // } else if (e.target.classList.contains('-next') && this._offsetLeft >= (-this._slideWidth * 2)) {
            //     this._replaceSlides('next');
            //     this._cloneSlides();
            //
        } else if (e.target.classList.contains('-prev') ) {
            this._offsetLeft += this._slideWidth;
            this._replaceSlides('prev');
            this._cloneSlides();
            this._contentWidth = this._checkContentWidth() + 40;
            this._scrolledContent.style.width = `${this._contentWidth}px`;
            this._sliderContent.style.width = `${this._bodyWidth}px`;
        }

        // this._scrolledContent.style.marginLeft = `${this._offsetLeft}px`;
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

    _cloneSlides() {
        let allClones = document.querySelectorAll('.slide-item.-clone');
        this._sliderImgs = document.querySelectorAll(`${this._sliderName} .slide-image`);

        if (allClones.length > 0) {
            Array.prototype.forEach.call(allClones, (item) => {
                item.remove();
            })
        }


        let length = this._sliderImgs.length;
        let clone0 = this._sliderImgs[0].parentNode.cloneNode(true),
            clone1 = this._sliderImgs[1].parentNode.cloneNode(true),
            cloneLast = this._sliderImgs[length - 1].parentNode.cloneNode(true),
            cloneBeforeLast = this._sliderImgs[length - 2].parentNode.cloneNode(true);


        clone0.classList.add('-clone');
        clone1.classList.add('-clone');
        cloneLast.classList.add('-clone');
        cloneBeforeLast.classList.add('-clone');


        this._scrolledContent.insertBefore(cloneLast, document.querySelector(`${this._sliderName} .slide-item`));
        this._scrolledContent.insertBefore(cloneBeforeLast, document.querySelector(`${this._sliderName} .slide-item`));
        this._scrolledContent.appendChild(clone0, document.querySelector(`${this._sliderName} .slide-item`));
        this._scrolledContent.appendChild(clone1, document.querySelector(`${this._sliderName} .slide-item`));

        this._sliderImgs = document.querySelectorAll(`${this._sliderName} .slide-image`);

    }

    _replaceSlides(position) {
        this._sliderImgs = document.querySelectorAll(`${this._sliderName} .slide-image`);
        let length = this._sliderImgs.length;

        if (position === 'prev') {

            for (let i = length - 1; i >= 0; i--) {
                this._scrolledContent.insertBefore(this._sliderImgs[i].parentNode, document.querySelector(`${this._sliderName} .slide-item`));
                this._sliderImgs = document.querySelectorAll(`${this._sliderName} .slide-image`);
            }

        } else {

            for (let j = 0; j < length; j++) {

                this._scrolledContent.appendChild(this._sliderImgs[j].parentNode, document.querySelector(`${this._sliderName} .slide-item`));
                this._sliderImgs = document.querySelectorAll(`${this._sliderName} .slide-image`);
            }
        }

    }

}


let slider = new Slider();
slider.init('#slider');