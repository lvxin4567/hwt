declare namespace tea {
    enum houseMessageHead {
        housemsg = "housemsg"
    }
    interface proto_housemsg extends IBASE_HOUSEREQ {
        start: number;
        end: number;
    }
    interface proto_housemsg_res {
        msg: string;
        create_stamp: number;
    }
}
