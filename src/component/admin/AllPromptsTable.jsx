"use client";

import { AlertDialog, Button, FieldError, Input, Label, Modal, Surface, TextArea, TextField, TextFieldContext  , Select, ListBox, Table} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiCircleRemove } from "react-icons/ci";

import { FaBoxTissue, FaTrash } from "react-icons/fa";
import { FcApproval } from "react-icons/fc";
import { MdOutlinePreview } from "react-icons/md";

const AllPromptsTable = ({ prompts }) => {
    const router = useRouter();
   
    const handleApprove = async (id) => {
    try {
        const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/prompts/approve/${id}`,
        {
            method: "PATCH",
        }
        );

        const data = await res.json();

        if (data.modifiedCount > 0) {
        toast.success("Prompt approved successfully.");
        router.refresh();
        }
    } catch (error) {
        console.log(error);
        toast.error("Failed to approve prompt.");
    }
    };
    
const handleReject = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/prompts/reject/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedback: "Your prompt does not meet our platform guidelines.",
        }),
      }
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      toast.success("Prompt rejected successfully.");
      router.refresh();
    }
  } catch (error) {
    toast.error("Failed to reject prompt.");
  }
};
    const handleFeature = async (id) => {
    try {
        const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/prompts/feature/${id}`,
        {
            method: "PATCH",
        }
        );

        const data = await res.json();

        if (data.modifiedCount > 0) {
        toast.success("Featured status updated.");
        router.refresh();
        }
    } catch (error) {
        console.log(error);
        toast.error("Failed to update featured status.");
    }
    };
    const handleDelete = async (id) => {
    try {
        const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/prompts/${id}`,
        {
            method: "DELETE",
        }
        );

        const data = await res.json();

        if (data.deletedCount > 0) {
        toast.success("Prompt deleted successfully.");
        router.refresh();
        }
    } catch (error) {
        console.log(error);
        toast.error("Failed to delete prompt.");
    }
    };
      
  return (
    <>
           
            <div className="container mx-auto mt-20 px-4">
            {prompts.length > 0 ? (
                    <Table variant="secondary">
          <Table.ScrollContainer className="w-full overflow-x-auto">
            <Table.Content aria-label="Team members" className="min-w-150">
              <Table.Header>
                <Table.Column isRowHeader>Tile</Table.Column>
                <Table.Column>Creator</Table.Column>
                <Table.Column>AI Tool</Table.Column>
                <Table.Column>Visibility</Table.Column>
                <Table.Column>Featured</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                
                {
                     prompts.map((prompt) => (
                        <Table.Row key={prompt._id}>
                  <Table.Cell>{prompt.title}</Table.Cell>
                
                 <Table.Cell>
                    <div>
                        <p>{prompt.creatorName}</p>
                        <p>{prompt.creatorEmail}</p>
                    </div>
                </Table.Cell>
                 <Table.Cell><span className="bg-purple-100 text-purple-900">{prompt.aiTool}</span></Table.Cell>
                  <Table.Cell>
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        prompt.visibility === "Public"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                    >
                        {prompt.visibility}
                    </span>
                    </Table.Cell>
                  <Table.Cell>
                    <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                        prompt.featured
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                    >
                        {prompt.featured ? "Featured" : "Not Featured"}
                    </span>
                    </Table.Cell>
                  <Table.Cell>
                        <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            prompt.status === "approved"
                                ? "bg-green-100 text-green-700"
                                : prompt.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                        >
                            {prompt.status}
                        </span>
                    </Table.Cell>
                  <Table.Cell>
    
                             <div className="flex gap-2 ">
                               {prompt.status === "pending" && (
                            <>
                                {/* Approve */}
                                <Button
                                isIconOnly
                                className="bg-green-200 hover:bg-green-300 text-white"
                                onPress={() => handleApprove(prompt._id)}
                                >
                                <FcApproval className="text-xl" />
                                </Button>

                                {/* Reject */}
                                <Button
                                isIconOnly
                                className="bg-red-200 hover:bg-red-300 text-white"
                                onPress={() => handleReject(prompt._id)}
                                >
                                <CiCircleRemove className="text-xl" />
                                </Button>
                            </>
                            )}

                            {prompt.status === "approved" && (
                            <>
                                {/* Feature */}
                                <Button
                                className={
                                    prompt.featured
                                    ? "bg-amber-200 hover:bg-amber-300 text-white"
                                    : "bg-indigo-200 hover:bg-indigo-300 text-white"
                                }
                                onPress={() => handleFeature(prompt._id)}
                                >
                                {prompt.featured ? "⭐" : "✨"}
                                </Button>

                                {/* Reject */}
                                <Button
                                isIconOnly
                                className="bg-red-200 hover:bg-red-300 text-white"
                                onPress={() => handleReject(prompt._id)}
                                >
                                <CiCircleRemove className="text-xl" />
                                </Button>
                            </>
                            )}

                            {prompt.status === "rejected" && (
                            <Button
                                isIconOnly
                                className="bg-green-200 hover:bg-green-300 text-white"
                                onPress={() => handleApprove(prompt._id)}
                            >
                                <FcApproval className="text-xl" />
                            </Button>
                            )}

                                <Link href={`/prompt-details/${prompt._id}`}>
                                <Button
                                className="p-2 rounded-full bg-[#ad8a6e]  hover:bg-[#ceb098] "
                                >
                                    <MdOutlinePreview className="text-white"/>
                                </Button>
                                
                              </Link> 
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
                        <p className="text-slate-200 text-lg">No Prompts yet!!</p>
                    </div>
                )
            }
          
            </div>

          
        </>
  );
};

export default AllPromptsTable;