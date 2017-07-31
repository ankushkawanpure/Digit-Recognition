/**
 * Created by ankush on 7/29/17.
 */

import React from 'react';
import Canvas from '../components/canvas'

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


export default class DigitRec extends  React.Component {

    render() {
        return(
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography type="title" color="inherit">
                            Digits Recognition
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Canvas/>
            </div>
        );
    }

}