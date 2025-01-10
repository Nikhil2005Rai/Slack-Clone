interface WorkspaceIdPageProps {
    params: {
        workspaceId: string;
    }
}

const WorkspaceIdPage = ({ params }: WorkspaceIdPageProps) => {
  return (
    <div>
        Id: {params.workspaceId}
    </div>
  )
}

export default WorkspaceIdPage