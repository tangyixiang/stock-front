import api from "../utils/ApiRequest";


export function DayLimitApi(param){
  return api.get('/stock/daily_limit',{params:param})
}

export function HistoryPrice(param){
  return api.get('/stock/price/history',{params:param})
}

export function CompanySummary(param){
  return api.get('/stock/company/summary',{params:param})
}

