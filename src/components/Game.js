import { useEffect } from 'react'
import {connect} from 'react-redux'

import Bird from "./Bird"
import Pipe from "./Pipe"
import Foreground from "./Foreground"
import Background from '../images/bg.png'

let gameLoop
let pipeGenerator

const Game = ({status, start, fly}) => {
    if(status === 'game_over') {
        clearInterval(gameLoop)
        clearInterval(pipeGenerator)
    }
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.keyCode === 32) {
                fly()
            }
    
            start()
        }
    
        document.addEventListener('keypress', handleKeyPress)
      }, [])

    console.log(status)

    return (
        <div
            style={{
                position: 'relative',
                width: 288,
                height: 512,
                background: `url(${Background})`,
                overflow: 'hidden'
            }}
        >
            <Bird/>
            <Pipe/>
            <Foreground/>
        </div>
    )
}

const fly = () => {
    return (dispatch) => {
        dispatch({type: 'FLY'})
    }
}

const start = () => {
    return (dispatch, getState) => {
        const {status} = getState().game

        if(status !== 'playing') {
            gameLoop = setInterval(() => {
                dispatch({type: 'FALL'})
                dispatch({type: 'RUNNING'})

                check(dispatch, getState)
            }, 300)

            pipeGenerator = setInterval(() => {
                dispatch({type: 'GENERATE'})
            }, 3000)

            dispatch({type: 'START'})
        }
    }
}

const check = (dispatch, getState) => {
    const state = getState()
    const birdY = state.bird.y
    const pipes = state.pipe.pipes
    const x = state.pipe.x

    const challenge = pipes.map(({topHeight}, index) => {
        return {
            x1: x + index * 200,
            y1: topHeight,
            x2: x + index * 200,
            y2: topHeight + 100,
        }
    }).filter(({x1}) => {
        if(x1 > 0 && x1 < 288) {
            return true
        }
    })

    if(birdY > 512 - 108) {
        dispatch({type: 'GAME_OVER'})
    }

    if(challenge.length) {
        const {x1, y1, x2, y2} = challenge[0]

        if(
            (x1 < 120 && 120 < x1 + 52 && birdY < y1) ||
            (x2 < 120 && 120 < x2 + 52 && birdY > y2)
        ) {
            dispatch({type: 'GAME_OVER'})
        }
    }
}

const mapStatetoProps = ({game}) => ({status: game.status})
const mapDispatchToProps = {start, fly}

export default connect(mapStatetoProps, mapDispatchToProps)(Game)