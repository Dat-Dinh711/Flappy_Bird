function game(state = {}, {type}) {
    switch(type) {
        case 'START':
            return {
                ...state,
                status: 'playing'
            }
        case 'GAME_OVER':
            return {
                ...state,
                status: 'game_over'
            }
        default:
            return state
    }
}

export default game