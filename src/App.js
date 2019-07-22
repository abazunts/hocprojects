import React from 'react';
import './App.css';
import {compose} from 'redux'

function App() {
    return (
        <div className="App">
            <GirlCompose/>
            <ManCompose/>
        </div>
    );
}

let Man = (props) => {
    return <div>Man - - {props.age}</div>
};

let Girl = (props) => {
    return <div>Girl - {props.age}</div>
};


let Hoc = (theme) => (Component) => {
    return (props) => {
        return <div className={theme}>
            <div>HEADER</div>
            <Component {...props}/>
            <img style={{width: '400px'}}/>
            <div>FOOTER</div>
        </div>
    };


}

let withAgeTick = (ms) => (Component) => {

    return class extends React.Component {

        state = {
            age: 10,
        };

        componentDidMount() {
            setInterval(() => {
                this.setState({age: this.state.age + 1})
            }, ms)
        }

        render() {
            return <div>
                <Component age={this.state.age} {...this.props}/>
            </div>
        }
    };
};

let GirlHoc = Hoc('light')(Girl);
let ManHoc = Hoc('black')(Man);

let GirlContainer = withAgeTick(1000)(Girl);
let ManContainer = withAgeTick(2000)(Man);


let GirlCompose = compose(
    withAgeTick(1000),
    Hoc('light')
)(Girl);

let ManCompose = compose(
    withAgeTick(2000),
    Hoc('black')
)(Man);

export default App;
