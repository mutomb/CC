/**
 * Created by jeanlucMutomb
 * date: 29 Nov 2019
 * Point of entry of color shopping cart
 * 
*/

/**where colors will be displayed */
var row6=document.getElementById('colorButtons');

/** modal trigger label may change dynamically */
document.getElementById('cartButton').innerHTML="Add to Cart";

/**initially user has not selected color */
var selectedColor=null;

/**initailize circles to be displayed */
var Colors=[
    new ColoredCircle('blood','red', 12,0),
    new ColoredCircle('grass','green', 15, 0),
    new ColoredCircle('blueink','blue', 10, 0),
    new ColoredCircle('girlish','pink', 12, 0),
    new ColoredCircle('wealth','yellow', 55, 0),
    new ColoredCircle('sad','indigo', 12, 0),
    new ColoredCircle('transition','purple', 100, 0),
    new ColoredCircle('batman','black', 12, 0),
    new ColoredCircle('sky','lightblue', 43, 0),
    new ColoredCircle('shady of blue','steelblue', 5, 0),
    new ColoredCircle('chocolate','brown', 34, 0),
    new ColoredCircle('green milk','lightgreen', 46, 0),
]
/** display  colors circle to 6th row*/
Colors.forEach((coloredCircle)=>{
    /**render the colored circle */
    coloredCircle.render();
})



  

