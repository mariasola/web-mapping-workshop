import { Story } from '@storybook/react/types-6-0';

const StoryMap = {
  title: 'Exercises/Geojson/Lines',
  argTypes: {},
};

export default StoryMap;

const Template: Story = () => {
  return (
    <div className="relative w-full h-screen">
      Draw a geojson linestring collection, center it on the map and display them as
      <ul>
        <li>Lines</li>
        <li>color: #ffCC00</li>
        <li>width: 5</li>
        <li>opacity: 0.5</li>
      </ul>
    </div>
  );
};

export const Lines01 = Template.bind({});
Lines01.args = {};
