"use client";

import { AlertDialog, Button, FieldError, Input, Label, Modal, Surface, TextArea, TextField, TextFieldContext  , Select, ListBox, Table} from "@heroui/react";



const AllPaymentTable = ({ payments }) => {
    
  return (
    <>
           
            <div className="container mx-auto mt-20 px-4">
            {payments.length > 0 ? (
                    <Table variant="secondary">
          <Table.ScrollContainer className="w-full overflow-x-auto">
            <Table.Content aria-label="Team members" className="min-w-150">
              <Table.Header>
                <Table.Column isRowHeader>Name</Table.Column>
                <Table.Column>Email</Table.Column>
                <Table.Column>Plan</Table.Column>
                <Table.Column>Session</Table.Column>
                <Table.Column>Payment Date</Table.Column>
              </Table.Header>
              <Table.Body>
                
                {
                     payments.map((payment) => (
                        <Table.Row key={payment._id}>
                  <Table.Cell>{payment.user?.name}</Table.Cell>
                  
                 <Table.Cell>{payment.user?.email}</Table.Cell>
                 <Table.Cell>{payment.user?.plan}</Table.Cell>
                  <Table.Cell>{payment.session_id.slice(0, 20)}...</Table.Cell>
                  <Table.Cell>
                    {payment.paymentDate}
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
                                    <p className="text-slate-200 text-lg">No Paymets yet!!</p>
                                  </div>
                )
            }
          
            </div>
            
        </>
  );
};

export default AllPaymentTable;