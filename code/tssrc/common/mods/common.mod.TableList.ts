namespace common {
    const { BindEvent, doBindEvent } = kaayou._decorator;


    export interface ITabelListItemPerson {
        uid: number,
        name: string,
        imgurl: string,
        sex: number,
        IP: string,
        gold: number

    }

    export interface ITabelListItem {
        begin: boolean,
        ntid: number,
        lock: boolean,
        maxplayernum: number,
        person: ITabelListItemPerson[]
    }


    export interface ITableListMap {
        [key: string]: ITabelListItem
    }

    export namespace mod {

        export abstract class TabelList extends kaayou.mod.Base {
            __tableListItemMap: ITableListMap = null;
            initMod() {
                this.__tableListItemMap = {};
                this.bindModEvents();
            }

            _isBindEvent = false;
            protected bindModEvents() {
                if (this._isBindEvent) { return console.error('多次绑定'); }
                if (this.getModuleName().length < 1) { return console.error('ModuleName is empty'); }
                this._isBindEvent = true;
                kaayou.getController(this.getModuleName()).on('mod::Table::Reset', function (e: kaayou.Event) {
                    this.resetTabel(e.data);
                }, this);

                kaayou.getController(this.getModuleName()).on('mod::TabelList::GetUpdateList', function (e: kaayou.Event) {
                    this.doSitelistin(e.data);
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::sitetablelist', function (e: kaayou.Event) {
                    this.onSitelistUpdate(e.data);
                }, this);

                kaayou.getController(this.getModuleName()).on('ws::Msg::sitetable_ntf', function (e: kaayou.Event) {
                    this.onSitetable_ntf(e.data);
                }, this);

                kaayou.getController(this.getModuleName()).on('mod::TabelList::Sitelistout', function (e: kaayou.Event) {
                    this.doSitelistout(e.data);
                }, this);

            }
            //@BindEvent("qcdg", 'mod::Table::Reset')
            resetTabel(data) {
                this.__tableListItemMap = {};
                kaayou.emit(this.getModuleName(), "ui::TabelList::UpdateList", this.__tableListItemMap);
            }
            //@BindEvent("qcdg", 'mod::TabelList::GetUpdateList')
            doSitelistin(data: { min: number, max: number }) {
                let req = {
                    start: data.min,
                    end: data.max
                };
                kaayou.sendMessage(this.getModuleName(), 'sitelistin', req);
            }
            // @BindEvent("qcdg", 'mod::TabelList::Sitelistout')
            doSitelistout(data: { min: number, max: number }) {
                let req = {};
                kaayou.sendMessage(this.getModuleName(), 'sitelistout', req);
            }


            // @BindEvent('qcdg', 'ws::Msg::sitetablelist')
            onSitelistUpdate(data: ITabelListItem[]) {
                for (var x in data) {
                    this.__tableListItemMap[data[x].ntid] = data[x];
                }
                kaayou.emit(this.getModuleName(), "ui::TabelList::UpdateList", this.__tableListItemMap);
            }

            // @BindEvent('qcdg', 'ws::Msg::sitetable_ntf')
            onSitetable_ntf(data: ITabelListItem) {
                console.log("有更新", data);
                this.__tableListItemMap[data.ntid] = data;
                kaayou.emit(this.getModuleName(), "ui::TabelList::UpdateList", this.__tableListItemMap);
                console.log("有更新", data);
            }

        }
    }
}