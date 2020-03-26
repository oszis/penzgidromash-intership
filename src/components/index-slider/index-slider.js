import Component from '../../common/js/component';
import { getDeviceType, listen, unlisten, Resize } from '../../common/js/helpers';
import SliderPair from '../slider-pair/slider-pair';
import SliderNavigation from '../slider-navigation/slider-navigation';
import TitleSlider from '../title-slider/title-slider';

class IndexSlider extends Component {
    constructor(nRoot) {
        super(nRoot, 'index-slider');
        this.currentDevice = getDeviceType();
        this.afterResize = this.afterResize.bind(this);

        if (getDeviceType() === 'mobile') {
            this.initMobile();
        } else {
            this.initDesktop();
        }
        this.resize = new Resize(this);
        listen('deviceType:after-resize', this.afterResize, this.nRoot);

        this.titleSlider = new TitleSlider(this.nRoot.querySelector('.title-slider'));
        this.sliderNavigation = new SliderNavigation(this.nRoot.querySelector('.slider-navigation'));
        this.slider = new SliderPair(this.nRoot.querySelector('.slider-pair'));

        // анимации стрелок в навигации
        this.titleSlider.swiper.on('slideChange', () => {
            this.sliderNavigation.slideChange(this.titleSlider.swiper);
        });

        this.titleSlider.swiper.on('reachBeginning', () => {
            this.sliderNavigation.reachBeginning();
        });

        this.titleSlider.swiper.on('reachEnd', () => {
            this.sliderNavigation.reachEnd();
        });

        this.titleSlider.swiper.controller.control = this.slider.swiper;
        this.slider.swiper.controller.control = this.titleSlider.swiper;

        this.slider.initSwiper();
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
        unlisten('deviceType:after-resize', this.afterResize);
        if (getDeviceType() === 'mobile') {
            this.destroyMobile();
        } else {
            this.destroyDesktop();
        }
    }
}

export default IndexSlider;
