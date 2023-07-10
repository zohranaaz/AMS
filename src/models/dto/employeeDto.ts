export class EmployeeDto implements IEmployee {
 
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
    designation: string;
    image: string;
    department: string;
    roleId: Number;
    status: boolean;
    parentId: Number;
    addressId: Number;
    userId: Number;
    
    constructor(dbObject: any) {

        this._id = dbObject.id;
        this.firstName = dbObject.first_name;
        this.lastName = dbObject.last_name;
        this.phone = dbObject.phone;
        this.designation = dbObject.designation;
        this.image = dbObject.image;
        this.roleId = dbObject.role_id;
        this.status = dbObject.status;   
        this.parentId = dbObject.parent_id;
        this.addressId = dbObject.address_id;   
        this.userId = dbObject.user_id;   

    }

    /**
     * 
     * @param dbObjects - array of db Objects
     */
    public static parseArray(dbObjects: any[]): EmployeeDto[] {
        return dbObjects.map((value, index, array) => {
            return new EmployeeDto(value);
        });
    }

    public toDbObject(): any {
        return {
            id: this._id,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            designation: this.designation,
            image: this.image,
            department: this.department,
            roleId: this.roleId,
            status: this.status,
            parentId: this.parentId,
            addressId: this.addressId,
            userId: this.userId
       }
    }
}

export default interface IEmployee{

    _id: string,
    firstName: string,
    lastName: string,
    phone: string,
    designation: string,
    image: string,
    department: string,
    roleId: Number,
    status: boolean,
    parentId: Number,
    addressId: Number,
    userId: Number

}
   