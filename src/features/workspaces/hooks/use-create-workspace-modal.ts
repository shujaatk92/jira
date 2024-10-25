import { useQueryState, parseAsBoolean } from "nuqs";

export const useCreateWorkspaceModal = () => {
    const [isOpen, setIsopen] = useQueryState(
        "create-workspace", 
        parseAsBoolean.withDefault(false).withOptions({clearOnDefault: true}));

        const open = () => setIsopen(true);
        const close = () => setIsopen(false);

        return {
            isOpen,
            open,
            close,
            setIsopen,
        };
};
