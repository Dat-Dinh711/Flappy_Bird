const initialState = {
    x: 300,
    pipes: []
}

function pipe(state = initialState, {type} = {}) {
    switch(type) {
        case 'RUNNING':
            return {
                ...state,
                x: state.x - 10,
            }
        case 'GENERATE':
            const topHeight = Math.round(Math.random() * 200) + 40
            return {
                ...state,
                pipes: [
                    ...state.pipes,
                    {
                        topHeight
                    }
                ]
            }
        case 'GAME_OVER':
            return initialState
        default:
            return state;
    }
}

export default pipe