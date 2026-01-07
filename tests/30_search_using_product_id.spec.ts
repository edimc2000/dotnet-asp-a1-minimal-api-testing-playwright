import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:5220'

test('Test 30: Search using product Id', async ({ request }) => {

    const productId = [1, 12]
    const endpoint = `${baseURL}/product/search/id/${productId}`
    const assertionArr = [
        {
            productId: 1,
            name: 'Classic White T-Shirt',
            description: '100% cotton crew neck t-shirt, perfect for everyday wear',
            price: 19.99
        },

        {
            productId: 12,
            name: 'Athletic Socks (3-pack)',
            description: 'Breathable socks with arch support for sports',
            price: 16.99
        }
    ]

    // Verify values of seed items 
    for (let index = 0; index < assertionArr.length; index++) {
        const element = assertionArr[index];

        const endpoint = `${baseURL}/product/search/id/${productId[index]}`
        const response = await request.get(endpoint)
        const responseBody = await response.json()

        // these are for the report's console capture
        console.log('Endpoint:', endpoint)
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseBody)


        // Assertion: Check HTTP status code - it should be 200 
        expect(response.status(), `Verify reponse status (Trial ${index + 1})`).toEqual(200);

        // Verify the LENGTH of the responseBody array - it should return 1 item
        expect(responseBody.length, "Verify length of JSON entries").toEqual(1);

        // Verify actual values 
        expect(responseBody[0].productId, "Verify value - productId").toEqual(element.productId);
        expect(responseBody[0].name, "Verify value  - name").toEqual(element.name);
        expect(responseBody[0].description, "Verify value - description").toEqual(element.description);
        expect(responseBody[0].price, "Verify value - price").toEqual(element.price);
    }

});

test('Test 31: Search using product Id that does not exist', async ({ request }) => {


    const productId = [1000, 2000]
    const endpoint = `${baseURL}/product/search/id/${productId}`


    // Verify values of seed items 
    for (let index = 0; index < productId.length; index++) {
        const endpoint = `${baseURL}/product/search/id/${productId[index]}`
        const response = await request.get(endpoint)
        const responseBody = await response.json()

        const assertion = {
            productId: -1,
            name: 'No products found',
            description: 'No products found',
            price: 0
        }

        // these are for the report's console capture
        console.log('Endpoint:', endpoint)
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseBody)


        // Assertion: Check HTTP status code - it should be 200 
        expect(response.status(), `Verify reponse status ( --- Trial ${index + 1} ---)`).toEqual(200);

        // Check the LENGTH of the responseBody array - it should return 1 item
        expect(responseBody.length, "Verify length of JSON entries").toEqual(1);


        // Verify actual values 
        expect(responseBody[0].productId, "Verify value - productId").toEqual(assertion.productId);
        expect(responseBody[0].name, "Verify value  - name").toEqual(assertion.name);
        expect(responseBody[0].description, "Verify value - description").toEqual(assertion.description);
        expect(responseBody[0].price, "Verify value - price").toEqual(assertion.price);

    }



})
