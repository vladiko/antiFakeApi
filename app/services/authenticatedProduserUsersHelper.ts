export class ActiveUserEntry {
    constructor(public user: any, public userToken: string, public logoutTime: Date) { }

}
export class AuthenticatedProduserUsersHelper {
    private static users = Object.create(null);
    public static tokenTimeout = 20;


    public static addUser(user: any, token) {
        var timeoutMinutesLater = new Date();
        timeoutMinutesLater.setMinutes(timeoutMinutesLater.getMinutes() + AuthenticatedProduserUsersHelper.tokenTimeout);
        this.users[user.username] = new ActiveUserEntry(user, token, timeoutMinutesLater);
    }

    public static removeUser(userName: string) {
        delete AuthenticatedProduserUsersHelper.users[userName];
    }

    public static getUserEntry(userName): ActiveUserEntry {
        return AuthenticatedProduserUsersHelper.users[userName];
    }

    public static updateActiveTokens() {
        var keys = Object.keys(AuthenticatedProduserUsersHelper.users);
        var keysToRemove: string[] = [];
        var now = Date.now;
        for (var ind = 0; ind < keys.length; ind++) {
            if (AuthenticatedProduserUsersHelper.users[keys[ind]].logoutTime < now) {
                keysToRemove.push(keys[ind]);
            }
        }
        for (var ind = 0; ind < keysToRemove.length; ind++) {
            delete AuthenticatedProduserUsersHelper.users[keysToRemove[ind]];
        }

    }
}
