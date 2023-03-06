import { useEffect, useState } from "react";
import Card from "./components/Card";
import useType from "./hooks/useType";
import "./App.css";

const useMap = ({ array, field, unique }) => {
  const [mapped, setMapped] = useState([]);

  useEffect(() => {
    const arr = array.map((e) => e[field]);
    const uniqueArr = [];
    if (unique) {
      arr.forEach((element, i, a) => {
        const prevIdex = a.indexOf(element);
        if (i === prevIdex) {
          uniqueArr.push(element);
        }
      });
    }
    setMapped(unique ? uniqueArr : arr);
  }, [field, array, unique]);

  return mapped;
};

function App() {
  const [cards, setCards] = useState([
    {
      name: "Bella",
      race: "Dog",
      type: "Lhasa Apso",
      location: "Algiers",
      photo:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/white-lhasa-apso-dog-portrait-royalty-free-image-1643304064.jpg?crop=0.535xw:1.00xh;0.335xw,0&resize=480:*",
    },
    {
      name: "Max",
      race: "Dog",
      type: "Affenpinscher",
      location: "Algiers",
      photo:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-small-dog-breeds-affenpinschner-1598989838.jpg?crop=0.573xw:1.00xh;0.206xw,0&resize=980:*",
    },
    {
      name: "Cooper",
      race: "Dog",
      type: "Corgi",
      location: "Algiers",
      photo:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-small-dog-breeds-corgi-1598987933.jpg?crop=0.478xw:1.00xh;0.114xw,0&resize=980:*",
    },
    {
      name: "Lucy",
      race: "Dog",
      type: "Chihuahua",
      location: "Oran",
      photo:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-small-dog-breeds-chihuahua-1598967884.jpg?crop=0.447xw:1.00xh;0.259xw,0&resize=980:*",
    },
    {
      name: "Milo",
      race: "Dog",
      type: "American Eskimo",
      location: "Jijel",
      photo:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/miniature-american-eskimo-royalty-free-image-1643306359.jpg?crop=0.553xw:0.966xh;0.230xw,0.0338xh&resize=980:*",
    },
    {
      name: "Whiskers",
      race: "Cat",
      type: "Scottish Fold",
      location: "Jijel",
      photo:
        "https://images.ctfassets.net/440y9b545yd9/6grJk9ZQXPqgQ3JoJWDZBI/b9f9f47826469726faa1dff26fe9781b/Scottish_Fold_brindle.jpg",
    },
    {
      name: "Felix",
      race: "Cat",
      type: "American Shorthair",
      location: "Algiers",
      photo:
        "https://www.petfinder.com/static/076b46e1bf962fcdd08c3c9c51c71487/94365/american-shorthair-detail-scaled.jpg",
    },
    {
      name: "Smudge",
      race: "Cat",
      type: "Persian",
      location: "Algiers",
      photo:
        "https://images.ctfassets.net/440y9b545yd9/biofZxAJ6f8TVbZVQ2ARF/c84d1be12b9cf04af77203766e61c474/65persiancat.jpg",
    },
    {
      name: "Angel",
      race: "Cat",
      type: "British Shorthair",
      location: "Algiers",
      photo:
        "https://images.ctfassets.net/440y9b545yd9/qcE4OhJ9cUvwJUQ5JDuNI/535be2bfc4c2d2f713b9d9c13a66811f/BritishShorthairBlue.jpg",
    },
  ]);

  const [query, setQuery] = useState({
    name: "",
    race: "",
    type: "",
    location: "",
  });

  //const [newCards, setNewCards] = useState([]);

  const [filters, setFilters] = useState([]);

  const [selectedRace, setSelectedRace] = useState("all");

  const races = useMap({
    unique: true,
    array: cards,
    field: "race",
  });

  const typesObj = {};

  const ttypes = cards.map((value, index) => {
    typesObj[value.race] = typesObj[value.race] || [];
    if (!typesObj[value.race].includes(value.type))
      typesObj[value.race].push(value.type);

    typesObj["all"] = typesObj["all"] || [];
    if (!typesObj["all"].includes(value.type)) typesObj["all"].push(value.type);

    return value.type;
  });

  // const locations = cards.map((value, index) => {
  //   return value.location;
  // });

  const locations = useMap({ unique: true, field: "location", array: cards });

  const checkFilter = (event) => {
    const newQuery = {
      name: query.name,
      race: query.race,
      type: query.type,
      location: query.location,
    };
    //console.log(event.target);
    if (event.target.getAttribute("name") == "name") {
      newQuery.name = event.target.value;
    } else if (event.target.getAttribute("name") == "race") {
      newQuery.race = event.target.value;
    } else if (event.target.getAttribute("name") == "type") {
      newQuery.type = event.target.value;
    } else if (event.target.getAttribute("name") == "location") {
      newQuery.location = event.target.value;
    }
    console.log(newQuery);
    setQuery(newQuery);
  };

  const doFilter = (myfilters) => {
    const obj = Object.keys(myfilters).filter((item) => {
      return myfilters[item] !== "";
    });

    obj.map((o) =>
      cards.map((item, index, arr) => {
        if (myfilters[o] == item[o]) {
          // console.log("equal..................."); //console.log(myfilters[o]);
          // console.log(item);
          const newCards = [];
          if (!newCards.includes(item)) newCards.push(item);
          console.log(newCards);
        }
      })
    );
    console
      .log
      // myfilters,
      // Object.keys(myfilters),
      // obj,
      ();

    // if()
  };

  useEffect(() => {
    doFilter(query);
    // console.log(filters, Object.keys(filters));

    // filters.forEach((value, index, array) => {
    //   console.log(value.name);
    // });
  }, [filters, query]);

  //console.log(cards.filter((item) => item.name.toLowerCase().includes(query)));

  return (
    <>
      <header>
        <h1>PETS ADOPTION 🐶 </h1>
      </header>
      <div className="App">
        <div className="container">
          <div className="filter">
            <div className="filter-select">
              <select
                name="race"
                id="race"
                onChange={(event) => {
                  checkFilter(event);
                  setSelectedRace(event.target.value);
                }}
              >
                <option value="all">All</option>
                {races.map((value, index) => {
                  //console.log(value);
                  return (
                    <option key={value + index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>

              <select
                name="type"
                id="type"
                onChange={(event) => {
                  checkFilter(event);
                }}
              >
                <option value="all">All</option>
                {typesObj[selectedRace].map((value, index) => {
                  //console.log(value);
                  return (
                    <option key={value + index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>

              <select
                name="location"
                id="location"
                onChange={(event) => {
                  checkFilter(event);
                }}
              >
                <option value="all">All</option>
                {locations.map((value, index) => {
                  //console.log(value);
                  return (
                    <option key={value + index} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="filter-input">
              <input
                type="search"
                placeholder="Search.."
                name="name"
                onChange={(event) => checkFilter(event)}
              />
            </div>
          </div>
          <div className="cards">
            {cards
              //.filter((item) => item.name.toLowerCase().includes(query))
              //.filter(doFilter(query))
              .map((value, index) => {
                return (
                  <Card
                    className="card"
                    value={value}
                    key={value.name + index}
                    index={index}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

// const newData = originalData.filter(condition1).filter(condition2).filter(condition3)
