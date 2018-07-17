import React from "react";
import ReactDOM from "react-dom";
import {createBrowserHistory} from "history";
import {Router, Route, Switch} from "react-router-dom";

import "assets/css/material-dashboard-react.css?v=1.3.0";

import indexRoutes from "routes/index.jsx";
import registerServiceWorker from './registerServiceWorker';
import AdvertDetail from "./views/Advert/AdvertDetail";
import ApplicantAdverts from "./views/Advert/ApplicantAdverts";
import AccessGranted from "./views/UserProfile/AccessGranted";

const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            {indexRoutes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={key}/>;
            })}
            {/*<Route name='/advertDetail' component={AdvertDetail} key={"99"}/>*/}
            {/*<Route name='/userAdverts' component={ApplicantAdverts} key={"999"}/>*/}
            {/*<Route name='/accessGranted' component={AccessGranted} key={"9999"}/>*/}
        </Switch>

    </Router>,
    document.getElementById("root")
);
registerServiceWorker();