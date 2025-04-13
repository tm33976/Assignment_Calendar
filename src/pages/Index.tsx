
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import Calendar from './Calendar';

const Index = () => {
  return (
    <Provider store={store}>
      <Calendar />
    </Provider>
  );
};

export default Index;
