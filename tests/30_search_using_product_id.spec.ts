import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:5220'
const divider = () => console.log(`\n${'-'.repeat(100)}`)

interface Product {
    productId: number;
    name: string;
    description: string;
    price: number;
}

// Map ApiResult type
interface ApiResult<T> {
    success: boolean;
    message: string;
    error: string;
    data: T;
}

// Specific type for product responses
type ProductResponse = ApiResult<Product[]>;

test.only('Test 30: Search using ProductId', async ({ request }) => {
    const productId = [1, 12, 14]
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
        },
        {
            productId: 14,
            name: "Silk Blouse",
            description: "Elegant blouse with French cuffs and delicate buttons",
            price: 89.99
        },


    ]

    // Verify values of seed items 
    for (let index = 0; index < assertionArr.length; index++) {

        const endpoint = `${baseURL}/product/search/id/${productId[index]}`
        const response = await request.get(endpoint)
        const responseBody = await response.json()
        const responseData: ProductResponse = await response.json();
        const products = responseData.data;

        const element = assertionArr[index];

        // these are for the report's console capture
        divider()
        console.log('Endpoint:', endpoint)
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseData)

        // Assertion: Check HTTP status code - it should be 200 
        expect(response.status(), `Verify reponse status (Trial ${index + 1})`).toEqual(200);

        // Verify the LENGTH of the responseBody array - it should return 1 item
        expect(products.length, "Verify length of JSON entries").toEqual(1);

        // Verify actual values 
        expect(products[0].productId, "Verify value - productId").toEqual(element.productId);
        expect(products[0].name, "Verify value  - name").toEqual(element.name);
        expect(products[0].description, "Verify value - description").toEqual(element.description);
        expect(products[0].price, "Verify value - price").toEqual(element.price);
    }

});

test('Test 31: Search using product Id that does not exist', async ({ request }) => {
    const productId = [1000, 2000]

    // Verify values of seed items 
    for (let index = 0; index < productId.length; index++) {
        const endpoint = `${baseURL}/product/search/id/${productId[index]}`
        const response = await request.get(endpoint)
        const responseBody = await response.json()
        const responseData = responseBody.data

        const assertion = {
            productId: -1,
            name: 'No products found',
            description: 'No products found',
            price: 0
        }

        // these are for the report's console capture
        divider()
        console.log('Endpoint:', endpoint)
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseBody)


        // Assertion: Check HTTP status code - it should be 200 
        expect(response.status(), `Verify reponse status ( --- Trial ${index + 1} ---)`).toEqual(200);

        // Check the LENGTH of the responseBody array - it should return null

        console.log("data:", responseData)
        expect(responseData, "Verify that the data is null").not.toBeNull;


        // Verify actual values 
        // expect(responseData[0].productId, "Verify value - productId").toEqual(assertion.productId);
        // expect(responseData[0].name, "Verify value  - name").toEqual(assertion.name);
        // expect(responseData[0].description, "Verify value - description").toEqual(assertion.description);
        // expect(responseData[0].price, "Verify value - price").toEqual(assertion.price);

    }


})

test('Test 32: Search using an invalid product Id (non integer)', async ({ request }) => {

    const productId = ["test", "1"]
    const endpoint = `${baseURL}/product/search/id/${productId}`


    // Verify values of seed items 
    for (let index = 0; index < productId.length; index++) {
        const endpoint = `${baseURL}/product/search/id/${productId[index]}`
        const response = await request.get(endpoint)
        const responseBody = await response.json()

        // const assertion = {
        //     productId: -1,
        //     name: 'No products found',
        //     description: 'No products found',
        //     price: 0
        // }

        // these are for the report's console capture
        console.log('Endpoint:', endpoint)
        console.log('Response Status:', response.status())
        console.log('Response Status Text:', response.statusText())
        console.log('Response Body:', responseBody)


        // // Assertion: Check HTTP status code - it should be 200 
        // expect(response.status(), `Verify reponse status ( --- Trial ${index + 1} ---)`).toEqual(200);

        // // Check the LENGTH of the responseBody array - it should return 1 item
        // expect(responseBody.length, "Verify length of JSON entries").toEqual(1);


        // // Verify actual values 
        // expect(responseBody[0].productId, "Verify value - productId").toEqual(assertion.productId);
        // expect(responseBody[0].name, "Verify value  - name").toEqual(assertion.name);
        // expect(responseBody[0].description, "Verify value - description").toEqual(assertion.description);
        // expect(responseBody[0].price, "Verify value - price").toEqual(assertion.price);

    }


})
