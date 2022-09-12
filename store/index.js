export const state = () => ({
    counter: 0,
    todoList: [
        "string"
    ]
})

export const mutations = {
    add(state) {
        state.counter += 1;
    },
    min(state) {
        state.counter -= 1;
    }
}