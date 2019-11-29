  /**colored circles */
  class ColoredCircle{
    constructor(colorName, colorCode,price, selectedquantity){
        this.colorName=colorName;
        this.colorCode=colorCode;
        this.price=price;
        this.selectedquantity=selectedquantity;
        this.button;
    }
    setQuantity(quantity){
        this.selectedquantity=quantity;
    }

    toButton(){/** creates a button correponding to the colored circle */
        this.button=document.createElement('button');
        this.button.className='button1';
        this.button.style.backgroundColor=`${this.colorCode}`;
        this.addEventListners();
    }
    addEventListners(){/**add different types of event listeners to button */
        this.button.addEventListener('click',ev=>{     /**display circle bother on click */
            if(selectedColor==null){
                selectedColor=ev.target;
                selectedColor.parentNode.style.border=`0.2em solid ${this.colorCode}`;
            }
            else{
                selectedColor.parentNode.style.border="none";
                selectedColor=ev.target;
                selectedColor.parentNode.style.border=`0.2em solid ${this.colorCode}`;
            }
            document.body.style.backgroundImage=`radial-gradient(circle farthest-corner at -8.9% 51.2%, ${this.colorCode} 0%, ${this.colorCode} 15.9%, ${this.colorCode} 15.9%, ${this.colorCode} 24.4%, rgba(19, 30, 37, 1) 24.5%, rgba(19, 30, 37, 1) 66%)`;
            let selectedColorLabel=document.getElementById('selectedColorLabel');
            selectedColorLabel.innerHTML=`${this.colorName}`;
        })
        this.button.addEventListener('click',ev=>{ /**change modal trigger button to <checkout>/<add to cart> AND quantity, when user clicks a color*/
            DisplayColorsDetails.displayColorsDetails(this.colorCode, this.selectedquantity);
            DisplayColorsDetails.displayQuantity(this.selectedquantity);
            DisplayColorsDetails.displayPrice(this.price);
            if(this.selectedquantity>0){
                document.getElementById('cartButton').innerHTML="Checkout Now";
            }
            else{
                document.getElementById('cartButton').innerHTML="Add to Cart";
            }
        })
                
        this.button.addEventListener("mouseover",ev=>{ /** styling colors */
            ev.target.style.boxShadow=`0 0 0 0.5em ${this.colorCode}`;
        });
        this.button.addEventListener("mouseleave",ev=>{ /** styling colors */
            ev.target.style.boxShadow="none";
        });        
    }  
    toBorderedButton(){
        let circleBorder = document.createElement("div");
        circleBorder.className = "circle-border";
        circleBorder.appendChild(this.button);
        return circleBorder;
    }
    render(){/** renders a single color circle on the screen */
        this.toButton();
        let button=this.toBorderedButton();
        row6.appendChild(button);
    }    
}