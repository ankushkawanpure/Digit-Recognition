/**
 * Created by ankush on 7/29/17.
 */
import React from 'react';

export default class Template extends  React.Component {

    render() {
        return(
            <div>
                <header>
                    Ankush Kawanpure
                </header>

                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }

}