import React, {Component} from 'react';
import logo from './logo.svg';
import universal from "react-universal-component"
import {Helmet} from 'react-helmet'
import injectSheet from '../styles/injectSheet'

const UniversalComponent1 = universal(() => import(/* webpackChunkName: 'example' */ './Example1'), {
    resolve: () => require.resolveWeak('./Example1'),
    chunkName: 'example'
})

const UniversalComponent11 = universal(() => import(/* webpackChunkName: 'example' */ './Example1_1'), {
    resolve: () => require.resolveWeak('./Example1_1'),
    chunkName: 'example'
})

const UniversalComponent2 = universal(() => import(/* webpackChunkName: 'example2' */ './Example2'), {
    resolve: () => require.resolveWeak('./Example2'),
    chunkName: 'example2'
})

class App extends Component {

    componentDidMount() {
        console.log("Mounted")
    }

    handleClick = () => {
        alert("Hello!")
    }

    render() {
        const {classes, meta} = this.props;
        return (
            <div className={classes.container}>
                {meta && <Helmet>
                    <title>{meta.title}</title>
                    {meta.metaDescription && <meta name="description" content={meta.metaDescription}/>}
                    {meta.metaKeywords && <meta name="keywords" content={meta.metaKeywords}/>}
                    {meta.ogUrl && <meta property="og:url" content={meta.ogUrl}/>}
                    {meta.ogTitle && <meta property="og:title" content={meta.ogTitle}/>}
                    {meta.ogImage && [
                        <meta property="og:image" content={meta.ogImage.url} key={0}/>,
                        <meta property="og:image:width" content={meta.ogImage.width} key={1}/>,
                        <meta property="og:image:height" content={meta.ogImage.height} key={2}/>,
                    ]}
                    {meta.ogDescription && <meta property="og:description" content={meta.ogDescription}/>}
                    {meta.ogSiteName && <meta property="og:site_name" content={meta.ogSiteName}/>}

                    {meta.ogImage && <meta name="twitter:card" content="summary_large_image"/>}
                    {meta.ogSiteName && <meta name="twitter:site" content={meta.ogSiteName}/>}
                    {meta.ogTitle && <meta name="twitter:title" content={meta.ogTitle}/>}
                    {meta.ogDescription && <meta name="twitter:description" content={meta.ogDescription}/>}
                    {meta.ogImage && <meta name="twitter:image" content={meta.ogImage.url}/>}
                </Helmet>
                }

                <div className={classes.header}>
                    <img src={logo} className={classes.logo} alt="logo"/>
                    <h2>Welcome to React, hot module replacement. That seemed too easy!</h2>
                </div>
                <p className={classes.intro}>
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <UniversalComponent1/>
                <UniversalComponent11/>
                <UniversalComponent2/>
                <button onClick={this.handleClick}>Press Me</button>
            </div>
        );
    }
}

export default injectSheet({
    container: {
        textAlign: "center"
    },
    logo: {
        animation: "logo-spin infinite 20s linear",
        height: 80
    },
    header: {
        backgroundColor: "#222",
        height: 150,
        padding: 20,
        color: "white"
    },
    intro: {
        fontSize: "large"
    },
    "@keyframes logo-spin": {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" }
    }
})(App);
