const myFetch = async (url: string, method: string = "GET") => {
  const response = await fetch(url, {
    method: method,
    mode: "cors",
  });

  if (response.status !== 200) {
    throw new Error("cannot fetch data");
  }

  const data = await response.json();
  return data;
};

export default myFetch;
