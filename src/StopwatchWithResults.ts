import Stopwatch from './Stopwatch.js';

interface StopwatchDom {
  currentTime: HTMLDivElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  [x: string]: HTMLElement;
}

interface StopwatchWithResultsDom extends StopwatchDom {
  resultsList: HTMLUListElement;
  addToListBtn: HTMLButtonElement;
  resetListBtn: HTMLButtonElement;
}

class StopwatchWithResults extends Stopwatch {
   private results: string[] = [];

    constructor(element: HTMLDivElement) {
        super(element);
        this.prepareElements(element);
        this.prepareActions();
    }

    protected dom = <StopwatchWithResultsDom>  {
        ...this.dom,
        resultsList: null!,
        addToListBtn: null!,
        resetListBtn: null!
    };

    protected prepareElements(element: HTMLDivElement): void {
        super.getElements(element);
        this.dom.resultsList = element.querySelector('.stopwatch__results')!;
        this.dom.addToListBtn = element.querySelector('.stopwatch__add-to-list-btn')!;
        this.dom.resetListBtn = element.querySelector('.stopwatch__reset-list-btn')!;
    }

    protected prepareActions(): void {
        this.dom.addToListBtn.addEventListener('click', () => this.addToList());
        this.dom.resetListBtn.addEventListener('click', () => this.resetList());
    }

    protected renderList(): void {
        this.dom.resultsList.innerHTML = '';
        this.results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result;
            this.dom.resultsList.appendChild(li);
        });
    }

    protected addToList(): void {
        const formattedTime = this.formatTime(this.currentTime);
        this.results.push(formattedTime);
        this.renderList();
    }

    protected resetList(): void {
        this.results = [];
        this.renderList();
    }
}

export default StopwatchWithResults;