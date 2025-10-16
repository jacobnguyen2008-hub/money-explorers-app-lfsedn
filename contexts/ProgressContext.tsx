
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress } from '@/types/AppTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProgressContextType {
  progress: UserProgress;
  addCoins: (amount: number) => void;
  addBadge: (badge: string) => void;
  completeLesson: (lessonId: string) => void;
  completeGame: (gameId: string) => void;
  completeQuiz: (quizId: string) => void;
  addSticker: (sticker: string) => void;
  spendCoins: (amount: number) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = '@finance_kids_progress';

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<UserProgress>({
    coins: 0,
    badges: [],
    completedLessons: [],
    completedGames: [],
    completedQuizzes: [],
    stickers: [],
  });

  useEffect(() => {
    loadProgress();
  }, []);

  useEffect(() => {
    saveProgress();
  }, [progress]);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading progress:', error);
    }
  };

  const saveProgress = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.log('Error saving progress:', error);
    }
  };

  const addCoins = (amount: number) => {
    setProgress(prev => ({ ...prev, coins: prev.coins + amount }));
  };

  const addBadge = (badge: string) => {
    setProgress(prev => {
      if (!prev.badges.includes(badge)) {
        return { ...prev, badges: [...prev.badges, badge] };
      }
      return prev;
    });
  };

  const completeLesson = (lessonId: string) => {
    setProgress(prev => {
      if (!prev.completedLessons.includes(lessonId)) {
        return {
          ...prev,
          completedLessons: [...prev.completedLessons, lessonId],
        };
      }
      return prev;
    });
  };

  const completeGame = (gameId: string) => {
    setProgress(prev => {
      if (!prev.completedGames.includes(gameId)) {
        return {
          ...prev,
          completedGames: [...prev.completedGames, gameId],
        };
      }
      return prev;
    });
  };

  const completeQuiz = (quizId: string) => {
    setProgress(prev => {
      if (!prev.completedQuizzes.includes(quizId)) {
        return {
          ...prev,
          completedQuizzes: [...prev.completedQuizzes, quizId],
        };
      }
      return prev;
    });
  };

  const addSticker = (sticker: string) => {
    setProgress(prev => {
      if (!prev.stickers.includes(sticker)) {
        return { ...prev, stickers: [...prev.stickers, sticker] };
      }
      return prev;
    });
  };

  const spendCoins = (amount: number): boolean => {
    if (progress.coins >= amount) {
      setProgress(prev => ({ ...prev, coins: prev.coins - amount }));
      return true;
    }
    return false;
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        addCoins,
        addBadge,
        completeLesson,
        completeGame,
        completeQuiz,
        addSticker,
        spendCoins,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
};
