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
    success: $(`.foods-table .row${e.target.id}`).remove()
  })
}

module.exports = {createFood, retrieveFoods, deleteFood}
