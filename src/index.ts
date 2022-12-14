import App from './components/app/app';
import './global.css';
import Alphabet from './components/view/sources/alphabet';

const app = new App();
app.start();

const example = new Alphabet();
example.filtrateSources();
