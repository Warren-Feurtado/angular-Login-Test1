
export class UserModel {
    _id?: string;
    fName?: string;
    lName?: string;
    email?: string;
    password?: string;

    constructor(_id: string, fName: string, lName: string, email: string, password: string) {
        this._id = _id;
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.password = password;
    }

}