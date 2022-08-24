import React, { Fragment, useEffect, useState } from 'react'
import CardData from './CardData'
import api from '../../utils/ApiRequest'
import moment from 'moment'
import Industrial from './Industrial';
import { DayLimitApi } from '../../api/FinanceApi';

const getDay = () => {
  const timeNow = new Date()// 当前时间
  if (moment(timeNow).weekday() === 6 || moment(timeNow).weekday() === 7) {
    console.log("现在是周末");
    const weekOfday = moment(timeNow).format('E')
    const Friday = moment(timeNow).subtract(weekOfday - 5, 'days').format('YYYYMMDD'); // 周五日期
    return Friday
  } else {
    return moment().format('YYYYMMDD');
  }
}

function LimitPool() {

  const [dailyLimitData, setDailyLimitData] = useState([])
  const [day, setDay] = useState(getDay())
  const [allIndustrial, setAllIndustrial] = useState({});
  const [industrial, setIndustrial] = useState('all');

  useEffect(() => {
    refreseData()
  }, [])

  const refreseData = () => {
    DayLimitApi({ 'today': day }).then(response => {
      setAllIndustrial(response.data.count)
      setDailyLimitData(response.data.result)
      console.log(response.data.result.length);
    }).catch(error => console.log(error))
  }

  return (
    <>
      <Industrial data={allIndustrial} total={dailyLimitData.length} click={setIndustrial} date={day} />
      <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
        {/* <CardData />
        <CardData /> */}
        {dailyLimitData.map(obj => {
          return (industrial == 'all' || industrial == obj.所属行业) && <CardData key={obj.序号} data={obj} />
        })}
      </div>
    </>
  )
}

export default LimitPool