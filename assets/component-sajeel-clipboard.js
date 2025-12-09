class Clipboard extends HTMLElement{
    constructor(){
        super();
      this.url = this.dataset.url;
      console.log("url" + this.url);

      this.button = this.querySelector('button');
      this.text = this.button.textContent;

      this.button.addEventListener('click', ()=>{

        console.log('I am clicked');
        this.getCopy(this.url);
      })
     

    }
    getCopy(){
         navigator.clipboard.writeText(url)
         .then( ()=>{
              this.button.textContent = 'Copied !';
            setTimeout(() => {
               this.button.textContent = 'Copy';
            }, 2000);
        })

    }

}
customElements.define('copy-url-button', Clipboard);