/* pre-load animation*/
$(window).load(function() {
    $(".se-pre-con").fadeOut("slow");
  });
/* colors: {key:value}={color name: color code}*/
var colorsObjects = new Map();
colorsObjects.set("blood", "red");
colorsObjects.set("grass", "green");
colorsObjects.set("blueink", "blue");
colorsObjects.set("girlish", "pink");
colorsObjects.set("wealth", "yellow");
colorsObjects.set("sad", "indigo");
colorsObjects.set("transition", "purple");
colorsObjects.set("batman", "black");
colorsObjects.set("sky", "lightblue");
colorsObjects.set("shady of grey", "steelblue");
colorsObjects.set("chocolate", "brown");
colorsObjects.set("green milk", "lightgreen");

/* selected color quantity: {key:value}={color name: quantity}*/
var quantities=new Map();

/** colors will be displayed on 6th row */
var row6 = document.getElementById("colorButtons");

/** initially user not selected color */
var selectedColor=null;

/** displays colors to 6th row*/
colorsObjects.forEach((value, key, map) => {
    /**create colors and bind listner to them */
    let button = document.createElement("button");
    button.className = `button1`;
    button.style.backgroundColor = `${value}`;
    quantities.set(key,0);
    /**display circle bother on click */
    button.addEventListener("click",ev => {
        if(selectedColor==null){
            selectedColor=ev.target;
            selectedColor.parentNode.style.border=`0.2em solid ${value}`; 
        }
        else{
            selectedColor.parentNode.style.border="none";
            selectedColor=ev.target;
            selectedColor.parentNode.style.border=`0.2em solid ${value}`; 
        }
        let selectedColorLabel=document.getElementById('selectedColorLabel');
        selectedColorLabel.innerHTML=`${key}`;
    });
    /**check modal trigger button to checkout/add to cart */
    button.addEventListener('click',ev=>{
        let quantity=getQuantity(key);
        displayColorsDetails(value, quantity);
        displayQuantity(quantity);
        if(quantity>0){
            document.getElementById('cartButton').innerHTML="Checkout Now";
        }
        else{
            document.getElementById('cartButton').innerHTML="Add to Cart";
        }

    })
    /** styling colors */
    button.addEventListener("mouseover",ev=>{
        ev.target.style.boxShadow=`0 0 0 0.5em ${value}`;
    });
    button.addEventListener("mouseleave",ev=>{
        ev.target.style.boxShadow="none";
    });
    let circleBorder = document.createElement("div");
    circleBorder.className = "circle-border";
    circleBorder.appendChild(button);
    row6.appendChild(circleBorder);
})
/** modal trigger label may change dynamically */
document.getElementById('cartButton').innerHTML="Add to Cart";

/** manipulate modals */
$(document).ready(function(){
    $("#cartButton").click(function(){
        if(selectedColor!=null && $('#cartButton').text()!=="Checkout Now"){
            let selectedColorLabel=$("#selectedColorLabel").text();
            let q=getQuantity(selectedColorLabel);
            $('#quantity').text(q);
            $('#selectedColrLabel-modal').text(selectedColorLabel);
            $("#myModal").modal('show');
        }
        else if($('#cartButton').text()=="Checkout Now"){
            $("#myModal").modal('hide');
            emptyCart();
            displayColorsDetails('',0);
            displayQuantity(0);
            $('#cartButton').text("Add to Cart");
        }
    })
  });

/** increase/decrease buttons*/
var minusButton=document.getElementById("minus");
minusButton.addEventListener("click",ev=>{
    let quantity=document.getElementById('quantity');
    if(quantity.innerHTML>0){
        let quantity=document.getElementById('quantity');
        quantity.innerHTML=parseInt(quantity.innerHTML)-1;       
    }
})
var plusButton=document.getElementById("plus");
plusButton.addEventListener("click",ev=>{
    let quantity=document.getElementById('quantity');
    quantity.innerHTML=parseInt(quantity.innerHTML)+1;
})

/**agree cancel buttons */
var agreeButton=document.getElementById('agreeButton');
agreeButton.addEventListener('click',ev=>{
    let quantity=document.getElementById('quantity');
    if(selectedColor!=null){
        let selectedColorLabel=document.getElementById("selectedColorLabel").innerHTML;
        quantities.set(selectedColorLabel,parseInt(quantity.innerHTML));
        let savedQuantity=getQuantity(selectedColorLabel);
        if(selectedColorLabel!=null){
            let x=colorsObjects.get(selectedColorLabel);
            if(x!=undefined){
                displayColorsDetails(x,savedQuantity);
                displayQuantity(savedQuantity);
                if(savedQuantity>0){
                    document.getElementById('cartButton').innerHTML="Checkout Now";
                }
            }
        }
    }
})

/**clear content */
var removeChildren=(parent)=>{
    while(parent.childElementCount>0){
        parent.removeChild(parent.lastElementChild);    
    }   
}
/** color quantity*/
var getQuantity=(colorLabel)=>{
    let quantity=quantities.get(colorLabel);
    if(quantity!=undefined)
        return quantity;
    return 0;
}
/**dipslay rows of colors*/
var displayColorsDetails=(color,quantity)=>{
    let colorDetails=document.getElementById('buttonDetails');
    removeChildren(colorDetails);
    if(quantity>0){
        for(let i=0; i<quantity; i++){
            let colorDetail = document.createElement("button");
            colorDetail.className = `button1`;
            colorDetail.style.backgroundColor = `${color}`;
            colorDetail.style.padding="0.1875em";
            colorDetails.appendChild(colorDetail);
        }
    }
}

/**display cquantity */
var displayQuantity=(quantity)=>{
    let quantityLabel=document.getElementById('quantity1');
    removeChildren(quantityLabel);
    let q=document.createElement('span')
    q.className="shape bold-4 circle-3 black-border";
    q.innerHTML=quantity;
    quantityLabel.appendChild(q);
}
/** reset cart on checkout */
var emptyCart=()=>{
    quantities.forEach((v,k,m)=>{
        m.set(k,0);
    })
}
/**initial quantity */
displayQuantity(0);
