import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'devutnia-front';
    this.innerHTML = `This is Devutnia's front`;
  }
}
customElements.define('app-root', AppElement);

export type LocoPoints = Record<string, any>;
export type LocoMethod = 'get' | 'post' | 'put' | 'delete';
export type LocoUri<Points extends LocoPoints> = `${LocoMethod}:${keyof Points}`;

export class LocoLoader<Points extends LocoPoints = LocoPoints> {
  private req = new XMLHttpRequest();

  load<T>(uri: LocoUri<Points>, loader?: () => void) {
    this.req.open(uri.split(':')[0], uri.split(':')[1]);

    this.req.addEventListener('load', (e) => {
      //
    });

    return { query: '', convey: () => new Promise<T>((resolve, reject) => {}) };
  }
}

const space = new LocoLoader<{ dupa: string }>();
const point = space.load('get:dupa');
point.convey().then();
// point.query
