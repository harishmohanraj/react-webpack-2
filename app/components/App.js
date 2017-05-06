var React = require('react');
var Popular = require('./Popular');
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends React.Component{
    render() {
        return(
            <Router>
                <div className='container'>
                    <Nav /> 
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/battle" component={Battle} />
                        <Route path="/popular" component={Popular} />
                        <Route render = {() => <p>Not a valid Route</p>} />
                    </Switch>
                </div>
            </Router>

        )
    }
}

module.exports = App;