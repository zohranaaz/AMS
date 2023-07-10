export class AttendanceHistoryDto implements IAttendanceHistory {
 
    _id: string;
    inTime: string;
    outTime: string;
    totalHours: string;
    date: Date;
    status: Boolean;
    empId: Number;
    
    constructor(dbObject: any) {

        console.log('dbObject:', dbObject);
        this._id = dbObject.id;
        this.inTime = dbObject.in_time;
        this.outTime = dbObject.out_time;
        this.totalHours = dbObject.total_hours
        this.date = dbObject.date;
        this.status = dbObject.status;
        this.empId = dbObject.emp_id;   
    }

    /**
     * 
     * @param dbObjects - array of db Objects
     */
    public static parseArray(dbObjects: any[]): AttendanceHistoryDto[] {
        return dbObjects.map((value, index, array) => {
            return new AttendanceHistoryDto(value);
        });
    }

    public toDbObject(): any {
        return {
            id: this._id,
            inTime: this.inTime,
            outTime: this.outTime,
            totalHours: this.totalHours,
            date: this.date,
            status: this.status,
            empId:this.empId,
       }
    }
}

export default interface IAttendanceHistory{

    _id: string,
    inTime: string,
    outTime: string,
    totalHours: string,
    date: Date,
    status: Boolean,
    empId: Number

}
   