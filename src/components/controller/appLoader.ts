import Loader from './loader';
import { API_KEY } from '../../constants/constants';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: API_KEY, // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
