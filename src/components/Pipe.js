import {connect} from 'react-redux'

import BottomPipeImage from '../images/pipe-bottom.png'
import TopPipeImage from '../images/pipe-top.png'

function Pipe({x, pipes}) {
    return (
        <div
            style={{
                position: 'relative'
            }}
        >
            {
                pipes.map((pipes, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'relative'
                        }}
                    >
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: x + index * 200,
                            width: 52,
                            height: pipes.topHeight,
                            background: `url(${TopPipeImage})`,
                            backgroundPosition: 'bottom',
                            transition: 'left 200ms'
                        }}></div>
                        <div style={{
                            position: 'absolute',
                            top: pipes.topHeight + 100,
                            left: x + index * 200,
                            width: 52,
                            height: 512 - (pipes.topHeight + 100),
                            background: `url(${BottomPipeImage})`,
                            transition: 'left 200ms'
                        }}></div>
                    </div>
                )) 
            }
        </div>
    )
}

const mapStateToProps = ({pipe}) => ({
    x: pipe.x,
    pipes: pipe.pipes
})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Pipe)