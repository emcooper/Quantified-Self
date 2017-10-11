var createFood = require('./request')
var handlers = require('./handlers')
var requests = require('./request')

$(document).ready(function() {
  loadFoods()
  $('.foods-table').on('click', '.delete-row', requests.deleteFood())
})

function loadFoods() {
  requests.retrieveFoods()
}


function updateFoodName(id, value) {
  $.ajax({
    type: 'PATCH',
    url: `https://obscure-harbor-85447.herokuapp.com/api/v1/foods/${id}`,
    data: { food: { name: value} }
  })
}

function updateFoodCalories(id, value) {

}
// function deleteFood(e) {
//   $.ajax({
//     type: 'DELETE',
//     url:'https://obscure-harbor-85447.herokuapp.com/api/v1/foods/' + e.target.id,
//     success: $(`.foods-table .row${e.target.id}`).remove()
//   })
// }

$('form').submit(function(e) {
  e.preventDefault()
  var food = $('input[name="food"]').val()
  var calories = $('input[name="calories"]').val()
  $('.manage-food').each(function() { this.reset() })
  $('p.food-error').remove()
  createFood(food, calories)
})

// function filterFoods() {
//   var input = $('#myInput')
//   var filter = input.value.toUpperCase()
//   var table = $('.foods-table')
//   var tr = table.$('tr')
//   for (i = 0; i < tr.length; i++) {
//     td = tr[i].$('td')[0]
//     if (td) {
//       if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
//         tr[i].style.display = ''
//       } else {
//         tr[i].style.display = 'none'
//       }
//     }
//   }
