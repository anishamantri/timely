````markdown
# 🍽️ Timely - Meal Planner

Your calendar's baby cousin who just learned to walk, now with meal planning superpowers!

## ✨ Features

- **📅 Weekly Meal Planner** - Plan all 7 days of the week with ease
- **📖 Recipe Manager** - Create and manage your own recipes
- **🛒 Smart Shopping List** - Auto-generate from your meal plan
- **🔥 Calorie Tracking** - See daily totals at a glance
- **💾 Auto-Save** - All data saved locally in your browser
- **📱 Responsive Design** - Works on desktop, tablet, and mobile
- **⬇️ Download Options** - Export your plans and shopping lists

## 🚀 Getting Started

### Option 1: Use Directly (Easiest)
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start planning!

### Option 2: Deploy to GitHub Pages
1. Go to your repository settings
2. Enable GitHub Pages on the `main` branch
3. Access your app at `https://yourusername.github.io/timely/`

## 📖 How to Use

### 📅 Planner Tab
1. Select a recipe from the dropdown for each day
2. View daily calorie totals automatically
3. Remove meals you don't want
4. Download your weekly plan

### 📖 Recipes Tab
- **View**: All your saved recipes with ingredients and instructions
- **Add**: Create new recipes with custom ingredients and calorie counts
- **Delete**: Remove recipes you no longer need
- **Default**: 5 pre-loaded recipes to get you started

### 🛒 Shopping List Tab
1. Click **"Generate from Plan"** to create a list from your meals
2. Duplicate ingredients are combined automatically
3. Check off items as you shop
4. Download the list to your phone

## 💾 Data Storage

- **Location**: Stored in your browser's `localStorage`
- **Privacy**: All data stays on your device
- **Persistence**: Data saved automatically and persists across sessions
- **Clearing**: Use browser's Developer Tools > Application > Storage to clear

## 🛠️ Code Structure

```javascript
// Default Recipes
defaultRecipes[] - 5 starter recipes with calories

// Main Functions
initApp()              - Initialize the application
switchTab(tabName)     - Switch between tabs

// Planner Functions
renderPlanner()        - Display weekly planner
addMealToDay()         - Add recipe to a day
removeMeal()           - Remove meal from plan
clearWeek()            - Clear all meals

// Recipe Functions
renderRecipes()        - Display all recipes
addRecipe()            - Create new recipe
deleteRecipe()         - Remove recipe

// Shopping List Functions
generateShoppingList() - Auto-generate from meals
renderShoppingList()   - Display shopping list
toggleShoppingItem()   - Check off items
clearShoppingList()    - Clear all items

// Storage Functions
loadRecipes()          - Load recipes from localStorage
saveRecipes()          - Save recipes to localStorage
loadMealPlan()         - Load meal plan from localStorage
saveMealPlan()         - Save meal plan to localStorage
```

## 🎨 Customization

### Change Colors
Edit `styles.css` and modify the gradient:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Add More Default Recipes
Edit `script.js` and add to `defaultRecipes` array:
```javascript
{
    id: 6,
    name: 'Your Recipe Name',
    ingredients: ['ingredient1', 'ingredient2'],
    instructions: 'Step by step instructions',
    calories: 500
}
```

## 🔒 Privacy & Security

- ✅ All data stored locally on your device
- ✅ No server uploads
- ✅ No tracking
- ✅ Works offline after first load

## 🐛 Troubleshooting

**Q: My meals disappeared!**
- A: Check if you cleared your browser's cache/cookies. Consider exporting your plan regularly.

**Q: Can I sync across devices?**
- A: Not currently. Data is device-specific. Consider exporting/importing.

**Q: How do I backup my data?**
- A: Use the Download buttons to export your plans and recipes.

## 📚 Example: Adding a Custom Recipe

1. Go to **Recipes** tab
2. Fill in:
   - Name: "Breakfast Smoothie"
   - Ingredients: 
     ```
     Banana
     Yogurt
     Berries
     Honey
     ```
   - Instructions: "Blend all ingredients until smooth. Serve immediately."
   - Calories: 250
3. Click **Save Recipe**
4. Now it appears in all day dropdowns!

## 🎯 Tips & Tricks

- 💡 Plan your favorite meals first
- 🔄 Repeat meals across the week to save time
- 📊 Aim for balanced calorie intake
- 🛒 Generate shopping list before grocery shopping
- 📝 Keep a note of dietary restrictions in recipe descriptions

## 🚀 Future Enhancements

- Cloud sync (Google Drive, Dropbox)
- Nutrition breakdown (protein, carbs, fats)
- Meal prep timer
- Recipe rating system
- Multi-week planning
- Mobile app version

## 📄 Files Included

- `index.html` - Main application structure
- `styles.css` - Beautiful styling and layouts
- `script.js` - All application logic
- `README.md` - This file

## 🤝 Contributing

Want to improve this? Feel free to:
- Fork this repository
- Create a feature branch
- Submit a pull request

## 📜 License

This project is open source and available under the MIT License.

---

**Made with ❤️ for meal planning lovers**

Happy planning! 🍽️✨
````
