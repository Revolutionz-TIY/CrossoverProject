export default function api(url) {
  if (process.env.NODE_ENV === "production") {
    return 'https://bestbuy.now.sh';
  } else {
    return 'http://localhost:3000/api' + url;
  }
}
