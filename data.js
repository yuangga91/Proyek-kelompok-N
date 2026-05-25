/* ========================================
   MENU MAKAN HEMAT - Database
   Food, Recipes, and Restaurant Data
   ======================================== */

// Database of recipes with ingredients, cost, and calorie info
const recipesDatabase = [
    {
        id: 1,
        name: "Nasi Goreng Telur",
        emoji: "🍚",
        category: "rice",
        cost: 15000,
        calories: 450,
        protein: 15,
        carbs: 65,
        fat: 12,
        fiber: 2,
        ingredients: [
            "1 piring nasi putih",
            "2 butir telur",
            "2 siung bawang putih",
            "1 cabai merah",
            "3 sdm minyak goreng",
            "1 sdm kecap manis",
            "garam dan lada"
        ],
        steps: [
            "Tumis bawang putih dan cabai hingga harum",
            "Masukkan telur, aduk hingga matang",
            "Tambahkan nasi, aduk rata",
            "Tuangkan kecap manis, bumbui dengan garam dan lada",
            "Sajikan selagi panas"
        ],
        allergens: ["egg"],
        type: "healthy"
    },
    {
        id: 2,
        name: "Telur Ceplok",
        emoji: "🥚",
        category: "egg",
        cost: 8000,
        calories: 180,
        protein: 14,
        carbs: 2,
        fat: 14,
        fiber: 0,
        ingredients: [
            "2 butir telur",
            "2 siung bawang putih",
            "2 sdm minyak goreng",
            "garam dan lada"
        ],
        steps: [
            "Panaskan minyak goreng di wajan",
            "Tumis bawang putih hingga harum",
            "Pecahkan telur ke dalam wajan",
            "Bumbui dengan garam dan lada",
            "Masak hingga matang sesuai selera (matang putih atau matang kuning)"
        ],
        allergens: ["egg"],
        type: "healthy"
    },
    {
        id: 3,
        name: "Sayur Bayam Goreng",
        emoji: "🥬",
        category: "vegetable",
        cost: 5000,
        calories: 85,
        protein: 3,
        carbs: 12,
        fat: 3,
        fiber: 3,
        ingredients: [
            "200g bayam segar",
            "3 siung bawang putih",
            "1 sdm minyak goreng",
            "garam dan lada"
        ],
        steps: [
            "Cuci bayam dan potong kasar",
            "Panaskan minyak goreng",
            "Tumis bawang putih hingga harum",
            "Masukkan bayam, aduk hingga layu",
            "Bumbui dengan garam dan lada"
        ],
        allergens: [],
        type: "healthy"
    },
    {
        id: 4,
        name: "Sup Ayam Sederhana",
        emoji: "🍗",
        category: "soup",
        cost: 18000,
        calories: 280,
        protein: 25,
        carbs: 15,
        fat: 12,
        fiber: 2,
        ingredients: [
            "300g daging ayam",
            "1 wortel, potong dadu",
            "1 kentang, potong dadu",
            "3 siung bawang putih",
            "1 batang bawang prei",
            "1 liter air",
            "garam dan lada"
        ],
        steps: [
            "Rebus air, masukkan daging ayam dan bawang putih",
            "Tunggu ayam matang setengah",
            "Masukkan wortel dan kentang",
            "Masak hingga semua bahan lunak",
            "Bumbui dengan garam dan lada",
            "Tambahkan bawang prei sebelum disajikan"
        ],
        allergens: [],
        type: "healthy"
    },
    {
        id: 5,
        name: "Tumis Tahu dengan Sayur",
        emoji: "🟫",
        category: "protein",
        cost: 12000,
        calories: 200,
        protein: 16,
        carbs: 10,
        fat: 11,
        fiber: 3,
        ingredients: [
            "200g tahu, potong kubus",
            "100g wortel, potong julienne",
            "50g buncis, potong pendek",
            "3 siung bawang putih",
            "2 sdm minyak goreng",
            "garam dan lada"
        ],
        steps: [
            "Panaskan minyak goreng",
            "Tumis bawang putih hingga harum",
            "Masukkan tahu, fry hingga golden",
            "Tambahkan wortel dan buncis",
            "Tumis hingga sayuran matang",
            "Bumbui dengan garam dan lada"
        ],
        allergens: [],
        type: "healthy"
    },
    {
        id: 6,
        name: "Soto Ayam",
        emoji: "🍲",
        category: "soup",
        cost: 20000,
        calories: 320,
        protein: 28,
        carbs: 20,
        fat: 14,
        fiber: 2,
        ingredients: [
            "400g ayam, potong",
            "1.5 liter air",
            "1 ruas kunyit",
            "1 ruas jahe",
            "3 siung bawang putih",
            "1 batang serai",
            "2 lembar daun salam",
            "1 sdm turmeric powder",
            "garam dan lada"
        ],
        steps: [
            "Haluskan kunyit, jahe, dan bawang putih",
            "Rebus air, masukkan bumbu halus",
            "Tambahkan ayam dan rebus hingga matang",
            "Masukkan serai dan daun salam",
            "Bumbui dengan garam dan lada",
            "Masak hingga ayam empuk"
        ],
        allergens: [],
        type: "healthy"
    },
    {
        id: 7,
        name: "Nasi Putih + Lauk Pauk",
        emoji: "🍚",
        category: "rice",
        cost: 10000,
        calories: 380,
        protein: 12,
        carbs: 70,
        fat: 5,
        fiber: 2,
        ingredients: [
            "1 piring nasi putih",
            "100g sayur kale atau hijau lainnya",
            "50g tahu atau tempe goreng"
        ],
        steps: [
            "Masak nasi putih dari beras",
            "Goreng tahu atau tempe hingga golden",
            "Tumis sayur hijau dengan bawang putih"
        ],
        allergens: [],
        type: "healthy"
    },
    {
        id: 8,
        name: "Mie Goreng Sederhana",
        emoji: "🍜",
        category: "noodle",
        cost: 12000,
        calories: 380,
        protein: 12,
        carbs: 50,
        fat: 14,
        fiber: 1,
        ingredients: [
            "1 porsi mie instan",
            "1 butir telur",
            "50g cabai hijau",
            "3 siung bawang putih",
            "1 sdm kecap manis",
            "1 sdm minyak goreng"
        ],
        steps: [
            "Rebus mie hingga matang, tiriskan",
            "Panaskan minyak goreng",
            "Tumis bawang putih dan cabai",
            "Masukkan telur, aduk",
            "Tambahkan mie, tuangkan kecap manis",
            "Aduk rata dan sajikan"
        ],
        allergens: ["egg"],
        type: "unhealthy"
    },
    {
        id: 9,
        name: "Lumpia Goreng",
        emoji: "🥟",
        category: "snack",
        cost: 8000,
        calories: 280,
        protein: 8,
        carbs: 25,
        fat: 16,
        fiber: 1,
        ingredients: [
            "5 lembar kulit lumpia",
            "100g sayuran (wortel, buncis)",
            "50g daging atau tahu cincang",
            "1 siung bawang putih",
            "minyak goreng untuk menggoreng"
        ],
        steps: [
            "Haluskan bawang putih",
            "Tumis sayur dan daging dengan bawang putih",
            "Dinginkan isian",
            "Isi kulit lumpia dengan isian",
            "Roll dan sealing tepinya",
            "Goreng hingga golden"
        ],
        allergens: [],
        type: "unhealthy"
    },
    {
        id: 10,
        name: "Perkedel",
        emoji: "🥔",
        category: "snack",
        cost: 6000,
        calories: 240,
        protein: 6,
        carbs: 30,
        fat: 10,
        fiber: 2,
        ingredients: [
            "500g kentang, kupas",
            "2 butir telur",
            "1 siung bawang putih",
            "2 sdm tepung terigu",
            "garam dan lada",
            "minyak goreng"
        ],
        steps: [
            "Rebus kentang hingga lunak, tiriskan",
            "Haluskan kentang",
            "Tambahkan telur, bawang putih, tepung terigu",
            "Bumbui dengan garam dan lada",
            "Bentuk bulat dan goreng hingga golden"
        ],
        allergens: ["egg", "gluten"],
        type: "unhealthy"
    },
    {
        id: 11,
        name: "Piscok (Pisang Goreng Coklat)",
        emoji: "🍌",
        category: "snack",
        cost: 5000,
        calories: 200,
        protein: 2,
        carbs: 35,
        fat: 8,
        fiber: 2,
        ingredients: [
            "2 buah pisang",
            "100g tepung terigu",
            "1 butir telur",
            "2 sdm gula pasir",
            "1 sdt baking powder",
            "1 sdt vanilla",
            "minyak goreng"
        ],
        steps: [
            "Campur tepung, gula, baking powder, dan vanilla",
            "Kocok telur dan campur dengan adonan",
            "Pelintir pisang dengan adonan",
            "Goreng hingga golden dan matang"
        ],
        allergens: ["egg", "gluten"],
        type: "unhealthy"
    },
    {
        id: 12,
        name: "Bubur Ayam",
        emoji: "🍲",
        category: "rice",
        cost: 16000,
        calories: 320,
        protein: 18,
        carbs: 42,
        fat: 8,
        fiber: 1,
        ingredients: [
            "1 gelas beras",
            "300g daging ayam",
            "1.5 liter air",
            "3 siung bawang putih",
            "garam dan lada"
        ],
        steps: [
            "Cuci beras dan masukkan ke dalam panci",
            "Tambahkan air dan rebus hingga menjadi bubur",
            "Rebus ayam terpisah dan potong dadu",
            "Campurkan ayam ke bubur",
            "Bumbui dengan bawang putih yang sudah ditumis, garam, dan lada"
        ],
        allergens: [],
        type: "healthy"
    },
    {
        id: 13,
        name: "Ikan Goreng Sederhana",
        emoji: "🐟",
        category: "fish",
        cost: 22000,
        calories: 280,
        protein: 35,
        carbs: 5,
        fat: 12,
        fiber: 0,
        ingredients: [
            "200g ikan segar",
            "2 siung bawang putih",
            "garam dan lada",
            "minyak goreng"
        ],
        steps: [
            "Bersihkan ikan dan bagian dalamnya",
            "Bumbui ikan dengan bawang putih, garam, dan lada",
            "Diamkan beberapa menit",
            "Goreng ikan hingga matang dan berwarna golden"
        ],
        allergens: ["seafood"],
        type: "healthy"
    },
    {
        id: 14,
        name: "Salad Segar",
        emoji: "🥗",
        category: "vegetable",
        cost: 8000,
        calories: 120,
        protein: 4,
        carbs: 18,
        fat: 4,
        fiber: 4,
        ingredients: [
            "200g sayuran segar (tomat, timun, lettuce)",
            "1 wortel, rajang",
            "2 sdm minyak zaitun",
            "1 sdm lemon/vinegar",
            "garam dan lada"
        ],
        steps: [
            "Cuci semua sayuran",
            "Iris sayuran sesuai selera",
            "Campur dalam mangkuk",
            "Buat dressing dari minyak zaitun, lemon, garam, dan lada",
            "Tuangkan dressing pada sayuran, aduk rata"
        ],
        allergens: [],
        type: "healthy"
    },
    {
        id: 15,
        name: "Roti Goreng Manis",
        emoji: "🥐",
        category: "snack",
        cost: 7000,
        calories: 240,
        protein: 6,
        carbs: 30,
        fat: 10,
        fiber: 1,
        ingredients: [
            "2 lembar roti tawar",
            "1 sdm margarin",
            "1 sdm gula pasir",
            "1 sdt kayu manis (opsional)"
        ],
        steps: [
            "Potong roti menjadi dua bagian diagonal",
            "Panaskan margarin di wajan",
            "Goreng roti hingga golden di kedua sisi",
            "Tabur gula pasir dan kayu manis saat masih panas"
        ],
        allergens: ["gluten"],
        type: "unhealthy"
    }
];

// Food places recommendations near campus
const foodPlaces = [
    {
        id: 1,
        name: "Warung Mak Cik",
        type: "warung",
        avgPrice: 12000,
        rating: 4.5,
        specialties: ["Nasi goreng", "Mie goreng", "Nasi kuning"],
        location: "Jl. Perikanan, Kampus Undip"
    },
    {
        id: 2,
        name: "Kantin Kampus A",
        type: "kantin",
        avgPrice: 10000,
        rating: 4,
        specialties: ["Nasi putih + lauk", "Bubur", "Soto"],
        location: "Gedung Rektorat"
    },
    {
        id: 3,
        name: "Warkop Kopi Nikmat",
        type: "cafe",
        avgPrice: 15000,
        rating: 4.3,
        specialties: ["Kopi", "Nasi goreng", "Mie"],
        location: "Jl. Tembalang"
    },
    {
        id: 4,
        name: "Rumah Makan Sederhana",
        type: "warung",
        avgPrice: 20000,
        rating: 4.2,
        specialties: ["Ikan goreng", "Ayam goreng", "Sayur"],
        location: "Jl. Semarang Utama"
    },
    {
        id: 5,
        name: "Gerobak Bakso",
        type: "warung",
        avgPrice: 8000,
        rating: 4.1,
        specialties: ["Bakso", "Mie bakso", "Es cendol"],
        location: "Jl. Perikanan"
    },
    {
        id: 6,
        name: "Kedai Nasi Kuning",
        type: "warung",
        avgPrice: 12000,
        rating: 4.4,
        specialties: ["Nasi kuning", "Ayam", "Sambal"],
        location: "Tembalang"
    },
    {
        id: 7,
        name: "Kafe Maju",
        type: "cafe",
        avgPrice: 18000,
        rating: 4.2,
        specialties: ["Nasi goreng", "Mie goreng", "Minuman"],
        location: "Jl. Semarang"
    },
    {
        id: 8,
        name: "Tahu Goreng Pak Yudi",
        type: "warung",
        avgPrice: 6000,
        rating: 4.3,
        specialties: ["Tahu goreng", "Tempe goreng", "Perkedel"],
        location: "Jl. Tembalang"
    }
];

// Sample daily menus for healthy eating
const healthyMenus = [
    {
        meal: "breakfast",
        name: "Telur Ceplok + Nasi Putih",
        cost: 8000,
        calories: 280,
        icon: "🍳"
    },
    {
        meal: "breakfast",
        name: "Bubur Ayam",
        cost: 7000,
        calories: 250,
        icon: "🍲"
    },
    {
        meal: "breakfast",
        name: "Nasi Goreng Telur",
        cost: 12000,
        calories: 400,
        icon: "🍚"
    },
    {
        meal: "lunch",
        name: "Nasi + Ikan Goreng + Sayur",
        cost: 22000,
        calories: 600,
        icon: "🐟"
    },
    {
        meal: "lunch",
        name: "Sup Ayam + Nasi",
        cost: 18000,
        calories: 550,
        icon: "🍗"
    },
    {
        meal: "lunch",
        name: "Nasi + Tahu Tumis + Sayur",
        cost: 15000,
        calories: 480,
        icon: "🟫"
    },
    {
        meal: "lunch",
        name: "Soto Ayam + Nasi",
        cost: 20000,
        calories: 600,
        icon: "🍲"
    },
    {
        meal: "dinner",
        name: "Mie Goreng Telur",
        cost: 12000,
        calories: 450,
        icon: "🍜"
    },
    {
        meal: "dinner",
        name: "Nasi Goreng Sayur",
        cost: 10000,
        calories: 380,
        icon: "🍚"
    },
    {
        meal: "dinner",
        name: "Nasi + Telur + Sayur Hijau",
        cost: 10000,
        calories: 420,
        icon: "🥬"
    },
    {
        meal: "snack",
        name: "Lumpia Goreng",
        cost: 8000,
        calories: 280,
        icon: "🥟"
    },
    {
        meal: "snack",
        name: "Pisang Goreng",
        cost: 5000,
        calories: 200,
        icon: "🍌"
    },
    {
        meal: "snack",
        name: "Tahu Goreng",
        cost: 5000,
        calories: 180,
        icon: "🟫"
    }
];

// Sample menus for unhealthy eating (fast food budget)
const unhealthyMenus = [
    {
        meal: "breakfast",
        name: "Mie Instan + Telur",
        cost: 5000,
        calories: 350,
        icon: "🍜"
    },
    {
        meal: "breakfast",
        name: "Roti Tawar + Margarin",
        cost: 6000,
        calories: 300,
        icon: "🥐"
    },
    {
        meal: "lunch",
        name: "Mie Goreng dari Warung",
        cost: 10000,
        calories: 500,
        icon: "🍜"
    },
    {
        meal: "lunch",
        name: "Nasi Goreng Instant",
        cost: 8000,
        calories: 450,
        icon: "🍚"
    },
    {
        meal: "lunch",
        name: "Bakso Instan",
        cost: 7000,
        calories: 400,
        icon: "🍲"
    },
    {
        meal: "dinner",
        name: "Mie Instan 2x",
        cost: 10000,
        calories: 600,
        icon: "🍜"
    },
    {
        meal: "dinner",
        name: "Ayam Goreng + Nasi",
        cost: 15000,
        calories: 700,
        icon: "🍗"
    },
    {
        meal: "snack",
        name: "Snack Manis (Cookies)",
        cost: 5000,
        calories: 250,
        icon: "🍪"
    },
    {
        meal: "snack",
        name: "Minuman Manis",
        cost: 3000,
        calories: 150,
        icon: "🥤"
    }
];

// Ingredients for cooking at home with budget
const budgetIngredients = [
    { name: "Beras 5kg", cost: 35000, quantity: "5kg", type: "staple" },
    { name: "Telur 10 butir", cost: 20000, quantity: "10 pcs", type: "protein" },
    { name: "Tahu 1 bungkus", cost: 8000, quantity: "2 pieces", type: "protein" },
    { name: "Tempe 1 bungkus", cost: 6000, quantity: "1 piece", type: "protein" },
    { name: "Ayam 500g", cost: 35000, quantity: "500g", type: "protein" },
    { name: "Ikan 500g", cost: 40000, quantity: "500g", type: "protein" },
    { name: "Bayam ikat", cost: 3000, quantity: "1 ikat", type: "vegetable" },
    { name: "Wortel 500g", cost: 5000, quantity: "500g", type: "vegetable" },
    { name: "Buncis 500g", cost: 4000, quantity: "500g", type: "vegetable" },
    { name: "Kentang 1kg", cost: 8000, quantity: "1kg", type: "vegetable" },
    { name: "Cabai 100g", cost: 3000, quantity: "100g", type: "spice" },
    { name: "Bawang Putih 1 sisir", cost: 3000, quantity: "1 sisir", type: "spice" },
    { name: "Garam 500g", cost: 2000, quantity: "500g", type: "spice" },
    { name: "Minyak Goreng 2L", cost: 25000, quantity: "2L", type: "oil" },
    { name: "Kecap Manis", cost: 8000, quantity: "600ml", type: "seasoning" },
    { name: "Mie Instan 1 dus", cost: 15000, quantity: "20 pcs", type: "staple" }
];

// Function to calculate BMR (Basal Metabolic Rate)
function calculateBMR(gender, age, height, weight) {
    let bmr;
    if (gender === "male") {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    return Math.round(bmr);
}

// Function to calculate total daily calorie needs
function calculateDailyCalories(bmr, activityLevel = 1.4) {
    // 1.2 = sedentary, 1.375 = lightly active, 1.55 = moderate, 1.725 = very active, 1.9 = extremely active
    return Math.round(bmr * activityLevel);
}

// Function to get meal recommendation
function getMealRecommendation(dailyCalories) {
    let meals = [];
    if (dailyCalories >= 2000) {
        meals.push("3 kali makan + 2 kali snack");
    } else if (dailyCalories >= 1500) {
        meals.push("3 kali makan + 1 kali snack");
    } else {
        meals.push("3 kali makan");
    }
    return meals[0];
}

// Function to filter recipes based on preferences and allergies
function filterRecipes(selectedNutrition, selectedAllergies, dietType) {
    return recipesDatabase.filter(recipe => {
        // Check diet type
        if (recipe.type !== dietType) {
            return false;
        }

        // Check allergies
        for (let allergy of selectedAllergies) {
            if (recipe.allergens.includes(allergy)) {
                return false;
            }
        }

        // Check nutrition preferences (if any selected)
        if (selectedNutrition.length > 0) {
            if (selectedNutrition.includes("highProtein") && recipe.protein < 15) {
                return false;
            }
            if (selectedNutrition.includes("highFiber") && recipe.fiber < 3) {
                return false;
            }
            if (selectedNutrition.includes("highFat") && recipe.fat < 12) {
                return false;
            }
        }

        return true;
    });
}

// Function to generate weekly menu
function generateWeeklyMenu(budget, selectedNutrition, selectedAllergies, dietType) {
    const dailyBudget = budget / 7;
    const breakfastBudget = dailyBudget * 0.25;
    const lunchBudget = dailyBudget * 0.40;
    const dinnerBudget = dailyBudget * 0.30;
    const snackBudget = dailyBudget * 0.05;

    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    const menus = dietType === "healthy" ? healthyMenus : unhealthyMenus;
    const weeklyMenu = [];

    for (let day of days) {
        const dayMenu = {
            day: day,
            breakfast: selectMealByBudget(menus, "breakfast", breakfastBudget),
            lunch: selectMealByBudget(menus, "lunch", lunchBudget),
            dinner: selectMealByBudget(menus, "dinner", dinnerBudget),
            snack: selectMealByBudget(menus, "snack", snackBudget)
        };
        weeklyMenu.push(dayMenu);
    }

    return weeklyMenu;
}

// Function to select meal by budget
function selectMealByBudget(menus, mealType, budget) {
    const filteredMeals = menus.filter(m => m.meal === mealType && m.cost <= budget);
    if (filteredMeals.length === 0) {
        return menus.find(m => m.meal === mealType) || { name: "Tidak tersedia", cost: 0, calories: 0, icon: "?" };
    }
    return filteredMeals[Math.floor(Math.random() * filteredMeals.length)];
}

// Function to get recommended food places
function getRecommendedFoodPlaces(budget) {
    return foodPlaces.filter(place => place.avgPrice <= budget).sort((a, b) => b.rating - a.rating);
}

// Function to get budget ingredients
function getBudgetIngredients(budget) {
    return budgetIngredients.filter(ing => ing.cost <= budget);
}
