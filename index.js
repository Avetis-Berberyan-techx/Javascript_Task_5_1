const DOG_API = "https://dogapi.dog/api/v2/facts?limit=5";

let exampleData = {
  data: [
    { id: "1", type: "fact", attributes: { body: "Dogs have three eyelids." } },
    {
      id: "2",
      type: "fact",
      attributes: {
        body: "The Labrador Retriever is the most popular dog breed.",
      },
    },
    {
      id: "3",
      type: "fact",
      attributes: { body: "Dogs can learn over 1000 words." },
    },
  ],
};

// Sort facts by text length
const sortFactsByLength = (data, order = "asc") => {
  return data
    .map((obj) => obj.attributes.body)
    .sort((a, b) =>
      order === "asc" ? a.length - b.length : b.length - a.length
    );
};

// Test sorting with example data
console.log("Example data sorted by length:");
console.log(sortFactsByLength(exampleData.data));
console.log("--------------------------------------------");

const fetchDogFacts = (method, url) => {
  const headers = { "Content-Type": "application/json" };

  return fetch(url, { method, headers })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const sortedFacts = sortFactsByLength(json.data, "asc");
      return sortedFacts;
    })
    .catch((err) => {
      console.log({ ok: false, errorMessage: err.message });
    });
};

fetchDogFacts("GET", DOG_API).then((data) => {
  if (Array.isArray(data)) {
    console.log("fetching dog facts");
    data.forEach((fact, i) => console.log(`${i + 1}. ${fact}`));
    console.log("------------------------------------------------------------");
  }
});

// Fetch dog facts using async/await
const fetchDogFactsWithAsync = async (method, url) => {
  const headers = { "Content-Type": "application/json" };

  try {
    const response = await fetch(url, { method, headers });
    // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const json = await response.json();
    const sortedFacts = sortFactsByLength(json.data, "asc");

    return sortedFacts;
  } catch (err) {
    console.log({
      ok: false,
      errorMessage: err.message || "Something went wrong",
    });
  }
};

// Call the async function

fetchDogFactsWithAsync("GET", DOG_API).then((data) => {
  if (Array.isArray(data)) {
    console.log("Fetched & sorted facts with async await:");
    data.forEach((fact, i) => console.log(`${i + 1}. ${fact}`));
    console.log(
      "------------------------------------------------------------------"
    );
  }
});

const FAKE_DOG_API = "https://dogapi.do/api/v2/facts?limit=5";

fetchDogFactsWithAsync("GET", FAKE_DOG_API).then((data) => {
  if (Array.isArray(data)) {
    console.log("Fetched & sorted facts with async await:");
    data.forEach((fact, i) => console.log(`${i + 1}. ${fact}`));
    console.log(
      "------------------------------------------------------------------"
    );
  }
});
