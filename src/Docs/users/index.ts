import CreateUser from "./createUser";
import GetAllUsers from "./getallUser";
import GetOneUser from "./getoneUser";
import UpdateUser from "./updateUser";
import DeleteUser from "./deleteUser";
import LoginUser from "./loginUser";

export default {
    paths: {
        '/api/user/signup': {
            ...CreateUser,
        },
        '/api/user/all': {
            ...GetAllUsers,
        },
        '/api/user/{id}': {
            ...GetOneUser,
            ...UpdateUser,
            ...DeleteUser,
        },
        '/api/user/login': {
            ...LoginUser,
        },
    },
};
