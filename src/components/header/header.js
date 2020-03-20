import Component from '../../common/js/component';

class Header extends Component {
    constructor(nRoot) {
        super(nRoot, 'header');


        /* === TODO поиск компонентов через nRoot === */
        let windowHeight = document.documentElement.clientHeight;
        const body = document.querySelector('body');
        const barbaContainer = document.querySelector('.barba-container');
        const header = document.querySelector('.header');
        const sandwichBtn = document.querySelector('.header__sandwich');
        const arrowBtn = document.querySelector('.header__arrow');

        /* === Входные значения шапки для страницы 'index' === */
        /* === TODO должно вызываться при загрузке страницы в barba === */

        if (barbaContainer.getAttribute('data-namespace') === 'index') {
            header.classList.add('big-logo');
            header.classList.add('contrast-logo');
        }

        /* === Клик по кнопке-сендвичу === */

        sandwichBtn.addEventListener('click', () => {
            body.classList.toggle('sandwich-open');
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
            windowHeight = document.documentElement.clientHeight;
            /* === Появление навигации и изменение логотипа в начале документа === */
            if (window.pageYOffset <= 0 && !header.classList.contains('header-top')) {
                header.classList.toggle('header-top');
                if (barbaContainer.getAttribute('data-namespace') === 'index' && !header.classList.contains('big-logo')) {
                    header.classList.toggle('big-logo');
                }
            } else if (window.pageYOffset > 0 && header.classList.contains('header-top')) {
                header.classList.toggle('header-top');
                if (barbaContainer.getAttribute('data-namespace') === 'index' && header.classList.contains('big-logo')) {
                    header.classList.toggle('big-logo');
                }
            }

            /* === Появление кнопки скролла только на первом и последнем 'экране' документа === */
            if (window.pageYOffset < windowHeight - 1 || window.pageYOffset >= document.body.scrollHeight - windowHeight * 1.1) {
                if (window.pageYOffset < windowHeight - 1) {
                    header.classList.remove('arrow-up');
                    header.classList.add('arrow-down');
                }
                if (window.pageYOffset >= document.body.scrollHeight - windowHeight * 1.1) {
                    header.classList.add('arrow-up');
                    header.classList.remove('arrow-down');
                    if (barbaContainer.getAttribute('data-namespace') === 'index') {
                        body.classList.add('contrast');
                    }
                }
                /* === Изменение логотипа, чтобы он не сливался с фоном на первом и последнем 'экране' документа === */
                if (barbaContainer.getAttribute('data-namespace') === 'index') {
                    header.classList.add('contrast-logo');
                }
            } else {
                header.classList.remove('arrow-up');
                header.classList.remove('arrow-down');
                header.classList.remove('contrast-logo');
                body.classList.remove('contrast');
            }
        });
    }

    destroy() {

    }
}

export default Header;
