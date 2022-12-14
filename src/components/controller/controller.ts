import AppLoader from './appLoader';
import { AppControllerInterface, callback } from '../../../src/types/types';

enum Endpoints {
    sources = 'sources',
    everything = 'everything',
}

class AppController<T> extends AppLoader implements AppControllerInterface<T> {
    getSources<T>(callback: callback<T>): void {
        super.getResponse(
            {
                endpoint: Endpoints.sources,
            },
            callback
        );
    }

    getNews<T>(e: Event, callback: callback<T>): void {
        const activeSource = document.querySelector('.source__item.activeSource') as HTMLElement;
        if (activeSource !== null) {
            activeSource.classList.remove('activeSource');
        }

        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                target.classList.add('activeSource');
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId === null) {
                    throw new Error('Source not found');
                }
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResponse(
                        {
                            endpoint: Endpoints.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
