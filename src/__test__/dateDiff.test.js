import { dateDiff } from "../client/js/app";

//testing
describe("Testing the dateDiff function", () => {
  test("Testing the dateDiff function", () => {
    expect(dateDiff(new Date("2022-12-01"), new Date("2022-12-03"))).toBe(2);
  });
});