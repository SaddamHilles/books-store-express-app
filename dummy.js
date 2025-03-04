const AUTHORS = [
  {
    id: 1,
    name: 'Author One',
    birthdate: '1975-06-15',
    nationality: 'American',
    bio: 'An experienced mystery and adventure writer.',
    awards: ['Best Mystery Novel 2010', 'Adventure Book Award 2015'],
    notableWorks: ['The Hidden Path', 'Echoes of the Unknown'],
  },
  {
    id: 2,
    name: 'Author Two',
    birthdate: '1982-09-23',
    nationality: 'British',
    bio: 'A renowned scientist and author of innovation books.',
    awards: ['Science Book of the Year 2018'],
    notableWorks: ['The Future of Tech', 'Innovators of Tomorrow'],
  },
  {
    id: 3,
    name: 'Author Three',
    birthdate: '1968-12-01',
    nationality: 'Canadian',
    bio: 'A novelist specializing in love, loss, and redemption stories.',
    awards: ['Romance Novel of the Year 2012'],
    notableWorks: ['Whispers of the Heart', 'Falling Leaves'],
  },
  {
    id: 4,
    name: 'Author Four',
    birthdate: '1990-04-10',
    nationality: 'Australian',
    bio: 'A motivational speaker and self-help book author.',
    awards: ['Best Self-Help Book 2020'],
    notableWorks: ['Mindset Shift', 'The Productivity Formula'],
  },
  {
    id: 5,
    name: 'Author Five',
    birthdate: '1979-07-30',
    nationality: 'German',
    bio: 'A fantasy writer known for magical worlds and epic tales.',
    awards: ['Fantasy Book Award 2016', 'Best Worldbuilding 2019'],
    notableWorks: ['The Dragon’s Quest', 'Legends of Eldoria'],
  },
  {
    id: 6,
    name: 'Author Six',
    birthdate: '1963-11-20',
    nationality: 'French',
    bio: 'A historian who brings ancient times to life through fiction.',
    awards: ['Historical Fiction Award 2014'],
    notableWorks: ['Empire’s Rise', 'The Forgotten Civilization'],
  },
];

const BOOKS = [
  {
    id: 1,
    title: 'Book One',
    authorId: 1,
    description: 'An exciting journey into the world of mystery and adventure.',
    price: 15.99,
    cover: 'https://example.com/book-one.jpg',
  },
  {
    id: 2,
    title: 'Book Two',
    authorId: 2,
    description: 'A deep dive into the world of science and innovation.',
    price: 12.49,
    cover: 'https://example.com/book-two.jpg',
  },
  {
    id: 3,
    title: 'Book Three',
    authorId: 3,
    description: 'A thrilling novel about love, loss, and redemption.',
    price: 18.75,
    cover: 'https://example.com/book-three.jpg',
  },
  {
    id: 4,
    title: 'Book Four',
    authorId: 4,
    description:
      'An inspiring self-help book to improve your mindset and productivity.',
    price: 20.0,
    cover: 'https://example.com/book-four.jpg',
  },
  {
    id: 5,
    title: 'Book Five',
    authorId: 5,
    description: 'A fantasy epic filled with magic, dragons, and heroism.',
    price: 14.99,
    cover: 'https://example.com/book-five.jpg',
  },
  {
    id: 6,
    title: 'Book Six',
    authorId: 6,
    description: 'A historical fiction novel set in ancient times.',
    price: 17.5,
    cover: 'https://example.com/book-six.jpg',
  },
];

module.exports = { BOOKS, AUTHORS };
