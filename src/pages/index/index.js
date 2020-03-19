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

