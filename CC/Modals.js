/**handles the display of all modals */

/** add to cart modal manipulation */
$(document).ready(function(){
    var dismissModal=false;
    /** reset cart on checkout */
    var emptyCart=()=>{
        for(let color of Colors){
            color.selectedquantity=0
        }
    }

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
        let addedItems=document.getElementById("addedItems");
        let totalHeader=document.getElementById('totalHeader');
        console.log(addedItems);
        if(!(autoDismiss) && addedItems!=undefined && totalHeader!=undefined){
            addedItems.innerHTML+=", "+details;
            totalHeader.innerHTML=title;
            
        }
        else{
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
                backgroundColor:'rgb(73, 6, 28)',
                borderRadius:'2em',
            })
            }
            if(severity=='info'){
                msg.css({
                    border:'0.5em solid black',
                    backgroundColor:'rgb(6, 57, 73)',
                    borderRadius:'2em',
                })
            }
            if(severity=='success'){
                msg.css({
                    border:'0.5em solid black',
                    backgroundColor:'rgb(12, 73, 6)',
                    borderRadius:'2em',
                })
            }
        
            if (title) {
                if(!autoDismiss){
                    var msgTitle = $("<h4 />", {
                        html: title,
                        'id':'totalHeader'
                    }).appendTo(msg);                    
                }
                else{
                    var msgTitle = $("<h4 />", {
                        html: title,
                    }).appendTo(msg);                    
                }
                
                if(!iconAdded){
                    msgTitle.prepend(msgIcon);
                    iconAdded = true;
                }
            }
        
            if (summary) {
                var msgSummary = $("<strong />", {
                    html: summary,
                }).appendTo(msg);
                                
                if(!iconAdded){
                    msgSummary.prepend(msgIcon);
                    iconAdded = true;
                }
                if(!autoDismiss){
                    if (details) { /**only cart modal should contain have id=addedItems */
                        var msgDetails = $("<p />", {
                            html: details,
                            "id":"addedItems"
                        }).appendTo(msg);
                    }
                }
                else{
                    if (details) {
                        var msgDetails = $("<p />", {
                            html: details
                        }).appendTo(msg);
                    }
                }
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
            var timer;
            if(autoDismiss){
                setTimeout(function(){
                    msg.addClass("slideOutRight");
                    setTimeout(function(){
                        msg.remove();
                    },1000);
                }, 2000);
            }
            else{ /**wait until user presses checkout*/
                timer= setInterval(remove,200);
            }
            function remove(){
                if(dismissModal){
                    setTimeout(function(){
                        msg.addClass("slideOutRight");
                        setTimeout(function(){
                            msg.remove();
                            dismissModal=false;
                            clearInterval(timer);
                        },500);
                    }, 0);
                }               
            }
        }

    }
    /** welcome message*/
    createAlert('Welcome!','start choosing color(s)','','info',false,true,'pageMessages');       

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
            dismissModal=true;
            $("#myModal").modal('hide');
            emptyCart();
            addBalls(); /**balls simulations */
            let price;
            let discount;
            let selectedColorLabel=$('#selectedColorLabel').text();
            for(let color of Colors){
                if(color.colorName==selectedColorLabel){
                    color.setQuantity(0);
                    price=color.price;
                    discount=color.discount;
                    break;
                }
            }
            DisplayColorsDetails.displayColorsDetails('',0);
            DisplayColorsDetails.displayQuantity(0);
            DisplayColorsDetails.displayPrice(price,discount);
            $('#cartButton').text("Add to Cart");
            addBallColor('');
            updateCartIcon();
        }
        else{
            createAlert('Pick color'," ",'First, you must click on a color','danger',false,true,'pageMessages');       
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
               let discount;
               for(let color of Colors){
                    if(color.colorName==selectedColorLabel){
                        colorCode=color.colorCode;
                        price=color.price;
                        discount=color.discount;
                        break;
                    }
               }
               if(colorCode!=undefined && savedQuantity!=undefined && price!=undefined && discount!=undefined){
                   DisplayColorsDetails.displayColorsDetails(colorCode,savedQuantity);
                   DisplayColorsDetails.displayQuantity(savedQuantity);
                   DisplayColorsDetails.displayPrice(price,discount);
                   if(savedQuantity>0){
                       $('#cartButton').text('Checkout Now');
                        addBalls(); 
                        updateCartIcon();
                        let total=0;
                        for(let color of Colors){
                            if(color.selectedquantity>0){
                                let price=color.price;
                                let discount=color.discount;
                                let quantity=color.selectedquantity;
                                let discountedPrice=(price-(price*discount/100)).toFixed(2);
                                total+=discountedPrice*quantity;
                            }
                        }
                        createAlert(`Cart: total=$${total}`," ",`${savedQuantity} ${selectedColorLabel}`,'success',false,false,'pageMessages');
                    }
               }
           }
       }
    })

  });
