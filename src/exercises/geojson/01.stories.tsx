import { Story } from '@storybook/react/types-6-0';

const StoryMap = {
  title: 'Exercises/Geojson',
  argTypes: {},
};

export default StoryMap;

const Template: Story = () => {
  return (
    <div className="relative w-full h-screen">
      Draw a geojson polygon with this
      <code className="block">
        {`
        fill: #ffCC00
        stroke: #000000
        `}
      </code>
    </div>
  );
};

export const G01 = Template.bind({});
G01.args = {};
