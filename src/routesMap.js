import { redirect, NOT_FOUND } from 'redux-first-router'
import {globalContentLoaded, pageContentLoaded} from "./actions"

function fetchGlobalContent() { return {} }
function fetchContent(location) {
    return {alias: location.pathname.replace("/", "")}
}

function isRedirect(location) {
    return false;
}

export default {
    CONTENT: {
        path: '*',
        thunk: async (dispatch, getState) => {
            const { location, content } = getState()

            if( content.global === null ) {
                const globalContent = await fetchGlobalContent();
                dispatch(globalContentLoaded(globalContent))
            }

            const pageContent = await fetchContent(location);
            if(!pageContent) {
                return dispatch({type: NOT_FOUND})
            }

            if(isRedirect(location)) {
                dispatch(redirect({ type: 'HOME' }));
            }
            dispatch( pageContentLoaded(pageContent) )
        }
    },
}

export const options = {
    onBeforeChange: (dispatch, getState, action) => {
        //const allowed = isAllowed(action.type, getState())
        //if (!allowed) {
        //    const action = redirect({ type: 'LOGIN' })
        //    dispatch(action)
        //}
    },
    onAfterChange: (dispatch, getState) => {
    }
}
