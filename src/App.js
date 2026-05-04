import React, { useState, useEffect } from "react";
import "./styles.css";

// 1. DATABASE
const LOCAL_FOOD_DB = {
  whiteRice: {
    g: 1.3,
    tbsp: 20,
    pcs: 200,
    ar: "أرز أبيض",
    p: 0.027,
    c: 0.28,
    f: 0.003,
    fb: 0.004,
  },
  egg: {
    g: 1.55,
    tbsp: 0,
    pcs: 78,
    ar: "بيض",
    p: 0.13,
    c: 0.011,
    f: 0.11,
    fb: 0,
  },
  apple: {
    g: 0.52,
    tbsp: 0,
    pcs: 95,
    ar: "تفاح",
    p: 0.003,
    c: 0.14,
    f: 0.002,
    fb: 0.024,
  },
  chickenBreast: {
    g: 1.65,
    tbsp: 25,
    pcs: 165,
    ar: "صدور دجاج",
    p: 0.31,
    c: 0,
    f: 0.036,
    fb: 0,
  },
  groundBeef: {
    g: 2.5,
    tbsp: 40,
    pcs: 250,
    ar: "لحم مفروم",
    p: 0.26,
    c: 0,
    f: 0.15,
    fb: 0,
  },
  bonedBeef: {
    g: 1.8,
    tbsp: 30,
    pcs: 180,
    ar: "لحم بقري بالعظم",
    p: 0.18,
    c: 0,
    f: 0.12,
    fb: 0,
  },
  steakBeef: {
    g: 2.71,
    tbsp: 45,
    pcs: 271,
    ar: "ستيك بقري",
    p: 0.25,
    c: 0,
    f: 0.19,
    fb: 0,
  },
  salmon: {
    g: 2.08,
    tbsp: 30,
    pcs: 200,
    ar: "سلمون",
    p: 0.2,
    c: 0,
    f: 0.13,
    fb: 0,
  },
  tuna: {
    g: 1.3,
    tbsp: 20,
    pcs: 150,
    ar: "تونا",
    p: 0.28,
    c: 0,
    f: 0.01,
    fb: 0,
  },
  greekYogurt: {
    g: 0.59,
    tbsp: 10,
    pcs: 100,
    ar: "زبادي يوناني",
    p: 0.1,
    c: 0.04,
    f: 0.004,
    fb: 0,
  },
  "yogurt full fat": {
    ar: "زبادي كامل الدسم",
    g: 0.61,
    tbsp: 10,
    pcs: 110, // 180g container
    p: 0.035,
    c: 0.047,
    f: 0.033,
    fb: 0,
  },
  "yogurt low fat": {
    ar: "زبادي قليل الدسم",
    g: 0.48,
    tbsp: 8,
    pcs: 86,
    p: 0.038,
    c: 0.05,
    f: 0.015,
    fb: 0,
  },
  "yogurt skimmed": {
    ar: "زبادي خالي الدسم",
    g: 0.38,
    tbsp: 6,
    pcs: 68,
    p: 0.04,
    c: 0.05,
    f: 0.001,
    fb: 0,
  },
  oatMeal: {
    g: 3.89,
    tbsp: 40,
    pcs: 150,
    ar: "شوفان",
    p: 0.17,
    c: 0.66,
    f: 0.07,
    fb: 0.1,
  },
  whiteBread: {
    g: 2.65,
    tbsp: 30,
    pcs: 80,
    ar: "خبز أبيض",
    p: 0.09,
    c: 0.49,
    f: 0.03,
    fb: 0.027,
  },
  brownBread1: {
    g: 2.47,
    tbsp: 28,
    pcs: 75,
    ar: "خبز بر",
    p: 0.13,
    c: 0.41,
    f: 0.03,
    fb: 0.07,
  },
  brownBread2: {
    g: 2.47,
    tbsp: 28,
    pcs: 75,
    ar: "خبز أسمر",
    p: 0.13,
    c: 0.41,
    f: 0.03,
    fb: 0.07,
  },
  lebaneseBread1: {
    g: 2.75,
    tbsp: 35,
    pcs: 150,
    ar: "خبز لبناني",
    p: 0.08,
    c: 0.55,
    f: 0.01,
    fb: 0.02,
  },
  lebaneseBread2: {
    g: 2.75,
    tbsp: 35,
    pcs: 150,
    ar: "خبز مفرود",
    p: 0.08,
    c: 0.55,
    f: 0.01,
    fb: 0.02,
  },
  samoliBread: {
    g: 2.9,
    tbsp: 40,
    pcs: 150,
    ar: "خبز صامولي",
    p: 0.09,
    c: 0.52,
    f: 0.04,
    fb: 0.02,
  },
  toast: {
    ar: "توست",
    g: 3.1,
    tbsp: 45,
    pcs: 95,
    p: 0.1,
    c: 0.5,
    f: 0.04,
    fb: 0.03,
  },

  boiledPotato: {
    ar: "بطاطس مسلوقة",
    g: 0.87,
    tbsp: 15,
    pcs: 130,
    p: 0.019,
    c: 0.2,
    f: 0.001,
    fb: 0.02,
  },
  mashedPotato: {
    ar: "بطاطس مهروسة",
    g: 1.13,
    tbsp: 25,
    pcs: 210, // Accounts for added milk/butter
    p: 0.02,
    c: 0.15,
    f: 0.04,
    fb: 0.015,
  },
  frenchFries: {
    ar: "بطاطس مقلية",
    g: 3.12,
    tbsp: 45,
    pcs: 312,
    p: 0.034,
    c: 0.41,
    f: 0.15,
    fb: 0.038,
  },
  sweetPotato: {
    ar: "بطاطا حلوة",
    g: 0.86,
    tbsp: 14,
    pcs: 112,
    p: 0.016,
    c: 0.2,
    f: 0.001,
    fb: 0.03,
  },
  banana: {
    ar: "موز",
    g: 0.89,
    tbsp: 15,
    pcs: 105,
    p: 0.011,
    c: 0.23,
    f: 0.003,
    fb: 0.026,
  },
  dates: {
    ar: "تمر",
    g: 2.82,
    tbsp: 45,
    pcs: 20,
    p: 0.02,
    c: 0.75,
    f: 0.004,
    fb: 0.08,
  },
  almonds: {
    ar: "لوز",
    g: 5.79,
    tbsp: 40,
    pcs: 7,
    p: 0.21,
    c: 0.22,
    f: 0.5,
    fb: 0.12,
  },
  peanutButter: {
    ar: "زبدة فول سوداني",
    g: 5.88,
    tbsp: 94,
    pcs: 94,
    p: 0.25,
    c: 0.2,
    f: 0.5,
    fb: 0.06,
  },
  oliveOil: {
    ar: "زيت زيتون",
    g: 8.84,
    tbsp: 119,
    pcs: 119,
    p: 0,
    c: 0,
    f: 1.0,
    fb: 0,
  },
  butter: {
    ar: "زبدة",
    g: 7.17,
    tbsp: 102,
    pcs: 102,
    p: 0.01,
    c: 0.01,
    f: 0.81,
    fb: 0,
  },
  // --- MILK VARIATIONS ---
  "full fat milk": {
    ar: "حليب كامل الدسم",
    g: 0.61,
    tbsp: 9,
    pcs: 146,
    p: 0.032,
    c: 0.048,
    f: 0.033,
    fb: 0,
  },
  "low fat milk": {
    ar: "حليب قليل الدسم",
    g: 0.42,
    tbsp: 6,
    pcs: 102,
    p: 0.034,
    c: 0.05,
    f: 0.01,
    fb: 0,
  },
  "skimmed milk": {
    ar: "حليب خالي الدسم",
    g: 0.35,
    tbsp: 5,
    pcs: 83,
    p: 0.034,
    c: 0.05,
    f: 0.001,
    fb: 0,
  },
  "almond milk": {
    ar: "حليب لوز",
    g: 0.15,
    tbsp: 2,
    pcs: 35, // Unsweetened version
    p: 0.004,
    c: 0.003,
    f: 0.011,
    fb: 0.002,
  },
  "oat milk": {
    ar: "حليب شوفان",
    g: 0.5,
    tbsp: 7,
    pcs: 120,
    p: 0.01,
    c: 0.07,
    f: 0.02,
    fb: 0.01,
  },
  // --- COFFEE VARIATIONS ---
  "black coffee": {
    ar: "قهوة سوداء",
    g: 0.01,
    tbsp: 0,
    pcs: 2,
    p: 0,
    c: 0,
    f: 0,
    fb: 0,
  },
  "arabic coffee": {
    ar: "قهوة سعودية",
    g: 0.02,
    tbsp: 0,
    pcs: 5, // Per small finjan
    p: 0,
    c: 0.01,
    f: 0,
    fb: 0,
  },
  latte: {
    ar: "لاتيه",
    g: 0.45,
    tbsp: 7,
    pcs: 110, // Average small latte with milk
    p: 0.03,
    c: 0.04,
    f: 0.02,
    fb: 0,
  },
  cappuccino: {
    ar: "كابتشينو",
    g: 0.4,
    tbsp: 6,
    pcs: 95,
    p: 0.03,
    c: 0.04,
    f: 0.02,
    fb: 0,
  },
  "instant coffee": {
    ar: "قهوة سريعة التحضير",
    g: 2.4,
    tbsp: 15,
    pcs: 5, // Calories for the powder itself
    p: 0.15,
    c: 0.35,
    f: 0,
    fb: 0,
  },
  sugar: {
    ar: "سكر",
    g: 3.87,
    tbsp: 48,
    pcs: 16, // 1 tsp/packet/cube is ~16 kcal
    p: 0,
    c: 1.0,
    f: 0,
    fb: 0,
  },
  "brown sugar": {
    ar: "سكر أسمر",
    g: 3.8,
    tbsp: 45,
    pcs: 15,
    p: 0,
    c: 0.98,
    f: 0,
    fb: 0,
  },
  honey: {
    ar: "عسل",
    g: 3.04,
    tbsp: 64,
    pcs: 21, // 1 tsp is ~21 kcal
    p: 0.003,
    c: 0.82,
    f: 0,
    fb: 0,
  },
  stevia: {
    ar: "ستيفيا",
    g: 0,
    tbsp: 0,
    pcs: 0, // Usually 0 calories
    p: 0,
    c: 0,
    f: 0,
    fb: 0,
  },
  "maple syrup": {
    ar: "شراب القيقب",
    g: 2.6,
    tbsp: 52,
    pcs: 17,
    p: 0,
    c: 0.67,
    f: 0,
    fb: 0,
  },
  "coffee creamer": {
    ar: "مبيض قهوة",
    g: 5.5,
    tbsp: 33,
    pcs: 11, // Powdered version
    p: 0.02,
    c: 0.55,
    f: 0.35,
    fb: 0,
  },
  "condensed milk": {
    ar: "حليب مكثف محلى",
    g: 3.2,
    tbsp: 60,
    pcs: 20,
    p: 0.08,
    c: 0.54,
    f: 0.09,
    fb: 0,
  },
  "whipped cream": {
    ar: "كريمة خفق",
    g: 2.57,
    tbsp: 15,
    pcs: 10, // Per squirt/serving
    p: 0.02,
    c: 0.12,
    f: 0.22,
    fb: 0,
  },
  "chocolate syrup": {
    ar: "شراب الشوكولاتة",
    g: 2.7,
    tbsp: 54,
    pcs: 20,
    p: 0.01,
    c: 0.65,
    f: 0.01,
    fb: 0.03,
  },
  "evaporated milk": {
    ar: "حليب مبخر",
    g: 1.34,
    tbsp: 20,
    pcs: 228, // العلبة الصغيرة 170 جم تحتوي على حوالي 228 سعرة
    p: 0.07,
    c: 0.1,
    f: 0.08,
    fb: 0,
  },
  "low fat evaporated milk": {
    ar: "حليب مبخر قليل الدسم",
    g: 0.78,
    tbsp: 12,
    pcs: 133,
    p: 0.07,
    c: 0.11,
    f: 0.01,
    fb: 0,
  },
  "basmati rice": {
    ar: "أرز بسمتي (مطبوخ)",
    g: 1.21,
    tbsp: 18,
    pcs: 180,
    p: 0.03,
    c: 0.28,
    f: 0,
    fb: 0.01,
  },
  "crushed wheat": {
    ar: "جريش (حب)",
    g: 3.4,
    tbsp: 40,
    pcs: 150,
    p: 0.12,
    c: 0.72,
    f: 0.02,
    fb: 0.1,
  },
  burgul: {
    ar: "برغل (مطبوخ)",
    g: 0.83,
    tbsp: 12,
    pcs: 125,
    p: 0.03,
    c: 0.18,
    f: 0,
    fb: 0.04,
  },
  // --- GHEE ---
  "animal ghee": {
    ar: "سمن حيواني (غنم/بقر)",
    g: 8.9,
    tbsp: 125,
    pcs: 125,
    p: 0,
    c: 0,
    f: 1.0,
    fb: 0,
  },
  "vegetable ghee": {
    ar: "سمن نباتي",
    g: 8.8,
    tbsp: 120,
    pcs: 120,
    p: 0,
    c: 0,
    f: 1.0,
    fb: 0,
  },
  "marina ghee": {
    ar: "سمن نباتي (مازولا/فارس)",
    g: 8.84,
    tbsp: 124,
    pcs: 124,
    p: 0,
    c: 0,
    f: 1.0,
    fb: 0,
  },
  "sheep fat": {
    ar: "لية غنم",
    g: 9.0,
    tbsp: 126,
    pcs: 126,
    p: 0,
    c: 0,
    f: 1.0,
    fb: 0,
  },
  "sesame oil": {
    ar: "زيت سمسم",
    g: 8.84,
    tbsp: 120,
    pcs: 120,
    p: 0,
    c: 0,
    f: 1.0,
    fb: 0,
  },
  // --- PURE PROTEINS ---
  "lamb shank": {
    ar: "موزات غنم (بدون عظم)",
    g: 2.0,
    tbsp: 30,
    pcs: 200,
    p: 0.25,
    c: 0,
    f: 0.11,
    fb: 0,
  },
  "whole chicken skinless": {
    ar: "دجاج كامل (بدون جلد)",
    g: 1.6,
    tbsp: 24,
    pcs: 160,
    p: 0.25,
    c: 0,
    f: 0.07,
    fb: 0,
  },
  "camel meat": {
    ar: "لحم حاشي",
    p: 0.22,
    c: 0,
    f: 0.05,
    g: 1.35,
    tbsp: 20,
    pcs: 135, // Very lean!
  },
  "laban full fat": {
    ar: "لبن كامل الدسم",
    g: 0.6,
    tbsp: 9,
    pcs: 120, // 200ml bottle
    p: 0.03,
    c: 0.047,
    f: 0.033,
    fb: 0,
  },
  "laban low fat": {
    ar: "لبن قليل الدسم",
    g: 0.45,
    tbsp: 7,
    pcs: 90,
    p: 0.032,
    c: 0.05,
    f: 0.013,
    fb: 0,
  },
  "laban skimmed": {
    ar: "لبن خالي الدسم",
    g: 0.35,
    tbsp: 5,
    pcs: 70,
    p: 0.034,
    c: 0.05,
    f: 0.002,
    fb: 0,
  },
  "dried lentils": {
    ar: "عدس (حب)",
    g: 1.16,
    tbsp: 18,
    pcs: 230,
    p: 0.09,
    c: 0.2,
    f: 0,
    fb: 0.08,
  },
};

// 2. TRANSLATIONS
const TRANSLATIONS = {
  en: {
    welcome: "FitFlow Pro",
    rem: "Kcal Left",
    add: "Add",
    qty: "Qty",
    search: "Search Food...",
    units: { g: "Grams", tbsp: "Spoons", pcs: "Pieces", kcal: "kcal" },
    wUnits: { ml: "ml", cups: "Cups", L: "Liters", oz: "oz" },
    setup: "Personal Details",
    gender: "Gender",
    male: "Male",
    female: "Female",
    height: "Height (cm)",
    weight: "Weight (kg)",
    age: "Age",
    activity: "Activity Level",
    goal: "Your Goal",
    save: "Save & Continue",
    left: "left",
    macros: { p: "Protein", c: "Carbs", f: "Fats", fb: "Fiber" },
    meals: {
      breakfast: "Breakfast",
      lunch: "Lunch",
      dinner: "Dinner",
      snack: "Snacks",
      other: "Other",
    },
    goals: {
      lose: "Lose Weight",
      keep: "Maintain Weight",
      gain: "Build Muscle",
    },
    levels: {
      1: "Sedentary",
      2: "Lightly Active",
      3: "Moderately Active",
      4: "Very Active",
    },
    titles: { water: "💧 Water Tracker", food: "🥗 Food Logs" },
  },
  ar: {
    welcome: "فت فلو برو",
    rem: "سعرات متبقية",
    add: "إضافة",
    qty: "الكمية",
    search: "ابحث عن طعام...",
    units: { g: "جرام", tbsp: "ملعقة", pcs: "حبة", kcal: "سعرة" },
    wUnits: { ml: "مل", cups: "كوب", L: "لتر", oz: "أونصة" },
    setup: "إعدادات الجسم",
    gender: "الجنس",
    male: "ذكر",
    female: "أنثى",
    height: "الطول (سم)",
    weight: "الوزن (كجم)",
    age: "العمر",
    activity: "مستوى النشاط",
    goal: "الهدف",
    save: "حفظ ومتابعة",
    left: "متبقي",
    macros: { p: "بروتين", c: "كارب", f: "دهون", fb: "ألياف" },
    meals: {
      breakfast: "الإفطار",
      lunch: "الغداء",
      dinner: "العشاء",
      snack: "سناك",
      other: "أخرى",
    },
    goals: {
      lose: "إنقاص الوزن",
      keep: "المحافظة على الوزن",
      gain: "زيادة الوزن",
    },
    levels: { 1: "خامل", 2: "نشاط خفيف", 3: "نشاط متوسط", 4: "نشاط عالي" },
    titles: { water: "💧 تتبع شرب الماء", food: "🥗 سجل الطعام" },
  },
};

export default function App() {
  const [view, setView] = useState("setup");
  const [lang, setLang] = useState("en");
  const [waterHistory, setWaterHistory] = useState([]);
  const [mealType, setMealType] = useState("breakfast");
  const [editingId, setEditingId] = useState(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Filter logic: Checks both English keys and Arabic names
  const suggestions = Object.keys(LOCAL_FOOD_DB)
    .filter((key) => {
      const food = LOCAL_FOOD_DB[key];
      const searchStr = query.toLowerCase();
      return (
        key.toLowerCase().includes(searchStr) || food.ar.includes(searchStr)
      );
    })
    .slice(0, 6); // Limit to top 6 results for clean UI
  const [user, setUser] = useState({
    w: 70,
    h: 170,
    a: 25,
    g: "m",
    activity: "1.2",
    goalType: "0",
  });
  const [waterMl, setWaterMl] = useState(0);
  const [waterUnit, setWaterUnit] = useState("ml");
  const [waterInput, setWaterInput] = useState(250);
  const [logs, setLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const t = TRANSLATIONS[lang];
  const mealOrder = ["breakfast", "lunch", "dinner", "snack", "other"];

  // CALCULATIONS
  const calculateGoal = () => {
    let bmr =
      10 * parseFloat(user.w) +
      6.25 * parseFloat(user.h) -
      5 * parseFloat(user.a);
    bmr = user.g === "m" ? bmr + 5 : bmr - 161;
    const calories = Math.round(
      bmr * parseFloat(user.activity) + parseInt(user.goalType)
    );
    const protein = Math.round(user.w * (user.goalType === "500" ? 2.2 : 1.8));
    const fat = Math.round((calories * 0.25) / 9);
    const fiber = Math.round((calories / 1000) * 14);
    const carbs = Math.round((calories - protein * 4 - fat * 9) / 4);
    return { calories, protein, carbs, fat, fiber };
  };

  const targets = calculateGoal();
  const todayStr = new Date().toISOString().split("T")[0];
  const todayLogs = logs.filter((log) => log.date === todayStr);
  const eaten = todayLogs.reduce((sum, item) => sum + item.cals, 0);
  const remaining = targets.calories - eaten;
  const progressPerc = Math.min((eaten / targets.calories) * 100, 100);

  const consumed = {
    p: todayLogs.reduce((s, i) => s + (i.protein || 0), 0),
    c: todayLogs.reduce((s, i) => s + (i.carbs || 0), 0),
    f: todayLogs.reduce((s, i) => s + (i.fat || 0), 0),
    fb: todayLogs.reduce((s, i) => s + (i.fiber || 0), 0),
  };

  const addFood = async (e) => {
    e.preventDefault();
    const form = e.target;
    const userInput = query.toLowerCase().trim();
    const qty = parseFloat(form.qty.value);
    const unit = form.unit.value;

    const localKey = Object.keys(LOCAL_FOOD_DB).find(
      (k) => k.toLowerCase() === userInput || LOCAL_FOOD_DB[k].ar === userInput
    );

    if (localKey) {
      const food = LOCAL_FOOD_DB[localKey];

      // 1. Create the object (This works for both New and Edit)
      const logEntry = {
        name:
          LOCAL_FOOD_DB[localKey].ar === userInput
            ? LOCAL_FOOD_DB[localKey].ar
            : localKey,
        cals: Math.round(food[unit] * qty),
        protein: (food.p || 0) * (unit === "g" ? qty : 1),
        carbs: (food.c || 0) * (unit === "g" ? qty : 1),
        fat: (food.f || 0) * (unit === "g" ? qty : 1),
        fiber: (food.fb || 0) * (unit === "g" ? qty : 1),
        qty: qty, // Save the raw qty so we can reload it into the form later
        unit: unit, // Save the unit used
        type: mealType,
        date: todayStr,
        id: editingId || Date.now(), // Keep old ID if editing, otherwise new ID
      };

      // 2. Decide if we update or add
      if (editingId) {
        setLogs(logs.map((log) => (log.id === editingId ? logEntry : log)));
        setEditingId(null);
      } else {
        setLogs([logEntry, ...logs]);
      }

      setQuery(""); // CLEAR THE SEARCH
      setIsOpen(false); // CLOSE DROPDOWN
      form.reset();
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setMealType(item.type);
    setQuery(item.name);

    const foodForm = document.querySelector(".food-form");
    if (foodForm) {
      // It's better to update the React state for these values,
      // but if you're using direct DOM manipulation:
      foodForm.qty.value = item.qty;
      foodForm.unit.value = item.unit;
    }
  };

  const addWater = () => {
    const qty = parseFloat(waterInput);
    let ml = qty;
    if (waterUnit === "cups") ml = qty * 250;
    if (waterUnit === "L") ml = qty * 1000;

    // Save this entry to history so we can undo it later
    setWaterHistory((prev) => [...prev, ml]);
    setWaterMl((w) => w + ml);
  };

  const undoWater = () => {
    if (waterHistory.length > 0) {
      // Get the very last amount added
      const lastAmount = waterHistory[waterHistory.length - 1];

      // Subtract only that amount
      setWaterMl((prev) => Math.max(0, prev - lastAmount));

      // Remove that amount from the history list
      setWaterHistory((prev) => prev.slice(0, -1));
    } else {
      alert(lang === "en" ? "Nothing to undo!" : "لا يوجد شيء للتراجع عنه!");
    }
  };

  // --- DELETE & RESET LOGIC ---
  const deleteLog = (id) => {
    if (
      window.confirm(
        lang === "en" ? "Remove this entry?" : "هل تريد حذف هذا المدخل؟"
      )
    ) {
      setLogs(logs.filter((log) => log.id !== id));
    }
  };

  const resetWater = () => {
    if (
      window.confirm(
        lang === "en" ? "Reset water counter?" : "تصفير عداد الماء؟"
      )
    ) {
      setWaterMl(0);
    }
  };

  return (
    <div className={`app-shell ${lang === "ar" ? "rtl" : ""}`}>
      <nav className="top-nav">
        <button
          className="lang-toggle"
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
        >
          {lang === "en" ? "عربي" : "English"}
        </button>
        <button
          className="btn-calendar"
          onClick={() => setView(view === "dash" ? "history" : "dash")}
        >
          {view === "dash" ? "📅" : "🏠"}
        </button>
      </nav>

      {/* VIEW WRAPPER */}
      <>
        {view === "setup" && (
          <section className="fade-in">
            <h1>{t.setup}</h1>
            <div className="card">
              <select
                value={user.g}
                onChange={(e) => setUser({ ...user, g: e.target.value })}
              >
                <option value="m">{t.male}</option>
                <option value="f">{t.female}</option>
              </select>
              <input
                type="number"
                placeholder={t.age}
                value={user.a}
                onChange={(e) => setUser({ ...user, a: e.target.value })}
              />
              <input
                type="number"
                placeholder={t.height}
                value={user.h}
                onChange={(e) => setUser({ ...user, h: e.target.value })}
              />
              <input
                type="number"
                placeholder={t.weight}
                value={user.w}
                onChange={(e) => setUser({ ...user, w: e.target.value })}
              />
              <select
                value={user.activity}
                onChange={(e) => setUser({ ...user, activity: e.target.value })}
              >
                <option value="1.2">{t.levels[1]}</option>
                <option value="1.375">{t.levels[2]}</option>
                <option value="1.55">{t.levels[3]}</option>
                <option value="1.725">{t.levels[4]}</option>
              </select>
              <select
                value={user.goalType}
                onChange={(e) => setUser({ ...user, goalType: e.target.value })}
              >
                <option value="-500">{t.goals.lose}</option>
                <option value="0">{t.goals.keep}</option>
                <option value="500">{t.goals.gain}</option>
              </select>
              <button className="btn-main" onClick={() => setView("dash")}>
                {t.save}
              </button>
            </div>
          </section>
        )}

        {view === "dash" &&
          (() => {
            const grouped = todayLogs.reduce((acc, log) => {
              const meal = log.type || "other";
              if (!acc[meal]) acc[meal] = { items: [], total: 0 };
              acc[meal].items.push(log);
              acc[meal].total += log.cals;
              return acc;
            }, {});

            return (
              <section className="fade-in">
                <div className="macro-grid">
                  <div className="macro-subs">
                    {[
                      {
                        k: "p",
                        col: "#f87171",
                        cur: consumed.p,
                        tar: targets.protein,
                      },
                      {
                        k: "c",
                        col: "#60a5fa",
                        cur: consumed.c,
                        tar: targets.carbs,
                      },
                      {
                        k: "f",
                        col: "#fbbf24",
                        cur: consumed.f,
                        tar: targets.fat,
                      },
                      {
                        k: "fb",
                        col: "#a78bfa",
                        cur: consumed.fb,
                        tar: targets.fiber,
                      },
                    ].map((m) => (
                      <div key={m.k} className="card mini-card">
                        <span className="mini-label">{t.macros[m.k]}</span>
                        <div className="mini-progress">
                          <div
                            className="bar"
                            style={{
                              width: `${Math.min((m.cur / m.tar) * 100, 100)}%`,
                              backgroundColor: m.col,
                            }}
                          />
                        </div>
                        <span className="mini-val">
                          {Math.max(Math.round(m.tar - m.cur), 0)}g {t.left}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="card main-chart">
                    <div
                      className="pie"
                      style={{ "--p": progressPerc, "--c": "#10b981" }}
                    >
                      <div className="pie-content">
                        <h2>{remaining}</h2>
                        <p>{t.rem}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card water-card">
                  <div className="card-header">
                    <h3>{t.titles.water}</h3>
                  </div>
                  <div className="water-row">
                    <input
                      type="number"
                      value={waterInput}
                      onChange={(e) => setWaterInput(e.target.value)}
                      style={{ width: "80px" }}
                    />
                    <select
                      value={waterUnit}
                      onChange={(e) => setWaterUnit(e.target.value)}
                    >
                      {Object.keys(t.wUnits).map((u) => (
                        <option key={u} value={u}>
                          {t.wUnits[u]}
                        </option>
                      ))}
                    </select>
                    <button className="btn-circle" onClick={addWater}>
                      +
                    </button>
                    <button
                      className="btn-circle"
                      style={{
                        background: "#94a3b8",
                        opacity: waterHistory.length > 0 ? 1 : 0.5,
                      }}
                      onClick={undoWater}
                      disabled={waterHistory.length === 0}
                    >
                      -
                    </button>
                    <span className="water-val">
                      {waterMl.toFixed(0)} {t.wUnits.ml}
                    </span>
                  </div>
                </div>

                <form className="card food-form" onSubmit={addFood}>
                  <div className="card-header">
                    <h3>{t.titles.food}</h3>
                  </div>
                  <div
                    className="form-row search-row"
                    style={{ position: "relative" }}
                  >
                    <select
                      value={mealType}
                      onChange={(e) => setMealType(e.target.value)}
                      className="meal-select"
                    >
                      {Object.keys(t.meals).map((m) => (
                        <option key={m} value={m}>
                          {t.meals[m]}
                        </option>
                      ))}
                    </select>

                    {/* SMART SEARCH CONTAINER */}
                    <div style={{ flexGrow: 1, position: "relative" }}>
                      <input
                        name="foodName"
                        value={query}
                        onChange={(e) => {
                          setQuery(e.target.value);
                          setIsOpen(true);
                        }}
                        onFocus={() => setIsOpen(true)}
                        placeholder={t.search}
                        className="flex-grow"
                        autoComplete="off"
                        required
                      />

                      {/* DROPDOWN LIST */}
                      {isOpen && query.length > 0 && (
                        <ul className="dropdown-list">
                          {suggestions.map((key) => (
                            <li
                              key={key}
                              className="dropdown-item"
                              onClick={() => {
                                // Set value based on current language
                                setQuery(
                                  lang === "ar" ? LOCAL_FOOD_DB[key].ar : key
                                );
                                setIsOpen(false);
                              }}
                            >
                              {/* Only show the name matching the current language */}
                              <span>
                                {lang === "ar" ? LOCAL_FOOD_DB[key].ar : key}
                              </span>
                            </li>
                          ))}
                          {suggestions.length === 0 && (
                            <li className="dropdown-item no-result">
                              {lang === "en"
                                ? "No food found"
                                : "لم يتم العثور على طعام"}
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="form-row action-row">
                    <input
                      name="qty"
                      type="number"
                      placeholder={t.qty}
                      className="qty-input"
                      required
                    />
                    <select name="unit" className="unit-select">
                      <option value="g">{t.units.g}</option>
                      <option value="tbsp">{t.units.tbsp}</option>
                      <option value="pcs">{t.units.pcs}</option>
                    </select>
                    {/* UPDATED BUTTON TEXT FOR EDITING */}
                    <button type="submit" className="btn-add">
                      {editingId ? (lang === "en" ? "Update" : "تحديث") : t.add}
                    </button>
                  </div>
                </form>

                <div
                  className="dashboard-breakdown"
                  style={{ marginTop: "20px" }}
                >
                  {todayLogs.length > 0 ? (
                    mealOrder.map((mealKey) => {
                      const data = grouped[mealKey];
                      if (!data || data.items.length === 0) return null;
                      return (
                        <div
                          key={mealKey}
                          className="card"
                          style={{ marginBottom: "12px", padding: "12px" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              borderBottom: "1px solid #f1f5f9",
                              paddingBottom: "8px",
                              marginBottom: "8px",
                            }}
                          >
                            <span
                              style={{ fontWeight: "bold", color: "#64748b" }}
                            >
                              {t.meals[mealKey]}
                            </span>
                            <span
                              style={{ fontWeight: "bold", color: "#10b981" }}
                            >
                              {data.total} {t.units.kcal}
                            </span>
                          </div>
                          {data.items.map((item) => (
                            <div
                              key={item.id}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontSize: "0.9rem",
                                marginBottom: "8px",
                              }}
                            >
                              <div style={{ flex: 1 }}>
                                <span>{item.name}</span>
                                <span
                                  style={{
                                    color: "#94a3b8",
                                    marginLeft: "8px",
                                  }}
                                >
                                  {item.cals} {t.units.kcal}
                                </span>
                              </div>
                              {/* ACTION BUTTONS */}
                              <div style={{ display: "flex", gap: "10px" }}>
                                <button
                                  onClick={() => startEdit(item)}
                                  style={{
                                    color: "#3b82f6",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {lang === "en" ? "Edit" : "تعديل"}
                                </button>
                                <button
                                  onClick={() => deleteLog(item.id)}
                                  style={{
                                    color: "#ef4444",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                  }}
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })
                  ) : (
                    <div
                      className="card"
                      style={{
                        textAlign: "center",
                        padding: "20px",
                        color: "#94a3b8",
                      }}
                    >
                      {lang === "en" ? "No logs" : "لا يوجد سجل"}
                    </div>
                  )}
                </div>

                <button
                  className="btn-main"
                  style={{ background: "#64748b" }}
                  onClick={() => setView("setup")}
                >
                  ← {t.setup}
                </button>
              </section>
            );
          })()}

        {view === "history" &&
          (() => {
            const histLogs = logs.filter((log) => log.date === selectedDate);
            return (
              <section className="history-view fade-in">
                <div className="history-header">
                  <button className="btn-back" onClick={() => setView("dash")}>
                    ←
                  </button>
                  <h2>{lang === "en" ? "Data Logs" : "سجل البيانات"}</h2>
                </div>
                <div className="card date-picker-card">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="full-date-input"
                  />
                </div>
                <div className="card diary-list">
                  {histLogs.length > 0 ? (
                    histLogs.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px 0",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <span>
                          {item.name} ({item.cals} kcal)
                        </span>
                        <button
                          onClick={() => deleteLog(item.id)}
                          style={{
                            color: "#ef4444",
                            border: "none",
                            background: "none",
                            cursor: "pointer",
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="empty-state">
                      {lang === "en" ? "No data" : "لا يوجد سجل"}
                    </div>
                  )}
                </div>
              </section>
            );
          })()}
      </>
    </div>
  );
}
