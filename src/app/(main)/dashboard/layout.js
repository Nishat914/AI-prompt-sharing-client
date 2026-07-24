
import ClientLayout from "@/component/dashboard/ClientLayout";


export default function RootLayout({ children }) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}