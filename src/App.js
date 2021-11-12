import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './_app.scss';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomeScreen from './screens/homeScreen/HomeScreen';
import LoginScreen from './screens/loginScreen/LoginScreen';
import { useSelector } from 'react-redux';
import WatchScreen from './screens/watchScreen/WatchScreen';
import SearchScreen from './screens/searchScreen/SearchScreen';
import SubscriptionsScreen from './screens/subscriptionsScreen/SubscriptionsScreen';
import ChannelScreen from './screens/channelScreen/ChannelScreen';

const Layout = ({ children }) => {
  const [toggleSideBar, setToggleSidebar] = useState(false);
  const handleToggleSidebar = () => {
    setToggleSidebar(prevState => {
      return !prevState;
    });
  };
  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className='app__container' >
        <Sidebar toggleSideBar={toggleSideBar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className='app__main'>
          {children}
        </Container>
      </div>
    </>
  );
}

const App = () => {
  const { accessToken, loading } = useSelector(state => state.auth);
  const history = useHistory();
  useEffect(() => {
    if (!loading && !accessToken) {
      history.push('/auth');
    }
  }, [accessToken, history, loading]);

  return (
    <Switch>
      <Route exact path='/'>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>
      <Route exact path='/auth'>
        <LoginScreen />
      </Route>
      <Route exact path='/search/:query'>
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route exact path='/watch/:id'>
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>
      <Route exact path='/feed/subscriptions'>
        <Layout>
          <SubscriptionsScreen />
        </Layout>
      </Route>
      <Route exact path='/channel/:channelId'>
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>
      <Route>
        <Redirect to='/' />
      </Route>
    </Switch>
  );
}

export default App;
