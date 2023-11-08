// // More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
//   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
//   // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
// // More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/ui/button/Button";

const meta: Meta<typeof Button> = {
  title: "Buttons",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    status: "primary",
    label: "Primary",
  },
};

export const Secondary: Story = {
  args: {
    status: "secondary",
    label: "Secondary",
  },
};

export const Tertiary: Story = {
  args: {
    status: "tertiary",
    label: "Tertiary",
  },
};

//add opacity button
