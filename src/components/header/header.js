import Component from '../../common/js/component';

class Header extends Component {
    constructor(nRoot) {
        super(nRoot, 'header');

        // const headerNav = document.querySelector('.header__nav-container');
        // const windowHeight = document.documentElement.clientHeight;
        const body = document.querySelector('body');
        const barbaContainer = document.querySelector('.barba-container');
        const header = document.querySelector('.header');
        const sandwichBtn = document.querySelector('.sandwich');

        if (barbaContainer.getAttribute('data-namespace') === 'index') {
            header.classList.add('header--big-logo');
        }

        sandwichBtn.addEventListener('click', () => {
            header.classList.toggle('side-menu--open');
            body.classList.toggle('no-scroll');
        });

        window.addEventListener('scroll', () => {
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
        });
    }

    destroy() {

    }
}

export default Header;
