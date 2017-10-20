const $ = require('jquery')

function postSuccess(data) {
  appendFood(data)
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

function appendFood(food) {
  $('.foods-table').append(
    `<tr class=row${food.id}>
      <td class='food-name' contenteditable>${food.name}</td>
      <td class='food-calories' contenteditable>${food.calories}</td>
      <td><input id=${food.id} type='button' class='delete-row' value='Delete'/></td>
    </tr>`
  )
}

module.exports = {postSuccess, postError, appendFood}
