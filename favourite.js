//getting meal details from mealAPI using Id
//meals Ids are saved in localStorage
//it will return the specific meal
const loadMealById = async (mealId) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

//getting meal id from local storage
const favListFromLS = localStorage.getItem("favMealId");
const favList = JSON.parse(favListFromLS);

//on loading of the page get through the array
//which is accesed from localStorage
window.addEventListener("load", () => {
  //itarating the idArray
  favList.map((everyMealId) => {
    //call function which return the meal from API
    //then add that to the main container
    loadMealById(everyMealId).then((data) => {
      const favMainContainer = document.getElementById(
        "main-favourite-container"
      );
      const meal = data.meals[0];

      favMainContainer.innerHTML += `<div 
            id=${meal.idMeal}
            style="background-color: #2E4F4F ;
            height:150px;
            margin:2rem;
            border-radius:0.7rem;
            z-index:1;
            display:flex;
            white-space: wrap;
            overflow: hidden;
            text-overflow: ellipsis"> 
            <div style="background-color: #2E4F4F ;">    
            <img src=${meal.strMealThumb} 
            style="
            margin:0.5rem;
            height:100px;
            width:100px" 
            />
            <div 
            style="background-color: #2E4F4F ;
            text-align:center"
            >${meal.strMeal}</div>
            </div>
        
            <div 
            style="background-color: #2E4F4F ;
            word-wrap: normal; 
            height:100%;
            padding:1.2rem">
            ${meal.strInstructions}</div>


            <div >
            <button 
            style="
            border:none;
            height:50%;
            font-size:1.2rem;
            width:100px;
            color:#CBE4DE;
            background-color:#0E8388;
            display:block"
            >view reciepe</button>

            <button 
            class="delist-button"
            id=${meal.idMeal}
            style="font-size:1.2rem;
            border:none;
            height:50%;
            width:100px;
            color:#CBE4DE;
            background-color:#0E8388;
            display:block"
            ><i class="fa-solid fa-star" 
            style="background-color:#0E8388;
            font-size:2.5rem"
            ></i></button>
            </div>            
            </div>`;
      //getting the button which will help delist favourite
      const delistFavBtn = document.querySelectorAll(".delist-button");
      //select the specific button
      delistFavBtn.forEach((button) => {
        button.onclick = () => {
          //delete the specific parent div from
          const delistMealId = button.parentNode.parentNode.id;
          if (favList.includes(delistMealId)) {
            //delete the meal from array id whiich i wantto delist from favourite portion
            favList.splice(favList.indexOf(delistMealId), 1);
            //also manipulate the localstorage depending on the latest data
            let favListStore = JSON.stringify(favList);
            localStorage.setItem("favMealId", favListStore);
          }
          button.parentNode.parentNode.remove();
        };
      });
    });
  });
});
