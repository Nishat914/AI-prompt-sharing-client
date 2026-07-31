import AllPaymentTable from "@/component/admin/AllPaymentTable";


export const metadata = {
  title: "APSM | All Payments",
};
const AdminAllPaymentsPage = async() => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/payments`,
    {
      cache: "no-store",
    }
  );

  const payments = await res.json();
  console.log(payments,"payment")

  return (
    <div className="space-y-8">
         <div className="text-center mt-10">
                <h2 className="text-3xl font-bold text-[#3D2C24] ">All Payments</h2>
                <p className="font-semibold text-[#6F5B50] mt-4">Monitor payment history and subscription transactions.</p>
            </div>

      <AllPaymentTable payments={payments} />

    </div>
  );
};

export default AdminAllPaymentsPage;