import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import AppHeader from '../shared/components/header';
import CategoryList from '../shared/components/categoryList';

const LoginForm = lazy(() => import('../features/loginForm'));
const Home = lazy(() => import('../features/home'));
const CouponDetails = lazy(() => import('../features/couponDetails'));
const CategoryView = lazy(() => import('../features/categoryView'));
const AdminDashboard = lazy(() => import('../features/adminDashboard'));
const NotFound = lazy(() => import('../features/notFound'));

export default function RouterComponent({ darkMode, changeTheme }) {
    return (
        <Router>
            <AppHeader darkMode={darkMode} changeTheme={changeTheme} />
            <Container>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <MyRoute exact path="/" component={Home} />
                        <MyRoute exact path="/login" render={() => (
                            sessionStorage.getItem('TOKEN') ? <Redirect to="/" /> : <LoginForm />
                        )} />
                        <MyRoute exact path="/couponDetails/:couponID" component={CouponDetails} />
                        <MyRoute exact path="/categoryView/:categoryId" component={CategoryView} />
                        <Route exact path="/admin" render={() => (
                            sessionStorage.getItem('ADMIN') ? <AdminDashboard /> : <Redirect to="/login" />
                        )} />
                        <Route exact path="/*" component={NotFound} />
                    </Switch>
                </Suspense>
            </Container>
        </Router>
    )
}

const MyRoute = AddCategoryList(Route);

function AddCategoryList(Component) {
    return function (props) {
        return(
            <React.Fragment>
                <CategoryList />
                <Component {...props} />
            </React.Fragment>
        )
    }
}