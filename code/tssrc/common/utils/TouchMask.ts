
namespace kaayou {

    export enum SoundType {
        NONE = 0,
        NORMAL, //默认播放此音效
        BACK,
    }

    export class TouchMask {

        //添加屏蔽点击事件的遮罩层
        static addTouchMask(data?: { masktime?: number, soundtype?: SoundType }) {
            if (data == undefined) data = {};
            if (data.masktime == undefined) data.masktime = 0.2;
            if (data.soundtype == undefined) data.soundtype = SoundType.NORMAL;

            if (data.masktime && data.masktime > 0) {
                let mainScene = UIManager.getInstance().getMainScene();
                if (mainScene) {
                    let mask = <ccui.Layout>ccui.Layout.create();
                    mask.setTouchEnabled(true);
                    mask.setContentSize(cc.winSize);
                    //mask.setBackGroundColorType(1);
                    //mask.setBackGroundColor(cc.color(125, 125, 125));
                    //mask.setBackGroundColorOpacity(100);
                    mask.setAnchorPoint(0.5, 0.5);
                    mask.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
                    mask.runAction(cc.sequence(cc.delayTime(data.masktime), cc.callFunc(function (sender) {
                        sender.removeFromParent();
                    }, mask)));
                    mainScene.addChild(mask);
                }
            }
            if (data.soundtype) {
                let arr = [
                    'ClickBtnDefault',//点击任何按钮出现
                    'ClickBtnClose', //点X、反回、取消 按钮
                ];
                if (arr[data.soundtype-1]) {
                    SoundManager.getInstance().playSound(common.SoundRes[arr[data.soundtype-1]]);
                }
            }
        }


        static clickHandle(method , scope , delay = 300){

            let timeout;
            let exec = false;
            let returnValue = void 0;
            
            let _wrap = function(){
                let args = arguments

                if(exec === true)
                    return returnValue
                
                if(timeout)
                    clearTimeout(timeout);
    
                timeout = setTimeout(function(){
                    exec=false;
                    returnValue = method.apply(scope,args);
                }, delay);
            }
                
            
            return _wrap;
        }

    }

}