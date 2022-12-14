import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import {
    AppInterface,
    AppControllerInterface,
    AppViewInterface,
    ResponseNews,
    ResponseSource,
} from '../../../src/types/types';

class App<T> implements AppInterface<T> {
    controller: AppControllerInterface<T>;
    view: AppViewInterface;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e) =>
            this.controller.getNews(e, (data) => this.view.drawNews((data as unknown) as ResponseNews))
        );
        this.controller.getSources((data) => this.view.drawSources((data as unknown) as ResponseSource));
    }
}

export default App;
