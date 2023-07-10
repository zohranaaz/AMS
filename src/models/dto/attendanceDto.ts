export class AttendanceDto implements IAttendance {
 
    _id: string;
    inTime: string;
    outTime: string;
    totalHours: string;
    empId: Number;
    date: Date;
    
    constructor(dbObject: any) {

        this._id = dbObject.id;
        this.inTime = dbObject.in_time;
        this.outTime = dbObject.out_time;
        this.totalHours = dbObject.total_hours
        this.empId = dbObject.emp_id; 
        this.date = dbObject.date;  
    }

    /**
     * 
     * @param dbObjects - array of db Objects
     */
    public static parseArray(dbObjects: any[]): AttendanceDto[] {
        return dbObjects.map((value, index, array) => {
            return new AttendanceDto(value);
        });
    }

    public toDbObject(): any {
        return {
            id: this._id,
            inTime: this.inTime,
            outTime: this.outTime,
            totalHours: this.totalHours,
            empId:this.empId,
            date:this.date
       }
    }
}

export default interface IAttendance{

    _id: string,
    inTime: string,
    outTime: string,
    totalHours: string,
    empId: Number,
    date: Date

}
   