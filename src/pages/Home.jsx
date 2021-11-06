import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("history");
  const [currentJoke, setCurrentJoke] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    axios.get(`https://api.chucknorris.io/jokes/categories`).then((res) => {
      setCategories(res.data);
    });
  };

  const getRandomByCategory = () => {
    setIsLoading(true);
    axios
      .get(
        `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`
      )
      .then((res) => {
        setCurrentJoke(res.data);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Chuck Norris - Fetch API";
    fetchData();
    getRandomByCategory();
  }, []);

  useEffect(() => {
    getRandomByCategory();
  }, [selectedCategory]);

  return (
    <div style={styles.container}>
      <img src={currentJoke?.icon_url} />
      <h3 style={styles.card}>{isLoading ? "🔄" : currentJoke?.value}</h3>

      <strong style={{ color: "white", transition: "300ms" }}>
        Select an category bellow or try a random joke by clicking button. 🤘
      </strong>

      <div style={{ width: "448px" }}>
        {categories.map((category) => {
          return (
            <div
              style={
                selectedCategory === category
                  ? { ...styles.badge, ...styles.activeBadge }
                  : styles.badge
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          );
        })}
      </div>

      <button
        style={styles.button}
        onClick={() => getRandomByCategory(selectedCategory)}
      >
        try random ⚡
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    background: "radial-gradient(#a7d2ff, #573bb7)",
  },
  badge: {
    borderRadius: "12px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#573bb7",
    height: "28px",
    padding: "0 12px",
    background: "#FFFFFF40",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "4px",
    float: "left",
  },
  activeBadge: {
    background: "linear-gradient(145deg, white, white, #a7d2ff)",
  },
  card: {
    padding: "8px 24px",
    borderRadius: "24px",
    width: "400px",
    color: "#573bb7",
    textAlign: "center",
  },
  button: {
    background: "#573bb7",
    color: "white",
    border: "none",
    borderRadius: "50em",
    height: "48px",
    padding: "0 24px",
    fontWeight: "bold",
  },
};

export default Home;
