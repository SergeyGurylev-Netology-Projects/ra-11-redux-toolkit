export interface Item {
  imdbID: string
  Title: string
  Type: string
  Poster: string
  Year: string
}

export interface Detail {
  imdbID: string
  Title: string
  Type: string
  Poster: string
  Year: string
  Genre: string
  Runtime: string
  Director: string
  Actors: string
  imdbRating: string
}

export interface Favourite {
  imdbID: string
  detail: Detail
}
