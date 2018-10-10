import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Questions from './Questions';
import SignUp from './SignUp';
import Login from './Login';
import MyBets from './MyBets';
import Admin from './Admin';
import { About, Contact, Faq, Help, NoMatch } from './StaticPages';
import { Container } from 'reactstrap';
import { Store } from './store';
import { Provider } from 'react-redux';
import './index.css';
//import registerServiceWorker from './registerServiceWorker';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout>
      <Component {...props} />
    </Layout>
  )} />
)

const MainLayout = props => (
  <div>
    <Header />
    <Container className="mainLayout">
      {props.children}
    </Container>
    <Footer />
  </div>
)

ReactDOM.render((
  <Provider store={Store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/questions/all"/>)} />
          <AppRoute path="/about" layout={MainLayout} component={About} />
          <AppRoute path="/contact" layout={MainLayout} component={Contact} />
          <AppRoute path="/faq" layout={MainLayout} component={Faq} />
          <AppRoute path="/help" layout={MainLayout} component={Help} />
          <AppRoute path="/mybets" layout={MainLayout} component={MyBets} />
          <AppRoute path="/questions/:category" layout={MainLayout} component={Questions} />
          <AppRoute path="/signup" layout={MainLayout} component={SignUp} />
          <AppRoute path="/login" layout={MainLayout} component={Login} />
          <AppRoute path="/admin" layout={MainLayout} component={Admin} />
          <AppRoute layout={MainLayout} component={NoMatch} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))
//registerServiceWorker();
