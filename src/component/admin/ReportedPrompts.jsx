"use client";

import { AlertDialog, Button, FieldError, Input, Label, Modal, Surface, TextArea, TextField, TextFieldContext  , Select, ListBox, Table} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { FaBoxTissue, FaTrash } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";
import { MdOutlineDoDisturbOn, MdOutlinePreview } from "react-icons/md";

const ReportedPrompts = ({ reports , id}) => {
    const router = useRouter();
    console.log(reports)
    const handleRemove = async (id) => {
    try {
        const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/reports/remove/${id}`,
        {
            method: "DELETE",
        }
        );

        const data = await res.json();

        if (data.deletedCount > 0) {
        toast.success("Prompt removed successfully.");
        router.refresh();
        } else {
        toast.error("Prompt could not be removed.");
        }
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong.");
    }
    };
    const handleWarn = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/reports/warn/${id}`,
      {
        method: "PATCH",
      }
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      toast.success("Creator has been warned.");
      router.refresh();
    } else {
      toast.error("Failed to warn creator.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
  }
};
const handleDismiss = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/reports/dismiss/${id}`,
      {
        method: "PATCH",
      }
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      toast.success("Report dismissed successfully.");
      router.refresh();
    } else {
      toast.error("Failed to dismiss report.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong.");
  }
};
        
  return (
    <>
           
            <div className="container mx-auto mt-20 px-4">
            {reports.length > 0 ? (
                    <Table variant="secondary">
          <Table.ScrollContainer className="w-full overflow-x-auto">
            <Table.Content aria-label="Team members" className="min-w-150">
              <Table.Header>
                <Table.Column isRowHeader>Prompt</Table.Column>
                <Table.Column>Reported By</Table.Column>
                <Table.Column>Reason</Table.Column>
                <Table.Column>Status</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                
                {
                     reports.map((report) => (
                        <Table.Row key={report._id}>
                    <Table.Cell>{report.promptTitle}</Table.Cell>
        
                    <Table.Cell>{report.userEmail}</Table.Cell>
                    <Table.Cell>{report.reason}</Table.Cell>
                    <Table.Cell>{report.status}</Table.Cell>
                  <Table.Cell>
    
                             <div className="flex gap-2 ">
                                <Button onPress={() => handleWarn(report._id)} 
                                className="p-2 rounded-full bg-[#ad8a6e] hover:bg-[#ceb098]">
                                        <IoIosAlert className="text-white" />
                                </Button>
                                <Button onPress={() => handleDismiss(report._id)} 
                                      className="p-2 rounded-full bg-[#ad8a6e] hover:bg-[#ceb098]">
                                        <MdOutlineDoDisturbOn className="text-white" />
                                </Button>
                                    {/* <Link href={`/prompt-details/${report.promptId}`}>
                                        <Button className="p-2 rounded-full bg-[#ad8a6e]  hover:bg-[#ceb098] ">
                                            <MdOutlinePreview className="text-white" />
                                        </Button>
                                    </Link>  */}
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
                                                onPress={() => handleRemove(report._id)}
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
                                    <p className="text-slate-200 text-lg">No Users yet!!</p>
                                  </div>
                )
            }
          
            </div>
            
        </>
  );
};

export default ReportedPrompts;