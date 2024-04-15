interface StopwatchDom {
  currentTime: HTMLDivElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  resetBtn: HTMLButtonElement;
  [x: string]: HTMLElement
}


abstract class Stopwatch {

  protected currentTime: number = 0;
  private timer: NodeJS.Timeout | null = null;
  protected dom = <StopwatchDom>{};

  constructor(element: HTMLDivElement) {
    this.getElements(element)
    this.initActions()
    this.renderTime()
  }

  protected getElements(element: HTMLDivElement): void {
    this.dom.currentTime = <HTMLDivElement>element.querySelector('.stopwatch__current-time');
    this.dom.startBtn = <HTMLButtonElement>element.querySelector('.stopwatch__start-btn');
    this.dom.stopBtn = <HTMLButtonElement>element.querySelector('.stopwatch__stop-btn');
    this.dom.resetBtn = <HTMLButtonElement>element.querySelector('.stopwatch__reset-btn');
    /*
    Funkcja ta powinna przyjąć jako argument referencję do elementu DOM, w którym znajduje się
    cała struktura stopera. Następnie powinna przygotować referencję do obecnych w tym elemencie dzieci.
    
    Konkretnie do: 
    – stopwatch__current-time, 
    – wszystkich buttonów stopwatch__actions

    Wszystkie referencje dla czytelności przechowuj w obiekcie this.dom.
    */
  }

  private initActions(): void {
    this.dom.startBtn.addEventListener('click', () => this.start());
    this.dom.stopBtn.addEventListener('click', () => this.stop());
    this.dom.resetBtn.addEventListener('click', () => this.reset());
    /*
    Funkcja ta powinna nadać buttonom z buttonów stopwatch__actions odpowiednie nasłuchiwacze na event click. 
    Kliknięcie na każdy z buttonów powinno uruchamiać odpowiednie funkcje.

    Start -> start()
    Stop -> stop()
    Reset -> reset()

    Aby dostać się do tych elementów, wykorzystaj referencję przygotowane wcześniej w funkcji this.getElements.
    */
  }

  protected formatTime(time: number): string {
    const pad0 = (num: number): string => (
      num < 10 ? `0${num}` : num.toString()
    );


    const mm = Math.floor(time / 60000);
    const ss = Math.floor((time - mm * 60000) / 1000);
    const ms = time - mm * 60000 - ss * 1000;
    return `${pad0(mm)}:${pad0(ss)}:${pad0(ms).substr(0, 2)}`;
    /*
    Funkcja ta powinna przyjmować czas w milisekundach a następnie zwracać go w formacie mm:ss:ms (np. 02:23:12).
    */
  }

  protected renderTime(): void {
    this.dom.currentTime.innerHTML = this.formatTime(this.currentTime);

    /*
    Funkcja ta powinna renderować w stopwatch__current-time zawartość obiektu this.currentTime.
    Oczywiście wcześniej należy sformatować czas przy użyciu funkcji this.formatTime. 
    */
  }

  protected start(): void {

    this.timer = setInterval(() => {
      this.step();
    }, 1);

    /*
    Funkcja ta powinna wystartować interwał, który będzie wykonywał się co milisekundę.
    Powinien on każdorazowo włączać funkcję this.step
 
    Dla wygody przypisz ten interwał do this.timer
    */
  }

  protected step(): void {
    this.currentTime++; // Zwiększa liczbę sekund o jeden
    this.renderTime()
    /*
    Funkcja ta powinna zwiększać liczbę sekund w this.currentTime o jeden, a następnie uruchamiać metodę
    renderującą aktualny czas w HTML-u (this.renderTime).
    */
  }

  protected stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
    /* 
    Funkcja ta powinna zatrzymywać interval przypisany do this.timer.
    */
  }

  protected reset(): void {
    this.currentTime = 0;
    this.renderTime();
    /*
    Ta funkcja powinna resetować czas zapisany w this.currentTime, a więć zmieniać jego wartość na zero.
    Naturalnie powinno to wiązać się również z przerenderowaniem HTML-a (this.renderTime).
    */
  }

}

export default Stopwatch