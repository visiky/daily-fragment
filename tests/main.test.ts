declare let jasmine: any, describe:any, expect:any, it: any;

const STRESS_TEST: boolean = true;
const ITEM_TIMEOUT_MS: number = 10;
const NORMAL_ITEMS_COUNT: number = 20;
const STRESS_ITEMS_COUNT: number = 200;

const ITEMS_COUNT: number = STRESS_TEST && STRESS_ITEMS_COUNT || NORMAL_ITEMS_COUNT;
const timeout = (STRESS_TEST && STRESS_ITEMS_COUNT || 1) * ITEM_TIMEOUT_MS;
if (typeof jasmine !== 'undefined') jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;

// help: https://facebook.github.io/jest/docs/expect.html

describe('Internal module test', () => {
	it('should do this', () => {
		expect(true).toBe(true);
	});
});
