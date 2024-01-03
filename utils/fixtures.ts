import {test as base} from "@playwright/test";
import api from "./ApiUtils"

type MyFixtures = {
    API:api;
}

const fixtures = base.extend<MyFixtures> ({
    API: async({request}, use) => {
        const API = new api (request);
        await use (API);
    }
})

export {fixtures};