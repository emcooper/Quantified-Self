var api_url = "https://obscure-harbor-85447.herokuapp.com/api/v1"

$(document).ready(function(){
  $.ajax({
  type: "GET",
  url: api_url + "/meals"
  })
  .then(function(meals){
    renderMeals(meals);
    renderTotals(meals);

  })
  .catch(function(error){
    console.error(error)
  });
});

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
    $('#meals').append('<div class="col-md-6"><h3 class="text-center">' + meal["name"] + '</h3>'
                      + "<table class='table table-bordered'><thead><tr><th>Name</th><th>Calories</th></tr></thead><tbody>"
                      + generateFoodRows(meal)
                      + "<tr><th>Total Calories</th><th>"
                      + totalCalories(meal)
                      + "<tr><th>Remaining Calories</th>"
                      + remainingCalories(meal)
                      + "</tr></tbody></table></div>")
  })
}

function generateFoodRows(meal){
  rows = "";
  $.each(meal["foods"], function(index, food){
    rows += "<tr><td>" + food["name"] +"</td><td>" + food["calories"] + "</td></tr>"
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
