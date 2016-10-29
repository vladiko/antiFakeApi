import * as uuid from 'node-uuid';
export class UuidGenerator {
    public static generateId() {
        return uuid.v4();
    }
}