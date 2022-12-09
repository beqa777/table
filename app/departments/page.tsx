import { Suspense } from "react";


import Table from 'components/lib/table/Table';
import DepartmentData from 'components/data/multi_search.json';


// const getDepartmentData = async () => {
// const res = await fetch('/data/multi_search.json');

// if (!res.ok) {
//     throw new Error('Failed to fetch data');
// }

// console.log(res.json());

// return res.json();
// };


const DepartmentPage = async () => {
    // const data = getDepartmentData();

    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <Table data={DepartmentData} />
            </Suspense>
        </div>
    );
};

export default DepartmentPage;