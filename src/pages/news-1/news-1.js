import Barba from 'barba.js';
import { commonComponents } from '../../common/js/commonComponents';
import GallerySlider from '../../components/gallery-slider/gallery-slider'

Barba.BaseView.extend({
    namespace: 'news-1',
    onEnter() {

    },
    async onEnterCompleted() {
        await commonComponents.preloader.preloading;
        commonComponents.header.update();
        const Gallery = new GallerySlider(document.querySelector('.gallery-slider'));
        objectFitPolyfill();
    },
    onLeave() {

    },
    onLeaveCompleted() {

    },
}).init();
