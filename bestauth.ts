// © 2024 - BestDeveloper - BestMat, Inc. - All rights reserved.
import fetch from "node-fetch";

export type Auth = {
    getUsers: Function,
    validateUser: Function,
    user: string
};

export function Authentication(config: { username: string, password: string, api_key: string }) {
    var username: string = config.username;
    var password: string = config.password;
    var api_key: string = config.api_key;

    return {
        getUsers: async function(users: undefined = undefined) {
            var response = await fetch("http://localhost:3000/auth-users");
            var data: any = await response.json();

            if (users != undefined && typeof users == "number") return (data[username].users).slice(0, users);
            return data[username].users;
        },
        createUser: async function(config) {
            var response = await fetch(`http://localhost:3000/auth-create-user?email=${config.email}&password=${config.password}&user=${username}`);
            var data: any = await response.text();

            if (data == "Success!") return 200;
        },
        validateUser: async function(config) {
            var response =  await fetch("http://localhost:3000/auth-users");
            var data: any = await response.json();

            if (data[username].passwords[data[username].users.indexOf(config.email)] == config.password) {
                return 200;
            } else {
                return 404;
            }
        },
        user: username
    };
}
