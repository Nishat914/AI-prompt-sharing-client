"use client";

import { AlertDialog, Button, FieldError, Input, Label, Modal, Surface, TextArea, TextField, TextFieldContext  , Select, ListBox, Table} from "@heroui/react";

import { FaBoxTissue, FaTrash } from "react-icons/fa";

const AllUsersTable = ({ users }) => {
  return (
    <>
           
            <div className="container mx-auto mt-20 px-4">
                {users.length > 0 ? (
                    <Table variant="secondary">
          <Table.ScrollContainer className="w-full overflow-x-auto">
            <Table.Content aria-label="Team members" className="min-w-150">
              <Table.Header>
                <Table.Column isRowHeader>Name</Table.Column>
                <Table.Column>Image</Table.Column>
                <Table.Column>Role</Table.Column>
                <Table.Column>Plan</Table.Column>
                <Table.Column>Email</Table.Column>
                <Table.Column>Joined</Table.Column>
                <Table.Column>Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                
                {
                     users.map((user) => (
                        <Table.Row key={user._id}>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>
                    <img
                    alt={user.name}
                    className="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
                    loading="lazy"
                    src={user.image}
                  /></Table.Cell>
                  
                  <Table.Cell>{user.role}</Table.Cell>
                 <Table.Cell>{user.plan}</Table.Cell>
                 <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.createdAt}</Table.Cell>
                  <Table.Cell>
    
                             <div className="flex gap-2 ">
                                      
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
                                                // onPress={() => handleDelete(user._id)}
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

export default AllUsersTable;