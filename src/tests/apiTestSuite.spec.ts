import {expect} from "playwright/test";
import { fixtures as test } from "../../utils/fixtures";
import ENV from "../../utils/env";
import loginData from '../../test-data/login.json'
import createUser from '../pojo/createUser';
import {faker}  from '@faker-js/faker/locale/en';
import userJson from '../../test-data/user.json';


test.describe("API Framework test suite", () =>{
    let token :string ;
    let id :string ;
    let email:string = loginData.email;
    let password:any = loginData.password;

    test.beforeAll(async ({API}) => {
          const res=   await API.postReq('/api/authaccount/login', {
           email,
           password
        })
          // const res=   await API.postReq('/api/authaccount/login', loginData);
        token = (JSON.parse(await res.text())).data.Token;
        id = (JSON.parse(await res.text())).data.Id;
        console.log(token);
    });

    test('get users from page 1 @smoke' , async({API}) => {
        console.log(ENV.BASE_URL);
            const res = await API.getReq('/api/users', {"page": 1}, "Bearer", token);
            const resBody = JSON.parse(await res.text());
            console.log(JSON.parse(await res.text()));
            console.log(await resBody.totalrecord);
            expect(res.status()).toBe(200);
            expect(await resBody.totalrecord).toBeGreaterThanOrEqual(23799);
            let jsonArray = await resBody.data;
            console.log(jsonArray);
            expect(jsonArray[0]).toHaveProperty('location', "USA");
    })

    test('get user details using path parameter and chaining from previous response @smoke' , async({API}) => {
        console.log(ENV.BASE_URL);
        console.log(id);
            const res = await API.getReq(`/api/users/${id}`, undefined, "Bearer", token);
            const resBody = JSON.parse(await res.text());
            console.log(JSON.parse(await res.text()));
            console.log(await resBody.totalrecord);
            expect(res.status()).toBe(200);
            expect(await resBody.name).toEqual("Developer");
    })

    test('Create user using POJO- Use of Faker Library @smoke' , async({API}) => {
        console.log(ENV.BASE_URL);
        console.log(id);
        let newUser = new createUser();

            newUser.setEmail(faker.internet.email());
            newUser.setLocation(faker.location.country());
            let name:string = faker.person.fullName();
            newUser.setName(name);

            const res = await API.postReq(`/api/users`, newUser, "Bearer", token);
            const resBody = JSON.parse(await res.text());
            console.log(JSON.parse(await res.text()));
            console.log(await resBody.totalrecord);
            expect(res.status()).toBe(201);
            expect(await resBody.name).toEqual(name);
    })

    test('Create user using external json file @smoke' , async({API}) => {
        console.log(ENV.BASE_URL);
        console.log(id);
            const res = await API.postReq(`/api/users`, userJson, "Bearer", token);
            const resBody = JSON.parse(await res.text());
            console.log(JSON.parse(await res.text()));
            console.log(await resBody.totalrecord);
            expect(res.status()).toBe(201);
            expect(await resBody.name).toEqual(userJson.name);
    })

})
