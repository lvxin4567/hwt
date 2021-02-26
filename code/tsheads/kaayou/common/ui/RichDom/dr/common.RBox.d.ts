declare namespace common {
    namespace RDom {
        /**
         *
         * @param source HTML文本
         * @param sheet 样式表对象
         * @param extra 组件说明
         * examples{
         *
         *      checkbox:{width , height , text}
         *      number:{widht , height ...,text}
         *
         * }
         *
         * text需要一个单独计算的方法
         */
        const combine: (source: string, extra: any) => Array<vBox>;
        const queryClassSelector: (all: Array<vBox>) => (cmd: String) => any;
    }
}
