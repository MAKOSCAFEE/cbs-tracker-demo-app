/* global DHIS_CONFIG, manifest */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';

import injectTapEventPlugin from 'react-tap-event-plugin';
import D2UIApp from 'd2-ui/lib/app/D2UIApp';

import { config } from 'd2/lib/d2';
import { muiTheme } from './theme';

const init = () => {
    // init material-ui
    injectTapEventPlugin();

    // log app info
    console.info(`Tracker Report App, v${manifest.version}, ${manifest.manifest_generated_at}`);

    // d2-ui config
    const isProd = process.env.NODE_ENV === 'production';
    const baseUrl = isProd ? manifest.activities.dhis.href : DHIS_CONFIG.baseUrl;
    config.baseUrl = `${baseUrl}/api/${manifest.dhis2.apiVersion}`;
    config.headers = isProd ? null : { Authorization: DHIS_CONFIG.authorization };

    config.schemas = ['dashboard', 'organisationUnit'];

    ReactDOM.render(
        <D2UIApp initConfig={config} muiTheme={muiTheme()}>
            <App baseUrl={baseUrl} />
        </D2UIApp>,
        document.getElementById('root')
    );
    registerServiceWorker();
};
init();
