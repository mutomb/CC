/*Some random colors*/
var colors = [];

const numBalls = 50;
var balls = [];

/* animate balls */
var animate=()=>{
    for (let i = 0; i < numBalls; i++) {
      let ball = document.createElement("div");
      ball.classList.add("ballChild");
      ball.style.background = colors[Math.floor(Math.random() * colors.length)];
      ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
      ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
      ball.style.transform = `scale(${Math.random()})`;
      ball.style.width = `${Math.random()}em`;
      ball.style.height = ball.style.width;
      ball.style.position="fixed";
      balls.push(ball);
      document.body.append(ball);
    }
  
    balls.forEach((el, i, ra) => {
      let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12
      };
    
      let anim = el.animate(
        [
          { transform: "translate(0, 0)" },
          { transform: `translate(${to.x}rem, ${to.y}rem)` }
        ],
        {
          duration: (Math.random() + 1) * 2000, 
          direction: "alternate",
          fill: "both",
          iterations: Infinity,
          easing: "ease-in-out"
        }
      );
    });
  
}
/**add ball to animation */
var addBallColor=(color)=>{
  colors=[];
  if(color.length<1){
    removeBalls()
  }
  else{
    colors.push(color);
    if(colors.length>0){
      animate();
    }
  }
}

/**remove balls from DOM */
var removeBalls=()=>{
  let balls1=document.getElementsByClassName('ballChild');
  [...balls1].forEach((v,i,a)=>{
    document.body.removeChild(v);
  })
}

