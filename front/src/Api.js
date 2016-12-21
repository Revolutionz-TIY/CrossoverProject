export default function api() {
  if (process.env.NODE_ENV === "production") {
    return '/api';
  } else {
    return 'http://localhost:3000/api';
  }
}
