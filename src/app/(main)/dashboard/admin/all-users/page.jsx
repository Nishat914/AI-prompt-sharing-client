import AllUsersTable from "@/component/admin/AllUsersTable";

export const metadata = {
  title: "APSM | All Users",
};
const AdminAllUsersPage = async() => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/users`,
    {
      cache: "no-store",
    }
  );

  const users = await res.json();
  console.log(users)

  return (
    <div className="space-y-8">
         <div className="text-center mt-10">
                <h2 className="text-3xl font-bold text-[#3D2C24] ">All Users</h2>
                <p className="font-semibold text-[#6F5B50] mt-4">Manage users, update roles and remove accounts.</p>
            </div>

      <AllUsersTable users={users} />

    </div>
  );
};

export default AdminAllUsersPage;