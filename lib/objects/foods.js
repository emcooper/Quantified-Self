$(document).ready(function() {
  loadFoods()
  $('.foods-table').on('click', '.delete-row', deleteFood)
})

function loadFoods() {
  $.get('https://obscure-harbor-85447.herokuapp.com/api/v1/foods')
  .then(function(foods) {
    foods.forEach(function(food) {
      $('.foods-table').append(
        `<tr class=row${food.id}>
          <td class='food-name' contenteditable>${food.name}</td>
          <td class='food-calories' contenteditable>${food.calories}</td>
          <td><input id=${food.id} type='button' class='delete-row' value='Delete'/></td>
        </tr>`
      )
    })
  })
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
function deleteFood(e) {
  $.ajax({
    type: 'DELETE',
    url:'https://obscure-harbor-85447.herokuapp.com/api/v1/foods/' + e.target.id,
    success: $(`.foods-table .row${e.target.id}`).remove()
  })
}

$('form').submit(function(e) {
  e.preventDefault()
  var food = $('input[name="food"]').val()
  var calories = $('input[name="calories"]').val()
  $('.manage-food').each(function() { this.reset() })
  $('p.food-error').remove()

  $.ajax({
    type: "POST",
    url: 'https://obscure-harbor-85447.herokuapp.com/api/v1/foods',
    data: { food: {
      name: $.trim(food),
      calories: $.trim(calories)
    }},
    success: function(data) {
      postSuccess(data)
    },
    error: function(error) {
      postError(error)
    }
  })
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



function postSuccess(data) {
  $('.foods-table').append(
    `<tr class=row${data.id}>
      <td class='food-name' contenteditable='true'>${data.name}</td>
      <td class='food-calories' contenteditable='true'>${data.calories}</td>
      <td><input id=${data.id} type='button' class='delete-row' value='Delete'/></td>
    </tr>`
  )
}

function postError(error) {
  if(error.responseText.includes('name') && error.responseText.includes('calories')){
    $('input.food').after('<p class="food-error">Please enter a food name</p>')
    $('input.calories').after('<p class="food-error">Please enter a calorie amount</p>')
  } else if(error.responseText.includes('name')) {
    $('input.food').after('<p class="food-error">Please enter a food name</p>')
  } else {
    $('input.calories').after('<p class="food-error">Please enter a calorie amount</p>')
  }
}
