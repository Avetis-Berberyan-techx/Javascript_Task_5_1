const DOG_API = "https://dogapi.dog/api/v2/facts?limit=5";

let exampleData = {
  data: [
    {
      id: "2d5d5874-ef1c-4ef9-988e-f8f1e264fec8",
      type: "fact",
      attributes: {
        body: "The Berger Picard, Miniature American Shepherd and Lagotto Romagnolo are the newest dog breeds recognized by the American Kennel Club in 2015.",
      },
    },
    {
      id: "3e67a5d2-6717-49d0-b78d-4ec156f3e5cc",
      type: "fact",
      attributes: {
        body: "The most popular breed of domestic dog in the US and the UK is the Labrador Retriever.",
      },
    },
    {
      id: "71827dcf-3fb9-4742-ac05-e3f832192604",
      type: "fact",
      attributes: {
        body: "In ancient China, people kept warm by putting dogs up their sleeves.",
      },
    },
    {
      id: "9c8a45d2-faba-46a6-8cff-a61a01a21faf",
      type: "fact",
      attributes: {
        body: "President Lyndon Johnson had two beagles named Him and Her.",
      },
    },
    {
      id: "9e8743c8-a0a3-48b1-ac40-60fb90bf675c",
      type: "fact",
      attributes: {
        body: "The oldest dog on record was an Australian cattle dog named Bluey who lived 29 years and 5 months. In human years, that is more than 160 years old.",
      },
    },
  ],
};

const sortFactsByLength = (data, order = "asc") => {
  return data
    .map((obj) => obj.attributes.body)
    .sort((a, b) =>
      order === "asc" ? a.length - b.length : b.length - a.length
    );
};

console.log("facts sorting data test");
console.log(sortFactsByLength(exampleData.data));
console.log("--------------------------------------------");

const fetchDogFacts = (method, url) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return fetch(url, { method, headers })
    .then((response) => response.json())
    .then((json) => {
      const sortedFacts = sortFactsByLength(json.data, "asc");
      sortedFacts.forEach((element) => {
        console.log(element);
      });
      return sortedFacts;
    })
    .catch((err) => {
      return { ok: false, errorMessage: err };
    });
};

console.log(fetchDogFacts("GET", DOG_API));
