"use client";

import { useState } from 'react';

interface Food {
  name: string;
  calories: number;
}

interface Meal {
  name: string;
  foods: Food[];
}

const HomePage = () => {
  const [meals, setMeals] = useState<Meal[]>([
    { name: 'Breakfast', foods: [] },
    { name: 'Lunch', foods: [] },
    { name: 'Dinner', foods: [] }
  ]);
  const [selectedMeal, setSelectedMeal] = useState<string>('Breakfast');
  const [newFoodName, setNewFoodName] = useState<string>('');
  const [newFoodCalories, setNewFoodCalories] = useState<number | ''>('');
  const [calorieGoal, setCalorieGoal] = useState<number | ''>('');

  const addFoodToMeal = (mealName: string) => {
    if (newFoodName.trim() && newFoodCalories > 0) {
      const updatedMeals = meals.map(meal =>
        meal.name === mealName
          ? { ...meal, foods: [...meal.foods, { name: newFoodName, calories: Number(newFoodCalories) }] }
          : meal
      );
      setMeals(updatedMeals);
      setNewFoodName('');
      setNewFoodCalories('');
    }
  };

  const removeFoodFromMeal = (mealName: string, foodIndex: number) => {
    const updatedMeals = meals.map(meal =>
      meal.name === mealName
        ? { ...meal, foods: meal.foods.filter((_, index) => index !== foodIndex) }
        : meal
    );
    setMeals(updatedMeals);
  };

  const getMealTotalCalories = (mealName: string) => {
    const meal = meals.find(m => m.name === mealName);
    return meal ? meal.foods.reduce((total, food) => total + food.calories, 0) : 0;
  };

  const totalCalories = meals.reduce((total, meal) => total + getMealTotalCalories(meal.name), 0);

  return (
    <div className="min-h-screen bg-[url('https://www.clarin.com/2022/08/17/QoyfI4ouM_2000x1500__1.jpg')] bg-cover bg-center p-8 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-black mb-8 drop-shadow-lg">Calorie Tracker</h1>
      
      <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg bg-opacity-90 backdrop-blur-md">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-black mb-4">Set Your Daily Calorie Goal</h2>
          <input
            type="number"
            value={calorieGoal}
            onChange={(e) => setCalorieGoal(Number(e.target.value))}
            className="form-input px-4 py-2 border border-gray-300 rounded-lg w-full text-black focus:ring focus:ring-blue-300"
            placeholder="Enter your daily calorie goal"
          />
        </div>
        
        <h2 className="text-2xl font-semibold text-black mb-6">Add Food Items</h2>
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={newFoodName}
            onChange={(e) => setNewFoodName(e.target.value)}
            className="form-input px-4 py-2 border border-gray-300 rounded-lg flex-1 text-black focus:ring focus:ring-blue-300"
            placeholder="Food Name"
          />
          <input
            type="number"
            value={newFoodCalories}
            onChange={(e) => setNewFoodCalories(Number(e.target.value))}
            className="form-input px-4 py-2 border border-gray-300 rounded-lg w-32 text-black focus:ring focus:ring-blue-300"
            placeholder="Calories"
          />
          <button
            onClick={() => addFoodToMeal(selectedMeal)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all shadow-lg"
          >
            Add
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-black mb-4">Select Meal</h2>
          <select
            value={selectedMeal}
            onChange={(e) => setSelectedMeal(e.target.value)}
            className="form-select px-4 py-2 border border-gray-300 rounded-lg text-black focus:ring focus:ring-blue-300"
          >
            {meals.map((meal) => (
              <option key={meal.name} value={meal.name}>{meal.name}</option>
            ))}
          </select>
        </div>
        
        <h2 className="text-2xl font-semibold text-black mb-6">Food List by Meal</h2>
        {meals.map((meal) => (
          <div key={meal.name} className="mb-6">
            <h3 className="text-xl font-semibold text-black mb-4">{meal.name}</h3>
            <ul className="space-y-4 mb-4">
              {meal.foods.map((food, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center text-black">
                  <div>
                    <span>{food.name}</span>
                    <span> - {food.calories} kcal</span>
                  </div>
                  <button
                    onClick={() => removeFoodFromMeal(meal.name, index)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg transition-all shadow-sm"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p className="text-lg font-medium text-black">Total Calories: <span className="font-bold">{getMealTotalCalories(meal.name)} kcal</span></p>
          </div>
        ))}

        <div className="text-lg font-medium text-black mt-4">
          <p>Calories Consumed: <span className="font-bold">{totalCalories} kcal</span></p>
          {calorieGoal && (
            <p>Daily Calorie Goal: <span className="font-bold">{calorieGoal} kcal</span></p>
          )}
        </div>

        {calorieGoal && (
          <p className={`mt-4 text-lg font-semibold ${totalCalories > calorieGoal ? 'text-red-500' : 'text-green-500'}`}>
            {totalCalories > calorieGoal
              ? 'You have exceeded your daily calorie goal!'
              : 'You are within your daily calorie goal.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

