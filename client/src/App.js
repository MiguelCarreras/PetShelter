import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Layout from './layouts/Layout';
import PetList from './pages/pets/PetList';
import PetNew from './pages/pets/PetNew';
import PetShow from './pages/pets/PetShow';
import PetEdit from './pages/pets/PetEdit';
import UseEffectPrueba from './components/UseEffectPrueba';

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />} >
          <Route index element={<PetList />}/>
          <Route path='pets/new' element={<PetNew />} />
          <Route path='pets/:id' element={<PetShow />} />
          <Route path='pets/:id/edit' element={<PetEdit />} />
          <Route path='count' element={<UseEffectPrueba />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
