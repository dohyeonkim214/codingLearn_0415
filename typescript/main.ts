import {expect, it} from "vitest";


export const addTwoNumbers = (a:number, b:number) => 
    return a + b;
};

it("should add the two numbers together", () =>
expect (addTwoNumbers(1, 2)).toEqual(6));