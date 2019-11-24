#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const destDir = path.resolve(__dirname, './dist');

// Copy firebase configs
fs.copyFileSync(path.resolve(__dirname, './firebase.json'), path.join(destDir, 'firebase.json'));
fs.copyFileSync(path.resolve(__dirname, './.firebaserc'), path.join(destDir, '.firebaserc'));
