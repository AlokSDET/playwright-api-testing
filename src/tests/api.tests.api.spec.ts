import { test, expect } from '@playwright/test';
import path from "path";
import fs, { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { File } from 'buffer';
const fileName1 = path.resolve('test-data/', 'test.jpg');
const file1 = readFileSync(fileName1);
const fileName2 = path.resolve('test-data/', 'test.json');
const fileName3 = path.resolve('test-data/', 'test.csv');
const file2= readFileSync(fileName2);


const stream3 = fs.createReadStream(fileName3);
//const inputFile = fs.readFileSync(file)
//console.log(inputFile)


test.describe.parallel('Api test', () => {

        test('API Get Request-Fetch all products @projectA ', async ({ request }) => {

                const response = await request.get(`/products`);
                console.log(await response.json())
                const responseBody = JSON.parse(await response.text());
                console.log(responseBody);
                expect(response.status()).toBe(200);
                const text = await response.text();
                console.log(await response.text());
                expect(text).toContain('An apple mobile which is nothing like apple');
        })


        test('API Get Request-Fetch Single product- using path parameter @projectA ', async ({ request }) => {

                const response = await request.get('/products/1');
                console.log(await response.json())
                expect(response.status()).toBe(200);
        })

        test('API Get Request-Fetch Single product- using query parameter @projectA  ', async ({ request }) => {

                const response = await request.get('/products/search',
                        { params: { q: 'phone' } }
                );
                console.log(await response.json())
                expect(response.status()).toBe(200);
        })

        test('API Get Request-Fetch products with filter @projectA ', async ({ request }) => {

                const response = await request.get('/products',
                        { params: { limit: 10, skip: 10, select: 'title,price' } });
                console.log(await response.json())
                expect(response.status()).toBe(200);
        })

        test('API Post Request-Add a new Product @projectA ', async ({ request }) => {

                const response = await request.post('/products/add',
                        {
                                data: { title: 'BMW Pencil' },
                                headers: { 'Content-Type': 'application/json' }
                        }
                )
                console.log(await response.json())
                expect(response.status()).toBe(200);
        })

        test('API Put Request-Update a Product @projectA ', async ({ request }) => {
                console.log();
                const response = await request.put('/products/1',
                        {
                                data: { title: 'iPhone Galaxy +1' },
                                headers: { 'Content-Type': 'application/json' }
                        }
                )
                console.log(await response.json())
                expect(response.status()).toBe(200);
        })

        test('API Delete Request-Delete a Product @projectA ', async ({ request }) => {
                console.log();
                const response = await request.delete('/products/1'
                )
                console.log(await response.json())
                expect(response.status()).toBe(200);
        })

        test('API Get Request @projectA ', async ({ request }) => {

                const response = await request.get('https://fakestoreapi.com/products/1');
                const text = JSON.parse(await response.text());
                console.log(text);
                expect(response.status()).toBe(200);

                expect(text.id).toBe(1)
        })
     
        //Not working -Need to check 
        test('File upload @projectA', async ({ request }) => {
              /*  const res = await request.post("https://api.escuelajs.co/api/v1/files/upload", {
                        headers: { "Content-Type": "multipart/form-data", "Accept": "application/json"},
                        multipart: {
                                "FormData": stream3
                }
                }
                );
        */  
                var options = {
                        formData: {
                                "file": {
                                        "value": stream3,
                                        "options": {
                                                "fileName": fileName3,
                                                "content-type": null
                                        }
                                }
                        }
                    }
                const res = await request.post("https://api.escuelajs.co/api/v1/files/upload", {data: options});


                const resBody = JSON.parse(await res.text())
                console.log(JSON.parse(await res.text()));
                console.log(await resBody.totalrecord);
                expect(res.status()).toBe(201);
                expect(await resBody.originalname).toEqual("Screenshot 2024-01-03 143326.png");
        })

})