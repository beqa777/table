"use client";

import { useEffect, useState } from 'react';

import c from "./Table.module.scss";
import type { IDepartments } from "components/types/departments";
import Tableheading from './Table.heading';


interface ITableProps {
    data: IDepartments;
    filter?: any;
}


export const tableHeaderValues = ['დეპარტამენტი', 'ჯგუფი', 'მენეჯერი'];
export const tableHeaders = ['department', 'groups', 'manager'];




const Table = ({ data, filter }: ITableProps) => {
    const [tableData, setTableData] = useState<IDepartments | null>();
    const [tableFilter, setTableFilter] = useState<any>();
    const [filters, setFilters] = useState([]);


    useEffect(() => {

        let filteredDepartment = [...data.department];

        if (filters?.department) {
            filteredDepartment = data.department.filter(v => filters?.department?.includes(v.name));
        }


        if (filters?.groups) {
            filteredDepartment = filteredDepartment.map(value => {
                return {
                    ...value,
                    groups: value.groups.filter(v => filters?.groups?.includes(v.name))
                };
            });
        }

        if (filters?.manager) {
            filteredDepartment = filteredDepartment.map(value => {
                return {
                    ...value,
                    groups: value.groups.map(managerValue => {
                        return {
                            ...managerValue,
                            manager: managerValue.manager.filter(v => filters?.manager?.includes(v.name))
                        };
                    })
                };
            });
        }

        // console.log(filteredDepartment);

        setTableData({ department: filteredDepartment });

        return () => {
            setTableData(data);
        };
    }, [filters]);




    useEffect(() => {
        setTableData(data);
        if (filter) {
            setTableFilter(filter);
        } else {

            let tempTableFilter: any = {};
            tableHeaders.forEach((header, i) => {

                if (header == "department") {
                    let mergedArr: any[] = [];
                    data.department.forEach((department) => {
                        return mergedArr.push({
                            value: department.name,
                            label: department.name
                        });
                    });

                    tempTableFilter[header] = [...new Set(mergedArr)];
                }

                if (header == "groups") {
                    let mergedArr: any[] = [];
                    data.department.forEach((department) => {
                        mergedArr = mergedArr.concat([...department.groups.map(group => {
                            return {
                                value: group.name,
                                label: group.name
                            };

                        })]);
                    });

                    tempTableFilter[header] = [...new Set(mergedArr)];
                }


                if (header == "manager") {
                    let mergedArr: any[] = [];
                    data.department.forEach((department) => {

                        department.groups.forEach(group => {
                            mergedArr = mergedArr.concat([...group.manager.map((manager) => {
                                return {
                                    value: manager.name,
                                    label: manager.name
                                };
                                // return {
                                //     value: manager.name,
                                //     label: manager.name
                                // }
                            })]);
                        });
                    });

                    tempTableFilter[header] = [...new Set(mergedArr)];
                }
            });



            setTableFilter(tempTableFilter);
        }

        return () => {
            setTableData(null);
            setTableFilter(null);
        };
    }, []);


    return (
        <>
            <table className={c.table_main} >
                <thead className={`${c.head}`}>
                    <tr className='shadow-small'>
                        <Tableheading
                            tableFilter={tableFilter}
                            changeFilters={(params) => {
                                setFilters(params);
                            }} />
                    </tr>
                </thead>
                <tbody className={c.body}>
                    {tableData?.department.map((department) => (
                        <>
                            {department?.groups.map((group) => (
                                <>
                                    {group?.manager.map((manager) => (
                                        <tr
                                            className={c.row}
                                            key={manager.name}>

                                            <td>
                                                <p className="f-size-p3">
                                                    {department.name}
                                                </p>
                                            </td>
                                            <td>
                                                <p className="f-size-p3">
                                                    {group.name}
                                                </p>
                                            </td>
                                            <td>
                                                <p className="f-size-p3">
                                                    {manager?.name}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ))}
                        </>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default Table;