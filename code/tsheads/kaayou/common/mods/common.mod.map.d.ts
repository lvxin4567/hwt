declare namespace common {
    namespace mod {
        class ChineseMap {
            AreaList: {
                city: string;
                district: {
                    name: string;
                    code: string;
                }[];
                province: string;
            }[];
            static __INS__: ChineseMap;
            static getInstance(): ChineseMap;
            getAdcode(cityId: any): string;
            getAdcodeByName(cityName: any): string;
            getCityAdcode(code: any): any;
            getCityId(adcode: any): string;
            getDistrictByCityKey(city: any): {
                name: string;
                code: string;
            }[];
            getDistrictByAreacode(areacode: any): {
                name: string;
                code: string;
            }[];
            getName(code: any): string;
            getProvince(cityId: any): string;
        }
    }
}
