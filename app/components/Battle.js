var React = require('react');
var PropTypes = require('prop-types');
var NavLink = require('react-router-dom').NavLink;
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component{
    constructor(props) {
        super(props)
        this.state={
            userName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;

        this.setState(function() {
            return {
                userName: value
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(
            this.props.id,
            this.state.userName
        )
    }

    render() {
        return(
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor="userName">
                    {this.props.label}
                </label>
                <input
                    id='userName'
                    placeholder='Github Username'
                    type='text'
                    autoComplete='off'
                    value={this.state.userName}
                    onChange={this.handleChange}
                />
                <button 
                    type='submit'
                    className='button'
                    disabled={!this.state.userName}
                > 
                Submit
                </button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            playerOneName: '',
            playerOneImage: null,
            playerTwoName: '',
            playerTwoImage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, username) {
        this.setState(function() {
            let newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';//`https://github.com/${username}.png?size=200`;
            return newState;
        });
    }

    handleReset(id) {
        this.setState(function() {
            return {
                [id+'Name']: '',
                [id+'Image']: null
            }
        })
    }

    render() {
        let playerOneName = this.state.playerOneName;
        let playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;
        var match = this.props.match;

        return(
            <div>
                <div className='row'>
                    {!playerOneName &&
                        <PlayerInput 
                            id="playerOne"
                            label="Player One"
                            onSubmit = {this.handleSubmit}
                        />
                    }
                    
                    {playerOneImage !== null && 
                        <PlayerPreview 
                            avator = {playerOneImage}
                            username = {playerOneName}
                        >
                            <button 
                                className='reset' 
                                onClick={this.handleReset.bind(null, 'playerOne')}
                                >Reset
                            </button>
                        </PlayerPreview>
                    }

                    {!playerTwoName &&
                        <PlayerInput 
                            id="playerTwo"
                            label="Player Two"
                            onSubmit = {this.handleSubmit}
                        />
                    }

                    {playerTwoImage !== null && 
                        <PlayerPreview 
                            avator = {playerTwoImage}
                            username = {playerTwoName}
                        >
                            <button 
                                className='reset' 
                                onClick={this.handleReset.bind(null, 'playerTwo')}
                            >Reset
                            </button>
                        </PlayerPreview>
                    }
                </div>
                
                {playerOneImage && playerTwoImage &&
                    <Link 
                        className='button'
                        to={{
                            pathname: match.url + '/results',
                            search: '?playerOneName=' + playerOneName + '&playerTwoName='  + playerTwoName
                        }}>
                        Battle
                    </Link>}
            </div>
        )
    }
}

module.exports = Battle;