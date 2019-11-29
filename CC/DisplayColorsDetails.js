class DisplayColorsDetails{
    constructor(){
        
    }

    static displayColorsDetails(colorCode,quantity){
        let colorDetails=document.getElementById('buttonDetails');
        DisplayColorsDetails.removeChildren(colorDetails);
        if(quantity>0){
            for(let i=0; i<quantity; i++){
                let colorDetail = document.createElement("button");
                colorDetail.className = `button1`;
                colorDetail.style.backgroundColor = `${colorCode}`;
                colorDetail.style.padding="0.1875em";
                colorDetails.appendChild(colorDetail);
            }
        }
    }
    static removeChildren(parent){/**clear content */
        while(parent.childElementCount>0){
            parent.removeChild(parent.lastElementChild);    
        }   
    }
    static displayQuantity(quantity){/**display quantity */
        let quantityLabel=document.getElementById('quantity1');
        this.removeChildren(quantityLabel);
        let q=document.createElement('span')
        q.className="shape bold-4 circle-3 black-border";
        q.innerHTML=quantity;
        quantityLabel.appendChild(q);
    }
    static displayPrice(price){
        let colorDetails=document.getElementById('price');
        colorDetails.innerHTML=`$${price}`;
    }
}