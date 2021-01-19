export default function drawPhasorLine(ctx:any, angle:number, color: string, text: string, dashed: boolean) {
    const lineLength = 10;
    const center = ctx.canvas.width / 2;
    var x = center + Math.cos(Math.PI * angle / 180) * center;
    var y = center + Math.sin(Math.PI * angle / 180) * center;
    var arrowAngle = Math.atan2((y-center),(x-center));
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x - lineLength * Math.cos(arrowAngle - Math.PI / 6), y - lineLength * Math.sin(arrowAngle - Math.PI / 6));
    ctx.moveTo(x,y);
    ctx.lineTo(x - lineLength * Math.cos(arrowAngle + Math.PI / 6), y - lineLength * Math.sin(arrowAngle + Math.PI / 6));
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.beginPath();
    if(dashed){
      ctx.setLineDash([5, 5]);
    }
    ctx.moveTo(center,center);
    ctx.lineTo(x,y);
    ctx.strokeStyle = color;
    if(angle<=270 && angle>=180){
       ctx.fillText(text, x+10,y+10);
    }else{
      ctx.fillText(text, x-20,y-10);
    }
    ctx.stroke();
}