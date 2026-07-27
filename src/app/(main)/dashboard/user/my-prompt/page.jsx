"use client";


import { authClient } from "@/lib/auth-client";
import { imageUploader } from "@/lib/imageUploader";
import { AlertDialog, Button, FieldError, Input, Label, Modal, Surface, TextArea, TextField, TextFieldContext  , Select, ListBox, Table} from "@heroui/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
import { FaBoxTissue, FaEdit, FaTrash } from "react-icons/fa";


const MyPromptPage = () => {
  useEffect(() => {
    document.title = "APSM | My-prompt";
  }, []);

  const { data: session } = authClient.useSession();
  const [prompts, setPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  
  console.log(session.user.email)

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-prompt/${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data,'useeffect');
         setPrompts(data)
        }
            );
        
    }
  }, [session]);
  
  const handleDelete = async (id) => {
  try {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/prompts/${id}`, {
      method: "DELETE",
      
    });

    const data = await res.json();

    if (res.ok) {
      setPrompts(prompts.filter((prompt) => prompt._id !== id));
    }
    toast.success("deleted successfully!")
  } catch (error) {
  toast.error(error?.message || "Update failed");
}
};
    const handleUpdate = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  const updatedPrompt = Object.fromEntries(formData.entries());
  let imageUrl = selectedPrompt.image;

        if (updatedPrompt.image?.size > 0) {
        const uploaded = await imageUploader(updatedPrompt.image);
        imageUrl = uploaded.url;
        }

        const updatedPromptt = {
        ...updatedPrompt,
        image: imageUrl,
        };

  try {
    
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/prompts/${selectedPrompt._id}`,
      {
        method: "PATCH",
        headers: {
        "content-type": "application/json",
        
      },
        body: JSON.stringify(updatedPromptt),
      }
    );

    const data = await res.json();

    if (res.ok) {
      setPrompts(
        prompts.map((prompt) =>
          prompt._id === selectedPrompt._id ? { ...prompt, ...updatedPromptt } : prompt
        )
        
      );
      toast.success("updated successfully!")
    }
  } catch (error) {
  toast.error(error?.message || "Update failed");
}
};

  return (
    <>
        <div className="text-center mt-10">
            <h2 className="text-3xl font-bold text-[#3D2C24] ">My Ideas</h2>
            <p className="font-semibold text-[#6F5B50] mt-4">A space where all my shared prompts, creativity, and inspirations come together</p>
        </div>
        <div className="container mx-auto  mt-20">
            {prompts.length > 0 ? (
                <Table variant="secondary">
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="min-w-150">
          <Table.Header>
            <Table.Column isRowHeader>Name</Table.Column>
            <Table.Column>Image</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Category</Table.Column>
            <Table.Column>AI Tool</Table.Column>
            <Table.Column>Email</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            
            {
                 prompts.map((prompt) => (
                    <Table.Row key={prompt._id}>
              <Table.Cell>{prompt.title}</Table.Cell>
              <Table.Cell>
                <img
                alt={prompt.title}
                className="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
                loading="lazy"
                src={prompt.image}
              /></Table.Cell>
              
              <Table.Cell>{prompt.status}</Table.Cell>
             <Table.Cell>{prompt.category}</Table.Cell>
             <Table.Cell>{prompt.aiTool}</Table.Cell>
              <Table.Cell>{prompt.creatorEmail}</Table.Cell>
              <Table.Cell>

                         <div className="flex gap-2 ">
                                {/* Edit */}
                                <Modal>

                                    <Button
                                        onPress={() => setSelectedPrompt(prompt)}
                                        className="p-2 rounded-full bg-[#ad8a6e]  hover:bg-[#ceb098] "
                                    >
                                        <FaEdit className="text-white" />
                                    </Button>

                                <Modal.Backdrop>
                                    <Modal.Container placement="auto">
                                    <Modal.Dialog className="sm:max-w-xl">
                                        <Modal.CloseTrigger />
                                        <Modal.Header>
                                        <Modal.Heading>Edit My Prompts</Modal.Heading>
                                        </Modal.Header>
                                        <Modal.Body className="p-6">
                                        <Surface variant="default">
                                            <form onSubmit={handleUpdate} className="p-6 space-y-5">
                                            <TextField
                                                name="title"
                                                defaultValue={selectedPrompt?.title}
                                                isRequired
                                            >
                                                <Label>Title</Label>
                                                <Input className={"w-full bg-mauve-200 text-mauve-700"}/>
                                            </TextField>

                                            <TextField
                                                name="description"
                                                defaultValue={selectedPrompt?.description}
                                                isRequired
                                                
                                            >
                                                <Label>Description</Label>
                                                <TextArea />
                                            </TextField>

                                            <TextField
                                                name="tags"
                                                defaultValue={selectedPrompt?.tags}
                                                isRequired
                                            >
                                                <Label>Tags</Label>
                                                <Input className={"w-full bg-mauve-200 text-mauve-700"}/>
                                            </TextField>

                                            <TextField
                                                name="content"
                                                defaultValue={selectedPrompt?.content}
                                                isRequired
                                            >
                                                <Label>Prompt content</Label>
                                                <TextArea />
                                            </TextField>
                                            <Select
                                            name="category"
                                            defaultSelectedKeys={[selectedPrompt?.category]}
                                            isRequired
                                            placeholder="Select Category"
                                            >

                                            {/* <Label>Category</Label> */}

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

                                            <Select
                                                          name="aiTool"
                                                          defaultSelectedKeys={[selectedPrompt?.aiTool]}
                                                          isRequired
                                                          placeholder="Select AI Tool"
                                                        >
                                            
                                                          {/* <Label>AI Tool</Label> */}
                                            
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

                                            <Button type="submit" slot="close" className={"w-full bg-[#5e4c3d]"}>
                                                Update Idea
                                            </Button>
                                            </form>
                                        </Surface>
                                        </Modal.Body>
                                    </Modal.Dialog>
                                    </Modal.Container>
                                </Modal.Backdrop>
                                </Modal>
                                            
                                {/* Delete */}
                                <AlertDialog>
                                  <Button className="p-2 rounded-full bg-[#ad8a6e] hover:bg-[#ceb098]">
                                    <FaTrash className="text-white" />
                                  </Button>
                
                                  <AlertDialog.Backdrop>
                                    <AlertDialog.Container>
                                      <AlertDialog.Dialog className="sm:max-w-100">
                                        <AlertDialog.CloseTrigger />
                
                                        <AlertDialog.Header>
                                          <AlertDialog.Icon status="danger" />
                                          <AlertDialog.Heading>
                                            Delete comment permanently?
                                          </AlertDialog.Heading>
                                        </AlertDialog.Header>
                
                                        <AlertDialog.Body>
                                          <p>
                                            This will permanently delete this comment. This
                                            action cannot be undone.
                                          </p>
                                        </AlertDialog.Body>
                
                                        <AlertDialog.Footer>
                                          <Button slot="close" variant="tertiary">
                                            Cancel
                                          </Button>
                
                                          <Button
                                            onPress={() => handleDelete(prompt._id)}
                                            slot="close"
                                            className="bg-[#5f5044] text-white"
                                          >
                                            Delete
                                          </Button>
                                        </AlertDialog.Footer>
                                      </AlertDialog.Dialog>
                                    </AlertDialog.Container>
                                  </AlertDialog.Backdrop>
                                </AlertDialog>
                              </div>

              </Table.Cell>
            </Table.Row>
        
      ))
            }
            
           
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
            )
             : (
                 <div className=" text-center py-8 bg-linear-to-t from-[#f3ece6]  to-[#f5e5d8] rounded-2xl flex justify-center items-center flex-col gap-4">
                                <FaBoxTissue  className="text-4xl text-white" />
                                <p className="text-slate-200 text-lg">No Ideas yet!!</p>
                              </div>
            )
        }
      
        </div>
        
    </>
    
  );
};

export default MyPromptPage;