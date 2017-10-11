module.exports = {totalCalories}

var api_url = "https://obscure-harbor-85447.herokuapp.com/api/v1"

$(document).ready(function(){
  renderDiary()
  renderFood()
  removeFood()
  addFoodToMeal()
})

function addFoodToMeal(){
  $("#add-selected").on("click", function(event){
    var foodId = event.target.getAttribute("foodId")
    var mealId = event.target.getAttribute("mealid")
    var checkedFoods = $("input:checked")
    console.log(checkedFoods)
    $.each(checkedFoods, function(index, food){
      $.ajax({
      type: "POST",
      url: api_url + "/meals/" + mealId + "/foods/" + food.getAttribute("foodId")
      })
      .then(function(){
        renderDiary()
      })
      .catch(function(error){
        console.error(error)
      })
    })
  })
}

function renderFood(){
  $.ajax({
  type: "GET",
  url: api_url + "/foods"
  })
  .then(function(foods){
    renderFoodTable(foods)
  })
  .catch(function(error){
    console.error(error)
  })
}


function renderFoodTable(foods){
  $("#foods-table").append("<table class='table table-bordered'><thead><tr><th></th><th>Name</th><th>Calories</th></tr></thead><tbody>"
                          + generateFoodRows(foods)
                          + "</tbody></table>")
}

function removeFood(){
  $("#meals").on("click", function(event){
    var foodId = event.target.getAttribute("foodId")
    var mealId = event.target.getAttribute("mealId")
    $.ajax({
    type: "DELETE",
    url: api_url + "/meals/" + mealId + "/foods/" + foodId
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
  url: api_url + "/meals"
  })
  .then(function(meals){
    $('#meals').children().html('');
    $('#totals-table').children().html('');
    $('#add-selected').children().remove();
    renderAddButtons(meals)
    renderMeals(meals)
    renderTotals(meals)
  })
  .catch(function(error){
    console.error(error)
  })
}

function renderAddButtons(meals){
  $.each(meals, function(index, meal){
    $("#add-selected").append("<button type='button' name='button' class='btn btn-primary' mealId="
                              + meal["id"] + ">" + meal["name"] + "</button> ")
  })
}

function renderTotals(meals){
  $('#totals-table').append(
                            "<table class='table table-bordered'><tbody>"
                            + "<tr><th>Goal Calories</th><th>2000</th></tr>"
                            + "<tr><th>Total Calories</th><th>"
                            + allTotalCalories(meals)
                            + "</th></tr>"
                            + "<tr><th>Remaining Calories</th>"
                            + allRemainingCalories(meals)
                            + "</tr></tbody></table></div>")
}

function renderMeals(meals) {
  $.each(meals, function(index, meal){
    $('#meals').append('<div class="col-md-6" id="meal-"' + meal["id"] + ' ><h3 class="text-center">' + meal["name"] + '</h3>'
                      + "<table class='table table-bordered'><thead><tr><th>Name</th><th>Calories</th></tr></thead><tbody>"
                      + generateMealFoodRows(meal)
                      + "<tr><th>Total Calories</th><th>"
                      + totalCalories(meal)
                      + "<tr><th>Remaining Calories</th>"
                      + remainingCalories(meal)
                      + "</tr></tbody></table></div>")
  })
}

function generateMealFoodRows(meal){
  rows = "";
  $.each(meal["foods"], function(index, food){
    rows += "<tr><td>" + food["name"] +"</td><td>" + food["calories"] + "</td><td><i class='fa fa-minus-circle' foodId= " + food["id"] + " mealId=" + meal["id"] + " aria-hidden='true'></i></td></tr>"
  })
  return rows
}

function generateFoodRows(foods){
  rows = "";
  $.each(foods, function(index, food){
    rows += "<tr><td><input type='checkbox' name='food' value='food' foodId=" + food["id"] + "></td><td>" + food["name"] +"</td><td>" + food["calories"] + "</td></tr>"
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
  var calories = 0;
  if(meal['name'] === 'Snack') {calories = 200 - totalCalories(meal)}
  if(meal['name'] === 'Breakfast') {calories = 400 - totalCalories(meal)}
  if(meal['name'] === 'Lunch') {calories = 600 - totalCalories(meal)}
  if(meal['name'] === 'Dinner') {calories = 800 - totalCalories(meal)}
  if(calories >= 0){return "<th class='green-text'>" + calories + "</th>"}
  if(calories < 0){return "<th class='red-text'>" + calories + "</th>"}
}

function allTotalCalories(meals){
  var sum = meals.reduce(function(accumulator, meal){
      return accumulator + totalCalories(meal)
    }, 0)
  return sum
}

function allRemainingCalories(meals){
  remaining = 2000 - allTotalCalories(meals)
  if(remaining >= 0) {return "<th class='green-text'>" + remaining + "</th>"}
  if(remaining < 0) {return "<th class='red-text'>" + remaining + "</th>"}
}
