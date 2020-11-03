import React from 'react';
import MovieCard from './MovieCard';
import mockReduxStore from '@app/util/mockReduxStore';

export default {
  title: 'Components/MovieCard',
  component: MovieCard,
  decorators: [
    mockReduxStore(),
    Story => (
      <div style={{ backgroundColor: '#1E2129', padding: 50 }}>
        <Story />
      </div>
    ),
  ],
};

const Template = args => <MovieCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: {
    id: 1,
    title: 'Movie 1',
    year: '1919',
    rating: 'G',
    sort: 1,
    poster: 'sample.jpg',
  },
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
  large: true,
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  data: {
    id: 1,
    title: 'Movie With a Very Long Title: Reloaded: Remastered: Refactored',
    year: '1919',
    rating: 'G',
    sort: 1,
    poster: 'sample.jpg',
  },
};
