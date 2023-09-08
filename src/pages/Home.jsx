import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';

const formatter = (value) => <CountUp end={value} separator="," />;

const Home = () => {
  return (
    <Col span={24}>
      <Row gutter={16}>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic  
            title="Clientes Totales"
            value={325}
            precision={2}
            valueStyle={{
              color: '#3f8600',
            }}
            prefix={<UserSwitchOutlined />}
            suffix="%"
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Clientes Activos"
            value={297}
            precision={2}
            valueStyle={{
              color: '#cf1322',
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      </Row>
      <Row gutter={16}>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Total Recaudado"
            value={11.28}
            precision={2}
            valueStyle={{
              color: '#3f8600',
            }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
          <Statistic
            title="Planes Activos"
            value={9.3}
            precision={2}
            valueStyle={{
              color: '#cf1322',
            }}
            prefix={<ArrowDownOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
    </Col>
    
  )
}

export default Home;
