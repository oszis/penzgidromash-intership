import Component from '../../common/js/component';
import {
    getDeviceType, listen, unlisten, nFindComponent, Resize,
} from '../../common/js/helpers';
import Swiper from '../../../node_modules/swiper/dist/js/swiper.min';


class NewsSlider extends Component {
    constructor(nRoot) {
        super(nRoot, 'news-slider');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);
        if (getDeviceType() === 'mobile') {
            this.initMobile();
        } else {
            this.initDesktop();
        }
        this.resize = new Resize(this);
        listen('deviceType:after-resize', this.afterResize);
    }

    initDesktop() {
        /* === Слайдер для десктопа === */
        const SwiperDesktop = new Swiper(this.nFindSingle('swiper-container'), {
            slidesPerView: 'auto',
            slidesPerColumn: 3,
            slidesPerGroup: 2,
            speed: 500,
            spaceBetween: document.documentElement.clientWidth / 24,
            slidesPerColumnFill: 'column',
            direction: 'horizontal',
            simulateTouch: false,
            pagination: {
                el: '.news-slider__swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return `<div class="${className}">${index + 1}</div>`;
                },
            },
            navigation: {
                nextEl: '.news-slider__swiper-button-next',
                prevEl: '.news-slider__swiper-button-prev',
            },
        });
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
        unlisten('deviceType:after-resize', this.afterResize);
        if (getDeviceType() === 'mobile') {
            this.destroyMobile();
        } else {
            this.destroyDesktop();
        }
    }
}

export default NewsSlider;
