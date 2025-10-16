
import { Lesson } from '@/types/AppTypes';

export const lessonsData: Lesson[] = [
  {
    id: 'what-is-money',
    title: 'What is Money?',
    description: 'Learn about money and why we use it!',
    icon: '💰',
    color: '#FF6B6B',
    completed: false,
    content: [
      {
        type: 'text',
        content: 'Money is something we use to buy things we need and want! Long ago, people traded items, but money made it easier.',
      },
      {
        type: 'text',
        content: 'Money comes in different forms: coins, bills, and even digital money on phones and computers!',
      },
      {
        type: 'text',
        content: 'We earn money by working, doing chores, or helping others. Then we can use it to buy food, toys, and other things!',
      },
    ],
  },
  {
    id: 'saving-vs-spending',
    title: 'Saving vs. Spending',
    description: 'Learn when to save and when to spend!',
    icon: '🏦',
    color: '#4ECDC4',
    completed: false,
    content: [
      {
        type: 'text',
        content: 'Spending means using your money to buy something right now. Saving means keeping your money for later!',
      },
      {
        type: 'text',
        content: 'It&apos;s smart to save some money for things you really want or for emergencies. Try to save a little bit every time you get money!',
      },
      {
        type: 'text',
        content: 'A good rule is: Save some, spend some, and share some! This helps you be smart with your money.',
      },
    ],
  },
  {
    id: 'earning-money',
    title: 'Earning Money',
    description: 'Discover how to earn your own money!',
    icon: '💵',
    color: '#FFE66D',
    completed: false,
    content: [
      {
        type: 'text',
        content: 'You can earn money by doing chores at home like cleaning your room, washing dishes, or helping with yard work!',
      },
      {
        type: 'text',
        content: 'Some kids get an allowance from their parents for helping around the house. This teaches you about earning money!',
      },
      {
        type: 'text',
        content: 'When you grow up, you&apos;ll have a job where you work and earn money. The harder you work and learn, the more you can earn!',
      },
    ],
  },
  {
    id: 'what-is-bank',
    title: 'What is a Bank?',
    description: 'Learn about banks and how they help us!',
    icon: '🏛️',
    color: '#A78BFA',
    completed: false,
    content: [
      {
        type: 'text',
        content: 'A bank is a safe place where people keep their money. It&apos;s like a super secure piggy bank!',
      },
      {
        type: 'text',
        content: 'Banks keep your money safe and can even help it grow a little bit over time. This is called earning interest!',
      },
      {
        type: 'text',
        content: 'You can put money in the bank (deposit) or take money out (withdraw) whenever you need it!',
      },
    ],
  },
  {
    id: 'simple-investing',
    title: 'Simple Investing',
    description: 'Learn how to make your money grow!',
    icon: '📈',
    color: '#F472B6',
    completed: false,
    content: [
      {
        type: 'text',
        content: 'Investing means using your money to help it grow into more money over time. It&apos;s like planting a money tree!',
      },
      {
        type: 'text',
        content: 'When you invest, you might buy a small piece of a company. If the company does well, your money grows!',
      },
      {
        type: 'text',
        content: 'Investing takes patience. It&apos;s best for money you don&apos;t need right away. Start small and learn as you grow!',
      },
    ],
  },
];
