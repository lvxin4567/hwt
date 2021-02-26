declare class Patch {
    static Dithering(text: string): string;
    static ChangeTextBMFontFntFile(t: ccui.TextBMFont, text: string, fileName: string, ext?: Array<string>): ccui.TextBMFont;
    static ChangeTextColor(t: ccui.Text, text: string, color: cc.Color, fontName?: string, fontSize?: number | string): ccui.Text;
    static SetBtnAndTextBright(btn: ccui.Button, b: boolean, btext?: boolean, tcname?: string): void;
    static SetAdjustText(label: ccui.Text, text: string, ext?: {
        width: number;
        height: number;
        fontSize: number;
    }): void;
}
