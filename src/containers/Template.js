/**
 * Created by ankush on 7/29/17.
 */
import React from 'react';

import { MuiThemeProvider} from 'material-ui/styles';
import createMuiTheme from 'material-ui/styles/theme';
import Reacttapeventplugin from 'react-tap-event-plugin';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const theme = createMuiTheme();

Reacttapeventplugin();

export default class Template extends  React.Component {

    render() {
        return(
            <MuiThemeProvider theme={theme}>
                <div>
                    <header>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography type="title" color="inherit">
                                    Handwriting Recognition
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </header>

                    <main>
                        {this.props.children}
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }

}