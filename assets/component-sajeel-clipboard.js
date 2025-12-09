class Clipboard extends HTMLElement{
    constructor(){
        super();
      this.button = this.querySelector('button');
      console.log("this.button" + this.button)
      const url = this.dataset.url;
      console.log("this.url" + url);
      this.a = this.button.textContent;
      
      console.log("this.innertext" + this.a );
      this.originalText = this.button.textContent; 
      console.log("this.url" + this.originalText)
     

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
customElements.define('copy-url-button', Clipboard);