import { Story } from '@storybook/react/types-6-0';

import Map from 'components/map';

const StoryMap = {
  title: 'Exercises/Vector Tiles/Mapbox',
  component: Map,
  argTypes: {},
};

export default StoryMap;

const Template: Story = () => {
  return (
    <div className="relative w-full h-screen">
      Draw a tiles layer, center it on the map and display them as
      <ul>
        {/* <li>Circles</li>
        <li>color: #ffCC00</li>
        <li>border: #000000</li>
        <li>radius: 20</li>
        <li>opacity: 0.5</li> */}
      </ul>
    </div>
  );
};

export const Mapbox01 = Template.bind({});
Mapbox01.args = {};
