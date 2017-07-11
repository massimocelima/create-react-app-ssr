import React, {Component} from 'react';
import universal from "react-universal-component"
import injectSheet from '../styles/injectSheet'
import { connect } from 'react-redux'

const NotFound = () => <div>PAGE NOT FOUND - 404</div>
const UnknownAlias = () => <div>I FOUND THE PAGE BUT I DONT KNOW HOW TO RENDER IT!</div>
const Loading = () => <div>Loading</div>

const ANIMATION_DURATION = 500;

const components = {
    example1: universal(() => import(/* webpackChunkName: 'example' */ './Example1'), {
        resolve: () => require.resolveWeak('./Example1'),
        chunkName: 'example',
        minDelay: ANIMATION_DURATION,
        loading: Loading
    }),
    example11: universal(() => import(/* webpackChunkName: 'example' */ './Example1_1'), {
        resolve: () => require.resolveWeak('./Example1_1'),
        chunkName: 'example',
        minDelay: ANIMATION_DURATION,
        loading: Loading
    }),
    example2: universal(() => import(/* webpackChunkName: 'example2' */ './Example2'), {
        resolve: () => require.resolveWeak('./Example2'),
        chunkName: 'example2',
        minDelay: ANIMATION_DURATION,
        loading: Loading
    }),
    NotFound,
    UnknownAlias
}

class PageContent extends Component {

    render() {
        const {page} = this.props;
        if(!page) return null;
        const Component = components[page.alias] || UnknownAlias
        return <Component />;
    }
}

const mapStateToProps = (state) => {
    return {
        page: state.content.page
    }
}

export default connect(mapStateToProps)( injectSheet({
})(PageContent) );
