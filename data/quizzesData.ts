
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
    id: 'quiz-needs-vs-wants',
    lessonId: 'needs-vs-wants',
    title: 'Needs vs. Wants Quiz',
    questions: [
      {
        question: 'Which of these is a NEED?',
        options: ['Video game', 'Food', 'Candy', 'Toy car'],
        correctAnswer: 1,
        explanation: 'Food is a need because you must have it to live and be healthy!',
      },
      {
        question: 'Which of these is a WANT?',
        options: ['Water', 'Clothes', 'New sneakers with lights', 'A home'],
        correctAnswer: 2,
        explanation: 'New sneakers with lights are a want - regular shoes are a need, but fancy ones are extra!',
      },
      {
        question: 'What should you spend money on first?',
        options: ['Wants', 'Needs', 'Toys', 'Games'],
        correctAnswer: 1,
        explanation: 'Always spend money on needs first, then save for wants!',
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
    id: 'quiz-budgeting-basics',
    lessonId: 'budgeting-basics',
    title: 'Budgeting Basics Quiz',
    questions: [
      {
        question: 'What is a budget?',
        options: ['A toy', 'A plan for your money', 'A game', 'A book'],
        correctAnswer: 1,
        explanation: 'A budget is a plan that helps you decide how to use your money!',
      },
      {
        question: 'What does the 50-30-20 rule mean?',
        options: ['50% toys, 30% candy, 20% games', '50% needs, 30% wants, 20% savings', '50% spending, 30% losing, 20% hiding', 'It&apos;s not a real rule'],
        correctAnswer: 1,
        explanation: 'The 50-30-20 rule means 50% for needs, 30% for wants, and 20% for savings!',
      },
      {
        question: 'Why is writing down your budget helpful?',
        options: ['It&apos;s not helpful', 'It helps you stick to your plan', 'It wastes paper', 'It&apos;s too hard'],
        correctAnswer: 1,
        explanation: 'Writing down your budget helps you remember and stick to your money plan!',
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
    id: 'quiz-types-of-money',
    lessonId: 'types-of-money',
    title: 'Different Types of Money Quiz',
    questions: [
      {
        question: 'How much is a quarter worth?',
        options: ['1 cent', '5 cents', '10 cents', '25 cents'],
        correctAnswer: 3,
        explanation: 'A quarter is worth 25 cents!',
      },
      {
        question: 'What is digital money?',
        options: ['Fake money', 'Money stored on computers', 'Toy money', 'Old money'],
        correctAnswer: 1,
        explanation: 'Digital money is real money stored on computers and phones!',
      },
      {
        question: 'What&apos;s the difference between debit and credit cards?',
        options: ['No difference', 'Debit uses your money, credit borrows money', 'They&apos;re both toys', 'Credit is fake'],
        correctAnswer: 1,
        explanation: 'Debit cards use your own money, while credit cards let you borrow money!',
      },
    ],
  },
  {
    id: 'quiz-charity-and-giving',
    lessonId: 'charity-and-giving',
    title: 'Charity and Giving Quiz',
    questions: [
      {
        question: 'What is charity?',
        options: ['Buying toys', 'Giving money or help to people who need it', 'Keeping all your money', 'Playing games'],
        correctAnswer: 1,
        explanation: 'Charity means giving money or help to people who need it!',
      },
      {
        question: 'How does giving make you feel?',
        options: ['Sad', 'Angry', 'Happy and proud', 'Bored'],
        correctAnswer: 2,
        explanation: 'Giving to others makes you feel happy and proud!',
      },
      {
        question: 'Do small donations help?',
        options: ['No, only big amounts help', 'Yes, even small amounts make a difference', 'Donations don&apos;t help at all', 'Only adults can donate'],
        correctAnswer: 1,
        explanation: 'Even small donations can make a big difference in someone&apos;s life!',
      },
    ],
  },
  {
    id: 'quiz-financial-goals',
    lessonId: 'financial-goals',
    title: 'Setting Financial Goals Quiz',
    questions: [
      {
        question: 'What is a financial goal?',
        options: ['A game', 'Something you want to save for', 'A type of food', 'A sport'],
        correctAnswer: 1,
        explanation: 'A financial goal is something you want to buy or save for in the future!',
      },
      {
        question: 'What is a short-term goal?',
        options: ['Something you want in many years', 'Something you want soon', 'Something impossible', 'Something free'],
        correctAnswer: 1,
        explanation: 'A short-term goal is something you want to get or do soon!',
      },
      {
        question: 'Why should you track your savings progress?',
        options: ['It&apos;s boring', 'It&apos;s exciting to see yourself get closer', 'You shouldn&apos;t track it', 'It&apos;s too hard'],
        correctAnswer: 1,
        explanation: 'Tracking your progress is exciting because you can see yourself getting closer to your goal!',
      },
    ],
  },
  {
    id: 'quiz-understanding-prices',
    lessonId: 'understanding-prices',
    title: 'Understanding Prices Quiz',
    questions: [
      {
        question: 'What does the price $5.99 mean?',
        options: ['5 cents and 99 dollars', '5 dollars and 99 cents', '599 dollars', '5 dollars and 9 cents'],
        correctAnswer: 1,
        explanation: 'The price $5.99 means 5 dollars and 99 cents!',
      },
      {
        question: 'How many cents are in one dollar?',
        options: ['10', '50', '100', '1000'],
        correctAnswer: 2,
        explanation: 'There are 100 cents in one dollar!',
      },
      {
        question: 'Why should you compare prices?',
        options: ['To waste time', 'To find the best deal', 'It doesn&apos;t matter', 'Prices are always the same'],
        correctAnswer: 1,
        explanation: 'Comparing prices helps you find the best deal and save money!',
      },
    ],
  },
  {
    id: 'quiz-making-change',
    lessonId: 'making-change',
    title: 'Making Change Quiz',
    questions: [
      {
        question: 'If a toy costs $3 and you pay $5, how much change do you get?',
        options: ['$1', '$2', '$3', '$8'],
        correctAnswer: 1,
        explanation: '$5 minus $3 equals $2 in change!',
      },
      {
        question: 'How many quarters equal one dollar?',
        options: ['2', '3', '4', '5'],
        correctAnswer: 2,
        explanation: 'Four quarters equal one dollar (4 × 25¢ = 100¢ = $1)!',
      },
      {
        question: 'Should you check your change before leaving a store?',
        options: ['No, never', 'Yes, always', 'Only sometimes', 'It doesn&apos;t matter'],
        correctAnswer: 1,
        explanation: 'Always check your change to make sure it&apos;s correct!',
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
  {
    id: 'quiz-credit-cards-intro',
    lessonId: 'credit-cards-intro',
    title: 'Credit Cards Basics Quiz',
    questions: [
      {
        question: 'What does a credit card let you do?',
        options: ['Borrow money from a bank', 'Get free money', 'Play games', 'Make toys'],
        correctAnswer: 0,
        explanation: 'A credit card lets you borrow money from a bank that you promise to pay back!',
      },
      {
        question: 'What happens if you don&apos;t pay back credit card money on time?',
        options: ['Nothing', 'You pay extra money called interest', 'You get more money', 'The card breaks'],
        correctAnswer: 1,
        explanation: 'If you don&apos;t pay back on time, you have to pay extra money called interest!',
      },
      {
        question: 'How should adults use credit cards?',
        options: ['Buy everything they see', 'Only buy what they can afford to pay back', 'Never use them', 'Give them to kids'],
        correctAnswer: 1,
        explanation: 'Adults should only buy what they can afford to pay back when using credit cards!',
      },
    ],
  },
  {
    id: 'quiz-borrowing-and-lending',
    lessonId: 'borrowing-and-lending',
    title: 'Borrowing and Lending Quiz',
    questions: [
      {
        question: 'What does borrowing mean?',
        options: ['Stealing', 'Getting something with a promise to give it back', 'Keeping forever', 'Breaking things'],
        correctAnswer: 1,
        explanation: 'Borrowing means getting something with a promise to give it back!',
      },
      {
        question: 'Why should you pay back borrowed money?',
        options: ['You don&apos;t have to', 'It builds trust and shows responsibility', 'It&apos;s not important', 'Only if you want to'],
        correctAnswer: 1,
        explanation: 'Paying back borrowed money builds trust and shows you&apos;re responsible!',
      },
      {
        question: 'What is interest on a loan?',
        options: ['Free money', 'Extra money you pay for borrowing', 'A game', 'A toy'],
        correctAnswer: 1,
        explanation: 'Interest is extra money you pay back for borrowing money!',
      },
    ],
  },
  {
    id: 'quiz-online-shopping-safety',
    lessonId: 'online-shopping-safety',
    title: 'Online Shopping Safety Quiz',
    questions: [
      {
        question: 'Who should you shop online with?',
        options: ['By yourself', 'A parent or trusted adult', 'Strangers', 'No one'],
        correctAnswer: 1,
        explanation: 'Always shop online with a parent or trusted adult!',
      },
      {
        question: 'What does a secure website start with?',
        options: ['http', 'https', 'www', 'shop'],
        correctAnswer: 1,
        explanation: 'Secure websites start with &quot;https&quot; and have a lock icon!',
      },
      {
        question: 'What should you do if a deal seems too good to be true?',
        options: ['Buy it immediately', 'Be careful, it might be a scam', 'Tell all your friends', 'Give your credit card'],
        correctAnswer: 1,
        explanation: 'If a deal seems too good to be true, be careful - it might be a scam!',
      },
    ],
  },
  {
    id: 'quiz-entrepreneurship-kids',
    lessonId: 'entrepreneurship-kids',
    title: 'Entrepreneurship for Kids Quiz',
    questions: [
      {
        question: 'What is an entrepreneur?',
        options: ['Someone who watches TV', 'Someone who starts their own business', 'Someone who sleeps', 'Someone who plays games'],
        correctAnswer: 1,
        explanation: 'An entrepreneur is someone who starts their own business!',
      },
      {
        question: 'What is profit?',
        options: ['Money you lose', 'The difference between what you earn and what you spend', 'A type of food', 'A game'],
        correctAnswer: 1,
        explanation: 'Profit is the money you get to keep after subtracting your costs!',
      },
      {
        question: 'What should you think about before starting a business?',
        options: ['Nothing', 'What you&apos;re good at and what people need', 'Only what you want', 'What&apos;s easiest'],
        correctAnswer: 1,
        explanation: 'Think about what you&apos;re good at and what people need!',
      },
    ],
  },
  {
    id: 'quiz-understanding-value',
    lessonId: 'understanding-value',
    title: 'Understanding Value Quiz',
    questions: [
      {
        question: 'What is value?',
        options: ['Only the price', 'How much something is worth to you', 'A type of money', 'A game'],
        correctAnswer: 1,
        explanation: 'Value is how much something is worth to you or others!',
      },
      {
        question: 'Why is quality important?',
        options: ['It&apos;s not important', 'Good quality items last longer', 'Cheap is always better', 'Quality doesn&apos;t matter'],
        correctAnswer: 1,
        explanation: 'Good quality items last longer, making them a better value!',
      },
      {
        question: 'What is sentimental value?',
        options: ['How much something costs', 'Value from memories and feelings', 'A type of money', 'A store'],
        correctAnswer: 1,
        explanation: 'Sentimental value comes from memories and feelings, not price!',
      },
    ],
  },
  {
    id: 'quiz-family-budgets',
    lessonId: 'family-budgets',
    title: 'Family Budgets Quiz',
    questions: [
      {
        question: 'What are expenses?',
        options: ['Free things', 'Things families pay for', 'Toys', 'Games'],
        correctAnswer: 1,
        explanation: 'Expenses are things families pay for, like rent, food, and utilities!',
      },
      {
        question: 'How can you help your family save money?',
        options: ['Waste everything', 'Turn off lights and not waste food', 'Break your toys', 'Use more electricity'],
        correctAnswer: 1,
        explanation: 'You can help by turning off lights, not wasting food, and taking care of belongings!',
      },
      {
        question: 'Why do families save money?',
        options: ['They don&apos;t', 'For big things like vacations and emergencies', 'To hide it', 'For no reason'],
        correctAnswer: 1,
        explanation: 'Families save for big things like vacations, new cars, and emergencies!',
      },
    ],
  },
  {
    id: 'quiz-emergency-funds',
    lessonId: 'emergency-funds',
    title: 'Emergency Funds Quiz',
    questions: [
      {
        question: 'What is an emergency fund?',
        options: ['Money for toys', 'Money saved for unexpected problems', 'Money to waste', 'Fake money'],
        correctAnswer: 1,
        explanation: 'An emergency fund is money saved for unexpected problems!',
      },
      {
        question: 'Why is an emergency fund important?',
        options: ['It&apos;s not important', 'It prepares you for unexpected problems', 'To buy toys', 'To show off'],
        correctAnswer: 1,
        explanation: 'An emergency fund prepares you for unexpected problems so you don&apos;t have to worry!',
      },
      {
        question: 'Where should you keep emergency money?',
        options: ['Mixed with spending money', 'Separate from spending money', 'Give it away', 'Lose it'],
        correctAnswer: 1,
        explanation: 'Keep emergency money separate so you don&apos;t accidentally spend it!',
      },
    ],
  },
  {
    id: 'quiz-smart-shopping',
    lessonId: 'smart-shopping',
    title: 'Smart Shopping Tips Quiz',
    questions: [
      {
        question: 'Why should you make a shopping list?',
        options: ['To waste paper', 'To remember what you need and avoid extra purchases', 'It&apos;s not helpful', 'To make shopping longer'],
        correctAnswer: 1,
        explanation: 'A shopping list helps you remember what you need and avoid buying extra things!',
      },
      {
        question: 'What should you do before buying something you want?',
        options: ['Buy it immediately', 'Wait a day or week to see if you still want it', 'Never buy it', 'Ask everyone'],
        correctAnswer: 1,
        explanation: 'Waiting helps you decide if you really want something or if it was just an impulse!',
      },
      {
        question: 'What are sales and discounts?',
        options: ['Ways to spend more', 'Special deals where things cost less', 'Scams', 'Not real'],
        correctAnswer: 1,
        explanation: 'Sales and discounts are special deals where you can buy things for less money!',
      },
    ],
  },
  {
    id: 'quiz-money-and-happiness',
    lessonId: 'money-and-happiness',
    title: 'Money and Happiness Quiz',
    questions: [
      {
        question: 'Can money buy happiness?',
        options: ['Yes, always', 'No, the best things in life are free', 'Only sometimes', 'Money is happiness'],
        correctAnswer: 1,
        explanation: 'Money can&apos;t buy happiness - the best things like friendship and love are free!',
      },
      {
        question: 'What often makes us happier than buying things?',
        options: ['More things', 'Experiences with family and friends', 'Being alone', 'Sleeping'],
        correctAnswer: 1,
        explanation: 'Experiences with family and friends often make us happier than buying things!',
      },
      {
        question: 'Why is being grateful important?',
        options: ['It&apos;s not important', 'It helps you appreciate what you have', 'To get more things', 'To show off'],
        correctAnswer: 1,
        explanation: 'Being grateful helps you appreciate what you have and be happy!',
      },
    ],
  },
];
