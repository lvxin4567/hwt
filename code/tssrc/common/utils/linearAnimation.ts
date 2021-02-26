namespace kaayou{
    
    export class linear{

        static CubicBezier(p0,p1,p2,p3){

			let va = 1 - 3 * p2 + 3 * p0;
		    let vb = 3 * p2 - 6 * p0;
		    let vc = 3 * p0;
		    let y1x3 = p1 * 3;
		    let y2x3 = p3 * 3;
		    

			return function(offset){

				if(+offset>=1)return offset;

				let x = offset,
	        	slope,
	        	cx,
	        	i;

			    i = 0;

			    for (i; i < 3; i++) {
			        slope = 3 * va * x * x + 2 * vb * x + vc;

			        if (!slope) {
			            return x;
			        }

			        cx = ((va * x + vb) * x + vc) * x - offset;
			        x -= (cx / slope);
			    }

			    return (((1 - y2x3 + y1x3) * x + (y2x3 - 2 * y1x3)) * x + y1x3) * x;
			}			

        }

        //,"ease-in-out-cubic":".645, .045, .355, 1","ease-in-quart":".895, .03, .685, .22","ease-out-quart":".165, .84, .44, 1","ease-in-out-quart":".77, 0, .175, 1","ease-in-quint":".755, .05, .855, .06","ease-out-quint":".23, 1, .32, 1","ease-in-out-quint":".86, 0, .07, 1","ease-in-expo":".95, .05, .795, .035","ease-out-expo":".19, 1, .22, 1","ease-in-out-expo":"cubic-bezier(1, 0, 0, 1","ease-in-circ":".6, .04, .98, .335","ease-out-circ":".075, .82, .165, 1","ease-in-out-circ":".785, .135, .15, .86","ease-in-back":".6, -.28, .735, .045","ease-out-back":".175, .885, .32, 1.275","ease-in-out-back":".68, -.55, .265, 1.55"
        //
        static easeOutCubic(){
            return kaayou.linear.CubicBezier(.215, .61, .355, 1);
        }

        static easeInCubic(){
            return kaayou.linear.CubicBezier(.55, .055, .675, .19);
        }

        static easeInOutQuad(){
            return kaayou.linear.CubicBezier(.455, .03, .515, .955);
        }

        static easeOutQuad(){
            return kaayou.linear.CubicBezier(.25, .46, .45, .94);
        }

        static easeInQuad(){
            return kaayou.linear.CubicBezier(.55, .085, .68, .53);
        }

        static easeInOutSine(){
            return kaayou.linear.CubicBezier(.445, .05, .55, .95);
        }

        static easeOutSine(){
            return kaayou.linear.CubicBezier(.39, .575, .565, 1);
        }

        static easeInSine(){
            return kaayou.linear.CubicBezier(.47, 0, .745, .715);
        }

        static Ease(){
            return kaayou.linear.CubicBezier(0.25, 0.1, 0.25, 1);
        }

        static EaseIn(){
            return kaayou.linear.CubicBezier(0.42, 0, 1, 1);
        }

        static EaseOut(){
            return kaayou.linear.CubicBezier(0, 0, 0.58, 1);
        }

        static EaseInOut(){
            return kaayou.linear.CubicBezier(0.42, 0, 0.58, 1);
        }

        static Linear(){
            return kaayou.linear.CubicBezier(0,0,1,1);
        }
        
    }
}