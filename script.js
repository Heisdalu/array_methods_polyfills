"use strict";
//foreach
Array.prototype.customForEach = function (callback, thisArgs) {
    if (!(callback instanceof Function)) {
        throw new Error("Not n function");
    }
    for (let i = 0; i < this.length; i++) {
        callback.call(thisArgs, this[i], i, this);
    }
};
// map
Array.prototype.customMap = function (callback, thisArgs) {
    if (!(callback instanceof Function)) {
        throw new Error("Not n function");
    }
    const array = [];
    for (let i = 0; i < this.length; i++) {
        array.push(callback.call(thisArgs, this[i], i, this));
    }
    return array;
};
//reduce
Array.prototype.customReduce = function (callback, initalValue) {
    if (!(callback instanceof Function)) {
        throw new Error("Not a function");
    }
    let inital = initalValue ?? this[0];
    const startInterator = initalValue === null || typeof initalValue === "undefined" ? 1 : 0;
    // initial, cur, i , arr
    for (let i = startInterator; i < this.length; i++) {
        inital = callback(inital, this[i], i, this);
    }
    return inital;
};
//filter
Array.prototype.customFilter = function (callback, thisArgs) {
    if (!(callback instanceof Function)) {
        throw new Error("Not n function");
    }
    let array = [];
    for (let i = 0; i < this.length; i++) {
        const value = callback.call(thisArgs, this[i], i, this);
        if (value) {
            array.push(this[i]);
        }
    }
    return array;
};
Array.prototype.customFlat = function (depth = 1) {
    let stack = [...this.map((el) => [el, depth])];
    let result = [];
    while (stack.length > 0) {
        const [value, dep] = stack.pop();
        if (Array.isArray(value) && dep > 0) {
            stack.push(...value.map((el) => [el, dep - 1]));
        }
        else {
            result.push(value);
        }
    }
    return result.reverse();
};
// writing it recursive wise
Array.prototype.customRecursiveFlat = function (depth = 1) {
    const flattenArray = (arr, dep) => {
        let result = [];
        if (dep === 0) {
            return arr;
        }
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i]) && dep > 0) {
                result.push(...flattenArray(arr[i], dep - 1));
            }
            else {
                result.push(arr[i]);
            }
        }
        return result;
    };
    return flattenArray(this, depth);
};
//two pointers approach...
Array.prototype.customReverse = function () {
    let end = this.length - 1;
    if (this.length <= 1)
        return this;
    for (let i = 0; i < this.length; i++) {
        if (end <= i) {
            break;
        }
        if (end > i) {
            [this[end], this[i]] = [this[i], this[end]];
            end--;
        }
    }
    return this;
};
//recursive approach
Array.prototype.customRecursiveReverse = function () {
    if (this.length <= 1)
        return this;
    const recursive = (left, right) => {
        if (left >= right)
            return;
        [this[left], this[right]] = [this[right], this[left]];
        console.log(left, right);
        recursive(left + 1, right - 1);
    };
    recursive(0, this.length - 1);
    return this;
};
Array.prototype.customFill = function (value, start = 0, end) {
    if (-this.length < start && start < 0) {
        start = start + this.length;
    }
    if (start < -this.length)
        start = 0;
    if (-this.length <= end && start < 0) {
        end = end + this.length;
    }
    if (end < -this.length)
        end = 0;
    end = end ?? this.length;
    for (let i = start; i < end; i++) {
        this[i] = value;
    }
    return this;
};
Function.prototype.customCall = function (context, ...variables) {
    context = context || globalThis;
    context = Object(context);
    const unique = Symbol();
    context[unique] = this;
    console.log(this, context);
    const result = context[unique](...variables);
    delete context[unique];
    return result;
};
Function.prototype.customApply = function (ctx, variables) {
    if (!Array.isArray(variables) && variables !== undefined) {
        throw new Error("expects an array");
    }
    ctx = ctx || globalThis;
    ctx = Object(ctx);
    const unique = Symbol();
    ctx[unique] = this;
    const res = ctx[unique](...variables);
    delete ctx[unique];
    return res;
};
Function.prototype.customBind = function (ctx, ...variables) {
    if (!Array.isArray(variables) && variables !== undefined) {
        throw new Error("expects an array");
    }
    ctx = ctx || globalThis;
    ctx = Object(ctx);
    const unique = Symbol();
    ctx[unique] = this;
    return (...args) => {
        const varb = variables.length === 0 ? args : variables.concat(args);
        const res = ctx[unique](...varb);
        delete ctx[unique];
        return res;
    };
};
// const obj = {
//   okay(value: any) {
//     return this.name + value;
//   },
// };
// const res = obj.okay.customBind({ name: "divine" });
// console.log(res(" obi"));
