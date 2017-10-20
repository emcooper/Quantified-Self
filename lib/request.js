const $ = require('jquery')
const api = 'https://calory-tracker.herokuapp.com'
const handlers = require('./handlers')

function createFood(food, calories) {
  $.ajax({
    type: "POST",
    url: `${api}api/v1/foods`,
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
  $.get(`${api}/api/v1/foods`)
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
    url:`${api}api/v1/foods/${e.target.id}`,
    success: $(`.foods-table .row${e.target.id}`).remove(),
    error: function() {
      deleteFoodFromMeals(this.url)
    }
  })
}

function deleteFoodFromMeals(url) {
  let food = {}
  let meals = {}
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
    url: `${api}api/v1/meals`,
    success: function(data) {
      meals = data
    },
    async: false
  })
  meals.forEach(function(meal) {
    let idsOfFood = []
    meal.foods.forEach(function(i) {
      idsOfFood.push(i.id)
    })
    if(idsOfFood.includes(food.id)) {
      $.ajax({
        type: 'DELETE',
        url: `${api}api/v1/meals/${meal.id}/foods/${food.id}`,
        success: function(data) {
        }
      })

      $.ajax({
        type: 'DELETE',
        url:`${api}api/v1/foods/${food.id}`,
        success: $(`.foods-table .row${food.id}`).remove(),
      })
    }
  })
}

module.exports = {createFood, retrieveFoods, deleteFood}
