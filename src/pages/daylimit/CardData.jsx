import { Card, Badge, Text, Tabs, Group, Image, SimpleGrid } from '@mantine/core';
import SText from '../../components/SText';


function CardData(props) {

  const obj = props.data

  return (
    <div style={{ width: '280px', margin: '20px' }}>
      <Card withBorder shadow="sm" radius="md" p="lg" >
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

        {/* <Tabs color="cyan" defaultValue="messages">
        <Tabs.List>
          <Tabs.Tab value="messages" >简介</Tabs.Tab>
          <Tabs.Tab value="settings" >数据查询</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="messages" pt="xs">
          这是一个简介
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          展示一些数据，可以进行查询
        </Tabs.Panel>
      </Tabs> */}

      </Card>
    </div>
  );
}

export default CardData