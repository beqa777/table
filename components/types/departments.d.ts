export interface IDepartments {
    department: IDepartment[]
}

export interface IDepartment {
   name: string;
   groups: IGroup[] 
}

export interface IGroup {
    name: string;
    manager: IManager[]
}

export interface IManager {
    name: string;
}

