import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import P5Wrapper from 'react-p5-wrapper';
import firebase from "./utils/firebase";

let sketch = (p) => {
    let canvas;
    let targetX = 150;
    let targetY = 100;
    let x1 = 0;
    let x2 = 0;
    let x3 = 0;
    let y1 = 0;
    let y2 = 0;
    let y3 = 0;
    let r1 = 0;
    let r2 = 0;
    let r3 = 0;
    let xt = 0;
    let yt = 0;
    let rt = 0
    let xb = 0;
    let yb = 0;

    p.setup = () => {
        canvas = p.createCanvas(100, 100);
        // p.noStroke();
    }

    p.draw = () => {
        p.background('#f1f1f1');
        
        p.fill("#f1f1f1")
        p.strokeWeight(1);

        p.stroke(255, 204, 0);
        p.ellipse(x1, y1, r1);

        p.stroke(64, 0, 255)
        p.ellipse(x2, y2, r2);

        p.stroke('red')
        p.ellipse(x3, y3, r3);
        // p.noStroke();
       p.stroke('purple')
        p.ellipse(targetX, targetY, 1);

      

        p.stroke('green')
        p.ellipse(xb, yb, 1);

        p.stroke('yellow')
        p.ellipse(xt, yt, 1);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
        targetX = newProps.targetX;
        targetY = newProps.targetY;

        x1 = newProps.phones.x1;
        x2 = newProps.phones.x2;
        x3 = newProps.phones.x3;
        y1 = newProps.phones.y1;
        y2 = newProps.phones.y2;
        y3 = newProps.phones.y3;
        r1 = newProps.phones.r1 * 2;
        r2 = newProps.phones.r2 * 2;
        r3 = newProps.phones.r3 * 2;

        let A = (2 * x2) - (2 * x1);
        let B = (2 * y2) - (2 * y1);
        let C = (r1 ** 2) - (r2 ** 2) - (x1 ** 2) + (x2 ** 2) - (y1 ** 2) + (y2 ** 2);
        let D = (2 * x3) - (2 * x2);
        let E = (2 * y3) - (2 * y2);
        let F = (r2 ** 2) - (r3 ** 2) - (x2 ** 2) + (x3 ** 2) - (y2 ** 2) + (y3 ** 2);

        if (E * A - B * D != 0 && B * D - A * E != 0) {
            xt = Math.abs((C * E - F * B) / (E * A - B * D))
            yt = Math.abs((C * D - A * F) / (B * D - A * E))
        } else {
            xt = 0;
            yt = 0;
        }
        console.log("test!");
        console.log("Prediction X: " + xt);
        console.log("Prediction Y: " + yt);
        
        if (xb == undefined || yb == undefined) {
            xb = 0;
            yb = 0;
        } else {
            xb = newProps.beacon.x;
            yb = newProps.beacon.y;
        }
   
        console.log(xb);
        console.log(yb);
    }
}
class App extends Component {

    componentDidMount() {
        // firebase.getTarget()
        //     .then((val) => {
        //         console.log(val.val())
        //         this.setState({
        //             targetX: val.val().x,
        //             targetY: val.val().y
        //         })
        //     });

        let ref = firebase.listenToPhones();
        let beacon = firebase.getBeaconLocation();
        let target = firebase.getTargetLocation();

        let ev = ref.on('value', (snapshot) => {
            this.setState({
                ...this.state,
                phones: snapshot.val()
            });
        });

        let ev3 = beacon.on('value', (snapshot) => {
            console.log(snapshot.val())
            this.setState({
                ...this.state,
                beacon: snapshot.val()
            });
        });

        let targetListener = target.on('value', (snapshot) => {
            this.setState({
                ...this.state,
                targetX: snapshot.val().x,
                targetY: snapshot.val().y
            })
        });
    }
    constructor() {
        super();

        this.state = {
            targetX: 0,
            targetY: 0,
            phones: {
            },
            beacon: {
                x: 0,
                y: 0,
            }
        }
    }

    render() {
        return (
            <>
                <h1>Testing</h1>
                <P5Wrapper className="sketch" sketch={sketch} {...this.state}></P5Wrapper>
            </>
        )
    }
}
export default App;
