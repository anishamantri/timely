// Default recipes
const defaultRecipes = [
    {
        id: 1,
        name: 'Grilled Chicken Salad',
        ingredients: ['Chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Olive oil dressing'],
        instructions: '1. Grill chicken breast until cooked\n2. Slice and let cool\n3. Mix with fresh greens and vegetables\n4. Dress with olive oil',
        calories: 350
    },
    {
        id: 2,
        name: 'Spaghetti Carbonara',
        ingredients: ['Spaghetti', 'Eggs', 'Bacon', 'Parmesan cheese', 'Black pepper'],
        instructions: '1. Cook spaghetti\n2. Fry bacon until crispy\n3. Mix eggs with parmesan\n4. Combine hot pasta with bacon and egg mixture',
        calories: 620
    },
    {
        id: 3,
        name: 'Stir Fry Vegetables',
        ingredients: ['Broccoli', 'Bell peppers', 'Carrots', 'Soy sauce', 'Sesame oil', 'Rice'],
        instructions: '1. Chop all vegetables\n2. Heat oil in wok\n3. Stir fry vegetables for 5-7 minutes\n4. Add soy sauce and serve over rice',
        calories: 420
    },
    {
        id: 4,
        name: 'Baked Salmon',
        ingredients: ['Salmon fillet', 'Lemon', 'Herbs', 'Olive oil', 'Asparagus'],
        instructions: '1. Season salmon with herbs\n2. Drizzle with olive oil\n3. Bake at 400F for 15 minutes\n4. Serve with roasted asparagus',
        calories: 480
    },
    {
        id: 5,
        name: 'Curry Rice Bowl',
        ingredients: ['Rice', 'Chickpeas', 'Spinach', 'Coconut milk', 'Curry powder', 'Onion'],
        instructions: '1. Cook rice\n2. Sauté onions\n3. Add curry powder and chickpeas\n4. Simmer with coconut milk\n5. Mix with spinach and serve over rice',
        calories: 580
    }
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Initialize app
let recipes = [];
let mealPlan = {};
let shoppingList = [];

function initApp() {
    loadRecipes();
    loadMealPlan();
    renderPlanner();
    renderRecipes();
}

// ============ STORAGE FUNCTIONS ============
function loadRecipes() {
    const stored = localStorage.getItem('meals_recipes');
    if (stored) {
        recipes = JSON.parse(stored);
    } else {
        recipes = defaultRecipes;
        saveRecipes();
    }
}

function saveRecipes() {
    localStorage.setItem('meals_recipes', JSON.stringify(recipes));
}

function loadMealPlan() {
    const stored = localStorage.getItem('meals_plan');
    if (stored) {
        mealPlan = JSON.parse(stored);
    } else {
        mealPlan = {};
        daysOfWeek.forEach(day => mealPlan[day] = []);
    }
}

function saveMealPlan() {
    localStorage.setItem('meals_plan', JSON.stringify(mealPlan));
}

function loadShoppingList() {
    const stored = localStorage.getItem('meals_shopping');
    if (stored) {
        shoppingList = JSON.parse(stored);
    } else {
        shoppingList = [];
    }
}

function saveShoppingList() {
    localStorage.setItem('meals_shopping', JSON.stringify(shoppingList));
}

// ============ TAB SWITCHING ============
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');

    // Activate selected button
    event.target.classList.add('active');
}

// ============ PLANNER TAB FUNCTIONS ============
function renderPlanner() {
    const container = document.getElementById('weekPlanner');
    container.innerHTML = '';

    daysOfWeek.forEach(day => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';

        const meals = mealPlan[day] || [];
        const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

        let mealsHTML = meals.map((meal, index) => `
            <div class="meal-item">
                <span>${meal.name}</span>
                <span class="meal-calories">${meal.calories} cal</span>
                <button class="remove-meal-btn" onclick="removeMeal('${day}', ${index})">Remove</button>
            </div>
        `).join('');

        dayCard.innerHTML = `
            <h3>${day}</h3>
            <div class="calories-info">Total: <strong>${totalCalories}</strong> calories</div>
            <div class="meals-list">${mealsHTML || '<p style="color: #999; margin: 10px 0;">No meals planned</p>'}</div>
            <div class="add-meal-controls">
                <select id="recipe-select-${day}" onchange="addMealToDay('${day}', this.value); this.value = '';">
                    <option value="">+ Add meal...</option>
                    ${recipes.map(recipe => `<option value="${recipe.id}">${recipe.name} (${recipe.calories} cal)</option>`).join('')}
                </select>
            </div>
        `;

        container.appendChild(dayCard);
    });
}

function addMealToDay(day, recipeId) {
    if (!recipeId) return;

    const recipe = recipes.find(r => r.id == recipeId);
    if (recipe) {
        if (!mealPlan[day]) {
            mealPlan[day] = [];
        }
        mealPlan[day].push({
            name: recipe.name,
            calories: recipe.calories,
            ingredients: recipe.ingredients
        });
        saveMealPlan();
        renderPlanner();
    }
}

function removeMeal(day, index) {
    if (mealPlan[day]) {
        mealPlan[day].splice(index, 1);
        saveMealPlan();
        renderPlanner();
    }
}

function clearWeek() {
    if (confirm('Are you sure you want to clear all meals for the week?')) {
        daysOfWeek.forEach(day => mealPlan[day] = []);
        saveMealPlan();
        renderPlanner();
    }
}

function downloadPlan() {
    let content = 'Weekly Meal Plan\n';
    content += '================\n\n';

    daysOfWeek.forEach(day => {
        const meals = mealPlan[day] || [];
        const total = meals.reduce((sum, meal) => sum + meal.calories, 0);
        content += `${day} (${total} cal):\n`;
        meals.forEach(meal => {
            content += `  - ${meal.name} (${meal.calories} cal)\n`;
        });
        content += '\n';
    });

    downloadFile('meal-plan.txt', content);
}

// ============ RECIPES TAB FUNCTIONS ============
function renderRecipes() {
    const container = document.getElementById('recipesList');
    container.innerHTML = '';

    if (recipes.length === 0) {
        container.innerHTML = '<p style="color: #999; text-align: center;">No recipes yet. Add one!</p>';
        return;
    }

    recipes.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h4>${recipe.name}</h4>
            <div class="recipe-calories">🔥 ${recipe.calories} calories</div>
            <div class="recipe-ingredients">
                <strong>Ingredients:</strong><br>
                ${recipe.ingredients.join('<br>')}
            </div>
            <div class="recipe-instructions">
                <strong>Instructions:</strong><br>
                ${recipe.instructions.replace(/\n/g, '<br>')}
            </div>
            <div class="recipe-actions">
                <button class="btn btn-danger" onclick="deleteRecipe(${recipe.id})">Delete</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function addRecipe() {
    const name = document.getElementById('recipeName').value.trim();
    const ingredients = document.getElementById('recipeIngredients').value.trim().split('\n').filter(i => i.trim());
    const instructions = document.getElementById('recipeInstructions').value.trim();
    const calories = parseInt(document.getElementById('recipeCalories').value) || 0;

    if (!name || ingredients.length === 0 || !instructions || calories <= 0) {
        alert('Please fill in all fields with valid data');
        return;
    }

    const newRecipe = {
        id: Date.now(),
        name,
        ingredients,
        instructions,
        calories
    };

    recipes.push(newRecipe);
    saveRecipes();

    // Clear form
    document.getElementById('recipeName').value = '';
    document.getElementById('recipeIngredients').value = '';
    document.getElementById('recipeInstructions').value = '';
    document.getElementById('recipeCalories').value = '';

    renderRecipes();
    renderPlanner(); // Update planner dropdown
}

function deleteRecipe(id) {
    if (confirm('Are you sure you want to delete this recipe?')) {
        recipes = recipes.filter(r => r.id !== id);
        saveRecipes();
        renderRecipes();
        renderPlanner();
    }
}

// ============ SHOPPING LIST TAB FUNCTIONS ============
function generateShoppingList() {
    const ingredients = {};

    // Collect all ingredients from meal plan
    daysOfWeek.forEach(day => {
        const meals = mealPlan[day] || [];
        meals.forEach(meal => {
            meal.ingredients.forEach(ingredient => {
                ingredients[ingredient] = (ingredients[ingredient] || 0) + 1;
            });
        });
    });

    // Convert to array
    shoppingList = Object.keys(ingredients).map(name => ({
        name,
        checked: false,
        quantity: ingredients[name]
    }));

    saveShoppingList();
    renderShoppingList();
}

function renderShoppingList() {
    const container = document.getElementById('shoppingList');

    if (shoppingList.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>📋 No items on the list</p><p>Generate from your meal plan to get started!</p></div>';
        return;
    }

    let html = '';
    shoppingList.forEach((item, index) => {
        html += `
            <div class="shopping-item">
                <input type="checkbox" id="item-${index}" ${item.checked ? 'checked' : ''} onchange="toggleShoppingItem(${index})">
                <label for="item-${index}">${item.name}</label>
            </div>
        `;
    });

    container.innerHTML = html;
}

function toggleShoppingItem(index) {
    shoppingList[index].checked = !shoppingList[index].checked;
    saveShoppingList();
}

function clearShoppingList() {
    if (confirm('Are you sure you want to clear the shopping list?')) {
        shoppingList = [];
        saveShoppingList();
        renderShoppingList();
    }
}

function downloadShoppingList() {
    let content = 'Shopping List\n';
    content += '=============\n\n';

    shoppingList.forEach(item => {
        const checked = item.checked ? '✓' : '☐';
        content += `${checked} ${item.name}\n`;
    });

    downloadFile('shopping-list.txt', content);
}

// ============ UTILITY FUNCTIONS ============
function downloadFile(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Initialize on page load
window.addEventListener('load', initApp);
