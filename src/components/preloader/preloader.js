import Component from '../../common/js/component';
import {loadImages, nGetBody, delay, isDirectEnter, unlisten, emit, listen} from '../../common/js/helpers';
import Barba from "barba.js";

class Preloader extends Component {
    constructor(nRoot) {
        super(nRoot, 'preloader');
        this.done = false;

        const playbackOverPromise = async () => loadImages();

        this.preloading = Promise.all([
            playbackOverPromise(),
        ]).then(() => delay(1500))
            .then(() => {
                nGetBody().classList.remove('preloading');
                nGetBody().style.removeProperty('height');
                this.hide();
            });
    }

    promiseAnimation() {
        return new Promise((resolve) => {
            if (isDirectEnter()) {
                listen('preloaderAnimation:done', resolve);
            } else {
                return resolve()
            }
        });
    }

    timerIfNotLoadingImages() {
        return new Promise(resolve => {
            setTimeout(() => {
                this.promiseAnimation();
            }, 9000);
        })
    }

    async playbackOverPromise() {
        await Promise.all([
            (getDeviceType() !== 'mobile') ? loadImportantMedia() : false,
            loadImages(),
            commonComponents.lazyLoad.update(),
            this.promiseAnimation()
        ])
    }

    async preloading() {
        this.done = false;
        this.nRoot.classList.remove('smooth-hide');
        await Promise.race([
            this.playbackOverPromise(),
            this.timerIfNotLoadingImages()
        ])
            .then(() => {
                return delay(300);
            })
            .then(() => {
                if (!isDirectEnter()) {
                    emit('preloader:done', false, document);
                    return delay(0);
                }

                return delay(400);
            })
            .then(() => {
                if (isDirectEnter()) emit('preloader:done', false, document);
                return this.hide();
            });
    }

    hide() {
        this.done = true;
        nGetBody().classList.remove('preloading');
        nGetBody().style.removeProperty('height');
        this.nRoot.classList.add('smooth-hide');
        if (!Barba.HistoryManager.prevStatus()) document.body.classList.add('preload-done');
        emit('preloader:hide');
    }

    destroy() {

    }
}

export default Preloader;
