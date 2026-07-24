"use client";

import {
  Button,
  Card,
  FieldError,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import { TypeAnimation } from "react-type-animation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { imageUploader } from "@/lib/imageUploader";

const UserAddPromptPage = () => {
  useEffect(() => {
    document.title = "AI-PSMP | Add Prompt";
  }, []);

  const { data: session, isPending } = authClient.useSession();
    console.log(session, "session");
     console.log(isPending);

    const router = useRouter()

  const onSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const prompts = Object.fromEntries(formData.entries());

  console.log(prompts);

  const image = await imageUploader(prompts.image)
  console.log(image)

  const promptData = {
    ...prompts,
    image: image.url,
    creatorId: session.user.id,
    creatorEmail: session.user.email,
    creatorName: session.user.name,
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/prompts`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(promptData),
      }
    );

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      toast.success("Prompt submitted successfully!");

      e.target.reset();

      setTimeout(() => {
        router.push("/dashboard/user/my-prompt");
      }, 1000);
    } else {
      toast.error(data.message || "Failed to submit prompt!");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};

  return (
    <div className="container mx-auto w-[90%] md:w-[80%] lg:w-[65%] py-10">
      {/* Heading */}

      <div className="text-center mb-8">
        <TypeAnimation
          sequence={[
            "Share Your AI Prompt",
            2000,
            "Help Others Build Faster",
            2000,
            "Publish Your Best Prompt",
            2000,
          ]}
          wrapper="h1"
          speed={50}
          repeat={Infinity}
          className="text-3xl md:text-4xl font-bold text-[#C86B43]"
        />

        <p className="text-[#6F5B50] mt-3">
          Submit your prompt for review. Once approved, it will appear in the
          marketplace.
        </p>
      </div>

      <Card className="shadow-lg p-8">

        <form
          onSubmit={onSubmit}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Prompt Title */}

            <div className="md:col-span-2">

              <TextField
                name="title"
                isRequired
              >
                <Label>Prompt Title</Label>

                <Input
                  placeholder="Enter prompt title"
                />

                <FieldError />

              </TextField>

            </div>

            {/* Description */}

            <div className="md:col-span-2">

              <TextField
                name="description"
                isRequired
              >
                <Label>Prompt Description</Label>

                <TextArea
                  placeholder="Write a short description..."
                  className="min-h-28"
                />

                <FieldError />

              </TextField>

            </div>

            {/* Prompt Content */}

            <div className="md:col-span-2">

              <TextField
                name="content"
                isRequired
              >
                <Label>Prompt Content</Label>

                <TextArea
                  placeholder="Write your complete AI prompt..."
                  className="min-h-44"
                />

                <FieldError />

              </TextField>

            </div>

            {/* Category */}

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

                  <ListBox.Item id="Writing">
                    Writing
                  </ListBox.Item>

                  <ListBox.Item id="Programming">
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

            {/* AI Tool */}

            <Select
              name="aiTool"
              isRequired
              placeholder="Select AI Tool"
            >

              <Label>AI Tool</Label>

              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>

                <ListBox>

                  <ListBox.Item id="ChatGPT">
                    ChatGPT
                  </ListBox.Item>

                  <ListBox.Item id="Gemini">
                    Gemini
                  </ListBox.Item>

                  <ListBox.Item id="Claude">
                    Claude
                  </ListBox.Item>

                  <ListBox.Item id="DeepSeek">
                    DeepSeek
                  </ListBox.Item>

                  <ListBox.Item id="Midjourney">
                    Midjourney
                  </ListBox.Item>

                  <ListBox.Item id="DALL-E">
                    DALL-E
                  </ListBox.Item>

                  <ListBox.Item id="Other">
                    Other
                  </ListBox.Item>

                </ListBox>

              </Select.Popover>

            </Select>

            {/* Tags */}

            <TextField
              name="tags"
              isRequired
            >
              <Label>Tags</Label>

              <Input
                placeholder="react,nextjs,chatgpt"
              />

              <FieldError />

            </TextField>

            {/* Difficulty */}

            <Select
              name="difficulty"
              defaultSelectedKey="Beginner"
            >

              <Label>Difficulty Level</Label>

              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>

                <ListBox>

                  <ListBox.Item id="Beginner">
                    Beginner
                  </ListBox.Item>

                  <ListBox.Item id="Intermediate">
                    Intermediate
                  </ListBox.Item>

                  <ListBox.Item id="Pro">
                    Pro
                  </ListBox.Item>

                </ListBox>

              </Select.Popover>

            </Select>

            {/* Thumbnail */}

            <div className="md:col-span-2">

              <TextField
                name="image"
                isRequired
              >
                <Label>Thumbnail URL</Label>

                <input
                  type="file"
                  name="image"
                  placeholder="https://example.com/image.png"
                />

                <FieldError />

              </TextField>

            </div>

            {/* Visibility */}

            <Select
              name="visibility"
              defaultSelectedKey="Public"
            >

              <Label>Visibility</Label>

              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>

                <ListBox>

                  <ListBox.Item id="Public">
                    Public
                  </ListBox.Item>

                  <ListBox.Item id="Private">
                    Private
                  </ListBox.Item>

                </ListBox>

              </Select.Popover>

            </Select>

          </div>

          <Button
            type="submit"
            className="w-full bg-[#C86B43] hover:bg-[#B65A35] text-white h-12 text-lg"
          >
            Submit Prompt
          </Button>

        </form>

      </Card>

    </div>
  );
};

export default UserAddPromptPage;