import { test, expect } from '@playwright/test';
import { Product, ApiResult, ProductResponse } from './ApiInterfaces';
import { baseURL, divider } from '../dev_environment';

test.only('Test 40: Delete a product with valid ProductId', async ({ request }) => {

    const productId = [1, 12, 14]
    // const endpoint = `${baseURL}/product/delete/${productId[0]}`
    // const response = await request.delete(endpoint)
    // const responseData: ProductResponse = await response.json();
    // const products = responseData.data;


    for (let index = 0; index < productId.length; index++) {
        const endpoint = `${baseURL}/product/delete/${productId[index]}`
        const response = await request.delete(endpoint)
        const responseData: ProductResponse = await response.json();
        // const products = responseData.data;

        // these are for the report's console capture
        divider()
        console.log('Endpoint:', endpoint)
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)


        // // Assertion: Check HTTP status code - it should be 200 
        // expect(response.status(), "Verify reponse status").toEqual(200);

        // // Check the LENGTH of the responseBody array - it should return 1 item
        // expect(products.length, "Verify length of JSON entries").toEqual(15);

        // // Verify that the first object contains the required properties 
        // expect(products[0]).toHaveProperty('productId');
        // expect(products[0]).toHaveProperty('name');
        // expect(products[0]).toHaveProperty('description');
        // expect(products[0]).toHaveProperty('price');

    }
});


