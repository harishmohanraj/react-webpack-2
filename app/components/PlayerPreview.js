var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props) {
    return(
        <div>
            <div className='column'>
                <img
                    className='avator'
                    src={props.avator}
                    alt={'Avatar form '+ props.username} />
                <h2 className='username'></h2>
            </div>
            {props.children}
        </div>
    )
}

PlayerPreview.PropTypes = {
    avator: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}

module.exports = PlayerPreview