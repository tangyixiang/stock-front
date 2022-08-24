import { Card, Badge, Text, Tabs, Group, ActionIcon, Button, Modal } from '@mantine/core';
import { createContext, useState } from 'react';
import CompanyInfo from '../../components/CompanyInfo';
import SText from '../../components/SText';

export const CardContext = createContext({})

function CardData(props) {

  const obj = props.data
  const [opened, setOpened] = useState(false);


  return (
    <div style={{ width: '280px', margin: '20px' }}>
      <CardContext.Provider value={obj}>
        <Card withBorder shadow="sm" radius="sm" p="lg" >
          {/* <Card.Section withBorder inheritPadding py="xs">
          <Text weight={500}>
            <span>这是名称</span>
            <span style={{ marginLeft: '10%' }}>
              <Badge variant="gradient" gradient={{ from: 'orange', to: 'red' }}>分类</Badge>
            </span>
          </Text>
        </Card.Section> */}
          <Card.Section withBorder inheritPadding py="xs">
            <Text weight={500}>
              <span>{obj.代码}-{obj.名称}</span>
              <span style={{ marginLeft: '10%' }}>
                <Badge variant="gradient" gradient={{ from: 'orange', to: 'red' }}>{obj.所属行业}</Badge>
              </span>
            </Text>
          </Card.Section>

          <Group position="apart" mt="md" mb="xs" >
            <SText k="最新价" object={obj}></SText>
            <SText k="涨跌幅" object={obj} fixed></SText>
            <SText k="总市值" object={obj} convert></SText>
            <SText k="成交额" object={obj} convert></SText>
            <SText k="换手率" object={obj} fixed></SText>
          </Group>

          <Card.Section withBorder inheritPadding py="md">
            <Group position="apart" mt="md" mb="xs" >
              <SText k="封板资金" object={obj} convert></SText>
              <SText k="连板数" object={obj}></SText>
              <SText k="涨停统计" object={obj}></SText>
              <SText k="炸板次数" object={obj}></SText>
              <SText k="首次封板时间" object={obj} ></SText>
              <SText k="最后封板时间" object={obj} ></SText>
            </Group>
          </Card.Section>
          <Card.Section >
            <Group position="center" mt='xs' mb='xs'>
              <Button radius="xl" style={{ flex: 0.75 }} variant="gradient" gradient={{ from: 'orange', to: 'red' }}
                onClick={() => setOpened(true)}>
                查看详情
              </Button>
            </Group>
          </Card.Section>
        </Card>
        <Modal opened={opened}
          size='60%'
          onClose={() => setOpened(false)}
          title={<Text size={24} weight={600} >{obj.名称}</Text>}
        >
          <CompanyInfo data={obj} />
        </Modal>
      </CardContext.Provider>
    </div>
  );
}

export default CardData