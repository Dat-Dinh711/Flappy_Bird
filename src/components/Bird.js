import {connect} from 'react-redux'

import FlappyBird from '../images/flappybird.png'

function Bird({y, r}) {
    return (
        <div
            style={{
                position: 'absolute',
                top: y,
                left: 120,
                width: 38,
                height: 26,
                background: `url(${FlappyBird})`,
                transform: `rotate(${r}deg)`,
                transition: 'transform 200ms, top 200ms'
            }}
        >
        </div>
    )
}

const mapStateToProps = ({bird}) => ({
    y: bird.y,
    r: bird.r
})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Bird)