namespace tea {

    const { BindEvent, doBindEvent } = kaayou._decorator;
    export namespace mod {
        export class User {
            static __INS__: tea.mod.User = null;
            static getInstance(): tea.mod.User {
                if (User.__INS__ == null) {
                    User.__INS__ = new User();
                    User.__INS__.initMod();
                }
                return User.__INS__;
            }
            @doBindEvent
            initMod() { }

            getRole() {
                let isCaptain = tea.mod.__teaHouseInfo.ispartner;
                let isViceCaptain = tea.mod.__teaHouseInfo.vice_partner;
                if (isCaptain) tea.mod.__teaHouseInfo.urole = HouseMemberRole.CAPTAIN;
                if (isViceCaptain) tea.mod.__teaHouseInfo.urole = HouseMemberRole.VICECAPTAIN;
                let role = tea.mod.__teaHouseInfo.urole;
                return role;
            }

            getRoleByData(data) {
                let isCaptain: number = data.upartner;
                let isViceCaptain = data.vice_partner;
                if (isCaptain == 1) data.urole = HouseMemberRole.CAPTAIN;
                if (isViceCaptain) data.urole = HouseMemberRole.VICECAPTAIN;
                let role = data.urole;
                return role;
            }

            isOwner() {
                let role = tea.mod.__teaHouseInfo.urole;
                return role === HouseMemberRole.OWNER;
            }

            isViceCaptain() {
                return tea.mod.__teaHouseInfo.vice_partner;
            }
        }
    }
}