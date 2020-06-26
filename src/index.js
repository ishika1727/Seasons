import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Loader from './Loader';

class App extends React.Component {

    state = {
        lat: null,
        errmsg: ""
    };

    componentDidMount() {
        console.log("rendered");
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errmsg: err.message }));
    }

    componentDidUpdate() {
        console.log("update");
    }

    renderContent() {
        if (this.state.errmsg && !this.state.lat) {
            return <div> Error: {this.state.errmsg}</div>
        }
        else if (!this.state.errmsg && this.state.lat) {
            return <SeasonDisplay lat={this.state.lat} />
        }
        return <Loader msg="Please accept location request" />

    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));