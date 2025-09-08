import {ReactNode} from "react";

interface Props {
    role: string | null,
    children: ReactNode,
    memberClassName?: string
    adminClassName?: string
    ownerClassName?: string
}

const RoleGuard = ({children, adminClassName, memberClassName, role, ownerClassName}: Props) => {
    switch (role) {
        case "admin":
            return <div className={adminClassName}>{children}</div>
        case "member":
            return <div className={memberClassName}>{children}</div>
        case "owner":
            return <div className={ownerClassName}>{children}</div>
        default:
            return <div className={""}>{children}</div>
    }
}

export default RoleGuard;