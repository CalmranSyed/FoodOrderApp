import { React, useEffect, useState } from "react"
import classes from "./AvailableMeals.module.css"
import MealItem from "./MealItem/MealItem"
import Card from "../UI/Card"
import Loader from "../UI/Loader"

const mealsURL =
  "https://react-http-svr-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json"

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

  const fetchMeals = async () => {
    const response = await fetch(mealsURL)

    if (!response.ok) {
      throw new Error("Something when wrong! :/")
    }

    const data = await response.json()
    const loadedMeals = []

    for (const key in data) {
      loadedMeals.push({
        id: key,
        name: data[key].name,
        description: data[key].description,
        price: data[key].price,
      })
    }

    setMeals(loadedMeals)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMeals().catch((error) => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  if (httpError) {
    return (
      <section>
        <p className={classes["error-message"]}>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      desc={meal.description}
      price={meal.price}
    />
  ))

  if (isLoading) {
    return <Loader />
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
