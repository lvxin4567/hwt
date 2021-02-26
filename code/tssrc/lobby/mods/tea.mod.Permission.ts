namespace tea {
    const { BindEvent, doBindEvent } = kaayou._decorator;
    export namespace mod {
        export class Permission {
            static __INS__: tea.mod.Permission = null;
            static getInstance(): tea.mod.Permission {
                if (Permission.__INS__ == null) {
                    Permission.__INS__ = new Permission();
                    Permission.__INS__.initMod();
                }
                return Permission.__INS__;
            }
            @doBindEvent
            initMod() { }

            hasPermission(permissionName: string):boolean {
                let i = tea.mod.House.getPromissionInstance().query(permissionName);
                return (i == tea.mod.House.PERMISSION_TYPE.ESCALATION || i == tea.mod.House.PERMISSION_TYPE.DEFAULT);
            }
        }
        tea.mod.Permission.getInstance();
    }
}