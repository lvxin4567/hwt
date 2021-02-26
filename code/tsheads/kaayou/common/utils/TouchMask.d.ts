declare namespace kaayou {
    enum SoundType {
        NONE = 0,
        NORMAL = 1,
        BACK = 2
    }
    class TouchMask {
        static addTouchMask(data?: {
            masktime?: number;
            soundtype?: SoundType;
        }): void;
        static clickHandle(method: any, scope: any, delay?: number): () => any;
    }
}
