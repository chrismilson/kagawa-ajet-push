module.exports = {
  text: [
    { name: 'title' },
    { name: 'body' }
  ],
  'local url': [
    { name: 'title' },
    { name: 'body' },
    {
      type: 'list',
      name: 'url',
      choices: [
        {
          name: 'Home',
          value: '/'
        },
        {
          name: 'Calendar',
          value: '/calendar'
        },
        {
          name: 'Destinations',
          value: '/destinations'
        },
        {
          name: 'Resources',
          value: '/resources'
        }
      ],
      default: 'Home'
    }
  ]

}
