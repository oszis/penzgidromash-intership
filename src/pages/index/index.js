import Barba from 'barba.js';
import Swiper from '../../../node_modules/swiper/dist/js/swiper.min';
import { commonComponents } from '../../common/js/commonComponents';

Barba.BaseView.extend({
    namespace: 'index',
    onEnter() {

    },
    async onEnterCompleted() {
        await commonComponents.preloader.preloading;
        objectFitPolyfill();
    },
    onLeave() {

    },
    onLeaveCompleted() {

    },

}).init();

let nSwiper = new Swiper(document.querySelectorAll('.swiper-container'), {
    slidesPerView: 'auto',
    direction: 'horizontal',
    speed: 800,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    pagination: {
        el: '.slider-navigation__counter',
        clickable: true,
        type: 'fraction',
    },
    navigation: {
        nextEl: '.slider-navigation__next',
        prevEl: '.slider-navigation__prev',
    },
});
let nProjectSwiper = new Swiper(document.querySelectorAll('.project-slider__container'), {
    slidesPerView: 'auto',
    direction: 'horizontal',
    speed: 800,
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    pagination: {
        el: '.slider-navigation__counter-project',
        clickable: true,
        type: 'fraction',
    },
    navigation: {
        nextEl: '.slider-navigation__next-project',
        prevEl: '.slider-navigation__prev-project',
    },
});
