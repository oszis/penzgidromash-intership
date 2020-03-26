import { commonComponents } from './commonComponents';
/* === wtf fix === */
import '../../vendor/split-text/js/vendor/TweenMax.min';

const defaultTransition = (transition) => {
    /* === wtf fix === */
    document.querySelector('body').classList.remove('sandwich-open');
    // if (nGetBody()
    //     .classList
    //     .contains('sandwich-open')) {
    //     commonComponents.sandwichMenu.sandwichMenuClose.close(false);
    // }
    // commonComponents.header.addContrastClass();

    commonComponents.lazyLoad.update();
    // loadImages();
    new TimelineLite()
        .to(
            transition.oldContainer,
            0.5,
            {
                autoAlpha: 0,
                onComplete: () => {
                    commonComponents.callbacks.call('beforeOldContainerRemove');
                    transition.done.bind(transition)();
                },
            },
        )
        .fromTo(transition.newContainer, 0.5, { autoAlpha: 0 }, { autoAlpha: 1 });
};

const transitions = {};

const namespaceSubstitute = {};

export default (source, target) => (transitions[source] && transitions[source][target])
    || (transitions[source] && transitions[source][namespaceSubstitute[target]])
    || (transitions[namespaceSubstitute[source]] && transitions[namespaceSubstitute[source]][target])
    || (
        transitions[namespaceSubstitute[source]]
        && transitions[namespaceSubstitute[source]][namespaceSubstitute[target]])
    || defaultTransition;
