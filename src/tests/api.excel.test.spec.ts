import { test, expect } from '@playwright/test';
import ExcelJs from 'excelJs'
import XLSX from 'xlsx';

test('API Post Request', async ({ request }) => {

    const response = await request.get('https://fakestoreapi.com/products/1');
    const text = JSON.parse(await response.text());
    console.log(text);
    expect(response.status()).toBe(200);
    expect(text.id).toBe(1)

    //WRITE IN TO EXCEL
    const workbook = new ExcelJs.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    worksheet.getCell('A1').value = 'Hello, World Test!';
    await workbook.xlsx.writeFile('./test-data/data.xlsx');

    //READ EXCEL SHEET based on cell name
    const workbook1 = await new ExcelJs.Workbook().xlsx.readFile('./test-data/data.xlsx');
    const worksheet1 = workbook1.getWorksheet('Sheet1');
    const cellValue = worksheet1?.getCell('A1').value;
    console.log(cellValue);

    //read column index of column based on column value
    const userNameIndex = getColumnIndex('Email');
    const passwordIndex = getColumnIndex('Password');
    const deptIndex = getColumnIndex('Dept');

    console.log(userNameIndex);
    console.log(passwordIndex);
    console.log(deptIndex);

    //read column value  of column based on column index from first row
    let userName = getColumnValue(userNameIndex);
    let password = getColumnValue(passwordIndex);
    let dept = getColumnValue(deptIndex);

    console.log(userName);
    console.log(password);
    console.log(dept);

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

//read execl sheet 

const workbook2 = XLSX.readFile('./test-data/login.xlsx');
const sheetName2 = 'Sheet1';
const worksheet2 = workbook2.Sheets[sheetName2];

//function to get column index based on column name
const getColumnIndex = (columnName: string) => {
    console.log(columnName);
    const range = XLSX.utils.decode_range(worksheet2["!ref"]!);
    console.log('range', range);
    let i = -1;
    for (i = range.s.c; i <= range.e.c; i++) {
        const cell = worksheet2[XLSX.utils.encode_cell({ r: 0, c: i })]
        console.log(cell);
        if (cell && cell.v === columnName) {
            return i;
        }
    }
    return i;
}

//function to get column value  based on column index from first row 
const getColumnValue = (columnIndex: number) => {
    console.log(columnIndex);
    let columnValue: string;
    if (columnIndex != -1) {
        columnValue = worksheet2[XLSX.utils.encode_cell({ r: 1, c: columnIndex! })].v;
        console.log('Cell value in ' + columnIndex + 'column field', columnValue);
        return columnValue;
    } else {
        console.log('column  not found');
    }
}