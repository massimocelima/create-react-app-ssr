export const GLOBAL_CONTENT_LOADED = 'GLOBAL_CONTENT_LOADED'
export const PAGE_CONTENT_LOADED = 'PAGE_CONTENT_LOADED'

export const globalContentLoaded = (globalContent) => {
    return {type: GLOBAL_CONTENT_LOADED, payload: {globalContent}}
}

export const pageContentLoaded = (content) => {
    return {type: PAGE_CONTENT_LOADED, payload: {content}}
}