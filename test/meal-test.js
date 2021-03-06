const assert = require('chai').assert;
const meals = require('../lib/meals.js')
const $ = require('jquery')

test('totalCalories returns total calories of meal', function(){
      meal = {name: "Breakfast", foods: [
        {name: "Grapes",
        calories: 100},
        {name: "Oatmeal",
        calories: 200}
      ]}
      assert.equal(totalCalories(meal), 300);
    })
