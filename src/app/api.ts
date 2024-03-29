import { Item, Detail } from "./model"

const url = import.meta.env.VITE_APP_URL || 'https://www.omdbapi.com';
const api_key = import.meta.env.VITE_APP_API_KEY || '9713c5e7';

export function fetchItems({ search = "", page = 1 }) {
  return new Promise<{ items: Item[], totalResults: number }>((resolve) => {
    fetch(`${url}?apikey=${api_key}&type=movie&s=${search}&page=${page}`)
      .then(response => response.json())
      .then((data) => {
        resolve({
          items: data.Search,
          totalResults: parseInt(data.totalResults),
        });
      });
  })
}

export function fetchDetail({ id = "" }) {
  return new Promise<{ detail: Detail }>((resolve) => {
    fetch(`${url}?apikey=${api_key}&i=${id}`)
      .then(response => response.json())
      .then((data) => {
        resolve({detail: data});
      });
  })
}
