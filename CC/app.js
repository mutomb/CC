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
        document.body.style.backgroundImage=`radial-gradient(circle farthest-corner at -8.9% 51.2%, ${value} 0%, ${value} 15.9%, ${value} 15.9%, ${value} 24.4%, rgba(19, 30, 37, 1) 24.5%, rgba(19, 30, 37, 1) 66%)`
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

/** add to cart modal manipulation */
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
            addBalls(); /**balls simulations */
            displayColorsDetails('',0);
            displayQuantity(0);
            $('#cartButton').text("Add to Cart");
            addBallColor('');
            updateCartIcon();
            createAlert('Checkout','','You have checkout all you colors.','info',true,true,'pageMessages');
        }
        else{
            createAlert('Opps!','Pick color','First you must pick color','danger',true,true,'pageMessages');       
        }
    })

    $('#myModal').on('show.bs.modal', function (e) {
        $('#myModalDialog').attr('class', 'modal-dialog modal-dialog-centered modal-lg zoomIn animated');
    })
    $('#myModal').on('hide.bs.modal', function (e) {
        $('#myModalDialog').attr('class', 'modal-dialog modal-dialog-centered modal-lg zoomOut animated');
    })
    $('#myModal1').on('show.bs.modal', function (e) {
        $('#myModalDialog1').attr('class', 'modal-dialog modal-dialog-centered modal-lg zoomIn animated');
    })
    $('#myModal1').on('hide.bs.modal', function (e) {
        $('#myModalDialog1').attr('class', 'modal-dialog modal-dialog-centered modal-lg zoomOut animated');
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
                    addBalls();
                    updateCartIcon();
                    createAlert('','Nice Work!',`You have have just added  ${savedQuantity} ${selectedColorLabel} to your Colorcart.`,'success',true,true,'pageMessages');
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
        quantities.set(k,0);
    })
}
/**initial quantity */
displayQuantity(0);

/**add balls to animation */
var addBalls=()=>{
    colorsObjects.forEach((v,k,m)=>{
        if(quantities.get(k)>0){
            addBallColor(v);
        }
    })
}
/**update cart icon */
var updateCartIcon=()=>{
    let total=0;
    colorsObjects.forEach((v,k,m)=>{
            total+=quantities.get(k);
    })
    let cartIcon=document.getElementById('cartIcon');
    cartIcon.innerHTML=total;
}

/**create alert */
var createAlert=(title, summary, details, severity, dismissible, autoDismiss, appendToId)=> {
    var iconMap = {
      success: "fa fa-thumbs-up",
      danger: "fa ffa fa-exclamation-circle"
    };
  
    var iconAdded = false;
  
    var alertClasses = ["alert", "animated", "slideInRight"];
    alertClasses.push("alert-" + severity.toLowerCase());
  
    if (dismissible) {
      alertClasses.push("alert-dismissible");
    }
  
    var msgIcon = $("<i />", {
      "class": iconMap[severity] 
    });
  
    var msg = $("<div />", {
      "class": alertClasses.join(" ") 
    });
  
    if (title) {
      var msgTitle = $("<h4 />", {
        html: title
      }).appendTo(msg);
      
      if(!iconAdded){
        msgTitle.prepend(msgIcon);
        iconAdded = true;
      }
    }
  
    if (summary) {
      var msgSummary = $("<strong />", {
        html: summary
      }).appendTo(msg);
      
      if(!iconAdded){
        msgSummary.prepend(msgIcon);
        iconAdded = true;
      }
    }
  
    if (details) {
      var msgDetails = $("<p />", {
        html: details
      }).appendTo(msg);
      
      if(!iconAdded){
        msgDetails.prepend(msgIcon);
        iconAdded = true;
      }
    }

    if (dismissible) {
      var msgClose = $("<span />", {
        "class": "close",
        "data-dismiss": "alert",
        html: "<i class='fa fa-times-circle'></i>"
      }).appendTo(msg);
    }

    $('#' + appendToId).prepend(msg);
    $(document).ready(function(){
        if($(window).width()<578){
            $("#"+appendToId).css('width','100%');
        }
        else{
            $("#"+appendToId).css('width','40%');
        }
      });
    if(autoDismiss){
      setTimeout(function(){
        msg.addClass("slideOutRight");
        setTimeout(function(){
          msg.remove();
        },1000);
      }, 2000);
    }
  }
  