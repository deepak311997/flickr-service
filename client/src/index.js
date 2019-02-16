import React from 'react';
import { render } from 'react-dom';

import './app/app.scss';
import AppRoutes from './app/route/app-routes';

render(<AppRoutes/>, document.querySelector('.app-container'));
