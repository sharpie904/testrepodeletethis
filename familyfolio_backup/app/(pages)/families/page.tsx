import FamilyContainer from "@/app/(pages)/families/components/FamilyContainer";
import {ContainerLayout} from "@/app/shared/components/ContainerLayout";

const FamiliesPage = () => {
    return (
        <ContainerLayout title="Dashboard">
            <FamilyContainer/>
        </ContainerLayout>
    )
}

export default FamiliesPage