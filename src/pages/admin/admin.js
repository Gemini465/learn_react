import React, { Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import Loading from '../../components/loading';
// import store from '../../util/storeUtils'
import LeftNav from '../../redux/container/sideMenu';
import Home from '../home/home';
import User from '../user/user';
import Hook from '../hooks/customText';
import FileOp from '../opFile/index';
import VirtualDom from '../VirtualDom';
import { useHistory } from 'react-router-dom';

const { Sider, Content } = Layout;

const Admin = () => {
  const { pathname } = useHistory().location;
  useEffect(() => {
		console.log(pathname);
  }, [pathname]);
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider>
        <LeftNav />
      </Sider>
      <Layout>
        <Content style={{ margin: '15px', background: '#fff' }}>
          <Suspense fallback={<Loading />}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/home' component={Home} />
              <Route path='/http_user' component={User} />
              <Route path='/GraphQL_CRUD' component={User} />
              <Route path='/virtualDom' component={VirtualDom} />
              <Route path='/hooks' component={Hook} />
              <Route path='/aboutFile' component={FileOp} />
            </Switch>
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default connect(
  state => ({
    userInfo: state.login
  }),
  null
)(Admin);
