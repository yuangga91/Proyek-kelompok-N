/* ========================================
   MENU MAKAN HEMAT - JavaScript Logic
   Main Application Functionality
   ======================================== */

// Application State
let appState = {
    userProfile: null,
    weeklyMenu: null,
    reminders: {
        breakfast: { time: "07:00", enabled: true },
        lunch: { time: "12:00", enabled: true },
        dinner: { time: "18:00", enabled: true }
    },
    reminderIntervals: {}
};

// Load state from localStorage on page load
window.addEventListener('DOMContentLoaded', function() {
    loadStateFromStorage();
    initializeApp();
    setupEventListeners();
});

// ========== TAB SWITCHING ==========
function switchTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Deactivate all nav buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Activate corresponding nav button
    const activeBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

// ========== EVENT LISTENERS SETUP ==========
function setupEventListeners() {
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTab(this.dataset.tab);
        });
    });

    // Profile form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSubmit);
    }

    // Menu generation button
    const generateMenuBtn = document.getElementById('generateMenuBtn');
    if (generateMenuBtn) {
        generateMenuBtn.addEventListener('click', handleGenerateMenu);
    }

    // Save PDF button
    const savePDFBtn = document.getElementById('savePDFBtn');
    if (savePDFBtn) {
        savePDFBtn.addEventListener('click', handleSavePDF);
    }

    // Recipe search and filter
    const recipeSearch = document.getElementById('recipeSearch');
    if (recipeSearch) {
        recipeSearch.addEventListener('input', handleRecipeSearch);
    }

    const recipeBudgetFilter = document.getElementById('recipeBudgetFilter');
    if (recipeBudgetFilter) {
        recipeBudgetFilter.addEventListener('change', handleRecipeFilter);
    }

    // Load recipes on page load
    loadAndDisplayRecipes();

    // Load food menus on page load
    loadAndDisplayFoodMenu();

    // Load food places on page load
    loadAndDisplayFoodPlaces();

    // Reminder save button
    const saveReminderBtn = document.getElementById('saveReminderBtn');
    if (saveReminderBtn) {
        saveReminderBtn.addEventListener('click', handleSaveReminder);
    }

    // Modal close button
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeRecipeModal);
    }

    // Close modal when clicking outside
    const recipeModal = document.getElementById('recipeModal');
    if (recipeModal) {
        recipeModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeRecipeModal();
            }
        });
    }
}

// ========== PROFILE FORM HANDLING ==========
function handleProfileSubmit(e) {
    e.preventDefault();

    // Get form data
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const height = parseInt(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const budget = parseInt(document.getElementById('budget').value);
    const dietType = document.querySelector('input[name="dietType"]:checked').value;
    
    // Get nutrition preferences
    const nutritionCheckboxes = document.querySelectorAll('input[name="nutrition"]:checked');
    const selectedNutrition = Array.from(nutritionCheckboxes).map(cb => cb.value);
    
    // Get allergies
    const allergyCheckboxes = document.querySelectorAll('input[name="allergies"]:checked');
    const selectedAllergies = Array.from(allergyCheckboxes).map(cb => cb.value);

    // Calculate BMR and daily calories
    const bmr = calculateBMR(gender, age, height, weight);
    const dailyCalories = calculateDailyCalories(bmr);
    const mealRecommendation = getMealRecommendation(dailyCalories);

    // Store profile in app state
    appState.userProfile = {
        gender,
        age,
        height,
        weight,
        budget,
        dietType,
        selectedNutrition,
        selectedAllergies,
        bmr,
        dailyCalories,
        mealRecommendation
    };

    // Save to localStorage
    saveStateToStorage();

    // Display calorie results
    displayCalorieResults(bmr, dailyCalories, mealRecommendation, budget);

    // Show success message
    showNotification('✓ Data profil berhasil disimpan!', 'success');
}

// Display calorie calculation results
function displayCalorieResults(bmr, dailyCalories, mealRecommendation, budget) {
    const calorieResult = document.getElementById('calorieResult');
    const dailyBudget = Math.floor(budget / 7);

    calorieResult.style.display = 'block';
    document.getElementById('bmrValue').textContent = bmr.toLocaleString('id-ID');
    document.getElementById('calorieValue').textContent = dailyCalories.toLocaleString('id-ID');
    document.getElementById('mealRecommendation').textContent = mealRecommendation;
    document.getElementById('budgetPerDay').textContent = `Rp ${dailyBudget.toLocaleString('id-ID')}`;
}

// ========== MENU GENERATION ==========
function handleGenerateMenu() {
    if (!appState.userProfile) {
        showNotification('⚠️ Silakan isi data profil terlebih dahulu!', 'warning');
        switchTab('profile');
        return;
    }

    const profile = appState.userProfile;
    const weeklyMenu = generateWeeklyMenu(
        profile.budget,
        profile.selectedNutrition,
        profile.selectedAllergies,
        profile.dietType
    );

    appState.weeklyMenu = weeklyMenu;
    saveStateToStorage();

    displayWeeklyMenu(weeklyMenu, profile.budget);
    showNotification('✓ Menu mingguan berhasil dibuat!', 'success');
}

// Display weekly menu
function displayWeeklyMenu(weeklyMenu, totalBudget) {
    const menuContainer = document.getElementById('menuContainer');
    const budgetSummary = document.getElementById('budgetSummary');
    
    menuContainer.innerHTML = '';
    
    let totalCost = 0;
    let totalCalories = 0;

    weeklyMenu.forEach((dayMenu, index) => {
        const dayCard = document.createElement('div');
        dayCard.className = 'menu-day';

        const dailyCost = (dayMenu.breakfast.cost || 0) + (dayMenu.lunch.cost || 0) + 
                         (dayMenu.dinner.cost || 0) + (dayMenu.snack.cost || 0);
        const dailyCalories = (dayMenu.breakfast.calories || 0) + (dayMenu.lunch.calories || 0) + 
                             (dayMenu.dinner.calories || 0) + (dayMenu.snack.calories || 0);

        totalCost += dailyCost;
        totalCalories += dailyCalories;

        dayCard.innerHTML = `
            <div class="menu-day-header">${dayMenu.day}</div>
            <div class="menu-meal">
                <div class="menu-meal-type">🌅 Sarapan</div>
                <div class="menu-meal-name">${dayMenu.breakfast.icon} ${dayMenu.breakfast.name}</div>
                <div class="menu-meal-cost">Rp ${dayMenu.breakfast.cost.toLocaleString('id-ID')} • ${dayMenu.breakfast.calories} kcal</div>
            </div>
            <div class="menu-meal">
                <div class="menu-meal-type">☀️ Makan Siang</div>
                <div class="menu-meal-name">${dayMenu.lunch.icon} ${dayMenu.lunch.name}</div>
                <div class="menu-meal-cost">Rp ${dayMenu.lunch.cost.toLocaleString('id-ID')} • ${dayMenu.lunch.calories} kcal</div>
            </div>
            <div class="menu-meal">
                <div class="menu-meal-type">🌙 Makan Malam</div>
                <div class="menu-meal-name">${dayMenu.dinner.icon} ${dayMenu.dinner.name}</div>
                <div class="menu-meal-cost">Rp ${dayMenu.dinner.cost.toLocaleString('id-ID')} • ${dayMenu.dinner.calories} kcal</div>
            </div>
            <div class="menu-meal">
                <div class="menu-meal-type">🍪 Snack</div>
                <div class="menu-meal-name">${dayMenu.snack.icon} ${dayMenu.snack.name}</div>
                <div class="menu-meal-cost">Rp ${dayMenu.snack.cost.toLocaleString('id-ID')} • ${dayMenu.snack.calories} kcal</div>
            </div>
            <div class="menu-day-summary">
                <div class="menu-day-summary-item">
                    <span>💰 Total Harian:</span>
                    <span>Rp ${dailyCost.toLocaleString('id-ID')}</span>
                </div>
                <div class="menu-day-summary-item">
                    <span>🔥 Total Kalori:</span>
                    <span>${dailyCalories} kcal</span>
                </div>
            </div>
        `;

        menuContainer.appendChild(dayCard);
    });

    // Display budget summary
    const budgetCards = `
        <div class="budget-card">
            <div class="budget-card-label">💰 Total Budget Minggu</div>
            <div class="budget-card-value">Rp ${totalBudget.toLocaleString('id-ID')}</div>
        </div>
        <div class="budget-card">
            <div class="budget-card-label">💸 Total Pengeluaran</div>
            <div class="budget-card-value">Rp ${totalCost.toLocaleString('id-ID')}</div>
        </div>
        <div class="budget-card">
            <div class="budget-card-label">✅ Sisa Budget</div>
            <div class="budget-card-value">Rp ${(totalBudget - totalCost).toLocaleString('id-ID')}</div>
        </div>
        <div class="budget-card">
            <div class="budget-card-label">🔥 Total Kalori</div>
            <div class="budget-card-value">${totalCalories.toLocaleString('id-ID')}</div>
        </div>
    `;
    
    budgetSummary.innerHTML = budgetCards;
}

// ========== RECIPE HANDLING ==========
function loadAndDisplayRecipes() {
    displayAllRecipes(recipesDatabase);
}

function displayAllRecipes(recipes) {
    const recipeContainer = document.getElementById('recipeContainer');
    recipeContainer.innerHTML = '';

    if (recipes.length === 0) {
        recipeContainer.innerHTML = '<p class="info-text">Tidak ada resep yang sesuai dengan filter Anda</p>';
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.onclick = () => showRecipeDetail(recipe);

        recipeCard.innerHTML = `
            <div class="recipe-image">${recipe.emoji}</div>
            <div class="recipe-content">
                <div class="recipe-title">${recipe.name}</div>
                <div class="recipe-info">
                    <span class="recipe-cost">Rp ${recipe.cost.toLocaleString('id-ID')}</span>
                    <span class="recipe-calorie">${recipe.calories} kcal</span>
                </div>
                <div class="recipe-info">
                    <span>🥚 ${recipe.protein}g protein</span>
                    <span>🌾 ${recipe.carbs}g karbs</span>
                </div>
                <div class="recipe-info">
                    <span>🥑 ${recipe.fat}g fat</span>
                    <span>🥕 ${recipe.fiber}g fiber</span>
                </div>
            </div>
        `;

        recipeContainer.appendChild(recipeCard);
    });
}

function handleRecipeSearch(e) {
    const query = e.target.value.toLowerCase();
    const budgetFilter = document.getElementById('recipeBudgetFilter').value;

    let filtered = recipesDatabase.filter(recipe => 
        recipe.name.toLowerCase().includes(query)
    );

    filtered = applyBudgetFilter(filtered, budgetFilter);
    displayAllRecipes(filtered);
}

function handleRecipeFilter(e) {
    const budgetFilter = e.target.value;
    const searchQuery = document.getElementById('recipeSearch').value.toLowerCase();

    let filtered = recipesDatabase.filter(recipe => 
        recipe.name.toLowerCase().includes(searchQuery)
    );

    filtered = applyBudgetFilter(filtered, budgetFilter);
    displayAllRecipes(filtered);
}

function applyBudgetFilter(recipes, budgetFilter) {
    if (!budgetFilter) return recipes;

    if (budgetFilter === 'cheap') {
        return recipes.filter(r => r.cost < 20000);
    } else if (budgetFilter === 'medium') {
        return recipes.filter(r => r.cost >= 20000 && r.cost <= 50000);
    } else if (budgetFilter === 'expensive') {
        return recipes.filter(r => r.cost > 50000);
    }

    return recipes;
}

function showRecipeDetail(recipe) {
    const recipeModal = document.getElementById('recipeModal');
    const recipeDetail = document.getElementById('recipeDetail');

    const allergenText = recipe.allergens.length > 0 
        ? recipe.allergens.join(', ') 
        : 'Tidak ada alergen umum';

    const detailHTML = `
        <div class="recipe-detail-header">
            <div class="recipe-detail-emoji">${recipe.emoji}</div>
            <div>
                <div class="recipe-detail-title">${recipe.name}</div>
                <div style="color: #666; font-size: 14px;">Kategori: ${recipe.category} • Tipe: ${recipe.type}</div>
            </div>
        </div>

        <div class="recipe-detail-stats">
            <div class="recipe-stat">
                <div class="recipe-stat-label">Biaya</div>
                <div class="recipe-stat-value">Rp ${recipe.cost.toLocaleString('id-ID')}</div>
            </div>
            <div class="recipe-stat">
                <div class="recipe-stat-label">Kalori</div>
                <div class="recipe-stat-value">${recipe.calories} kcal</div>
            </div>
            <div class="recipe-stat">
                <div class="recipe-stat-label">Protein</div>
                <div class="recipe-stat-value">${recipe.protein}g</div>
            </div>
        </div>

        <div class="recipe-detail-section">
            <h4>📊 Nutrisi Lengkap</h4>
            <ul>
                <li>🥚 Protein: ${recipe.protein}g</li>
                <li>🌾 Karbohidrat: ${recipe.carbs}g</li>
                <li>🥑 Lemak: ${recipe.fat}g</li>
                <li>🥕 Serat: ${recipe.fiber}g</li>
            </ul>
        </div>

        <div class="recipe-detail-section">
            <h4>⚠️ Alergen</h4>
            <p>${allergenText}</p>
        </div>

        <div class="recipe-detail-section">
            <h4>📋 Bahan-bahan</h4>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        </div>

        <div class="recipe-detail-section">
            <h4>👨‍🍳 Langkah-langkah</h4>
            <ul>
                ${recipe.steps.map((step, idx) => `<li>Langkah ${idx + 1}: ${step}</li>`).join('')}
            </ul>
        </div>
    `;

    recipeDetail.innerHTML = detailHTML;
    recipeModal.style.display = 'flex';
}

function closeRecipeModal() {
    document.getElementById('recipeModal').style.display = 'none';
}

// ========== FOOD MENU HANDLING ==========
let currentFoodMenuFilter = 'all';

function loadAndDisplayFoodMenu() {
    displayFoodMenus(foodMenusTembalang);
}

function displayFoodMenus(foods) {
    const foodMenuContainer = document.getElementById('foodMenuContainer');
    if (!foodMenuContainer) return;

    foodMenuContainer.innerHTML = '';

    if (foods.length === 0) {
        foodMenuContainer.innerHTML = '<p class="info-text">Tidak ada menu yang sesuai</p>';
        return;
    }

    foods.forEach(food => {
        const foodCard = document.createElement('div');
        foodCard.className = 'food-card';

        const allergenBadges = food.allergens.map(a => 
            `<span class="allergen-badge">⚠️ ${a}</span>`
        ).join('');

        const typeColor = food.type === 'Sehat' ? '#4caf50' : '#ff6b6b';
        
        foodCard.innerHTML = `
            <div class="food-header">
                <div class="food-emoji">${food.emoji}</div>
                <div>
                    <div class="food-name">${food.name}</div>
                    <span style="background: ${typeColor}; color: white; padding: 4px 10px; border-radius: 15px; font-size: 11px; font-weight: 600;">
                        ${food.type}
                    </span>
                </div>
            </div>
            <div class="food-details">
                <div class="food-detail-row">
                    <span class="food-label">Harga:</span>
                    <span class="food-value">Rp ${food.price.toLocaleString('id-ID')}</span>
                </div>
                <div class="food-detail-row">
                    <span class="food-label">Kalori:</span>
                    <span class="food-value">${food.calories} kcal</span>
                </div>
                <div class="food-detail-row">
                    <span class="food-label">Nutrisi:</span>
                    <span style="color: #666; font-size: 13px;">${food.nutrition}</span>
                </div>
                <div class="food-detail-row" style="flex-wrap: wrap; gap: 5px;">
                    ${allergenBadges}
                </div>
            </div>
        `;

        foodMenuContainer.appendChild(foodCard);
    });
}

function filterFoodMenu(type) {
    currentFoodMenuFilter = type;
    
    // Update button styles
    document.querySelectorAll('#food-menu-tab .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    let filtered = foodMenusTembalang;
    if (type === 'sehat') {
        filtered = foodMenusTembalang.filter(food => food.type === 'Sehat');
    } else if (type === 'junk') {
        filtered = foodMenusTembalang.filter(food => food.type === 'Junk');
    }

    displayFoodMenus(filtered);
}

// ========== FOOD PLACES HANDLING ==========
let currentFoodPlacesFilter = 'all';

function loadAndDisplayFoodPlaces() {
    displayFoodPlaces(foodPlacesTembalang);
}

function displayFoodPlaces(places) {
    const foodPlacesContainer = document.getElementById('foodPlacesContainer');
    if (!foodPlacesContainer) return;

    foodPlacesContainer.innerHTML = '';

    if (places.length === 0) {
        foodPlacesContainer.innerHTML = '<p class="info-text">Tidak ada tempat makan yang sesuai</p>';
        return;
    }

    places.forEach(place => {
        const restaurantCard = document.createElement('div');
        restaurantCard.className = 'restaurant-card';

        const allergyBadges = place.allergies.map(a => 
            `<span class="allergen-badge">⚠️ ${a}</span>`
        ).join('');

        const nutrientBadges = place.nutrients.map(n => 
            `<span class="nutrient-badge">💚 ${n}</span>`
        ).join('');

        const rating = '⭐'.repeat(Math.floor(place.rating));

        restaurantCard.innerHTML = `
            <div class="restaurant-header">
                <div class="restaurant-emoji">${place.emoji}</div>
                <div style="flex: 1;">
                    <div class="restaurant-name">${place.name}</div>
                    <span class="restaurant-type">${place.type}</span>
                    <div style="font-size: 12px; color: #666;">${rating} ${place.rating}/5</div>
                </div>
            </div>
            <div class="restaurant-details">
                <div class="restaurant-detail-row">
                    <span class="restaurant-label">📍 Lokasi:</span>
                    <span style="color: #666; font-size: 13px;">${place.address}</span>
                </div>
                <div class="restaurant-detail-row">
                    <span class="restaurant-label">💰 Harga Rata:</span>
                    <span class="restaurant-value">Rp ${place.avgPrice.toLocaleString('id-ID')}</span>
                </div>
                <div class="restaurant-detail-row">
                    <span class="restaurant-label">⏰ Jam:</span>
                    <span style="color: #666; font-size: 13px;">${place.hours}</span>
                </div>
                <div class="restaurant-detail-row">
                    <span class="restaurant-label">📞 Telepon:</span>
                    <span style="color: #3498db; font-size: 13px; font-weight: 600;">${place.phone}</span>
                </div>
                <div class="restaurant-detail-row">
                    <span class="restaurant-label">👌 Rekomendasi:</span>
                    <span style="color: #666; font-size: 13px;">${place.recommendations.join(', ')}</span>
                </div>
                <div class="restaurant-detail-row" style="flex-wrap: wrap; gap: 5px;">
                    ${nutrientBadges}
                </div>
                <div class="restaurant-detail-row" style="flex-wrap: wrap; gap: 5px;">
                    ${allergyBadges}
                </div>
            </div>
        `;

        foodPlacesContainer.appendChild(restaurantCard);
    });
}

function filterFoodPlaces(type) {
    currentFoodPlacesFilter = type;
    
    // Update button styles
    document.querySelectorAll('#food-places-tab .filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    let filtered = foodPlacesTembalang;
    if (type === 'sehat') {
        // Filter places dengan nutrient positif
        filtered = foodPlacesTembalang.filter(place => 
            place.nutrients.includes('Protein') || place.nutrients.includes('Serat')
        );
    } else if (type === 'hemat') {
        // Filter places dengan harga rata-rata terendah
        filtered = foodPlacesTembalang.sort((a, b) => a.avgPrice - b.avgPrice);
    }

    displayFoodPlaces(filtered);
}

// ========== REMINDER HANDLING ==========
function handleSaveReminder() {
    const breakfastTime = document.getElementById('breakfastTime').value;
    const lunchTime = document.getElementById('lunchTime').value;
    const dinnerTime = document.getElementById('dinnerTime').value;
    const breakfastEnabled = document.getElementById('breakfastReminder').checked;
    const lunchEnabled = document.getElementById('lunchReminder').checked;
    const dinnerEnabled = document.getElementById('dinnerReminder').checked;

    appState.reminders = {
        breakfast: { time: breakfastTime, enabled: breakfastEnabled },
        lunch: { time: lunchTime, enabled: lunchEnabled },
        dinner: { time: dinnerTime, enabled: dinnerEnabled }
    };

    saveStateToStorage();
    setupReminders();

    showNotification('✓ Pengingat berhasil disimpan!', 'success');
    
    // Display reminder status
    const reminderStatus = document.getElementById('reminderStatus');
    const reminderStatusText = document.getElementById('reminderStatusText');
    
    const enabledReminders = [];
    if (breakfastEnabled) enabledReminders.push(`🌅 Sarapan - ${breakfastTime}`);
    if (lunchEnabled) enabledReminders.push(`☀️ Makan Siang - ${lunchTime}`);
    if (dinnerEnabled) enabledReminders.push(`🌙 Makan Malam - ${dinnerTime}`);

    if (enabledReminders.length > 0) {
        reminderStatusText.innerHTML = `<strong>Pengingat aktif untuk:</strong><br>` + enabledReminders.join('<br>');
        reminderStatus.style.display = 'block';
    } else {
        reminderStatus.style.display = 'none';
    }
}

function setupReminders() {
    // Clear existing intervals
    Object.values(appState.reminderIntervals).forEach(interval => clearInterval(interval));
    appState.reminderIntervals = {};

    // Set up new reminders
    ['breakfast', 'lunch', 'dinner'].forEach(mealType => {
        const reminder = appState.reminders[mealType];
        if (reminder.enabled) {
            appState.reminderIntervals[mealType] = setInterval(() => {
                checkAndTriggerReminder(mealType, reminder.time);
            }, 60000); // Check every minute
        }
    });
}

function checkAndTriggerReminder(mealType, reminderTime) {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (currentTime === reminderTime) {
        triggerReminder(mealType, reminderTime);
    }
}

function triggerReminder(mealType, time) {
    const mealEmojis = {
        breakfast: '🌅',
        lunch: '☀️',
        dinner: '🌙'
    };

    const mealNames = {
        breakfast: 'Sarapan',
        lunch: 'Makan Siang',
        dinner: 'Makan Malam'
    };

    const message = `${mealEmojis[mealType]} Waktu ${mealNames[mealType]} pukul ${time}!`;

    // Show browser notification if supported
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('MENU MAKAN HEMAT', {
            body: message,
            icon: '🍜'
        });
    }

    // Show in-app notification
    showNotification(message, 'reminder');

    // Play sound (optional)
    playReminderSound();
}

function playReminderSound() {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// ========== SAVE TO PDF ==========
function handleSavePDF() {
    if (!appState.weeklyMenu) {
        showNotification('⚠️ Silakan generate menu terlebih dahulu!', 'warning');
        return;
    }

    let pdfContent = `MENU MAKAN HEMAT - MINGGU INI\n`;
    pdfContent += `============================\n\n`;

    const profile = appState.userProfile;
    pdfContent += `Data Pengguna:\n`;
    pdfContent += `- Budget Minggu: Rp ${profile.budget.toLocaleString('id-ID')}\n`;
    pdfContent += `- Kebutuhan Kalori: ${profile.dailyCalories} kcal/hari\n`;
    pdfContent += `- Tipe Diet: ${profile.dietType === 'healthy' ? 'Sehat' : 'Tidak Sehat'}\n\n`;

    let totalCost = 0;
    appState.weeklyMenu.forEach(dayMenu => {
        const dailyCost = (dayMenu.breakfast.cost || 0) + (dayMenu.lunch.cost || 0) + 
                         (dayMenu.dinner.cost || 0) + (dayMenu.snack.cost || 0);
        totalCost += dailyCost;

        pdfContent += `${dayMenu.day}:\n`;
        pdfContent += `- Sarapan: ${dayMenu.breakfast.name} (Rp ${dayMenu.breakfast.cost.toLocaleString('id-ID')})\n`;
        pdfContent += `- Makan Siang: ${dayMenu.lunch.name} (Rp ${dayMenu.lunch.cost.toLocaleString('id-ID')})\n`;
        pdfContent += `- Makan Malam: ${dayMenu.dinner.name} (Rp ${dayMenu.dinner.cost.toLocaleString('id-ID')})\n`;
        pdfContent += `- Snack: ${dayMenu.snack.name} (Rp ${dayMenu.snack.cost.toLocaleString('id-ID')})\n`;
        pdfContent += `Total Harian: Rp ${dailyCost.toLocaleString('id-ID')}\n\n`;
    });

    pdfContent += `\nRingkasan:\n`;
    pdfContent += `Total Pengeluaran: Rp ${totalCost.toLocaleString('id-ID')}\n`;
    pdfContent += `Sisa Budget: Rp ${(profile.budget - totalCost).toLocaleString('id-ID')}\n`;

    // Create and download as text file
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(pdfContent));
    element.setAttribute('download', 'menu_makan_hemat.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showNotification('✓ Menu berhasil disimpan!', 'success');
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${getNotificationColor(type)};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 300px;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationColor(type) {
    const colors = {
        success: '#2ecc71',
        warning: '#f39c12',
        error: '#e74c3c',
        info: '#3498db',
        reminder: '#e67e22'
    };
    return colors[type] || colors.info;
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== STORAGE MANAGEMENT ==========
function saveStateToStorage() {
    localStorage.setItem('menuMakanHemat_state', JSON.stringify(appState));
}

function loadStateFromStorage() {
    const saved = localStorage.getItem('menuMakanHemat_state');
    if (saved) {
        const parsed = JSON.parse(saved);
        appState = {
            ...appState,
            ...parsed
        };
    }
}

// ========== REQUEST NOTIFICATION PERMISSION ==========
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// ========== INITIALIZE APP ==========
function initializeApp() {
    // Request notification permission
    requestNotificationPermission();

    // Restore reminders if they exist
    if (appState.reminders.breakfast.enabled || 
        appState.reminders.lunch.enabled || 
        appState.reminders.dinner.enabled) {
        
        // Update form with saved reminder times
        document.getElementById('breakfastTime').value = appState.reminders.breakfast.time;
        document.getElementById('lunchTime').value = appState.reminders.lunch.time;
        document.getElementById('dinnerTime').value = appState.reminders.dinner.time;
        document.getElementById('breakfastReminder').checked = appState.reminders.breakfast.enabled;
        document.getElementById('lunchReminder').checked = appState.reminders.lunch.enabled;
        document.getElementById('dinnerReminder').checked = appState.reminders.dinner.enabled;

        setupReminders();
    }

    // Restore user profile if exists
    if (appState.userProfile) {
        const profile = appState.userProfile;
        document.getElementById('gender').value = profile.gender;
        document.getElementById('age').value = profile.age;
        document.getElementById('height').value = profile.height;
        document.getElementById('weight').value = profile.weight;
        document.getElementById('budget').value = profile.budget;

        // Set diet type
        document.querySelector(`input[name="dietType"][value="${profile.dietType}"]`).checked = true;

        // Set nutrition preferences
        profile.selectedNutrition.forEach(nutrition => {
            const checkbox = document.querySelector(`input[name="nutrition"][value="${nutrition}"]`);
            if (checkbox) checkbox.checked = true;
        });

        // Set allergies
        profile.selectedAllergies.forEach(allergy => {
            const checkbox = document.querySelector(`input[name="allergies"][value="${allergy}"]`);
            if (checkbox) checkbox.checked = true;
        });

        // Display calorie results
        displayCalorieResults(profile.bmr, profile.dailyCalories, profile.mealRecommendation, profile.budget);
    }

    // Restore weekly menu if exists
    if (appState.weeklyMenu) {
        displayWeeklyMenu(appState.weeklyMenu, appState.userProfile.budget);
    }
}

// Handle page visibility to restart reminders when tab becomes visible
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Tab became visible, restart reminders
        if (appState.reminders.breakfast.enabled || 
            appState.reminders.lunch.enabled || 
            appState.reminders.dinner.enabled) {
            setupReminders();
        }
    }
});
