'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const dotenv = require('dotenv');
const result = dotenv.config();

if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY: envs.API_KEY
})
