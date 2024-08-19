"use client";

import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
    const [tableData, setTableData] = useState([
        {
            date: '8/2/2024 - 10:36 PM',
            type: 'Call',
            from: '(254) 540-6984',
            to: '+918561914959',
            name: 'John Doe',
            duration: 10,
            leadStatus: 'Completed',
            status: 'Completed'
        }, {
            date: '8/3/2024 - 10:36 PM',
            type: 'Call',
            from: '(254) 540-6984',
            to: '+918561914959',
            name: 'John Doe',
            duration: 104,
            leadStatus: 'Completed',
            status: 'Completed'
        },
        {
            date: '8/5/2024 - 10:35 PM',
            type: 'Call',
            from: '(254) 540-6984',
            to: '+918561914959',
            name: 'Jane Smith',
            duration: 80,
            leadStatus: 'Completed',
            status: 'Completed'
        },
        {
            date: '8/17/2024 - 10:35 PM',
            type: 'Call',
            from: '(254) 540-6984',
            to: '+918561914959',
            name: 'Jane Smith',
            duration: 30,
            leadStatus: 'Completed',
            status: 'Completed'
        },
    ]);

    const [newRow, setNewRow] = useState({
        date: '',
        type: '',
        from: '',
        to: '',
        name: '',
        duration: '',
        leadStatus: '',
        status: ''
    });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setNewRow((prev) => ({ ...prev, [name]: value }));
    // };

    // const handleAddRow = (event) => {
    //     event.preventDefault();
    //     setTableData((prev) => [...prev, newRow]);
    //     setNewRow({
    //         date: '',
    //         type: '',
    //         from: '',
    //         to: '',
    //         name: '',
    //         duration: '',
    //         leadStatus: '',
    //         status: ''
    //     });
    // };
    return (
        <div className="max-h-screen pt-[50px] ">
            <div className="flex grid grid-cols-4 grid-flow-col gap-4 p-6">
                {/* Each card is now a flex container */}
                <div className="bg-white-100 shadow-md p-6 rounded-lg flex-1 col-span-2 flex flex-col">
                    <h2 className="text-2xl font-bold mb-2">voyxa</h2>
                    <p className="text-4xl font-bold mb-4 text-center">3</p>

                    <div className="mt-auto text-center">
                        <button className="text-blue-500 underline">View</button>
                    </div>
                    <div className="flex justify-between items-center "><h1 className="text-3xl font-bold"> </h1><div><button className="bg-indigo-500 text-white py-2 px-4 rounded-lg ">Create</button></div></div>
                </div>

                <div className="bg-white-100 shadow-md p-6 rounded-lg flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-2">Unleash the Full Power of voyxa!</h3>
                    <p className="mb-4">Subscribe now and discover the magic of our revolutionary agents.</p>
                    <div className="flex justify-between items-center "><h1 className="text-3xl font-bold"> </h1><div><button className="bg-black text-white px-4 py-2 rounded-lg">Subscribe</button></div></div>

                </div>

                <div className="bg-blue-100  shadow-md p-6 rounded-lg flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-2">Demo</h3>
                    <p className="mb-4">Just want to test voyxa's agent?<br /><br /><br /><br /></p>
                    <div className="flex justify-between items-center "><h1 className="text-3xl font-bold"> </h1><div><button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Call Now</button></div></div>
                </div>
            </div>

            <Chart tableData={tableData} />
            <div className='p-6'>
            <table className="bg-white rounded-lg shadow p-6 mt-6 min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            From
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            To
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Duration (sec)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Lead Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{row.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{row.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{row.from}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{row.to}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{row.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{row.duration}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{row.leadStatus}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{row.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};


const Chart = ({ tableData }) => {
    const labels = tableData.map(row => row.date);
    const dataPoints = tableData.map(row => row.duration);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Call Duration (sec)',
                data: dataPoints,
                fill: false,
                borderColor: '#4F46E5',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="mt-5">
            <Line className='w-full p-6' data={data} />
        </div>
    );
};

export default Dashboard;
