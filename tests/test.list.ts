// order to run tests

process.env.NODE_ENV = 'test';

import { test } from '@playwright/test';
import health from './health.test';
// import DotenvFlow from 'dotenv-flow'; // read dotenv
// DotenvFlow.config();

test.describe(health);
// test.describe(health);