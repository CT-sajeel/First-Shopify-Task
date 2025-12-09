class clipboard extends HTMLElement{
    constructor(){
        super();
      this.button = this.querySelector('button');
      const url = this.dataset.url;
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
customElements.define('clipboard', clipboard);