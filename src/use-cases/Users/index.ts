import createUser from "./createUser";
import * as findUser from "./finduser";

export default {
    createUser,
    ...findUser,
};
