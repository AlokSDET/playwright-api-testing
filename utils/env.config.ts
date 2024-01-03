import { PlaywrightTestConfig, devices } from '@playwright/test';
  //NotInUse
// Config to hold extra properties
interface TestConfig extends PlaywrightTestConfig {
    baseUrl: string;
    apiURL: string;
  }
  

  // set config for dev
const devConfig: TestConfig = {
    baseUrl: 'https://dev.example.com',
    apiURL: 'http://restapi.adequateshop.com'
  };
  
  // set config for stage
  const stageConfig: TestConfig = {
    baseUrl: 'https://stage.example.com',
    apiURL: 'https://stage.api.example.com'
  };
  
  // set config for prod
  const prodConfig: TestConfig = {
    baseUrl: 'https://prod.example.com',
    apiURL: 'https://prod.api.example.com'
  };
  
  // get the environment type from command line. If none, set it to dev
  const environment = process.env.test_env || 'dev';
  
  // config object with default configuration and environment specific configuration
  const config: TestConfig = {
    ...(environment === 'stage' ? stageConfig : environment === 'prod' ? prodConfig : devConfig)
  };
  
  export default config;