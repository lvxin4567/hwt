declare namespace ccui {

    export class Slider extends Widget {
        static EVENT_PERCENT_CHANGED: 0;
        static BASEBAR_RENDERER_ZORDER: -3;
        static PROGRESSBAR_RENDERER_ZORDER: -2;
        static BALL_RENDERER_ZORDER: -1;
        loadBarTexture(fileName: string, texType: number);
        loadProgressBarTexture(fileName: string, texType: number);
        loadSlidBallTextureNormal(fileName: string, texType: number);
        loadSlidBallTexturePressed(fileName: string, texType: number);
        loadSlidBallTextureDisabled(fileName: string, texType: number);
        setScale9Enabled(able: boolean);
        isScale9Enabled(): boolean;
        loadSlidBallTextures(normal: string, pressed: string, disabled: string, texType: number);
        setPercent(percent: number);
        addEventListener(selector, target);
        getPercent(): number;
        setZoomScale(scale: number);
        getZoomScale(): number;
    }
}