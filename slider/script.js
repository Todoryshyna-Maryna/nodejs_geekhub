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
            this._offsetLeft -= this._slideWidth;

        } else if (e.target.classList.contains('-next') && this._offsetLeft >= this._slideWidth * 2) {
            this._replaceSlides('next');

        } else if (e.target.classList.contains('-prev') && this._offsetLeft < (-this._slideWidth * 2)) {
            // this._offsetLeft += this._slideWidth;
            this._cloneSlides();
            this._replaceSlides('prev');

        } else if (e.target.classList.contains('-prev') && this._offsetLeft >= (-this._slideWidth * 2)) {
            // this._offsetLeft += this._slideWidth;
            this._cloneSlides();
            this._replaceSlides('prev');


            console.log('this._slideWidth * 2', this._slideWidth * 2)
        } else if (e.target.classList.contains('-prev') && this._offsetLeft >= (-this._slideWidth * 3)) {
            // this._offsetLeft = -this._slideWidth * 2;
            this._cloneSlides();
            this._replaceSlides('prev');

            console.log('this._slideWidth * 2', this._slideWidth * 2)
        }

        this._scrolledContent.style.marginLeft = `${this._offsetLeft}px`;
    }

    _checkBodyWidth() {
        return this.slider.offsetWidth;
    }

    _checkContentWidth() {
        var result = 0;

        Array.prototype.forEach.call(this._sliderImgs, (item, index) => {
            item.parentNode.style.width = `${this._bodyWidth}px`;
            result += this._bodyWidth;
        });

        return result;
    }

    _cloneSlides() {
        let allClones = document.querySelectorAll('.slide-item.-clone');

        if (allClones) {
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
        let length = this._sliderImgs.length;

        if (position === 'prev') {
            console.log(this._sliderImgs)

            this._scrolledContent.insertBefore(this._sliderImgs[length - 1].parentNode, document.querySelector(`${this._sliderName} .slide-item`));
            this._scrolledContent.insertBefore(this._sliderImgs[length - 2].parentNode, document.querySelector(`${this._sliderName} .slide-item`));


            this._offsetLeft += this._slideWidth;

            // this._offsetLeft = this._offsetLeft - (this._bodyWidth * 2);
            // this._scrolledContent.style.marginLeft = this._offsetLeft + 'px';

        } else {

            this._scrolledContent.appendChild(this._sliderImgs[0].parentNode, document.querySelector(`${this._sliderName} .slide-item`));
            this._scrolledContent.appendChild(this._sliderImgs[1].parentNode, document.querySelector(`${this._sliderName} .slide-item`));
        }


        this._sliderImgs = document.querySelectorAll(`${this._sliderName} .slide-image`);
        this._checkContentWidth();


    }

}


let slider = new Slider();
slider.init('#slider');