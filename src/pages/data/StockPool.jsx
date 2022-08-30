import React, { useState, useEffect } from 'react'
import { AllCompanyApi } from '../../api/FinanceApi'
import { Table, Pagination, Container, ActionIcon, Group, Button, Chip, Accordion, useMantineTheme } from '@mantine/core'
import useStore from '../../store'
import { observer } from 'mobx-react-lite'
import { IconChevronLeft, IconChevronRight, IconPhoto, IconPrinter, IconCameraSelfie } from '@tabler/icons';

const keys = ["序号", "代码", "名称", "总市值", "最新价", "涨跌幅", "成交额", "换手率", "60日涨跌幅", "年初至今涨跌幅"]

function StockPool() {

  const { useStockPoolStore } = useStore()
  const [tempData, setTempData] = useState({
    data: [], pageNum: 1, pageSize: 10, total: 0
  })
  const [marketValueOption, setMarketValueOption] = useState('');
  const theme = useMantineTheme();
  const getColor = (color) => theme.colors[color][theme.colorScheme === 'dark' ? 5 : 7];

  const pageData = (pageNum, pageSize = 10) => {
    return useStockPoolStore.poolData.slice((pageNum - 1) * pageSize, pageNum * pageSize)
  }

  const modifyPage = (pageNum) => {
    const data = pageData(pageNum)
    setTempData(Object.assign({}, tempData, { data: data, pageNum: pageNum }))
  }

  const marketValue = (min, max) => {
    const billion = 10 * 10000 * 10000
    const conditionData = useStockPoolStore.poolData.filter(obj => (obj.总市值 / billion).toFixed(2) <= max && (obj.总市值 / billion).toFixed(2) >= min)
    useStockPoolStore.setConditionData(conditionData)
    setTempData(Object.assign({}, tempData, { data: conditionData.slice(0, 10), pageNum: 1, total: conditionData.length }))
  }

  useEffect(() => {
    console.log("render2");
    if (useStockPoolStore.poolData.length == 0) {
      AllCompanyApi().then(res => {
        let originalData = res.data
        useStockPoolStore.init(originalData)
        console.log(originalData.slice(0, 10));
        setTempData(Object.assign({}, tempData, { data: pageData(1, 10), total: originalData.length }))
      })
    } else {
      console.log("缓存中获取");
      setTempData(Object.assign({}, tempData, { data: pageData(1, 10), total: useStockPoolStore.poolData.length }))
      console.log(tempData);
    }
  }, [])

  useEffect(() => {
    switch (marketValueOption) {
      case '1':
        marketValue(0, 5)
        break
      case '2':
        marketValue(5, 15)
        break
      case '3':
        marketValue(15, 50)
        break
      case '4':
        marketValue(50, 100)
        break
      case '5':
        marketValue(100, 3000)
        break
    }

  }, [marketValueOption])

  const ths = (
    <tr>
      {keys.map(k => <th key={k}>{k}</th>)}
    </tr>
  );

  const rows = tempData.data.map((element) => (
    <tr key={element.序号}>
      {
        keys.map(k => {
          if (k != '总市值' && k != '成交额') {
            return <td key={element.序号 + k}>
              {k.indexOf('涨跌幅') != -1 && Reflect.get(element, k) + '%'}
              {k.indexOf('涨跌幅') == -1 && Reflect.get(element, k)}
            </td>
          } else {
            return (
              <td key={element.序号 + k}>
                {(Reflect.get(element, k) / 10000 / 10000).toFixed(2) + ' 亿'}
              </td>
            )
          }
        })
      }
    </tr>
  ))


  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Container size="xl" pt={30} pb={30}>
        <Container size="lg" pt={20} pb={20}>
          <Accordion variant="contained">
            <Accordion.Item value="photos">
              <Accordion.Control icon={<IconPhoto size={20} color={getColor('red')} />}>
                筛选
              </Accordion.Control>
              <Accordion.Panel>
                <Chip.Group position="left" value={marketValueOption} onChange={setMarketValueOption} >
                  <Chip value='1'>低于50亿</Chip>
                  <Chip value='2'>50~150亿</Chip>
                  <Chip value='3'>150~500亿</Chip>
                  <Chip value='4'>500~1000亿</Chip>
                  <Chip value='5'>1000亿以上</Chip>
                </Chip.Group>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Container>

        <Group position="center" spacing="xl">
          <ActionIcon size={42} variant="gradient" gradient={{ from: 'orange', to: 'red' }} radius={'50%'}
            onClick={() => modifyPage(tempData.pageNum - 1)}
            disabled={tempData.pageNum === 1}
          >
            <IconChevronLeft size={48} />
          </ActionIcon>
          <Table highlightOnHover verticalSpacing="md" style={{ width: '80%' }} >
            <thead>
              {ths}
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>
          <ActionIcon size={42} variant="gradient" gradient={{ from: 'orange', to: 'red' }} radius={'50%'}
            onClick={() => modifyPage(tempData.pageNum + 1)}
          >
            <IconChevronRight size={48} />
          </ActionIcon>
        </Group>

      </Container>
    </div>
  )
}

export default observer(StockPool)