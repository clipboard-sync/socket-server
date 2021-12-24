const utils = require("../src/utils/index");


test('utils.newSkey.setLength', () => {
  expect(utils.newSkey().length).toBe(40);
  expect(utils.newSkey(20).length).toBe(20);
});

test('utils.newSkey.useRadix', () => {
  expect(/\d{20}/.test(utils.newSkey(20, 10))).toBe(true);
});


test("utils.isJSON.withValue", ()=>{
  expect(utils.isJSON("{}")).toBe(true);
});

test("utils.isJSON.withValueFail", ()=>{
  expect(utils.isJSON("{.}")).toBe(false);
});

test("utils.isJSON.noValue", ()=>{
  expect(utils.isJSON()).toBe(false);
});

test("utils.cc.object", ()=>{
  expect(utils.cc({f_id: 1, f_row_id: 1})).toEqual({id: 1, rowId: 1});
});

test("utils.cc.otherObject", ()=>{
  expect(utils.cc({f_id: 1, _ki: 1})).toEqual({id: 1, _ki: 1});
});

test("utils.usc.object", ()=>{
  expect(utils.usc({id: 1, rowId: 1, picname: "123"})).toEqual({f_id: 1, f_row_id: 1, f_picname: "123"});
});

test("utils.match.default", ()=>{
  expect(utils.match('/images/', '/lkajsldkjf')).toBe(false);
  expect(utils.match('/images', '/images')).toBe("/");
  expect(utils.match('/images/', '/images')).toBe(false);
  expect(utils.match('/images/', '/images/asdf')).toBe("asdf");
  expect(utils.match('/images', '/images/asdf')).toBe("/asdf");
  expect(utils.match('/mount', '/mountasdf')).toBe(false);
});

test("utils.createLikeValue.default", ()=>{
  expect(utils.createLikeValue(["asd", ""])).toEqual(["%asd%", "%"]);
});

test("utils.cache.default", async ()=>{
  const asyncFunc = (()=>{
    let val = 1;
    return async function () {
      val += 1;
      return val;
    };
  })();

  const cachedFunc = utils.cache(asyncFunc, 100);
  expect(await cachedFunc()).toBe(2);
  expect(await cachedFunc()).toBe(2);
  await new Promise(resolve=>{
    setTimeout(resolve, 100);
  });
  expect(await cachedFunc()).toBe(3);
  expect(await cachedFunc()).toBe(3);
  await new Promise(resolve=>{
    setTimeout(resolve, 100);
  });
  expect(await cachedFunc()).toBe(4);
  expect(await cachedFunc(5)).toBe(5);
});

test("utils.formatTime.default", ()=>{
  expect(utils.formatTime(new Date(1622447744087))).toBe("2021-05-31 15:55:44");
  expect(utils.formatTime(new Date(1622447744087), "EE")).toBe("周一");
  expect(utils.formatTime(new Date(1622447744087), "YYYY-EE")).toBe("2021-周一");
});

test("utils.objectToTable.default", ()=>{
  expect(utils.objectToTable({a: 1})).toBe(`<table><tr><td>a</td><td>1</td></tr></table>`);
});

test("utils.arrayToTable.default", ()=>{
  expect(utils.arrayToTable([{a: 1}])).toBe(`<table><tr><td>a</td><td>1</td></tr></table>`);

  expect(utils.arrayToTable([{a: 1}, {a: 2}])).toBe(`<table><th><td>a</td></th><tr><td>1<td><tr><td>2<td></tr></table>`);

  expect(utils.arrayToTable(["a", "b"])).toBe(`<table><tr><td>a</td></tr><tr><td>b</td></tr></table>`);

  expect(utils.arrayToTable()).toBe("");
});
