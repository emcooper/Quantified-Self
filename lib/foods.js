const createFood = require('./request')
const handlers = require('./handlers')
const requests = require('./request')
const url = 'https://calory-tracker.herokuapp.com'

$(document).ready(function() {
  loadFoods()
  $('#myInput').keyup(filterFoods)
  $('.foods-table').on('focusout', '[contenteditable]', function() {
    let id = $(this).parent().attr('class').replace('row', '')
    let attribute = $(this).attr('class').replace('food-', '')
    let value = $(this).text()
    updateFoodName(id, attribute, value)
  })
  $('.foods-table').on('click', '.delete-row', requests.deleteFood)
})

function loadFoods() {
  requests.retrieveFoods()
}


function updateFoodName(id, attribute, value) {
  let foodData = { food: {}}
  foodData['food'][attribute] = value
  $.ajax({
    type: 'PATCH',
    url: `${url}/api/v1/foods/${id}`,
    data: foodData,
    success: console.log("Success")
  })
}

function deleteFood(e) {
  $.ajax({
    type: 'DELETE',
    url:`${url}/api/v1/foods/${e.target.id}`,
    success: $(`.foods-table .row${e.target.id}`).remove()
  })
}

$('form').submit(function(e) {
  e.preventDefault()
  let food = $('input[name="food"]').val()
  let calories = $('input[name="calories"]').val()
  $('.manage-food').each(function() { this.reset() })
  $('p.food-error').remove()
  requests.createFood(food, calories)
})

function filterFoods() {
  let input = $('#myInput')
  let filter = input.val().toUpperCase()
  let table = $('.foods-table')
  $('.food-name').each(function() {
    if($(this).text().toUpperCase().includes(filter)){
      $(this).parent().show()
    } else {
      $(this).parent().hide()
    }
  })
}
