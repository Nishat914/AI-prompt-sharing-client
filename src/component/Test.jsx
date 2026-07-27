"use client";

import { Select, ListBox, Label } from "@heroui/react";

export default function TestPage() {
  return (
    <div className="p-10">
      <Select placeholder="Select one">
        <Select.Trigger>
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>

        <Select.Popover>
          <ListBox>
            <ListBox.Item id="one">One</ListBox.Item>
            <ListBox.Item id="two">Two</ListBox.Item>
          </ListBox>
        </Select.Popover>
      </Select>
       <Select
                    name="category"
                    isRequired
                    placeholder="Select Category"
                  >
      
                    <Label>Category</Label>
      
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
      
                    <Select.Popover>
      
                      <ListBox>
      
                        <ListBox.Item id="Writing" textValue="Writing">
                          Writing
                        </ListBox.Item>
      
                        <ListBox.Item id="Programming" textValue="Programming">
                          Programming
                        </ListBox.Item>
      
                        <ListBox.Item id="Marketing">
                          Marketing
                        </ListBox.Item>
      
                        <ListBox.Item id="Business">
                          Business
                        </ListBox.Item>
      
                        <ListBox.Item id="Education">
                          Education
                        </ListBox.Item>
      
                        <ListBox.Item id="Design">
                          Design
                        </ListBox.Item>
      
                        <ListBox.Item id="Productivity">
                          Productivity
                        </ListBox.Item>
      
                        <ListBox.Item id="Other">
                          Other
                        </ListBox.Item>
      
                      </ListBox>
      
                    </Select.Popover>
      
                  </Select>
    </div>
  );
}