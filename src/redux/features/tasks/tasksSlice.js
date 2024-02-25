import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [
        {
            id: 1,
            status: 'pending',
            title: 'Remove Button',
            description:
                'We need a remove button in our task card. Meke the button red and use Heroicon for tashbin icon.',
            date: '2023-08-28',
            assignedTo: 'Mir Hussain',
            priority: 'high',
        },
    ],
}
const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {
        addTask: (state, { payload }) => {
            if (state.tasks.length === 0) {
                state.tasks.push({ id: 1, status: 'pending', ...payload });
            }
            else { //.at(-1): This attempts to retrieve the element at the last index of the tasks array. The negative index -1 indicates counting from the end of the array. However, there's an important point to note: the .at() method does not modify the original array; it returns the element at the specified index without changing the array itself.
                const lastElement = state.tasks.at(-1);
                state.tasks.push({
                    id: lastElement.id + 1,
                    status: 'pending',
                    ...payload
                });
            }
        },
        removeTask: (state, payload) => {
            state.tasks.filter((item) => item.id !== payload);
        }
    },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;