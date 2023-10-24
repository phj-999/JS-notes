import React, { useEffect } from 'react';
import { Calendar, Col, Row } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';

import Counter from './Counter';
import TimeTravelObserver from './TimeTravelObserver';

function Home() {
  useEffect(() => console.log('Home render'), []);

  return (
    <div >
      <Row gutter={ 16 } >
        <Col span={ 12 }>
          <Row>
            <Col span={ 10 }>
              <h2>计数器</h2>
              <Counter />
            </Col>
            <Col span={ 14 }>
              <h2>状态的时间旅行</h2>
              <TimeTravelObserver />
            </Col>
          </Row>
        </Col>
        <Col span={ 12 }>
          <Calendar fullscreen={false} value={moment()} />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
