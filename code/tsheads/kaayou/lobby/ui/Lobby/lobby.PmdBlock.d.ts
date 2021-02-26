declare namespace lobby {
    class PmdBlock extends kaayou.Block {
        constructor();
        label_pmd: ccui.Text;
        btn_laba: ccui.Button;
        private play_time;
        private wait_time;
        isPlayOver: boolean;
        announcement_msg: Array<string>;
        play_announcement_msg: Array<string>;
        timer: number;
        num: number;
        type: number;
        initUI(): void;
        onConfigUpdate(): void;
        MoveAction(): void;
        show(data: {
            PmdArray: Array<string>;
            type: number;
        }): void;
        onExit(): void;
    }
}
