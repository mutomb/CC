$(window).load(function() {
    $(".se-pre-con").fadeOut("slow");;
});
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
var quantities=new Map();
var row6 = document.getElementById("colorButtons");
var selectedColor=null;
document.getElementById('cartButton').innerHTML="Add to Cart";
colorsObjects.forEach((value, key, map) => {
    let button = document.createElement("button");
    button.className = `button1`;
    button.style.backgroundColor = `${value}`;
    quantities.set(key,0);
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

    button.addEventListener("mouseovif(quantities>)er",ev=>{
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
var removeChildren=(parent)=>{
    while(parent.childElementCount>0){
        parent.removeChild(parent.lastElementChild);    
    }   
}

var getQuantity=(colorLabel)=>{
    let quantity=quantities.get(colorLabel);
    if(quantity!=undefined)
        return quantity;
    return 0;
}

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
var displayQuantity=(quantity)=>{
    let quantityLabel=document.getElementById('quantity1');
    removeChildren(quantityLabel);
    let q=document.createElement('span')
    q.className="shape bold-4 circle-3 black-border";
    q.innerHTML=quantity;
    quantityLabel.appendChild(q);
}

var emptyCart=()=>{
    quantities.forEach((v,k,m)=>{
        m.set(k,0);
    })
}
displayQuantity(0);
