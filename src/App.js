import { Provider } from 'react-redux';
import './App.css';
import { store } from './store';
import RouteWrapper from './route_wrapper';
import { BrowserRouter } from 'react-router-dom';
import { CommonComponentsProvider } from './common/providers/common_components_provider';

function App() {
  return (
    <Provider store={store}>

      <BrowserRouter>
        <CommonComponentsProvider>
          <RouteWrapper />
        </CommonComponentsProvider>
      </BrowserRouter>

    </Provider>
  )
}

export default App