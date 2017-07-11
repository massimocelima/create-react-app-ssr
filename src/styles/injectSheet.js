import {create as createJSS} from 'jss'
import {create as createInjectSheet} from 'react-jss'
import preset from 'jss-preset-default'

export const jss = createJSS(preset())

/**
 * Global index counter to preserve source order.
 * This is the exact same technique as used within the react-jss `createInjectSheet` implementation, but we need to
 * move it out of the library so we can use the same counter when we call createStyleSheet from jss core. Without this,
 * our createStyleSheet() sheets will always have higher specificity than injectSheet() sheets regardless of creation
 * order, because their default index is 0 (*far* higher than -100000).
 *
 * @type {Number}
 */
let indexCounter = -100000

const defaultInjectSheet = createInjectSheet(jss)

function updateIndex(options) {
    if (options.index === undefined) {
        options.index = indexCounter++
    }
}

export default function injectSheet(stylesOrSheet, options = {}) {
    updateIndex(options)
    return defaultInjectSheet(stylesOrSheet, options)
}

export function createStyleSheet(styles, options = {}) {
    updateIndex(options)
    return jss.createStyleSheet(styles, options)
}
