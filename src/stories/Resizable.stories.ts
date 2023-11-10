import type { Meta, StoryObj } from '@storybook/react';
import Resizable from "../components/ui/Resizable";

const meta: Meta<typeof Resizable> = {
    title: 'Resizable',
    component: Resizable,
    tags: ['autodocs'],
  };
  
export default meta;
  
type Story = StoryObj<typeof Resizable>;

// export const Template: Story{

// }

export const VerticalResize: Story = {
  args: {
   direction: "vertical",
   
  },
};