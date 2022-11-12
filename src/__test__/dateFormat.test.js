import {dateFormat} from '../client/js/app';

//testing 
describe('Testing the dateFormat function', () => {
    test('Testing the dateFormat function', () => {
        expect(dateFormat("12-01-2022")).toBe("2022-12-01");
    })
})

