declare namespace tea {
    namespace mod {
        class Permission {
            static __INS__: tea.mod.Permission;
            static getInstance(): tea.mod.Permission;
            initMod(): void;
            hasPermission(permissionName: string): boolean;
        }
    }
}
