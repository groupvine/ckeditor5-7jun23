/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

'use strict';

const config = require('./webpack.config');

config['output']['filename'] = 'ckeditor_dev.js';

module.exports = config;
