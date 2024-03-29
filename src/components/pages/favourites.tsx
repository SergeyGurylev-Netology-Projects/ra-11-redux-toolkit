import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFavourites, setActiveItem } from '../../app/favourutesSlice';
import { setSource } from '../../app/detailSlice';
import Detail from "./detail.tsx";

export default function FavouritesPage() {
  const dispatch = useAppDispatch();
  const { favourites, activeFavouriteItem } = useAppSelector(selectFavourites);

  const handleActivateItem = (imdbID: string) => {
    dispatch(setActiveItem(imdbID));
    dispatch(setSource({activeID: imdbID, source: "favourites"}));
  }

  return (
    <article className="article">
      <h1 className="article__title">Избранное</h1>

      {favourites.length === 0 && <h1 className="article__title">В избранном ничего нет</h1>}
      {favourites.length > 0 &&
        <div className="article__paragraph">
          <ul className="favourites-items">
            {favourites.map(el => (
              <li key={el.imdbID} className={["list-item", el.imdbID === activeFavouriteItem ? "list-item--active" : ""].join(" ")} onMouseDown={() => handleActivateItem(el.imdbID)}>
                <img className="list-item-poster" src={el.detail.Poster} alt={el.detail.Title}/>
                <div>
                  <a className="list-item-detail">{el.detail.Title}</a>
                  <a className="list-item-detail">{el.detail.Year}</a>
                </div>
              </li>
            ))}
          </ul>

          <div className="detail-container">
            <Detail />
          </div>
        </div>}
    </article>
  )
}
