declare namespace common {
    interface ITabelListItemPerson {
        uid: number;
        name: string;
        imgurl: string;
        sex: number;
        IP: string;
        gold: number;
    }
    interface ITabelListItem {
        begin: boolean;
        ntid: number;
        lock: boolean;
        maxplayernum: number;
        person: ITabelListItemPerson[];
    }
    interface ITableListMap {
        [key: string]: ITabelListItem;
    }
    namespace mod {
        abstract class TabelList extends kaayou.mod.Base {
            __tableListItemMap: ITableListMap;
            initMod(): void;
            _isBindEvent: boolean;
            protected bindModEvents(): void;
            resetTabel(data: any): void;
            doSitelistin(data: {
                min: number;
                max: number;
            }): void;
            doSitelistout(data: {
                min: number;
                max: number;
            }): void;
            onSitelistUpdate(data: ITabelListItem[]): void;
            onSitetable_ntf(data: ITabelListItem): void;
        }
    }
}
