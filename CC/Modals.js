/** add to cart modal manipulation */
$(document).ready(function(){
    /** reset cart on checkout */
    var emptyCart=()=>{
        for(let color of Colors){
            color.selectedquantity=0
        }
    }
    /**initial quantity */
    DisplayColorsDetails.displayQuantity(0);
    /**add balls to animation */
    var addBalls=()=>{
        for(color of Colors){
            if(color.selectedquantity>0){
                addBallColor(color.colorCode);
            }
        }
    }
    /**update cart icon */
    var updateCartIcon=()=>{
        let total=0;
        for(let color of Colors){
            total+=color.selectedquantity;
        }
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
        if(severity=='danger'){
        msg.css({
            border:'0.5em solid black',
            backgroundColor:'#ee5f5f',
            borderRadius:'2em'
        })
        }
        if(severity=='info'){
        msg.css({
            border:'0.5em solid black',
            backgroundColor:'#1ddde8',
            borderRadius:'2em'
        })
        }
        if(severity=='success'){
        msg.css({
            border:'0.5em solid black',
            backgroundColor:'#1de840',
            borderRadius:'2em'
        })
        }
    
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
                $("#"+appendToId).css({width:"100%"});
            }
            else{
                $("#"+appendToId).css({width:"40%"});
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
    /**handle button that show/hide quantity modal */
    $("#cartButton").click(function(){
        if(selectedColor!=null && $('#cartButton').text()!=="Checkout Now"){
            let selectedColorLabel=$("#selectedColorLabel").text();
            for(let x of Colors){
                if(x.colorName==selectedColorLabel){
                    $('#quantity').text(x.selectedquantity);
                    $('#selectedColrLabel-modal').text(selectedColorLabel);
                    $("#myModal").modal('show');
                }
            }
        }
        else if($('#cartButton').text()=="Checkout Now"){
            $("#myModal").modal('hide');
            emptyCart();
            addBalls(); /**balls simulations */
            DisplayColorsDetails.displayColorsDetails('',0);
            DisplayColorsDetails.displayQuantity(0);
            $('#cartButton').text("Add to Cart");
            addBallColor('');
            updateCartIcon();
            createAlert('Checkout','','You have checkout all you colors.','info',true,true,'pageMessages');
        }
        else{
            createAlert('Opps!','Pick color','First you must pick color','danger',true,true,'pageMessages');       
        }
    })
    /** handle quantity selection modal animation*/
    $('#myModal').on('show.bs.modal', function (e) {
        $('#myModalDialog').attr('class', 'modal-dialog modal-dialog-centered modal-lg zoomIn animated');
    })
    $('#myModal').on('hide.bs.modal', function (e) {
        $('#myModalDialog').attr('class', 'modal-dialog modal-dialog-centered modal-lg zoomOut animated');
    })
    /** handle help modal animation*/
    $('#myModal1').on('show.bs.modal', function (e) {
        $('#myModalDialog1').attr('class', 'modal-dialog modal-dialog-centered modal-lg zoomIn animated');
    })
    $('#myModal1').on('hide.bs.modal', function (e) {
        $('#myModalDialog1').attr('class', 'modal-dialog modal-dialog-centered modal-lg zoomOut animated');
    })
    /** increase/decrease buttons*/
    $('#minus').on('click',function(e){
        let quantity=$('#quantity');
        let value=parseInt(quantity.text());
        if(value>0){
            quantity.text(value-1);
        }
    })
    $('#plus').on('click',function(e){
        let quantity=$('#quantity');
        let value=parseInt(quantity.text());
        quantity.text(value+1);
    })
    /**agree button */
    $('#agreeButton').on('click',function(e){
      let quantity=$('#quantity');
      let value=parseInt(quantity.text());
       if(selectedColor!=undefined){
           let selectedColorLabel=$('#selectedColorLabel').text();
           let savedQuantity;
           for(let color of Colors){
               if(color.colorName==selectedColorLabel){
                   color.setQuantity(value);
                   savedQuantity=value;
                   break;
               }
           }
           if(selectedColorLabel!=undefined){
               let colorCode;
               let price;
               for(let color of Colors){
                    if(color.colorName==selectedColorLabel){
                        colorCode=color.colorCode;
                        price=color.price;
                        break;
                    }
               }
               if(colorCode!=undefined && savedQuantity!=undefined &&price!=undefined){
                   DisplayColorsDetails.displayColorsDetails(colorCode,savedQuantity);
                   DisplayColorsDetails.displayQuantity(savedQuantity);
                   DisplayColorsDetails.displayPrice(price);
                   if(savedQuantity>0){
                       $('#cartButton').text('Checkout Now');
                        addBalls(); 
                        updateCartIcon();
                        createAlert('','Nice Work!',`You have have just added  ${savedQuantity} ${selectedColorLabel} to your Colorcart.`,'success',true,true,'pageMessages');
                    }
               }
           }
       }
    })

  });
