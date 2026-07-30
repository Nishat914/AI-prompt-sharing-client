
import ReportedPrompts from "@/component/admin/ReportedPrompts";

export const metadata = {
  title: "APSM | reported prompts",
};
const AdminReportedPromptsPage = async() => {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/reports`,
    {
      cache: "no-store",
    }
  );

  const reports = await res.json();
  console.log(reports)

  return (
    <div className="space-y-8">
         <div className="text-center mt-10">
                <h2 className="text-3xl font-bold text-[#3D2C24] ">Reported Prompts</h2>
                <p className="font-semibold text-[#6F5B50] mt-4">All prompts which are reported by user</p>
            </div>

      <ReportedPrompts reports={reports} />

    </div>
  );
};

export default AdminReportedPromptsPage;