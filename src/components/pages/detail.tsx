import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from "react";
import { detailItem, selectItemDetails, setSource } from '../../app/detailSlice';
import { addItem, removeItem } from '../../app/favourutesSlice';

export default function Detail() {
  const dispatch = useAppDispatch();
  const { activeID, detail, status} = useAppSelector(selectItemDetails);

  useEffect(() => {
    dispatch(detailItem(activeID));
    }, [activeID]
  );

  const handleFavouriteAdd = () => {
    dispatch(addItem({imdbID: activeID, detail: detail}));
  }

  const handleFavouriteRemove = () => {
    dispatch(removeItem(activeID));
    dispatch(setSource({activeID: '', source: "favourites"}));
  }

  return (
    <article className="detail">
      {status === 'failed' && <h1 className="article__title">Во получения данных произошла ошибка</h1>}
      {status === 'loading' && <h1 className="article__title">Получение данных...</h1>}
      {status === "idle" && activeID &&
      <div>
        <button className='favourite-btn' title="Добавить в избранное" onClick={handleFavouriteAdd}>&#9733;</button>
        <button className='favourite-btn' title="Удалить из избранного" onClick={handleFavouriteRemove}>&#9734;</button>
        <h1 className="article__title">{detail.Title}</h1>
        <div>
          <img className="detail-poster" src={detail.Poster} alt={detail.Title}/>
          <a className="list-item-detail">{detail.Year}</a>
          <a className="list-item-detail">{detail.Genre}</a>
          <a className="list-item-detail">{detail.Runtime}</a>
          <a className="list-item-detail">{detail.Director}</a>
          <a className="list-item-detail">{detail.Actors}</a>
          <a className="list-item-detail">{detail.imdbRating}</a>
        </div>
      </div>}
    </article>
  )
}
