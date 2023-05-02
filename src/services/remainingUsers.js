/** Since this function is being used in multiple components (currently 2), I have decided to split it into a module */

export const getAllRemainingUsers = (allUsers, selectedUser) => {
    /** Below algorithm returning all the user objects that doesn't match the name of current user object as an array. */
    return allUsers?.filter(user => user.name !== selectedUser?.name)
}