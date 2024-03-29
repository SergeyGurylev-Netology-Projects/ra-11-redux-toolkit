import { useAppDispatch, useAppSelector } from '../../app/hooks';
import React, {useState} from 'react';
import { searchItems, selectSearchItems, setActiveItem } from '../../app/searchSlice';
import { setSource } from '../../app/detailSlice';
import Detail from './detail.tsx';

export default function SearchPage() {
    const dispatch = useAppDispatch();

    const {
      query,
      items,
      totalResults,
      totalPages,
      currentPage,
      activeItem,
      status} = useAppSelector(selectSearchItems);

    const [ inputState, UpdateInputs ] = useState({name: ''});

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value } = e.target;

        UpdateInputs({
          ...inputState,
          [name]: value,
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(searchItems(inputState.name, 1));
      dispatch(setSource({activeID: '', source: "search"}));
      UpdateInputs({name: ''});
    }

    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(searchItems('', 0));
      dispatch(setSource({activeID: '', source: "search"}));
      UpdateInputs({name: ''});
    }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(searchItems(query, currentPage-1));
      dispatch(setSource({activeID: '', source: "search"}));
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(searchItems(query, currentPage+1));
      dispatch(setSource({activeID: '', source: "search"}));
    }
  }

  const handleActivateItem = (imdbID: string) => {
    dispatch(setActiveItem(imdbID));
    dispatch(setSource({activeID: imdbID, source: "search"}));
  }

  return (
    <article className="article">
      <h1 className="article__title">Параметры поиска</h1>
      <form className="form-search" onSubmit={handleSubmit} onReset={handleReset}>
        <label>Наименование
          <input name='name' value={inputState.name} onChange={onChange}/>
        </label>
        <button type='submit' className='form-btn'>&#128269;</button>
        <button type='reset' className='form-btn'>&#10060;</button>
      </form>

      {status === 'failed' && <h1 className="article__title">Во время поиска произошла ошибка</h1>}
      {status === 'loading' && <h1 className="article__title">Выполняется поиск...</h1>}
      {status === 'idle' && !items && <h1 className="article__title">Ничего не найдено</h1>}
      {status === 'idle' && items && query &&
        <>
          <h1 className="article__title">Результат поиска</h1>

          <div className="form-search--navigation">
            <a>Всего найдено {totalResults} | </a>
            <a>Текущая страница {currentPage} из {totalPages} | </a>
            <button className="control-btn" onClick={handlePrevPage}>&#9668;</button>
            <a> | </a>
            <button className="control-btn" onClick={handleNextPage}>&#9658;</button>
          </div>
        </>}
      {items &&
        <div className="article__paragraph">
          <ul className="list-items">
            {items.map(el => (
              <li key={el.imdbID} className={["list-item", el.imdbID === activeItem ? "list-item--active" : ""].join(" ")} onMouseDown={() => handleActivateItem(el.imdbID)}>
                <img className="list-item-poster" src={el.Poster} alt={el.Title}/>
                <div>
                  <a className="list-item-detail">{el.Title}</a>
                  <a className="list-item-detail">{el.Year}</a>
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
