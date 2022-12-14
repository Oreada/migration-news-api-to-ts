import News from './news/news';
import Sources from './sources/sources';
import {
    AppViewInterface,
    NewsInterface,
    SourcesInterface,
    ResponseNews,
    ResponseSource,
    Article,
    Source,
} from '../../../src/types/types';

export class AppView implements AppViewInterface {
    news: NewsInterface;
    sources: SourcesInterface;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ResponseNews): void {
        const values: Array<Article> = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ResponseSource): void {
        const values: Array<Source> = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
