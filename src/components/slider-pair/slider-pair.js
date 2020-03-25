import Swiper from 'swiper/dist/js/swiper';
import Component from '../../common/js/component';
import {getDeviceType, listen, unlisten, Resize, getElementWidth, } from '../../common/js/helpers';


class SliderPair extends Component {
    constructor(nRoot, prevBtn, nextBtn) {
        super(nRoot, 'slider-pair');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);

        if (getDeviceType() === 'mobile') {
            this.initMobile();
        } else {
            this.initDesktop();
        }
        this.resize = new Resize(this);
        listen('deviceType:after-resize', this.afterResize, this.nRoot);

        this.isNested = this.nFindSingle('nested');
        this.isKeyboard = '';
        if (!this.isNested) {
            this.isKeyboard = true;
        } else {
            this.isKeyboard = false;
        }
        this.isAutoheight = '';
        this.isNoAutoheight = this.nFindSingle('noautoheight');
        if (!this.isNoAutoheight) {
            this.isAutoheight = true;
        } else {
            this.isAutoheight = false;
        }
        this.navigation = false;
        if (prevBtn && nextBtn) {
            this.navigation = {
                prevEl: prevBtn,
                nextEl: nextBtn,
            }
        }

        this.slide = document.querySelector('.slide');
        this.swiper = new Swiper(this.nRoot, {
            iOSEdgeSwipeDetection: true,
            iOSEdgeSwipeThreshold: 0,
            resistanceRatio: 0,
            grabCursor: true,
            nested: this.isNested,
            keyboard: this.isKeyboard,
            observer: true,
            observeParents: true,
            speed: 1000,
            slidesPerView: '1',
            autoHeight: this.isAutoheight,
            longSwipesRatio: 0,
            touchRatio: 0.4,
            navigation: this.navigation,
            init: false,
        });

        this.swiper.on('init', () => {
            if (this.swiper.slides.length > 0) {
                // скрываем текст и смещаем картинки в слайдах
                this.swiperSlide = this.nFind('slide');
                this.contentSlidesImg = [...this.swiper.wrapperEl.querySelectorAll('[data-slide-img-animate]')];
                this.contentSlideContent = [...this.swiper.wrapperEl.querySelectorAll('[data-content-slide-animate]')];
                new TimelineLite().set(this.contentSlideContent, {autoAlpha: 0, xPercent: 15});
                new TimelineLite().set(this.contentSlidesImg, {xPercent: 7});
            }
        });

        this.initSwiper = this.initSwiper.bind(this);

        // анимация при переключении слайдов в прямом направлении
        this.swiper.on('slideNextTransitionStart', () => {
            this.prevIndex = this.swiper.previousIndex;
            this.prev = this.swiper.slides[this.prevIndex];
            this.contentSlideImgPrev = this.prev.querySelector('[data-slide-img-animate]');
            this.number = this.swiper.activeIndex;
            this.active = this.swiper.slides[this.number];
            this.contentSlideImgBox = this.active.querySelector('[data-slide-box-animate]');
            this.contentSlideImg = this.active.querySelector('[data-slide-img-animate]');

            this.swiper.allowSlidePrev = false;
            setTimeout(() => {
                this.swiper.allowSlidePrev = true;
            }, 1200);

            // выкатывание слайда
            new TimelineLite()
                .set(this.contentSlideImgBox, {autoAlpha: 1, xPercent: 80, ease: Power1.easeOut})
                .to(this.contentSlideImgBox, 1, {xPercent: 100, delay: 0.2});

            // убираем смещение картинки на активном слайде
            new TimelineLite()
                .to(this.contentSlideImg, 1.6, {
                    xPercent: 0,
                });

            // добавляем смещение картинки для слайда, который ранее был активным
            new TimelineLite()
                .to(this.contentSlideImgPrev, 1.6, {
                    xPercent: 7,
                });
            // последний слайд прижимаем к правому краю
            if (this.number === this.swiper.slides.length - 1) {
                this.innerSliderWidth = getElementWidth(this.slide);
                this.sliderWidth = this.swiper.width;
                this.translateLastOrigin = (this.swiper.slides.length - 1) * this.sliderWidth;
                this.sliderPairPadd = parseFloat(getComputedStyle(this.swiper.slides[0]).paddingRight);
                this.translateLastCustom = -this.translateLastOrigin + (this.innerSliderWidth - this.sliderWidth) + this.sliderPairPadd;
                // this.swiper.wrapperEl.style.transform = translate3d(${this.translateLastCustom}px, 0px, 0px);
            }
            // анимация при переключении слайдов в обратном направлении
            this.swiper.on('slidePrevTransitionStart', () => {
                this.prevIndex = this.swiper.previousIndex;
                this.prev = this.swiper.slides[this.prevIndex];
                this.contentSlideImgPrev = this.prev.querySelector('[data-slide-img-animate]');
                this.number = this.swiper.activeIndex;
                this.active = this.swiper.slides[this.number];
                this.contentSlideImg = this.active.querySelector('[data-slide-img-animate]');

                this.swiper.allowSlideNext = false;
                setTimeout(() => {
                    this.swiper.allowSlideNext = true;
                }, 1200);

                // убираем смещение картинки на активном слайде
                new TimelineLite()
                    .to(this.contentSlideImg, 1.6, {
                        xPercent: 0,
                    });

                // добавляем смещение картинки для слайда, который ранее был активным
                new TimelineLite()
                    .to(this.contentSlideImgPrev, 1.6, {
                        xPercent: 7,
                    });

                // уходим с последнего слайда
                if (this.number == this.swiper.slides.length) {
                    this.innerSliderWidth = getElementWidth(this.slide);
                    this.sliderWidth = this.swiper.width;
                    this.translateLastOrigin = (this.swiper.slides.length - 1) * this.sliderWidth;
                    this.sliderPairPadd = parseFloat(getComputedStyle(this.swiper.slides[0]).paddingRight);
                    this.translateLastCustom = -this.translateLastOrigin + (this.innerSliderWidth - this.sliderWidth) + this.sliderPairPadd;
                    // this.swiper.wrapperEl.style.transform = translate3d(${this.translateLastCustom}px, 0px, 0px);
                }
            });
        });
    }

    initSwiper() {
        this.swiper.init();
    }

    initDesktop() {

    }

    initMobile() {

    }

    afterResize() {
        if (getDeviceType() !== this.currentDevice) {
            if (getDeviceType() === 'mobile') {
                this.destroyDesktop();
                this.initMobile();
            } else if (this.currentDevice === 'mobile') {
                this.destroyMobile();
                this.initDesktop();
            }
            this.currentDevice = getDeviceType();
        }
    }

    destroyDesktop() {

    }

    destroyMobile() {

    }

    destroy() {
        this.swiper.destroy();
        unlisten('deviceType:after-resize', this.afterResize);
        if (getDeviceType() === 'mobile') {
            this.destroyMobile();
        } else {
            this.destroyDesktop();
        }
    }
}

export default SliderPair;
