import AllPromptsTable from "@/component/admin/AllPromptsTable";


export const metadata = {
  title: "APSM | All Prompts",
};
const AdminAllUsersPage = async() => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/prompts`,
    {
      cache: "no-store",
    }
  );

  const prompts = await res.json();
  console.log(prompts)

  return (
    <div className="space-y-8">
         <div className="text-center mt-10">
                <h2 className="text-3xl font-bold text-[#3D2C24] ">All Prompts</h2>
                <p className="font-semibold text-[#6F5B50] mt-4">Manage , update   and remove prompts</p>
            </div>

      <AllPromptsTable  prompts={prompts} />

    </div>
  );
};

export default AdminAllUsersPage;