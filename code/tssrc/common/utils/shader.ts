namespace kaayou {


    export class Shader {


        static DEFAULT_VERTEX_SHADER = `
        attribute vec4 a_position;
        attribute vec2 a_texCoord;
        attribute vec4 a_color;
        varying vec2 v_texCoord;
        varying vec4 v_fragmentColor;
        void main()
        {
            gl_Position = ${cc.sys.isNative ? 'CC_PMatrix':'CC_PMatrix'} * a_position;
            v_fragmentColor = a_color;
            v_texCoord = a_texCoord;
        }
        `;

        static GRAY_SCALE_FRAGMENT_SHADER = `
        #ifdef GL_ES
        precision mediump float;
        #endif
        varying vec4 v_fragmentColor;
        varying vec2 v_texCoord;
        void main()
        {
            vec4 c = v_fragmentColor * texture2D(CC_Texture0, v_texCoord);
            gl_FragColor.xyz = vec3(0.2126*c.r + 0.7152*c.g + 0.0722*c.b);
            gl_FragColor.w = c.w;
        }
        `;


        static RESTORE_SCALE_FRAGMENT_SHADER = `
        #ifdef GL_ES
        precision mediump float;
        #endif
        varying vec4 v_fragmentColor;
        varying vec2 v_texCoord;
        void main()
        {
            gl_FragColor = texture2D(CC_Texture0, v_texCoord);
        }
        `;

        static SEPIA_FRAGMENT_SHADER =
            "varying vec2 v_texCoord;   \n"
            //+ "uniform sampler2D CC_Texture0; \n"
            + "uniform float u_degree; \n"
            + "void main() \n"
            + "{  \n"
            + "    vec4 texColor = texture2D(CC_Texture0, v_texCoord);  \n"
            + "    float r = texColor.r * 0.393 + texColor.g * 0.769 + texColor.b * 0.189; \n"
            + "    float g = texColor.r * 0.349 + texColor.g * 0.686 + texColor.b * 0.168; \n"
            + "    float b = texColor.r * 0.272 + texColor.g * 0.534 + texColor.b * 0.131; \n"
            + "    gl_FragColor = mix(texColor, vec4(r, g, b, texColor.a), float(u_degree));  \n"
            + "}";

        // static gaussianBlur = `

        // #ifdef GL_ES
        // precision mediump float;
        // #endif

        // #define pi 3.141592653589
        // #define tau 6.283185307179
        // #define e 2.718281828459
        // #define sqr(x) x*x
        
        // #define sample(c) texture(iChannel0, (c)/iResolution.xy)

        // float G( in vec2 p, in float sigma ) {
        //     return ( 1./(2.*pi*sqr(sigma)) )
        //         *exp( -(sqr(p.x)+sqr(p.y))/(2.*pow(sigma, 2.)) );
        // }

        // vec3 GaussBlur( in vec2 co, in int dim, in float sigma ) {
        //     vec3 c = vec3(0);
        //     float z = 0.;
        //     for (int i=-dim; i <= dim; ++i) {
        //         for (int j=-dim; j <= dim; ++j) {
        //             float g = G(vec2(i,j), sigma);
        //             c += g*sample(co+vec2(i,j)).rgb;
        //             z+=g;
        //         }
        //     }
        //     return c/z;
        // }

        // `

        static _catchs = {};
        static turnGray(node: cc.Node) {
            //  var program = new cc['GLProgram'](common.res.example_ColorBars_vsh    ccbjs + "Shaders/example_ColorBars.vsh", ccbjs + "Shaders/example_ColorBars.fsh");
            // var program = new cc['GLProgram'](common.res.example_ColorBars_vsh, common.res.example_ColorBars_fsh);
            let program = null;;
            if (!Shader._catchs['shader_gray']) {
                program = new cc['GLProgram']();
                program.initWithString(Shader.DEFAULT_VERTEX_SHADER, Shader.GRAY_SCALE_FRAGMENT_SHADER);
                program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
                program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
                program.link();
                program.updateUniforms();
                Shader._catchs['shader_gray'] = program;
            } else {
                program = Shader._catchs['shader_gray'];
            }
            node.setShaderProgram(program);
        }

  

        static turnRestore(node: cc.Node) {
            let program = null;;
            if (!Shader._catchs['shader_restore']) {
                program = new cc['GLProgram']();
                program.initWithString(Shader.DEFAULT_VERTEX_SHADER, Shader.RESTORE_SCALE_FRAGMENT_SHADER);
                program.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION);
                program.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS);
                program.link();
                program.updateUniforms();
                Shader._catchs['shader_restore'] = program;
            } else {
                program = Shader._catchs['shader_restore'];
            }
            node.setShaderProgram(program);
        }





    }


}