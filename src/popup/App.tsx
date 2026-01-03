import AppBar from '@/components/AppBar';
import PixivBlocked from '@/views/PixivBlocked';
import PixivChecking from '@/views/PixivChecking';
import usePixivContext from './hooks/usePixivContext';
import MainPage from './Pages/MainPage';

export default function App() {
  const { pixivContext } = usePixivContext();
  return (
    <div className='flex-column'>
      <AppBar />
      {pixivContext === 'blocked' && <PixivBlocked />}
      {pixivContext === 'checking' && <PixivChecking />}
      {pixivContext === 'allowed' && <MainPage />}
    </div>
  );
}
