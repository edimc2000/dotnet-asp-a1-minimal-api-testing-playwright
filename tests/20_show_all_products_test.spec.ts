import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:5220'

test('Test 20: Show all products (from seed) ', async ({ request }) => {
    const endpoint = `${baseURL}/product/show/all`
    const response = await request.get(endpoint)
    const responseBody = await response.json()

    // these are for the report's console capture
    console.log('Endpoint:', endpoint)
    console.log('Response Status:', response.status())
    console.log('Response Status Text:', response.statusText())
    console.log('Response Body:', responseBody)

    // Assertion: Check HTTP status code - it should be 200 
    expect(response.status(), "Verify reponse status").toEqual(200);

    // Check the LENGTH of the responseBody array - it should return 1 item
    expect(responseBody.length, "Verify length of JSON entries").toEqual(15);

    // Verify that the first object contains the required properties 
    expect(responseBody[0]).toHaveProperty('productId');
    expect(responseBody[0]).toHaveProperty('name');
    expect(responseBody[0]).toHaveProperty('description');
    expect(responseBody[0]).toHaveProperty('price');
});

