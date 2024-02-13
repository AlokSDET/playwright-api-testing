import { test, expect } from '@playwright/test';
import path from "path";
import fs, { readFileSync } from 'fs';
import ExcelJs from 'excelJs'
import { fileURLToPath } from 'url';
import { File } from 'buffer';
const fileName1 = path.resolve('test-data/', 'test.jpg');
const file1 = readFileSync(fileName1);
const fileName2 = path.resolve('test-data/', 'test.json');
const fileName3 = path.resolve('test-data/', 'test.csv');
const file2= readFileSync(fileName2);
import XLSX from 'xlsx';
import { Console } from 'console';

const excelFilePath = path.join ('test-data/', 'login.xlsx');
//const excelFilePath= readFileSync(excelFile);
console.log(excelFilePath);


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

                //WRITE IN TO EXCEL
                expect(text.id).toBe(1)
                const workbook = new ExcelJs.Workbook();
                const worksheet = workbook.addWorksheet('Sheet1');
                worksheet.getCell('A1').value = 'Hello, World!';
                await workbook.xlsx.writeFile('./test-data/data.xlsx');

                //READ EXCEL SHEET
                const workbook1 = await new ExcelJs.Workbook().xlsx.readFile('./test-data/data.xlsx');
                const worksheet1 = workbook.getWorksheet('Sheet1');
                const cellValue = worksheet.getCell('A1').value;

                //console.log(cellValue);

                //read execl sheet 

                const workbook2 = XLSX.readFile('C:\\Users\\alok.shrivastava\\automation\\playwright-api-testing\\test-data\\login.xlsx');
                //console.log(workbook2);
                const sheetName2 = 'Sheet1';

                const columnNames2 = ['Email', 'Password'];

                const worksheet2= workbook2.Sheets[sheetName2];

               
                console.log('type of workbook', typeof(worksheet2));

                //function to get column index by column name 

                const getColumnIndex = (columnName:string)=>{
                        console.log(columnName);
                        const range = XLSX.utils.decode_range(worksheet2["!ref"]!);
                        console.log('range', range);
                        let i = -1;
                        for( i = range.s.c; i<= range.e.c; i++){
                                const cell = worksheet2[XLSX.utils.encode_cell({ r:0, c:i })]
                                console.log(cell);
                                if(cell && cell.v === columnName){
                                        return i;
                                }
                        }
                        return i;
                }

      
          //read cell value of username
          const userNameIndex = getColumnIndex('Email') ;
          const passwordIndex = getColumnIndex('Password') ;
          const usernameIndex = getColumnIndex('username') ;

          console.log(userNameIndex);
          console.log(passwordIndex);
          console.log(usernameIndex);
          let userName;
          let password;
          if(userNameIndex != -1) {
                userName   = worksheet2[XLSX.utils.encode_cell({r:1, c: userNameIndex!})].v;
                  console.log('Cell value in email field', userName);
          }else {
                  console.log('Email not found');
          }

          if(passwordIndex != -1) {
                 password = worksheet2[XLSX.utils.encode_cell({r:1, c: passwordIndex!})].v;
                console.log('Cell value in password field', password);
        }else {
                console.log('password not found');
        }
                const response1 = await request.post('http://restapi.adequateshop.com/api/authaccount/login',
                {
                        data: { "email": userName, "password": password },
                        headers: { 'Content-Type': 'application/json' }
                }
                );
                const text1 = JSON.parse(await response1.text());
                console.log(text1);
                expect(response.status()).toBe(200);


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

        
        test('Excel Sheet read ', async ({ request }) => {

                const response = await request.post('/products/add',
                {
                        data: { title: 'BMW Pencil' },
                        headers: { 'Content-Type': 'application/json' }
                }
        )
        console.log(await response.json())
        expect(response.status()).toBe(200);
        })

})