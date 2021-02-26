declare namespace common {
    class GamePmdBlock extends kaayou.Block {
        constructor();
        Text_content: ccui.Text;
        private play_time;
        private wait_time;
        isPlayOver: boolean;
        announcement_msg: Array<string>;
        play_announcement_msg: Array<string>;
        timer: number;
        num: number;
        type: number;
        initUI(): void;
        MoveAction(): void;
        show(data: {
            PmdArray: Array<string>;
            type: number;
        }): void;
        onExit(): void;
        onHide(): void;
    }
}
