import Component from '../../common/js/component';

class Header extends Component {
    constructor(nRoot) {
        super(nRoot, 'header');

        const windowHeight = document.documentElement.clientHeight;
        const body = document.querySelector('body');
        const barbaContainer = document.querySelector('.barba-container');
        const header = document.querySelector('.header');
        const sandwichBtn = document.querySelector('.sandwich');
        const arrowBtn = document.querySelector('.menu__arrow');

        /* === Входные значения шапки для страницы 'index' === */
        /* === Может это и не надо, я хз === */

        if (barbaContainer.getAttribute('data-namespace') === 'index') {
            header.classList.add('header--big-logo');
            header.classList.add('header--contrast');
        }

        /* === Клик по кнопке-сендвичу === */

        sandwichBtn.addEventListener('click', () => {
            header.classList.toggle('side-menu--open');
            body.classList.toggle('no-scroll');
        });

        /* === Клик по кнопке скролла === */

        arrowBtn.addEventListener('click', () => {
            if (header.classList.contains('arrow-down')) {
                window.scrollTo({
                    top: windowHeight,
                    behavior: 'smooth',
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        });

        /* === Изменения шапки при скролле === */

        window.addEventListener('scroll', () => {
            /* === Появление навигации и изменение логотипа в начале документа === */
            if (window.pageYOffset <= 0 && !header.classList.contains('header--top')) {
                header.classList.toggle('header--top');
                if (barbaContainer.getAttribute('data-namespace') === 'index' && !header.classList.contains('header--big-logo')) {
                    header.classList.toggle('header--big-logo');
                }
            } else if (window.pageYOffset > 0 && header.classList.contains('header--top')) {
                header.classList.toggle('header--top');
                if (barbaContainer.getAttribute('data-namespace') === 'index' && header.classList.contains('header--big-logo')) {
                    header.classList.toggle('header--big-logo');
                }
            }

            /* === Появление кнопки скролла только на первом и последнем 'экране' документа === */
            if (window.pageYOffset < windowHeight || window.pageYOffset >= document.body.scrollHeight - windowHeight * 1.2) {
                if (window.pageYOffset < windowHeight) {
                    header.classList.remove('arrow-up');
                    header.classList.add('arrow-down');
                }
                if (window.pageYOffset >= document.body.scrollHeight - windowHeight * 1.2) {
                    header.classList.add('arrow-up');
                    header.classList.remove('arrow-down');
                }
                /* === Изменение логотипа, чтобы он не сливался с фоном на первом и последнем 'экране' документа === */
                if (barbaContainer.getAttribute('data-namespace') === 'index') {
                    header.classList.add('header--contrast');
                }
            } else {
                header.classList.remove('arrow-up');
                header.classList.remove('arrow-down');
                header.classList.remove('header--contrast');
            }
        });
    }

    destroy() {

    }
}

export default Header;
