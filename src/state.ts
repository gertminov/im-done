export default class State {
    private static _roomNR: string
    private static _userName: string
    private static _id: string


    static get roomNR(): string {
        return this._roomNR || localStorage.getItem("roomNR") || "";
    }

    static set roomNR(value: string) {
        localStorage.setItem("roomNR", value)
        this._roomNR = value;
    }

    static get userName(): string {
        return this._userName || localStorage.getItem("userName") || "";
    }

    static set userName(value: string) {
        localStorage.setItem("userName", value)
        this._userName = value;
    }


    static get id(): string {
        return this._id || localStorage.getItem("id")|| this.genID();
    }

    static set id(value: string) {
        localStorage.setItem("id", value)
        this._id = value;
    }

    static genID() {
         this._id = crypto.getRandomValues(new Uint32Array(16)).toString()
        return this.id
    }

    static clear() {
        localStorage.clear()
        this._roomNR = ""
        this._userName = ""
    }
}

export const currentStudents = []