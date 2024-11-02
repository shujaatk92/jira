import { useQueryState, parseAsBoolean } from "nuqs";

export const useCreateProjectModal = () => {
    const [isOpen, setIsopen] = useQueryState(
        "create-project", 
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
