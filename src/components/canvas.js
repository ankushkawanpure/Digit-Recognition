/**
 * Created by ankush on 7/29/17.
 */
import React, { Component } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import ImageProcessor from '../util/ImageAnalyser';

const styleSheet = createStyleSheet(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },

    grid: {
        textAlign: 'center',
        margin: 'auto'
    },

    paper: {
        padding: 16,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

class Canvas extends Component {


    constructor(props, context) {
        super(props, context);

        this.prevX = 0;
        this.currX = 0;
        this.prevY = 0;
        this.currY = 0;
        this.paths = []; // recording paths
        this.paintFlag = false;
        this.lineWidth = 40; // this value cannot be small


        this.state = {
            pred: 0
        }
    }

    componentDidMount() {

        this.canvas = this.refs.canvas;
        this.ctx = this.canvas.getContext("2d");

        let that = this;

        this.canvas.addEventListener("mousemove", function (e) {
            that.drawing('move', e);
        }, false);

        this.canvas.addEventListener("mousedown", function (e) {
            that.onClear();
            that.drawing('down', e);
        }, false);

        this.canvas.addEventListener("mouseup", function (e) {
            that.drawing('up', e);
            that.onRecognize();
        }, false);

        this.canvas.addEventListener("mouseout", function (e) {
            that.drawing('out', e);
        }, false);

        this.result = this.refs.result;
    }

    drawing(res, e) {
        let canvas = this.canvas;
        let ctx = this.ctx;

        if (res === 'down') {
            if (e.pageX !==undefined && e.pageY !== undefined) {
                this.currX = e.pageX-canvas.offsetParent.offsetLeft-canvas.offsetLeft;
                this.currY = e.pageY-canvas.offsetParent.offsetTop-canvas.offsetTop;
            } else {
                this.currX = e.clientX + document.body.scrollLeft
                    + document.documentElement.scrollLeft
                    - canvas.offsetLeft;
                this.currY = e.clientY + document.body.scrollTop
                    + document.documentElement.scrollTop
                    - canvas.offsetTop;
            }
            //draw a circle
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.arc(this.currX,this.currY, this.lineWidth/2,0,2*Math.PI);
            ctx.stroke();
            ctx.closePath();
            ctx.fill();

            this.paths.push([[this.currX], [this.currY]]);
            this.paintFlag = true;
        }
        if (res === 'up' || res === "out") {
            this.paintFlag = false;
        }

        if (res === 'move') {
            if (this.paintFlag) {
                // draw a line to previous point
                this.prevX = this.currX;
                this.prevY = this.currY;
                if (e.pageX !== undefined && e.pageY !== undefined) {
                    this.currX = e.pageX-canvas.offsetParent.offsetLeft-canvas.offsetLeft;
                    this.currY = e.pageY-canvas.offsetParent.offsetTop-canvas.offsetTop;
                } else {
                    this.currX = e.clientX + document.body.scrollLeft
                        + document.documentElement.scrollLeft
                        - canvas.offsetLeft;
                    this.currY = e.clientY + document.body.scrollTop
                        + document.documentElement.scrollTop
                        - canvas.offsetTop;
                }
                let currPath = this.paths[this.paths.length-1];
                currPath[0].push(this.currX);
                currPath[1].push(this.currY);
                this.paths[this.paths.length-1] = currPath;
                this.drawline(ctx, "black", this.lineWidth, this.prevX, this.prevY, this.currX, this.currY);
            }
        }
    }

    drawline(ctx, color, lineWidth, x1, y1, x2, y2) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }

    onRecognize() {
        let canvasCopy = document.createElement("canvas");
        let canvasData = {
            canvas: this.canvas,
            canvasCopy: canvasCopy,
            paths: this.paths
        };

        let imageProcessor = new ImageProcessor(canvasData);
        let prediction = imageProcessor.analyseImage();
        console.log(prediction);

        this.setState({
            pred:prediction
        });

    }

    onClear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.paths = [];
    }


    render() {
        const classes = this.props.classes;
        const canvasStyle = {
            top: '10%',
            left: '10%',
            border: '2px solid'
        };

        return (
            <div className={classes.root}>
                <Grid container gutter={8}>

                    {/*<Grid item xs={12} sm={3}>*/}
                        {/*<Paper className={classes.paper} style={{height:408}}>*/}
                            {/*<canvas id="result" ref="result" width={200} height={200}></canvas>*/}
                        {/*</Paper>*/}
                    {/*</Grid>*/}

                    <Grid className={classes.grid} item xs={12} sm={9}>
                        <Paper className={classes.paper}>
                            <canvas id="canvas" ref="canvas" width={400} height={400} style={canvasStyle}></canvas>
                        </Paper>
                    </Grid>


                    {/*<Grid item xs={12} sm={3}>*/}
                        {/*<Paper className={classes.paper}>*/}
                            {/*Looks like: {this.state.pred}*/}
                        {/*</Paper>*/}
                    {/*</Grid>*/}
                    <Grid className={classes.grid} item xs={12} sm={9}>
                        <Paper className={classes.paper}>
                            <Button raised color="primary" className={classes.button} onTouchTap={() => {this.onRecognize();}} style={{width: 200}}>
                                Recognize
                            </Button>
                            <Button raised color="primary" className={classes.button} onTouchTap={() => {this.onClear();}} style={{width: 200}}>
                                Clear
                            </Button>
                        </Paper>
                    </Grid>

                    {/*<Grid item xs={12} sm={6}>*/}
                        {/*<Paper className={classes.paper}>*/}
                            {/*<Button raised color="primary" className={classes.button} onClick={() => {this.onClear();}} style={{width: 200}}>*/}
                                {/*Clear*/}
                            {/*</Button>*/}
                        {/*</Paper>*/}
                    {/*</Grid>*/}


                    <Grid className={classes.grid} item xs={12}>
                        <Paper className={classes.paper}>
                            Looks like: {this.state.pred}
                        </Paper>
                    </Grid>

                </Grid>

            </div>

        );
    }
}

export default withStyles(styleSheet) (Canvas);
