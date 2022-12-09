import { ReactNode } from 'react';



const DepartmentsLayout = ({ children }: { children: ReactNode; }) => (
    <section className='departments_container' >
        <div> {children} </div>
    </section>
);


export default DepartmentsLayout;
