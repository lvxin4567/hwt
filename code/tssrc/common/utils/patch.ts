class Patch {

    static Dithering(text: string): string {
        if (text.length == 2) {
            return text.split('').join(' ');
        }
        return text;
    }

    static ChangeTextBMFontFntFile(t: ccui.TextBMFont, text: string, fileName: string, ext: Array<string> = null): ccui.TextBMFont {
        let lba = ccui.TextBMFont.create(text, fileName);
        let pt = t.getPosition();
        let apt = t.getAnchorPoint();
        lba.setName(t.getName());
        lba.setTag(t.getTag());
        lba.setScale(t.getScale());
        lba.setPosition(pt);
        lba.setAnchorPoint(apt);
        if (ext) {
            for (var x in ext) {
                lba[ext[x]] = t[ext[x]];
            }
        }
        let parent = t.getParent();
        if (parent) {
            t.removeFromParent(true);
            parent.addChild(lba);
        }
        return lba;
    }


    static ChangeTextColor(t: ccui.Text, text: string, color: cc.Color, fontName: string = null, fontSize: number | string = null): ccui.Text {

        fontName = fontName || t.getFontName();
        fontSize = fontSize ? parseInt((fontSize + "").replace('px', '')) : t.getFontSize()
        if(text === null){
            text = t.getString();
        }
        let lba = <ccui.Text>ccui.Text.create(text, fontName, fontSize);
        let pt = t.getPosition();
        let apt = t.getAnchorPoint();
        lba.setName(t.getName());
        lba.setTag(t.getTag());
        lba.setScale(t.getScale());
        lba.setPosition(pt);
        lba.setAnchorPoint(apt);
        lba.setTextColor(color);
        let parent = t.getParent();
        if (parent) {
            t.removeFromParent(true);
            parent.addChild(lba);
        }
        return lba;
    }

    //设置按钮灰色和按钮文字灰色
    static SetBtnAndTextBright(btn: ccui.Button, b: boolean, btext: boolean = true, tcname: string = "") {

        btn.setBright(b);
        btn.setTouchEnabled(b);

        let cl: ccui.Text = null;
        if (btext == false) { return; }
        if (tcname == "") {
            cl = <ccui.Text>btn.getChildren()[0];
        } else {
            cl = <ccui.Text>btn.getChildByName(tcname);
        }
        if (!cl) { return; }

        if (b) {
            kaayou.Shader.turnRestore(cl.getVirtualRenderer());
        } else {
            kaayou.Shader.turnGray(cl.getVirtualRenderer());
        }
    }

    
    //设置文字自适应
    static SetAdjustText(label:ccui.Text , text:string , ext:{width:number,height:number,fontSize:number} = {width:null,height:null,fontSize:null}){
        const width  = ext.width!==null ? ext.width : label.width,
              height = ext.height!==null ? ext.height :label.height,
              fontSize = ext.fontSize!==null?ext.fontSize:label.fontSize;
        let textLabel:ccui.Text
        //16作为基准数 以这个基准为跳格标准
        const px = 1/16;

        let targetFontSize = adjustFontSize(text , fontSize , width-4 , height);
        
        if(text!==label.getString())
            label.setString(text);
        if(px > Math.abs(1-targetFontSize/fontSize) )
            return;
        label.setFontSize(targetFontSize|0);
        

        function  measureText(str: string , size: number) {
            textLabel = textLabel || <ccui.Text>ccui.Text.create();
            //text.setTextAreaSize(cc.size(width, 0));
            //text.ignoreContentAdaptWithSize(false)
            textLabel.setFontSize(size|0);
            textLabel.setString(str);
            return textLabel.getVirtualRendererSize()
        }


        function adjustFontSize(text ,fontSize , width , height , computedScale = 1){

            let computedSize = measureText(text ,computedScale * fontSize);

            let s1 = computedSize.height / height ;
            let s2 = computedSize.width / width;
            let cs = height / width;
            //let ss = computedSize.height / computedSize.width;
            let customScale;
            if(s1>s2){
                customScale =  Math.max(0.1,1 - s1);
            }else{
                customScale  = Math.max(0.1,1 - s2)
            }

            //由于字体一般只有换行，所以只判断高度的比值，如果比值过高就换行试试
            if(s1>=1 || s2>=1)
                return getFontSize();

            //更宽的，以宽为主 允许超高
            if(cs<=1 && s2<=1)
                return adjustFontSize(text , fontSize , width, height , computedScale + customScale);
            

            if(cs > 1 && s1<=1 )
                return adjustFontSize(text , fontSize , width, height , computedScale +customScale);


            return getFontSize();

            function getFontSize(){

                if(cs<=1 && s2>1 || cs > 1 && s1>=1)
                computedScale -= customScale;

                let computedFontSize = computedScale * fontSize

                if(s1 >= s2){
                    computedFontSize =  computedFontSize / s1;
                }else{
                    computedFontSize =  computedFontSize / s2;
                }

                return computedFontSize;
            }

        }


    }
} 