//selecting important elements
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-meal");
//favList Array will be storend in browser LocalStorage
let favList = [];

//getMeal() Function will be return the specic meals which search by the user
//the parameter will come from search bar value whcih typed by user
const getMeal = async (mealName) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const mealMainContainer = document.getElementById("meal-main-container");

//on every key press in search bar the dynamic search result will show to the div
searchBar.onkeydown = () => {
  mealMainContainer.innerHTML = "";
  //getting data from getMeal()
  getMeal(searchBar.value).then((data) => {
    //if its null it will show that
    if (data.meals === null) {
      mealMainContainer.innerHTML = `<h1 
      style="color:#CBE4DE"
      > No Meals Found By That Name </h1>`;
    } else {
      //after getting response from API ,
      // map through the items and for every api we add a div containing details of a single meal
      //and add it to the main container div
      data.meals.map((meal) => {
        mealMainContainer.innerHTML += `<div id=${meal.idMeal}
        style="height:550px;
        width:400px;
        background-color:#2E4F4F;
        border-radius:5%;
        padding:3.5rem 1rem;
        margin-bottom: 6rem;">

        <img src=${meal.strMealThumb} 
        style="height:350px;
        width:350px;
        margin:0rem 1.7rem 4rem 1.7rem ;
        border-radius:50%" />
        
        <div 
        style="height:3rem;
         width:100%; 
         background-color:#0E8388;
         color:#CBE4DE;
         font-size:2.5rem;
         text-align:center;
         border-radius:10px">
        ${meal.strMeal}</div>

        <button 
        style="background-color:#0E8388;
        color:#CBE4DE;
        font-size:1.5rem;
        text-align:center;
        height:4rem;
        width:12rem;
        border:none;
        border-radius:10px;
        margin-top:3rem">
        <a href="${meal.strSource}" target="_blank"
        style="background-color:#0E8388;
        color:#CBE4DE;
        text-decoration:none
        ">Meal Recipe
        </a></button>
        <button class="fav-button"
        style="margin-left:8rem;
        margin-bottom:0.5rem;
        border:none">
        <i class="fa-solid fa-star " 
        style="background-color:#2E4F4F;
        font-size:4rem;
        color:white;"></i> 
        </button>
        </div>`;

        //this is or favourite button
        //when we click favourite button it get the element first
        const favButton = document.querySelectorAll(".fav-button");
        //we have to loop through every button
        favButton.forEach((button) => {
          //for clicking the button it will add the id of the meals to the local storage
          button.onclick = () => {
            const mealId = button.parentNode.id;
            if (!favList.includes(mealId) && favList.length < 10) {
              favList.push(mealId);
            } else if (favList.includes(mealId)) {
              alert("Meal is already in your favourite list");
            } else if (favList.length == 10) {
              alert("You only can add 10 items in favourite list");
            }
            //accesing localStorage and saving the meal id
            let favListStore = JSON.stringify(favList);
            localStorage.setItem("favMealId", favListStore);
          };
        });
        //console.log(favButton)

        //console.log(meal);
      });
    }
  });
};

//on every refresh the localStorage will be deleted
window.onload = () => {
  localStorage.removeItem("favMealId");
};
