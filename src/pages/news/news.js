import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import NewsSlider from '../../components/news-slider/news-slider';

Barba.BaseView.extend({
    namespace: 'news',
    onEnter() {

    },
    async onEnterCompleted() {
        await commonComponents.preloader.preloading;
        objectFitPolyfill();
        const slider = new NewsSlider(document.querySelector('.news-slider'));
    },
    onLeave() {

    },
    onLeaveCompleted() {

    },
}).init();
