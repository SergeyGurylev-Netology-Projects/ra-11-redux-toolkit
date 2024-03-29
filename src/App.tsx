import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './app/store'
import Menu from './components/menu/menu.tsx';
import SearchPage from './components/pages/search.tsx';
import FavouritesPage from './components/pages/favourites.tsx';

export default function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <div>
          <Menu />
          <div className="page">
            <Routes>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/favourites" element={<FavouritesPage />} />
              <Route path="/*" element={<h1 className="article__paragraph">404 | Страница не найдена</h1>} />
            </Routes>
          </div>
        </div>
      </Provider>,
    </BrowserRouter>
  )
}
