import { ContainerLayout } from "@/app/shared/components/ContainerLayout";
import Family from "./components/Family";

const FamiliesPage = ({ params }: { params: { familyId: string } }) => {
  return (
    <ContainerLayout title="Dashboard">
      <Family familyId={params.familyId} key={params.familyId} />
    </ContainerLayout>
  );
};

export default FamiliesPage;
