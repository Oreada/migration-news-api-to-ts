import './sources.css';
import { SourcesInterface, Source } from '../../../../src/types/types';

class Sources implements SourcesInterface {
    draw(data: Array<Source>): void {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;
        const activeLetter = document.querySelector('.alphabet__letter.active') as HTMLElement;

        data.forEach((item: Source): void => {
            if (activeLetter.textContent !== null) {
                const letter: string = activeLetter.textContent;
                if (item.name[0] === letter) {
                    const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

                    (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
                    (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

                    fragment.append(sourceClone);
                }
            } else {
                throw new Error('There is no content in this element');
            }
        });

        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}

export default Sources;
