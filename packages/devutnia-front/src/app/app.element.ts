import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'devutnia-front';
    this.innerHTML = `This is Devutnia's front`;
  }
}
customElements.define('app-root', AppElement);
