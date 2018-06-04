import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Input,
  Modal,
} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './Schema.less';

const { Search } = Input;

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
export default class Schema extends PureComponent {
  state = {
    applicationModalVisible: false,
  };

  componentDidMount() {
    // const { dispatch } = this.props;
    // dispatch({
    //   type: 'rule/fetch',
    // });
  }

  showApplicationModal = () => {
    this.setState({
      applicationModalVisible: true,
    });
  };

  hideApplicationModal = () => {
    this.setState({
      applicationModalVisible: false,
    });
  };

  submitApplicationData = () => {

  };

  render() {
    const appColumns = [
      {
        title: '应用名',
        dataIndex: 'name_cn',
        key: 'app_name_cn',
      }, {
        title: '英文名',
        dataIndex: 'name_en',
        key: 'app_name_en',
      }, {
        title: '所有者',
        dataIndex: 'owner',
        key: 'app_owner',
      }, {
        title: '最后更新人',
        dataIndex: 'updater',
        key: 'app_updater',
      }, {
        title: '操作',
        key: 'app_operating',
        render: (text, record) => (
          <span className={styles.tableOperatingButton}>
            <Button type="primary" ghost>查看模块</Button>
            <Button type="primary" ghost>编辑</Button>
            <Button type="danger" ghost>删除</Button>
          </span>
        ),
      },
    ];

    const appData = [
      {
        key: '1',
        name_cn: '518活动',
        name_en: '518activity',
        owner: '张文',
        updater: '张文',
      }, {
        key: '2',
        name_cn: '519活动',
        name_en: '519activity',
        owner: '张文',
        updater: '东东',
      }, {
        key: '3',
        name_cn: '520活动',
        name_en: '520activity',
        owner: '涛涛',
        updater: '涛涛',
      }, {
        key: '4',
        name_cn: '521活动',
        name_en: '521activity',
        owner: 'Alen',
        updater: 'Alen',
      }, {
        key: '5',
        name_cn: '522活动',
        name_en: '522activity',
        owner: '张文',
        updater: '张文',
      },
    ];

    const moduleColumns = [
      {
        title: '模块名',
        dataIndex: 'name_cn',
        key: 'module_name_cn',
      }, {
        title: '英文名',
        dataIndex: 'name_en',
        key: 'module_name_en',
      }, {
        title: '最后更新人',
        dataIndex: 'updater',
        key: 'module_updater',
      }, {
        title: '操作',
        key: 'module_operating',
        render: (text, record) => (
          <span className={styles.tableOperatingButton}>
            <Button type="primary" ghost>编辑</Button>
            <Button type="primary" ghost>停用</Button>
            <Button type="danger" ghost>删除</Button>
          </span>
        ),
      },
    ];

    const moduleData = [
      {
        key: '1',
        name_cn: '518活动模块1',
        name_en: '518activity1',
        updater: '张文',
      }, {
        key: '2',
        name_cn: '518活动模块2',
        name_en: '518activity2',
        updater: '东东',
      }, {
        key: '3',
        name_cn: '518活动模块3',
        name_en: '518activity3',
        updater: '涛涛',
      }, {
        key: '4',
        name_cn: '518活动模块4',
        name_en: '518activity4',
        updater: 'Alen',
      }, {
        key: '5',
        name_cn: '518活动模块5',
        name_en: '518activity5',
        updater: '张文',
      }, {
        key: '6',
        name_cn: '518活动模块5',
        name_en: '518activity5',
        updater: '张文',
      }, {
        key: '7',
        name_cn: '518活动模块5',
        name_en: '518activity5',
        updater: '张文',
      }, {
        key: '8',
        name_cn: '518活动模块5',
        name_en: '518activity5',
        updater: '张文',
      }, {
        key: '9',
        name_cn: '518活动模块5',
        name_en: '518activity5',
        updater: '张文',
      }, {
        key: '10',
        name_cn: '518活动模块5',
        name_en: '518activity5',
        updater: '张文',
      }, {
        key: '11',
        name_cn: '518活动模块5',
        name_en: '518activity5',
        updater: '张文',
      },
    ];

    const paramColumns = [
      {
        title: '展示名',
        dataIndex: 'title',
        key: 'param_title',
      }, {
        title: '请求参数名',
        dataIndex: 'name',
        key: 'param_name',
      }, {
        title: '最后更新人',
        dataIndex: 'updater',
        key: 'param_updater',
      }, {
        title: '操作',
        key: 'param_operating',
        render: (text, record) => (
          <span className={styles.tableOperatingButton}>
            <Button type="primary" ghost>编辑</Button>
            <Button type="danger" ghost>删除</Button>
          </span>
        ),
      },
    ];

    const paramData = [
      {
        key: '1',
        title: '活动城市',
        name: 'city',
        updater: '张文',
      }, {
        key: '2',
        title: '活动类型',
        name: 'type',
        updater: '张文',
      },
    ];

    return (
      <PageHeaderLayout title="Schema管理">
        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="应用列表"
            >
              <div className={styles.tableList}>
                <div className={styles.tableListOperator}>
                  <Button icon="plus" type="primary" onClick={() => this.showApplicationModal()}>
                    新建应用
                  </Button>
                  <Modal
                    title="Basic Modal"
                    visible={this.state.applicationModalVisible}
                    onOk={this.hideApplicationModal}
                    onCancel={this.hideApplicationModal}
                  >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                  </Modal>
                  <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                    添加权限
                  </Button>
                  <Search
                    placeholder="请输入应用名"
                    onSearch={value => console.log(value)}
                    enterButton
                    style={{ width: 300 }}
                  />
                </div>
                <Table columns={appColumns} dataSource={appData} />
              </div>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="参数列表"
            >
              <div className={styles.tableList}>
                <div className={styles.tableListOperator}>
                  <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                    新建参数
                  </Button>
                </div>
                <Table
                  columns={paramColumns}
                  dataSource={paramData}
                  pagination={false}
                />
              </div>
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              title="模块列表"
              style={{ marginTop: 24 }}
            >
              <div className={styles.tableList}>
                <div className={styles.tableListOperator}>
                  <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                    新建模块
                  </Button>
                </div>
                <Table columns={moduleColumns} dataSource={moduleData} />
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
