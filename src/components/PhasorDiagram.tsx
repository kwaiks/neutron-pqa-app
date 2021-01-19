import React, {useRef, useEffect} from 'react';

const Phasor = (props:any) => {
    const {draw, ...rest} = props;
    const canvasRef = useRef<null | HTMLCanvasElement>(null);

    const init = (ctx: any) => {
        const center = ctx.canvas.width / 2;
        ctx.beginPath();
        ctx.font = "12px sans-serif";
        ctx.textAlign = "right";
        ctx.textBaseline = "top";
        ctx.fillText(" 0", ctx.canvas.width, center);
        ctx.textAlign = "left";
        ctx.fillText(" 270", center, 0);
        ctx.fillText(" 180", 0, center);
        ctx.textBaseline = "bottom";
        ctx.fillText(" 90", center, ctx.canvas.height);
        ctx.moveTo(center,center);
        ctx.lineTo(center,0);
        ctx.moveTo(center,center);
        ctx.lineTo(0,center);
        ctx.moveTo(center,center);
        ctx.lineTo(center,ctx.canvas.height);
        ctx.moveTo(center,center);
        ctx.lineTo(ctx.canvas.width,center);
        ctx.setLineDash([])
        ctx.strokeStyle = "#000";
        ctx.stroke();
    }

    useEffect(()=>{
        const canvas = canvasRef.current;
        const context = canvas!.getContext("2d");
        const render = () => {
            if(context !== null && canvas !== null){
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
            init(context);
            draw(context);
        }
        render()
    })
    
    return <canvas ref={canvasRef} {...rest} />
} 

export default Phasor;