export class ActiveUserEntry {
    constructor(public user: any, userToken: string) { }

}
export class AuthenticatedProduserUsersHelper {
    private static users = Object.create(null);


    public static addUser(user: any, token) {
        this.users[user.username] = new ActiveUserEntry(user, token);
    }

    public static removeUser(userName: string) {
        delete users[userName];
    }

    public static getUserEntry(userName): ActiveUserEntry {
        return users[userName];
    }   
}
