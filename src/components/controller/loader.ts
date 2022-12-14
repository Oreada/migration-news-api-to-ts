import { LoaderInterface, loaderOptions, Options, partsUrlForFetch, callback } from '../../../src/types/types';

class Loader implements LoaderInterface {
    baseLink: string; // 'https://newsapi.org/v2/' - в AppLoader'e
    options: loaderOptions; // {apiKey: '738879d919fa4fac96337701bee3640e'} - в AppLoader'e

    constructor(baseLink: string, options: loaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResponse<T>(
        { endpoint, options = {} }: partsUrlForFetch,
        callback: callback<T> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Options, endpoint: string): string {
        const urlOptions: { [index: string]: string } = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method: string, endpoint: string, callback: callback<T>, options: Options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
