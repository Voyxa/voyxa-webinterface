"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
    faPhone,
    faIndustry,
    faUser,
    faMailBulk,
    faIdCardClip,
    faSignOut
} from "@fortawesome/free-solid-svg-icons";

const Billing = () => {
    const plans = [
        {
            name: 'voyxa Starter',
            price: 19,
            highlight: false,
            features: [
                { name: 'Included Minutes', value: 100 },
                { name: 'Additional Price per Minute ($)', value: 0.2 },
                { name: 'Free Phone Number', value: '1 free US number' },
                { name: 'Number of Agents Simultaneously', value: '1 Agent*' },
                { name: 'API Access (Coming Soon)', value: '✔️' },
            ],
        },
        {
            name: 'voyxa Secretary',
            price: 99,
            highlight: true,
            features: [
                { name: 'Included Minutes', value: 600 },
                { name: 'Additional Price per Minute ($)', value: 0.18 },
                { name: 'Free Phone Number', value: '1 free US number' },
                { name: 'Number of Agents Simultaneously', value: '1 Agent*' },
                { name: 'API Access (Coming Soon)', value: '✔️' },
            ],
        },
        {
            name: 'voyxa Manager',
            price: 330,
            highlight: false,
            features: [
                { name: 'Included Minutes', value: 2200 },
                { name: 'Additional Price per Minute ($)', value: 0.17 },
                { name: 'Free Phone Number', value: '2 free US numbers' },
                { name: 'Number of Agents Simultaneously', value: '2 Agents*' },
                { name: 'API Access (Coming Soon)', value: '✔️' },
            ],
        },
        {
            name: 'voyxa Executive',
            price: 1200,
            highlight: false,
            features: [
                { name: 'Included Minutes', value: 8400 },
                { name: 'Additional Price per Minute ($)', value: 0.145 },
                { name: 'Free Phone Number', value: '4 free US numbers' },
                { name: 'Number of Agents Simultaneously', value: '3 Agents*' },
                { name: 'API Access (Coming Soon)', value: '✔️' },
            ],
        },
    ];

    return (

        <div className="flex flex-col  py-8 px-4">
            <div className=" grid grid-cols-4 grid-flow-col gap-4 mb-5">
                <div className="p-6 border rounded-lg p-6 border rounded-lg  shadow-md  cursor-pointer">
                    <p className="text-xl font-semibold text-blue-500">$19 <span className="text-gray-500 font-thin">per month</span></p>
                    <h3 className="text-2xl font-bold">voyxa Starter</h3>
                </div>
                <div className="p-6 border rounded-lg p-6 border rounded-lg  shadow-md cursor-pointer bg-indigo-200">
                    {/* <span className=" rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    </span> */}
                    <p className="text-xl font-semibold text-blue-500">$99 <span className="text-gray-500 font-thin">per month</span></p>
                    <h3 className="text-2xl font-bold">voyxa Secretary</h3>

                </div>
                <div className="p-6 border rounded-lg p-6 border rounded-lg  shadow-md cursor-pointer">
                    <p className="text-xl font-semibold text-blue-500">$330 <span className="text-gray-500 font-thin">per month</span></p>
                    <h3 className="text-2xl font-bold">voyxa Manager</h3>
                </div>
                <div className="p-6 border rounded-lg p-6 border rounded-lg  shadow-md cursor-pointer">
                    <p className="text-xl font-semibold text-blue-500">$1,200 <span className="text-gray-500 font-thin">per month</span></p>
                    <h3 className="text-2xl font-bold">voyxa Executive</h3>
                </div>
            </div>

            <div className="flex justify-between items-center ">
                <h1 className="text-3xl font-bold"> </h1>
                <div>
                    <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg mb-5">Subscribe</button>
                </div>
            </div>
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">

                <table className="bg-white rounded-lg shadow p-6 min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">           <tr>
                        <th className="border p-4 text-left">Tiered Services, Benefits, and Features</th>
                        {plans.map((plan) => (
                            <th key={plan.name} className="border p-4">{plan.name}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                        {plans[0].features.map((feature, idx) => (
                            <tr key={idx}>
                                <td className="border p-4">{feature.name}</td>
                                {plans.map((plan) => (
                                    <td key={plan.name} className="border p-4">{plan.features[idx].value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Billing;
