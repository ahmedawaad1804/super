import axiosInstance from './axiosInstance';

export default dataService = {
    getOrders: () => {

        return axiosInstance
            .get('/order/allApproved');
    },
    getDrivers: () => {

        return axiosInstance
            .get('/driver/all');
    },
    getStaticDriversData: () => {

        return axiosInstance
            .get('/driver/allInfo');
    },
    getDriverOrder: (_id) => {

        return axiosInstance
            .post('/driver/allInfoById',{_id});
    },
    assignOrder: (order,driver) => {

        return axiosInstance
            .post('/driver/addOrder',{order,driver});
    },
    authunticate: (phone,password) => {

        return axiosInstance
            .post('/driver/login/sup',{phone,password});
    },
    cancelOrder: (body) => {

        return axiosInstance
            .post('/order/cancelOrderSup',body);
    },
    getSuppliers: () => {

        return axiosInstance
            .get('/supplier/getAll');
    },
    getSpecificOrder: (id) => {

        return axiosInstance
            .post('/order/getSpecificOrder',{id});
    },
    editDriver: (data) => {

        return axiosInstance
            .post('/driver/edit',data);
    },
    






}
