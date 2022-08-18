import React, { Fragment, useEffect, useState } from 'react'
import CardData from './CardData'
import api from '../../utils/ApiRequest'
import moment from 'moment'
import Industrial from './Industrial';

const getDay = () => {
  const timeNow = new Date()// 当前时间
  if (moment(timeNow).weekday() === 5 || moment(timeNow).weekday() === 6) {
    console.log("现在是周末");
    const weekOfday = moment(timeNow).format('E')
    const Friday = moment(timeNow).subtract(weekOfday - 5, 'days').format('YYYYMMDD'); // 周五日期
    return Friday
  } else {
    return moment().format('YYYYMMDD');
  }
}

function StockCard() {

  const [dailyLimitData, setDailyLimitData] = useState([])
  const [day, setDay] = useState(getDay())
  const [allIndustrial, setAllIndustrial] = useState({});
  const [industrial, setIndustrial] = useState('all');

  useEffect(() => {
    console.log(industrial);
    refreseData()
  }, [])

  const refreseData = () => {
    api('/stock/daily_limit?today=' + day).then(response => {
      setAllIndustrial(response.data.count)
      setDailyLimitData(response.data.result)
    }).catch(error => console.log(error))
  }

  return (
    <>
      <Industrial data={allIndustrial} click={setIndustrial} />
      <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
        {/* <CardData key={obj.序号} data={obj} /> */}
        {/* {dailyLimitData.map(obj => {
          return (industrial == 'all' || industrial == obj.所属行业) && <CardData key={obj.序号} data={obj} />
        })} */}
      </div>
    </>
  )
}

export default StockCard