import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse } from './ApiInterfaces';
import { baseURL, divider } from '../dev_environment';

test('Test 50: string 22.99',
    async ({ request }) => {

        let locationHeader

        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "name": "Ribbed Tank Top",
                "description": "Slim fit tank top with ribbed texture for layering",
                "price": "22.99"
            }
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // if (response.status() === 201) {
        //     locationHeader = response.headers()['location'] || 'Not present';
        // }


        // // these are for the report's console capture
        // divider()
        // console.log('Endpoint:', endpoint)
        // console.log(`Location: ${locationHeader} `);
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

    });




test('Test 51: double 22.99',
    async ({ request }) => {

        let locationHeader

        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "name": "Ribbed Tank Top",
                "description": "Slim fit tank top with ribbed texture for layering",
                "price": 22.99
            }
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // if (response.status() === 201) {
        //     locationHeader = response.headers()['location'] || 'Not present';
        // }


        // // these are for the report's console capture
        // divider()
        // console.log('Endpoint:', endpoint)
        // console.log(`Location: ${locationHeader} `);
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

    });


test('Test 52: "22.99a"',
    async ({ request }) => {

        let locationHeader

        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "name": "Ribbed Tank Top",
                "description": "Slim fit tank top with ribbed texture for layering",
                "price": "22.99a"
            }
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // if (response.status() === 201) {
        //     locationHeader = response.headers()['location'] || 'Not present';
        // }


        // // these are for the report's console capture
        // divider()
        // console.log('Endpoint:', endpoint)
        // console.log(`Location: ${locationHeader} `);
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

    });


test('Test 53: empty body ',
    async ({ request }) => {

        let locationHeader

        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // if (response.status() === 201) {
        //     locationHeader = response.headers()['location'] || 'Not present';
        // }


        // // these are for the report's console capture
        // divider()
        // console.log('Endpoint:', endpoint)
        // console.log(`Location: ${locationHeader} `);
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

    });



test('Test 50x: ',
    async ({ request }) => {

        const price = [22.9, "22.9", "22.9a", "test"]
        for (let index = 0; index < price.length; index++) {
            let locationHeader

            let jsonData = null;

            if (index !== 3) {
                jsonData = {
                    "name": "Ribbed Tank Top",
                    "description": "Slim fit tank top with ribbed texture for layering",
                    "price": price[index]
                };
            }

            const endpoint = `${baseURL}/product/add/`
            const response = await request.post(endpoint, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: jsonData
            })
            const responseData: ProductResponse = await response.json();
            const products = responseData.data;

            if (response.status() === 201) {
                locationHeader = response.headers()['location'] || 'Not present';
            }


            // these are for the report's console capture
            divider()
            console.log('Endpoint:', endpoint)
            console.log(`Location: ${locationHeader ?? "not available"}  `);
            console.log('Response Status:', response.status())
            console.log('Response Status Text:', response.statusText())
            console.log('Response Body:', responseData)
        }


    });


    
test('Test 500: desr numeric ',
    async ({ request }) => {

        let locationHeader

        const endpoint = `${baseURL}/product/add/`
        const response = await request.post(endpoint, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "name": "Ribbed Tank Top",
                "description": 2.00,
                "price": "22.99"
            }
        })
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        // if (response.status() === 201) {
        //     locationHeader = response.headers()['location'] || 'Not present';
        // }


        // // these are for the report's console capture
        // divider()
        // console.log('Endpoint:', endpoint)
        // console.log(`Location: ${locationHeader} `);
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

    });
