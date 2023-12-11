import httpClientApi from "./http-client.api";

class StatisticApis {
    async getStatistic(fromDay, toDay, type) {
        if (!fromDay || !toDay) {
            return;
        }
        return httpClientApi.httpGet(`api/admin/manage/report/order/sale/total/?from=${fromDay}&to=${toDay}&type=${type}`)
    }

    async getReportProductSales(fromDay, toDay) {
        if (!fromDay || !toDay) {
            return;
        }
        return httpClientApi.httpGet(`api/admin/manage/report/sale/stat/total/?fromDay=${fromDay}&toDay=${toDay}`)
    }
}

export default new StatisticApis();