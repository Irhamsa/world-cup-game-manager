import { GameProvider } from '../contexts/GameContext';
import MainMenu from '../components/MainMenu';

const Index = () => {
  return (
    <GameProvider>
      <MainMenu />
    </GameProvider>
  );
};

export default Index;