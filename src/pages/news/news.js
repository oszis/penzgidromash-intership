import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import NewsSlider from '../../components/news-slider/news-slider';
import { listen, unlisten } from '../../common/js/helpers';

Barba.BaseView.extend({
    namespace: 'news',
    onEnter() {

    },
    async onEnterCompleted() {
        await commonComponents.preloader.preloading;
        commonComponents.header.update();
        objectFitPolyfill();
        this.slider = new NewsSlider(document.querySelector('.news-slider'));
        listen('resize', this.slider.afterResize, window);
    },
    onLeave() {
        unlisten('resize', this.slider.afterResize, window);
        this.slider.destroy();
    },
    onLeaveCompleted() {

    },
}).init();
