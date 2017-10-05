$(document).ready(function() {
  $(loadFoods)
})

function loadFoods() {
  $.get('https://obscure-harbor-85447.herokuapp.com/api/v1/foods')
  .then(function(foods) {
    foods.forEach(function(food) {
      $('.foods-table').append(
        '<tr><td>'+ food.name + '</td>' +
        '<td>' + food.calories + '</td>' +
        `<td><input id=${food.id} type='button' class='delete-row' value='Delete'/></td>` +
        "</tr>"
      )
    })
  })
}

function deleteFood(e) {
  $.ajax({
    url:'https://obscure-harbor-85447.herokuapp.com/api/v1/foods/' + e.target.id,
    type: 'DELETE'
  })//.then(loadFoods)
}

$('.foods-table').on('click', '.delete-row', deleteFood)
