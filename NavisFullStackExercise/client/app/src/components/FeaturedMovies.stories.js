import React from 'react';
import FeaturedMovies from './FeaturedMovies';
import mockReduxStore from '@app/util/mockReduxStore';

export default {
  title: 'Components/FeaturedMovies',
  component: FeaturedMovies,
  decorators: [
    Story => (
      <div style={{ backgroundColor: '#1E2129' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = args => <FeaturedMovies {...args} />;

export const Empty = Template.bind({});
Empty.decorators = [
  mockReduxStore({
    app: {
      featuredMovies: [],
    },
  }),
];

export const WithMovies = Template.bind({});
WithMovies.decorators = [
  mockReduxStore({
    app: {
      featuredMovies: [
        {
          id: 1,
          title: 'Movie 1',
          year: '1919',
          rating: 'G',
          sort: 1,
          poster: 'sample.jpg',
        },
        {
          id: 2,
          title: 'Movie 2',
          year: '2020',
          rating: 'R',
          sort: 2,
          poster: 'sample.jpg',
        },
        {
          id: 3,
          title: 'Movie 3',
          year: '2050',
          rating: 'Z',
          sort: 3,
          poster: 'sample.jpg',
        },
      ],
    },
  }),
];
