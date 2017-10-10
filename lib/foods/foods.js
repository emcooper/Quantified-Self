$(document).ready(function() {
  $(loadFoods)
})

function loadFoods() {
  $.get('https://obscure-harbor-85447.herokuapp.com/api/v1/foods')
  .then(function(foods) {
    foods.forEach(function(food) {
      $('.foods-table').append(
        `<tr class=row${food.id}>
          <td contenteditable='true' >${food.name}</td>
          <td contenteditable='true'>${food.calories}</td>
          <td><input id=${food.id} type='button' class='delete-row' value='Delete'/></td>
        </tr>`
      )
    })
  })
}

// function updateFoodName(id, value) {
//   $.ajax({
//     type: 'PATCH',
//     url: ''
//   })
// }
//
// function updateFoodCalories(id, value) {
//
// }
function deleteFood(e) {
  $.ajax({
    type: 'DELETE',
    url:'https://obscure-harbor-85447.herokuapp.com/api/v1/foods/' + e.target.id,
    success: $(`tr.row${e.target.id}`).remove()
  })
}

$('form').submit(function(e) {
  e.preventDefault()
  var food = $('input[name="food"]').val()
  var calories = $('input[name="calories"]').val()
  $('.manage-food').each(function() {
    this.reset()
  })
  $('p.food-error').remove()

  $.ajax({
    type: "POST",
    url: 'https://obscure-harbor-85447.herokuapp.com/api/v1/foods',
    data: { food: {
      name: $.trim(food),
      calories: $.trim(calories)
    }},
    success: function(data){
      $('.foods-table').append(
        '<tr><td>'+ data.name + '</td>' +
        '<td>' + data.calories + '</td>' +
        `<td><input id=${data.id} type='button' class='delete-row' value='Delete'/></td>` +
        "</tr>"
      )

    },
    error: function(error){
        if(error.responseText.includes('name') && error.responseText.includes('calories')){
          $('input.food').after('<p class="food-error">Please enter a food name</p>')
          $('input.calories').after('<p class="food-error">Please enter a calorie amount</p>')
        } else if(error.responseText.includes('name')) {
          $('input.food').after('<p class="food-error">Please enter a food name</p>')
        } else {
          $('input.calories').after('<p class="food-error">Please enter a calorie amount</p>')
        }
      }
    })
})
$('.foods-table').on('click', '.delete-row', deleteFood)
// $('td[contenteditable=true]').on('blur', function() {
//   $.ajax({
//     type: 'PATCH',
//     url: `https://obscure-harbor-85447.herokuapp.com/api/v1/foods/${}`
//   })
// })
