module.exports = {
  Text: [
    { name: 'title' },
    { name: 'body' }
  ],
  'Local url': [
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
  ],
  Remove: [
    {
      name: 'tag',
      message: 'What was the message tag?'
    }
  ]
}
