import { useGetMember } from "@/features/members/api/use-get-member";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { useMemberId } from "@/hooks/use-member-id";
import { Loader } from "lucide-react";
import { MessageList } from "@/components/message-list";
import { Header } from "./header";
import ChatInput from "./chat-input";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { usePanel } from "@/hooks/use-panel";



interface ConversationProps {
    id: Id<"conversations">;
}

export const Conversation = ({ id }: ConversationProps) => {
    const memberId = useMemberId();
    const {data: member, isLoading: memberLoading} = useGetMember({ id: memberId });
    const { results, status, loadMore} = useGetMessages({
        conversationId: id,
    });

    const { onOpenProfile } = usePanel();

    if (memberLoading || status === "LoadingFirstPage") {
        return (
            <div className="h-full flex-1 flex items-center justify-center">
                <Loader className="animate-spin size-5 text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <Header
                memberName={member?.user.name}
                memberImage={member?.user.image}
                onClick={() => onOpenProfile(memberId)}
            />
            <MessageList
                data={results}
                variant="conversation"
                memberName={member?.user.name}
                memberImage={member?.user.image}
                loadMore={loadMore}
                isLoadingMore={status === "LoadingMore"}
                canLoadMore={status === "CanLoadMore"}
            />
            <ChatInput
                placeholder={`Message ${member?.user.name}`}
                conversationId={id}
            /> 
        </div>
    );
};