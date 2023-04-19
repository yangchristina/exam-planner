import useForageArray from "@/hooks/useForageArray"
import { Subtask, SubtaskSchema } from "@/types/Subtask"

export default function useChecklist() {
    function isValidSubtask(item: unknown): item is Subtask {
        return SubtaskSchema.safeParse(item).success
    }

    const { clear, add, remove, set, items } = useForageArray<Subtask>('tasks', isValidSubtask)

    const toggleSubtaskCompleted = async (index: number, checked: boolean) => {
        set(index, { ...items[index], completed: checked ? 1 : 0 })
    }

    const renameSubtask = async (index: number, name: string) => {
        await set(index, { ...items[index], name })
    }

    const addSubtask = async (name: string) => {
        await add({ name, completed: 0 })
    }

    return {
        toggleSubtaskCompleted,
        removeSubtask: remove,
        renameSubtask,
        addSubtask,
        clear
    }
}

export interface SubtaskHelpers {
    toggleSubtaskCompleted: (id: string, index: number, checked: boolean) => Promise<void>;
    removeSubtask: (id: string, index: number) => Promise<void>;
    renameSubtask: (id: string, index: number, name: string) => Promise<void>;
    addSubtask: (id: string, name: string) => Promise<any>;
}
