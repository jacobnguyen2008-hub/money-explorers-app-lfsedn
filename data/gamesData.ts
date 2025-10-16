
import { Game } from '@/types/AppTypes';

export const gamesData: Game[] = [
  {
    id: 'save-vs-spend',
    title: 'Save or Spend?',
    description: 'Sort items into save or spend!',
    icon: '🎯',
    color: '#FF6B6B',
    route: '/games/save-vs-spend',
  },
  {
    id: 'coin-matching',
    title: 'Coin Match',
    description: 'Match coins with their values!',
    icon: '🪙',
    color: '#4ECDC4',
    route: '/games/coin-matching',
  },
  {
    id: 'money-adventure',
    title: 'Money Adventure',
    description: 'Collect coins and answer questions!',
    icon: '🗺️',
    color: '#FFE66D',
    route: '/games/money-adventure',
  },
];
