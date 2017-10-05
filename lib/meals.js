var api_url = "https://obscure-harbor-85447.herokuapp.com/api/v1"

$(document).ready(function(){
  $.ajax({
  type: "GET",
  url: api_url + "/meals"
  })
  .then(function(meals){
    renderMeals(meals);

  })
  .catch(function(error){
    console.error(error)
  });
});

function renderMeals(meals) {
  $.each(meals, function(index, meal){
    console.log(meal);
    $('#meals').append('<div class="col-md-6"><h3 class="text-center">' + meal["name"] + '</h3>'
                      + "<table class='table table-bordered'><thead><tr><th>Name</th><th>Calories</th></tr></thead><tbody>"
                      + generateFoodRows(meal)
                      + "<tr><th>Total Calories</th><th>"
                      + totalCalories(meal)
                      + "</th></tr></tbody></table></div>")
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
