import { test, expect } from '@playwright/test';
import ENV from '../../utils/env';
import { Console } from 'console';

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
})