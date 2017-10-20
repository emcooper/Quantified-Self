module.exports = {totalCalories}

const apiUrl = "https://obscure-harbor-85447.herokuapp.com/api/v1"

$(document).ready(function(){
  renderDiary()
  renderFoods()
  removeFood()
  addFoodToMeal()
})

function addFoodToMeal(){
  $("#add-selected").on("click", function(event){
    let foodId = event.target.getAttribute("foodId")
    let mealId = event.target.getAttribute("mealid")
    let checkedFoods = $("input:checked")
    $.each(checkedFoods, function(index, food){
      $.ajax({
      type: "POST",
      url: `${apiUrl}/meals/${mealId}/foods/${food.getAttribute("foodId")}`
      })
      .then(function(){
        renderDiary()
        renderFoods()
      })
      .catch(function(error){
        console.error(error)
      })
      console.log(food)
    })
  })
}



function renderFoods(){
  $.ajax({
  type: "GET",
  url: `${apiUrl}/foods`
  })
  .then(function(foods){
    $('#foods-table').children().html('');
    renderFoodTable(foods)
  })
  .catch(function(error){
    console.error(error)
  })
}


function renderFoodTable(foods){
  $("#foods-table-headers").append("<h3 class='text-center'>Foods</h3><br>"
                            + "<p>Add Selected to:</p>")

  $("#foods-table").append("<table class='table table-bordered'>"
                          + "<thead><tr><th></th><th>Name</th><th>Calories</th></tr></thead><tbody>"
                          + generateFoodRows(foods)
                          + "</tbody></table>")
}

function removeFood(){
  $("#meals").on("click", function(event){
    let foodId = event.target.getAttribute("foodId")
    let mealId = event.target.getAttribute("mealId")
    $.ajax({
    type: "DELETE",
    url: `${apiUrl}/meals/${mealId}/foods/${foodId}`
    })
    .then(function(){

      renderDiary()
    })
    .catch(function(error){
      console.error(error)
    })
  })
}

function renderDiary(){
  $.ajax({
  type: "GET",
  url: `${apiUrl}/meals`
  })
  .then(function(meals){
    clearElements()
    renderAddButtons(meals)
    renderMeals(meals)
    renderTotals(meals)
  })
  .catch(function(error){
    console.error(error)
  })
}

function clearElements(){
  $('#meals').children().html('');
  $('#totals-table').children().html('');
  $('#add-selected').children().remove();
}

function renderAddButtons(meals){

  $.each(meals, function(index, meal){
    $("#add-selected").append(`<button type='button' name='button' class='btn btn-primary' mealId="
                              ${meal["id"]}">${meal["name"]}</button>`)
  })
}

function renderTotals(meals){
  $('#totals-table').append(`<h3 class='text-center'>Total</h3>
                             <table class='table table-bordered'><tbody>
                             <tr><th>Goal Calories</th><th>2000</th></tr>
                             <tr><th>Total Calories</th><th>
                             ${allTotalCalories(meals)}
                             </th></tr>
                             <tr><th>Remaining Calories</th>
                             ${allRemainingCalories(meals)}
                             </tr></tbody></table></div>`)
}

function renderMeals(meals) {
  $.each(meals, function(index, meal){
    $('#meals').append(`<div class="col-md-6" id="meal-${meal["id"]}><h3 class="text-center">${meal["name"]}</h3>
                       <table class='table table-bordered'><thead><tr><th>Name</th><th>Calories</th></tr></thead><tbody>
                       ${generateMealFoodRows(meal)}
                       <tr><th>Total Calories</th><th>
                       ${totalCalories(meal)}
                       <tr><th>Remaining Calories</th>
                       ${remainingCalories(meal)}
                       </tr></tbody></table></div>`)
  })
}

function generateMealFoodRows(meal){
  rows = "";
  $.each(meal["foods"], function(index, food){
    rows += `<tr><td>${food["name"]}</td><td>${food["calories"]}</td><td><i class='fa fa-minus-circle' foodId=${food["id"]} mealId=${meal["id"]} aria-hidden='true'></i></td></tr>`
  })
  return rows
}

function generateFoodRows(foods){
  rows = "";
  $.each(foods, function(index, food){
    rows += `<tr><td><input type='checkbox' name='food' value='food' foodId=${food["id"]}></td><td>${food["name"]}</td><td>${food["calories"]}</td></tr>`
  })
  return rows
}

function totalCalories(meal){
  sum = 0;
  $.each(meal["foods"], function(index, food){
    sum += food["calories"]
  })
  return sum
}

function remainingCalories(meal){
  let calories = 0;
  if(meal['name'] === 'Snack') {calories = 200 - totalCalories(meal)}
  if(meal['name'] === 'Breakfast') {calories = 400 - totalCalories(meal)}
  if(meal['name'] === 'Lunch') {calories = 600 - totalCalories(meal)}
  if(meal['name'] === 'Dinner') {calories = 800 - totalCalories(meal)}
  if(calories >= 0){return `<th class='green-text'> + ${calories} + </th>`}
  if(calories < 0){return `<th class='red-text'> + ${calories} + </th>`}
}

function allTotalCalories(meals){
  let sum = meals.reduce(function(accumulator, meal){
      return accumulator + totalCalories(meal)
    }, 0)
  return sum
}

function allRemainingCalories(meals){
  remaining = 2000 - allTotalCalories(meals)
  if(remaining >= 0) {return `<th class='green-text'>${remaining}</th>`}
  if(remaining < 0) {return `<th class='red-text'>${remaining}</th>`}
}
