import { test as base } from "@playwright/test";
import api from "./ApiUtils"
import pg_db from './pg_db';
import winston_logger from './logger';

type MyFixtures = {
    API: api;
    PG_DB: pg_db;
    WINSTON_LOGGER: winston_logger
}

const fixtures = base.extend<MyFixtures>({
    API: async ({ request }, use) => {
        const API = new api(request);
        await use(API);
    },
    PG_DB: async({}, use) => {
        const PG_DB = new pg_db();
        await use(PG_DB);
    },
    WINSTON_LOGGER: async({}, use) => {
        const WINSTON_LOGGER = new winston_logger();
        await use(WINSTON_LOGGER);
    }
})

export { fixtures };