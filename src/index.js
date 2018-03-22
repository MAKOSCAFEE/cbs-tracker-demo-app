/* global DHIS_CONFIG, manifest */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'react-virtualized/styles.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import injectTapEventPlugin from 'react-tap-event-plugin';
import D2UIApp from 'd2-ui/lib/app/D2UIApp';

import { config } from 'd2/lib/d2';
import theme from './theme';
import store from './store';

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

    config.schemas = [
        'dataElement',
        'optionSet',
        'organisationUnit',
        'organisationUnitGroup',
        'organisationUnitGroupSet',
        'organisationUnitLevel',
        'program',
        'programStage'
    ];

    ReactDOM.render(
        <D2UIApp initConfig={config} muiTheme={theme}>
            <Provider store={store}>
                <App baseUrl={baseUrl} />
            </Provider>
        </D2UIApp>,
        document.getElementById('root')
    );
    registerServiceWorker();
};
init();
