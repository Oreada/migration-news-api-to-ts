import App from '../../../components/app/app';
import { AlphabetInterface } from '../../../types/types';

class Alphabet implements AlphabetInterface {
    filtrateSources(): void {
        const allAlphabetLetters = document.querySelectorAll('.alphabet__letter') as NodeListOf<HTMLElement>;
        allAlphabetLetters.forEach((btn) => {
            btn.addEventListener('click', chooseSource);
            function chooseSource(e: Event) {
                const activeLetter = document.querySelector('.alphabet__letter.active') as HTMLElement;
                if (activeLetter !== null) {
                    activeLetter.classList.remove('active');
                }
                const target = e.target as HTMLElement;
                if (target.classList.contains('alphabet__letter')) {
                    target.classList.add('active');
                    //! удаляем имеющиеся кнопки и заново запускаем start() с новым active-элементом (активной буквой алфавита)
                    const sources = document.querySelector('.sources') as HTMLElement;
                    sources.innerHTML = '';
                    const app = new App();
                    app.start();
                }
            }
        });
    }
}

export default Alphabet;
