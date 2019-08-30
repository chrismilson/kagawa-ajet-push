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
    },
    {
      when: ({ url }) => url.match(/^\/calendar/),
      name: 'url',
      message: 'Date or event? YYYY-M-D or "event"',
      transformer: answer => answer.match(/event/) ? 'Event' : answer,
      filter: answer => '/calendar/' + answer
    },
    {
      when: ({ url }) => url.match(/^\/calendar\/event/),
      name: 'url',
      message: 'Paste the event id here:',
      filter: answer => '/calendar/event/' + answer
    }
  ],
  Remove: [
    {
      name: 'tag',
      message: 'What was the message tag?'
    }
  ]
}
