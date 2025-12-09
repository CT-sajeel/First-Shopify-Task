class Clipboard extends HTMLElement{
    constructor(){
        super();
      this.button = this.querySelector('button');
      const url = this.dataset.url;
      this.innertext = this.button.innerHTML;
      this.button.innertext = "123"
    }
    getCopy(url){
         navigator.clipboard.writeText(url)
         .then( ()=>{
            setTimeout(() => {
               this.button.textContent = 'Copied!';
            }, 2000);
        })

    }

}
customElements.define('clipboard', Clipboard);