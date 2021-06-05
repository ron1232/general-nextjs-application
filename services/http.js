const http = async (url, rest) => {
  const res = await fetch(url, { ...rest });
  const data = await res.json();
  return { res, data };
};

export default http;
