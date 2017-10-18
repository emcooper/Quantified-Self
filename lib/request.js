var $ = require('jquery')
var api = 'https://obscure-harbor-85447.herokuapp.com/'
var handlers = require('./handlers')

function createFood(food, calories) {
  $.ajax({
    type: "POST",
    url: api + "api/v1/foods",
    data: { food: {
      name: $.trim(food),
      calories: $.trim(calories)
    }},
    success: function(data) {
      handlers.postSuccess(data)
    },
    error: function(error) {
      handlers.postError(error)
    }
  })
}

function retrieveFoods() {
  $.get(api + '/api/v1/foods')
  .then(function(foods) {
    foods = foods.sort(function(a, b) {
      return a.id - b.id
    })
    foods.forEach(function(food) {
      handlers.appendFood(food)
    })
  })
}

function deleteFood(e) {
  $.ajax({
    type: 'DELETE',
    url:'https://obscure-harbor-85447.herokuapp.com/api/v1/foods/' + e.target.id,
    success: $(`.foods-table .row${e.target.id}`).remove(),
    error: function() {
      deleteFoodFromMeals(this.url)
    }
  })
}

function deleteFoodFromMeals(url) {
  var food = {}
  var meals = {}
  $.ajax({
    type: 'GET',
    url: url,
    success: function(data) {
      food = data
    },
    async: false
  })
  $.ajax({
    type: 'GET',
    url: 'https://obscure-harbor-85447.herokuapp.com/api/v1/meals',
    success: function(data) {
      meals = data
    },
    async: false
  })
  meals.forEach(function(meal) {
    var idsOfFood = []
    meal.foods.forEach(function(i) {
      idsOfFood.push(i.id)
    })
    if(idsOfFood.includes(food.id)) {
      $.ajax({
        type: 'DELETE',
        url: `https://obscure-harbor-85447.herokuapp.com/api/v1/meals/${meal.id}/foods/${food.id}`,
        success: alert('Deleted food')
      })
      $.ajax({
        type: 'DELETE',
        url:'https://obscure-harbor-85447.herokuapp.com/api/v1/foods/' + food.id,
        success: $(`.foods-table .row${food.id}`).remove(),
      })
    }
  })
}

module.exports = {createFood, retrieveFoods, deleteFood}
