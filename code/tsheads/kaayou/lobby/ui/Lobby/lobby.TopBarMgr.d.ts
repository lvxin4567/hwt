declare namespace lobby {
    class TopBarMgr extends common.TopBarMgr {
        onBindEvent(): void;
        onConfigUpdate(): void;
        onUpdateUserInfo(data: Data_Uerinfo): void;
    }
}
