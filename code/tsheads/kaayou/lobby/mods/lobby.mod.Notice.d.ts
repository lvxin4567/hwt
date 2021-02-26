/// <reference path="protos/notice.proto.d.ts" />
declare namespace lobby {
    interface INoticeData {
        "tag": string;
        "id": number;
        "kind_id": number;
        "content_type": number;
        "image": string;
        "content": string;
        "position_type": 1;
        "show_type": number;
        "start_at": string;
        "end_at": string;
    }
    namespace mod {
        class Notice {
            static __INS__: lobby.mod.Notice;
            static getInstance(): lobby.mod.Notice;
            initMod(): void;
            private __onceNotice;
            getList(data: {
                call: Function;
            }): Promise<void>;
            private __maintainNotice;
            onMaintainnotice(data: any): void;
            emitMaintainNotice(): void;
            private __marqueenotice;
            onMarqueenotice(data: any): void;
            private _playsendnotice;
            onPlaySendNotice(data: any): void;
            onSendPmd(data: {
                content: string;
            }): Promise<void>;
            emitMarqueenotice(): void;
            onHotupdateNotice(data: any): void;
        }
    }
}
