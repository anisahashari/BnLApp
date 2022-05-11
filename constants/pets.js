const pets = [
  {
    pet: 'BOOK',
    pets: [
      {
        id: '1',
        name: 'Java: Java For Beginners Guide',
        image: require('../assets/cat1.png'),
        type: 'March 15, 2017',
        age: '106 pages',
      },
      {
        id: '2',
        name: 'Harry Potter and the Philosophers Stone',
        image: require('../assets/cat2.png'),
        type: '26 June 1997',
        age: '223 pages',
      },
      {
        id: '3',
        name: 'Jujutsu Kaisen vol.11',
        image: require('../assets/cat3.png'),
        type: 'June 4, 2020',
        age: '192 pages',
      },
    ],
  },
  {
    pet: 'CLOTHES',
    pets: [
      {
        id: '1',
        name: 'Sage Green Sweatshirt',
        image: require('../assets/dog1.png'),
        type: 'Only wear once',
      },
      {
        id: '2',
        name: 'Cargo pants',
        image: require('../assets/dog2.png'),
        type: 'Wear many times',
      },
    ],
  },
  {
    pet: 'money',
    pets: [
      {
        id: '1',
        name: '> RM100',
        image: require('../assets/bird1.png'),
        type: '100 and above',
        age: 'Time limit : 3 years',
      },
      {
        id: '2',
        name: '> RM1',
        image: require('../assets/bird2.png'),
        type: '1 and above',
        age: 'Time limit : 10 years',
      },
    ],
  },
  {
    pet: 'others',
    pets: [
      {
        id: '1',
        name: 'Luggage bag',
        image: require('../assets/bunny1.png'),
        type: 'Bonia',
        age: 'Only wear once',
      },
      {
        id: '2',
        name: 'Tripod',
        image: require('../assets/bunny2.png'),
        type: 'Nikon',
        age: '1 years old',
      },
    ],
  },
];

export default pets;
