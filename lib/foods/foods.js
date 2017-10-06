$(document).ready(function() {
  $(loadFoods)
})

function loadFoods() {
  $.get('https://obscure-harbor-85447.herokuapp.com/api/v1/foods')
  .then(function(foods) {
    foods.forEach(function(food) {
      $('.foods-table').append(
        `<tr class=row${food.id}><td>`+ food.name + '</td>' +
        '<td>' + food.calories + '</td>' +
        `<td><input id=${food.id} type='button' class='delete-row' value='Delete'/></td>` +
        "</tr>"
      )
    })
  })
}

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
      $('.manage-food').each(function() {
        this.reset()
      })

    },
    error: function(error){
        if(error.responseText.includes('name') && error.responseText.includes('calories')){
          $('input.food').after('<p>Please enter a food name</p>')
          $('input.calories').after('<p>Please enter a calorie amount</p>')
        } else if(error.responseText.includes('name')) {
          $('input.food').after('<p>Please enter a food name</p>')
        } else {
          $('input.calories').after('<p>Please enter a calorie amount</p>')
        }
      }
    })
})
$('.foods-table').on('click', '.delete-row', deleteFood)
