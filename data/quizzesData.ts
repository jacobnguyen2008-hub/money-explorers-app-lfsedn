
import { Quiz } from '@/types/AppTypes';

export const quizzesData: Quiz[] = [
  {
    id: 'quiz-what-is-money',
    lessonId: 'what-is-money',
    title: 'What is Money? Quiz',
    questions: [
      {
        question: 'What do we use money for?',
        options: ['To buy things', 'To eat', 'To sleep', 'To play'],
        correctAnswer: 0,
        explanation: 'We use money to buy things we need and want!',
      },
      {
        question: 'What are the different forms of money?',
        options: ['Only coins', 'Only bills', 'Coins, bills, and digital', 'Only digital'],
        correctAnswer: 2,
        explanation: 'Money comes in coins, bills, and digital forms!',
      },
      {
        question: 'How do we earn money?',
        options: ['By sleeping', 'By working and helping', 'By watching TV', 'By playing games'],
        correctAnswer: 1,
        explanation: 'We earn money by working, doing chores, and helping others!',
      },
    ],
  },
  {
    id: 'quiz-saving-vs-spending',
    lessonId: 'saving-vs-spending',
    title: 'Saving vs. Spending Quiz',
    questions: [
      {
        question: 'What does saving mean?',
        options: ['Using money now', 'Keeping money for later', 'Giving money away', 'Losing money'],
        correctAnswer: 1,
        explanation: 'Saving means keeping your money for later!',
      },
      {
        question: 'What is a good money rule?',
        options: ['Spend all your money', 'Save some, spend some, share some', 'Never save money', 'Only save money'],
        correctAnswer: 1,
        explanation: 'A good rule is to save some, spend some, and share some!',
      },
      {
        question: 'Why should we save money?',
        options: ['For fun', 'For things we want and emergencies', 'To hide it', 'To forget about it'],
        correctAnswer: 1,
        explanation: 'We save for things we want and for emergencies!',
      },
    ],
  },
  {
    id: 'quiz-earning-money',
    lessonId: 'earning-money',
    title: 'Earning Money Quiz',
    questions: [
      {
        question: 'How can kids earn money?',
        options: ['By doing chores', 'By sleeping', 'By watching TV', 'By eating'],
        correctAnswer: 0,
        explanation: 'Kids can earn money by doing chores and helping at home!',
      },
      {
        question: 'What is an allowance?',
        options: ['A toy', 'Money for helping at home', 'A game', 'A snack'],
        correctAnswer: 1,
        explanation: 'An allowance is money you get for helping around the house!',
      },
      {
        question: 'What happens when you work hard?',
        options: ['You get tired', 'You can earn more money', 'Nothing happens', 'You lose money'],
        correctAnswer: 1,
        explanation: 'When you work hard and learn, you can earn more money!',
      },
    ],
  },
  {
    id: 'quiz-what-is-bank',
    lessonId: 'what-is-bank',
    title: 'What is a Bank? Quiz',
    questions: [
      {
        question: 'What is a bank?',
        options: ['A toy store', 'A safe place for money', 'A school', 'A park'],
        correctAnswer: 1,
        explanation: 'A bank is a safe place where people keep their money!',
      },
      {
        question: 'What does deposit mean?',
        options: ['Take money out', 'Put money in', 'Lose money', 'Count money'],
        correctAnswer: 1,
        explanation: 'Deposit means putting money into the bank!',
      },
      {
        question: 'What is interest?',
        options: ['A game', 'Money the bank pays you', 'A toy', 'A book'],
        correctAnswer: 1,
        explanation: 'Interest is money the bank pays you for keeping your money there!',
      },
    ],
  },
  {
    id: 'quiz-simple-investing',
    lessonId: 'simple-investing',
    title: 'Simple Investing Quiz',
    questions: [
      {
        question: 'What is investing?',
        options: ['Spending all your money', 'Using money to make more money', 'Hiding money', 'Losing money'],
        correctAnswer: 1,
        explanation: 'Investing means using your money to help it grow over time!',
      },
      {
        question: 'What do you need for investing?',
        options: ['Patience', 'Rush', 'Fear', 'Anger'],
        correctAnswer: 0,
        explanation: 'Investing takes patience because it grows over time!',
      },
      {
        question: 'When you invest, what might you buy?',
        options: ['Candy', 'A piece of a company', 'Toys', 'Games'],
        correctAnswer: 1,
        explanation: 'When you invest, you might buy a small piece of a company!',
      },
    ],
  },
];
