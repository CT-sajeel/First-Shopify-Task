class Clipboard extends HTMLElement{

constructor(){
    super();
    this.button = this.querySelector('button');
    this.url = this.dataset.url;
    this.orginalText = this.button.textContent;

    this.button.addEventListener('click', ()=>{
        console.log("clicked");
        this.clipboard(this.url);
    })

}

 clipboard(url){
    navigator.clipboard.writeText(url).then(()=>{
        this.button.textContent = "Copied";
        setTimeout(() => {
            this.button.textContent = "Copy";
        }, 2000);
    }).catch((e)=>{
        console.log("This is error" + e);
        setTimeout(() => {
            this.button.textContent = "Copy"
        }, 2000);
    })
 }

}
customElements.define('copy-url-button',Clipboard);