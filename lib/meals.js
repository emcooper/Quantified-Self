var api_url = "https://obscure-harbor-85447.herokuapp.com/api/v1"

$(document).ready(function(){
  $.ajax({
  type: "GET",
  url: api_url + "/meals"
  })
  .then(function(meals){
    console.log(meals)
  })
  .catch(function(error){
    console.log("error!!!")
  });
  console.log("hey")
});
