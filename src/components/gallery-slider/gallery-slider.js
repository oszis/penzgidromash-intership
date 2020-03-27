import Component from '../../common/js/component';
import { getDeviceType, listen, unlisten, nFindComponent, Resize } from '../../common/js/helpers';
import Swiper from 'swiper/dist/js/swiper.min';

class GallerySlider extends Component {
    constructor(nRoot) {
        super(nRoot, 'gallery-slider');
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
        const GalleryDesktop = new Swiper(this.nFindSingle('swiper-container'), {
            slidesPerView: 'auto',
            speed: 800,
            // spaceBetween: (document.documentElement.clientWidth / 24) * 2,
            spaceBetween: 0,
            direction: 'horizontal',
            pagination: {
                el: '.gallery-slider__swiper-pagination',
                type: 'fraction',
            },
            navigation: {
                nextEl: '.gallery-slider__swiper-button-next',
                prevEl: '.gallery-slider__swiper-button-prev',
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

export default GallerySlider;
