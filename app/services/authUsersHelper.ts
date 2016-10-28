export class ActiveUserEntry {
    constructor(public user: any, public userToken: string, public logoutTime: Date) { }
}

export enum UserAuthorizationRoles {
    SUPER_USER = 100,
    USERS_ADMIN = 90,
    PRODUCERS_ADMIN = 80,
    PRODUCERS_KEY_CREATOR = 70
}

export class AuthUsersHelper {
    private users
    public tokenTimeout = 20;
    public checkInterval = 60000;

    private getUserTimeoutTime(): Date {
        var timeoutMinutesLater = new Date();
        timeoutMinutesLater.setMinutes(timeoutMinutesLater.getMinutes() + this.tokenTimeout);
        return timeoutMinutesLater;
    }

    public addUser(user: any, token) {
        this.users[user.username] = new ActiveUserEntry(user, token, this.getUserTimeoutTime());
    }

    public removeUser(userName: string) {
        delete this.users[userName];
    }

    public getUserEntry(userName: string, updateTimeout: boolean = true): ActiveUserEntry {
        var retEntry: ActiveUserEntry = this.users[userName];
        if (retEntry && updateTimeout) {
            retEntry.logoutTime = this.getUserTimeoutTime();
        }
        return retEntry
    }

    public updateActiveTokens() {
        var keys = Object.keys(this.users);
        var keysToRemove: string[] = [];
        var now = Date.now();
        for (var ind = 0; ind < keys.length; ind++) {
            if ((<Date>this.users[keys[ind]].logoutTime).getTime() < now) {
                keysToRemove.push(keys[ind]);
            }
        }
        for (var ind = 0; ind < keysToRemove.length; ind++) {
            delete this.users[keysToRemove[ind]];
        }
    }

    constructor(timeout?: number, checkingInterval?: number) {
        if (timeout) {
            this.tokenTimeout = timeout;
        }
        if (checkingInterval) {
            this.checkInterval = checkingInterval;
        }
        this.users = Object.create(null);
        setInterval(() => {
            this.updateActiveTokens();
        }, this.checkInterval);
    }
}
