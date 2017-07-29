/**
 * Created by ankush on 7/29/17.
 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Reacttapeventplugin from 'react-tap-event-plugin';

Reacttapeventplugin();

export default class Template extends  React.Component {

    render() {
        return(
            <MuiThemeProvider>
                <div>
                    <header>
                        Ankush Kawanpure
                    </header>

                    <main>
                        {this.props.children}
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }

}