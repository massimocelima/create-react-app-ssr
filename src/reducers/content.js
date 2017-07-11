import {GLOBAL_CONTENT_LOADED, PAGE_CONTENT_LOADED} from '../actions'

const initialState = {
    global: null,
    page: null,
}

const content = (state = initialState, action) => {
    switch (action.type) {
        case GLOBAL_CONTENT_LOADED:
            return {
                ...state,
                global: action.payload.globalContent
            }
        case PAGE_CONTENT_LOADED:
            return {
                ...state,
                page: action.payload.content
            }
        default:
            return state
    }
}

export default content
