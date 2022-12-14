//--------------- данные с api --------------------------

export interface ResponseNews {
    status: string;
    totalResults: number;
    articles: Array<Article>; // массив из 100 объектов-новостей
}

export interface Article {
    source: ArticleSource;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface ArticleSource {
    id: 'string' | null; // иногда null
    name: 'string';
}

export interface ResponseSource {
    status: 'string';
    sources: Array<Source>; // массив из 128 объектов-кнопок
}

export interface Source {
    id: 'string';
    name: 'string';
    description: 'string';
    url: 'string';
    category: 'string';
    language: 'string';
    country: 'string';
}

//----------------- news.js ------------------------------

export interface NewsInterface {
    draw(data: Array<Article>): void;
}

//----------------- sources.js ------------------------------

export interface SourcesInterface {
    draw(data: Array<Source>): void;
}

//----------------- appView.js ------------------------------

export interface AppViewInterface {
    news: NewsInterface;
    sources: SourcesInterface;
    drawNews(data: ResponseNews): void;
    drawSources(data: ResponseSource): void;
}

//----------------- controller.js ------------------------------

export type callback<T> = (data: T) => void;

export interface AppControllerInterface<T> {
    getNews(e: Event, callback: callback<T>): void;
    getSources(callback: callback<T>): void;
}

//----------------- loader.js ------------------------------

export type loaderOptions = {
    apiKey: string;
};

export type Options = Record<string, unknown>;

export type partsUrlForFetch = {
    endpoint: string;
    options?: Options; // может быть {sources: sourceId} - в getNews, а может быть {} - в getSources
};

export interface LoaderInterface {
    baseLink: string; // 'https://newsapi.org/v2/' - в AppLoader
    options: loaderOptions;
    getResponse<T>(object: partsUrlForFetch, callback: callback<T>): void;
    errorHandler(res: Response): Response;
    makeUrl(options: Options, endpoint: string): string;
    load<T>(method: string, endpoint: string, callback: callback<T>, options: Options): void;
}

//----------------- app.js ------------------------------

export interface AppInterface<T> {
    controller: AppControllerInterface<T>;
    view: AppViewInterface;
    start(): void;
}

//----------------- alphabet.js ------------------------------

export interface AlphabetInterface {
    filtrateSources(): void;
}
