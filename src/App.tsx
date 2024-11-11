import './App.css'
import { AuthContextProvider } from './contexts'
import { Black, Cyan, Green, Magenta, Orange, Purple, White, Yellow } from './pages'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Secondary } from './Secondary';
import { Protected } from './Protected';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Cyan/>} />
      <Route path="/cyan" element={<Cyan/>} />
      <Route path="/magenta" element={<Magenta/>} />
      <Route path="/yellow" element={<Yellow/>} />
      <Route element={<Secondary/>}>
        <Route path="/orange" element={<Orange/>} />
        <Route path="/purple" element={<Purple/>} />
        <Route path="/green" element={<Green/>} />
      </Route>
      <Route element={<Protected/>}>
        <Route path="/white" element={<White/>} />
        <Route path="/black" element={<Black/>} />
      </Route>
    </>
  )
);

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router}>
        </RouterProvider>
      </AuthContextProvider>
    </>
  )
}

/*
{
    colorActual === '/cyan'    ? <Cyan/>    :
    colorActual === '/magenta' ? <Magenta/> :
    colorActual === '/yellow'  ? <Yellow/>  :
    colorActual === '/purple'  ? <Purple/>  :
    colorActual === '/orange'  ? <Orange/>  :
    colorActual === '/green'   ? <Green/>   :
    colorActual === '/white'   ? <White/>   :
    colorActual === '/black'   ? <Black/>   : <div></div>
}
*/
export default App
