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
        if(quantity>0){
            displayButtonDetails(value, quantity);
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
        if(selectedColor!=null){
            $("#myModal").modal('show');
            $('#quantity').text('0');
        }
    });
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
    if(parseInt(quantity.innerHTML)>0 && selectedColor!=null){
        let selectedColorLabel=document.getElementById("selectedColorLabel").innerHTML;
        quantities.set(selectedColorLabel,parseInt(quantity.innerHTML));
        let savedQuantity=getQuantity(selectedColorLabel);
        if(savedQuantity>0 && selectedColorLabel!=null){
            let x=colorsObjects.get(selectedColorLabel);
            if(x!=undefined){
                displayColors(x,savedQuantity);
            }
        }
    }
})

var getQuantity=(colorLabel)=>{
    let quantity=quantities.get(colorLabel);
    if(quantity!=undefined)
        return quantity;
    return 0;
}

var displayColors=(color,quantity)=>{
    console.log(quantity);
    let colorDetails=document.getElementById('buttonDetails');
    while(colorDetails.firstChild){
        colorDetails.removeChild(colorDetails.firstChild);
    }
    if(quantity>0){
        let colorDetail = document.createElement("button");
        colorDetail.className = `button1`;
        colorDetail.style.backgroundColor = `${color}`;
        for(let i=0; i<quantity; i++){
            colorDetails.appendChild(colorDetail);
        }
    }
}