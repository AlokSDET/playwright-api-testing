import {expect} from "playwright/test";
import { fixtures as test } from "../../utils/fixtures";
import ENV from "../../utils/env";

test.describe("API Framework test suite", () =>{
    let token :string ;

    test.beforeAll(async ({API}) => {
          const res=   await API.postReq('/api/authaccount/login', {
            "email":"alok.s@gmail.com",
            "password":123456
        })
        token = (JSON.parse(await res.text())).data.Token;
        console.log(token);
    });

    test('get users from page 1 @smoke' , async({API}) => {
        console.log(ENV.BASE_URL);
            const res = await API.getReq('/api/users', {"page": 1}, "Bearer", token);
            const resBody = JSON.parse(await res.text());
            console.log(JSON.parse(await res.text()));
            expect(res.status()).toBe(200);
            expect(await resBody.totalrecord).toBeGreaterThanOrEqual(23799);
    })


})
