import Component from '../../common/js/component';


class Header extends Component {
    constructor(nRoot) {
        super(nRoot, 'header');

        /* === Необходимые переменные === */
        let windowHeight = document.documentElement.clientHeight;
        const body = document.querySelector('body');
        const sandwichBtn = this.nFindSingle('sandwich');
        const arrowBtn = this.nFindSingle('arrow');

        /* === Атрибуты барба-контейнера === */
        this.nNamespace = document.querySelector('.barba-container').getAttribute('data-namespace');
        this.nContrast = document.querySelector('.barba-container').getAttribute('data-contrast');

        this.update = this.update.bind(this);
        this.update();

        /* === Клик по кнопке-сендвичу === */
        sandwichBtn.addEventListener('click', () => {
            body.classList.toggle('sandwich-open');
        });

        /* === Клик по кнопке скролла === */
        arrowBtn.addEventListener('click', () => {
            if (this.nRoot.classList.contains('arrow-down')) {
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
            const footer = document.querySelector('.footer');

            /* === Стандартное поведение скролла === */
            if (window.pageYOffset <= 0) {
                this.nRoot.classList.add('header-top');
            } else {
                this.nRoot.classList.remove('header-top');
            }

            /* === Поведение стрелки для скролла === */
            if (window.pageYOffset < windowHeight - 1) {
                this.nRoot.classList.remove('arrow-up');
                this.nRoot.classList.add('arrow-down');
            } else if (footer.getBoundingClientRect().top <= windowHeight) {
                this.nRoot.classList.add('arrow-up');
                this.nRoot.classList.remove('arrow-down');
            } else {
                this.nRoot.classList.remove('arrow-up');
                this.nRoot.classList.remove('arrow-down');
            }

            /* === Поведение скролла на главной странице === */
            if (this.nNamespace === 'index') {
                const contacts = document.querySelector('.contacts');
                if (window.pageYOffset <= 0) {
                    this.nRoot.classList.add('big-logo');
                } else {
                    this.nRoot.classList.remove('big-logo');
                }

                if (window.pageYOffset < windowHeight - 1) {
                    this.nRoot.classList.add('contrast-logo');
                } else if (contacts.getBoundingClientRect().top <= 100) {
                    body.classList.add('contrast');
                    if (document.documentElement.clientWidth >= 1200) {
                        this.nRoot.classList.add('contrast-logo');
                    }
                } else {
                    this.nRoot.classList.remove('contrast-logo');
                    body.classList.remove('contrast');
                }
            }

            /* === Поведение скролла на страницах с data-contrast === */
            if (this.nContrast) {
                const pageLead = document.querySelector('.page-lead-1');
                if (window.pageYOffset < pageLead.scrollHeight - this.nRoot.scrollHeight * 0.5) {
                    this.nRoot.classList.add('contrast-logo');
                } else {
                    this.nRoot.classList.remove('contrast-logo');
                }
            }
        });
    }

    update() {
        // document.querySelector('body').classList.remove('sandwich-open');
        /* === Обнуление классов для шапки === */
        this.nRoot.classList.remove('big-logo');
        this.nRoot.classList.remove('contrast-logo');
        this.nRoot.classList.remove('index-header');

        /* === Добавление уникальных классов для шапки на главной странице  === */
        this.nNamespace = document.querySelector('.barba-container').getAttribute('data-namespace');
        if (this.nNamespace === 'index') {
            this.nRoot.classList.add('big-logo');
            this.nRoot.classList.add('contrast-logo');
            this.nRoot.classList.add('index-header');
        }

        /* === Добавление уникальных классов для шапки на страницах с контрастом  === */
        this.nContrast = document.querySelector('.barba-container').getAttribute('data-contrast');
        if (this.nContrast) {
            this.nRoot.classList.add('contrast-logo');
        }

        // this.nNamespace = document.querySelector('.barba-container').getAttribute('data-namespace');
        // switch (this.nNamespace) {
        // case 'index':
        //     this.nRoot.classList.add('index-header');
        //     this.nRoot.classList.add('big-logo');
        //     this.nRoot.classList.add('contrast-logo');
        //     break;
        // case 'project-3':
        //     this.nRoot.classList.add('contrast-logo');
        //     break;
        // default:
        //     this.nRoot.classList.remove('big-logo');
        //     this.nRoot.classList.remove('contrast-logo');
        // }
    }

    destroy() {

    }
}

export default Header;
