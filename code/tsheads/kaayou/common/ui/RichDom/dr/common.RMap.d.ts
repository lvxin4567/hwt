declare namespace common {
    namespace RDom {
        class boxMap {
            boxes: Array<vBox>;
            ids: Array<String>;
            searchByID(id: string): vBox;
            push(box: vBox): void;
        }
    }
}
