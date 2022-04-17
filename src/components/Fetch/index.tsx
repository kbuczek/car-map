const myFetch = async (url: string, method: string = "GET") => {
  const response = await fetch(url);

  if (response.status !== 200) {
    console.log(response);
    throw new Error("cannot fetch data");
  }

  const data = await response.json();
  return data;
};

export default myFetch;
