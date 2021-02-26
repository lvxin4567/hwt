declare namespace kaayou {
    class Shader {
        static DEFAULT_VERTEX_SHADER: string;
        static GRAY_SCALE_FRAGMENT_SHADER: string;
        static RESTORE_SCALE_FRAGMENT_SHADER: string;
        static SEPIA_FRAGMENT_SHADER: string;
        static _catchs: {};
        static turnGray(node: cc.Node): void;
        static turnRestore(node: cc.Node): void;
    }
}
