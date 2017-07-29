/**
 * Created by ankush on 7/29/17.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Template from '../containers/Template';
import DigitRec from '../containers/DigitRec';
import Profile from '../containers/Profile';


const createRouter = () => {

    return(
        <Route path="/" component={Template}>
                <IndexRoute component={DigitRec}/>
                <Route component={Profile} path="/profile"/>
        </Route>
    );
};

const Routes = createRouter();
export default Routes;