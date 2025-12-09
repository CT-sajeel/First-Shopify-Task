class clipboard extends HTMLElement{
    constructor(){
        super();
      this.button = this.querySelector('button');
    }


}
customElements.define('clipboard', clipboard);