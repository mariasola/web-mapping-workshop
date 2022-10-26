import { Story } from '@storybook/react/types-6-0';

const StoryMap = {
  title: 'Exercises/Geojson/Lines',
  argTypes: {},
};

export default StoryMap;

const Template: Story = () => {
  return (
    <div className="relative w-full h-screen">
      Draw a geojson linestring collection, center the map on it and color it with this
      <ul>
        <li>color: base on an attribute number [...COLOR_RAMP]</li>
        <li>border: #000000</li>
        <li>opacity: 0.5</li>
      </ul>
    </div>
  );
};

export const Lines02 = Template.bind({});
Lines02.args = {};
