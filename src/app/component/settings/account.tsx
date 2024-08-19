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

const Account = () => {
    const [userName, setUserName] = useState("Patrick Kelly");
    const [userEmail, setUserEmail] = useState("patricelly@proton.me");
    const [userPhone, setUserPhone] = useState("123-456-789");
    const [company, setCompany] = useState("Voyxa");
    const [userid, setUserID] = useState("77a99a6ba077a89854439ab");

    return (
        <div className=" mt-10 w-[500px] h-[500px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6 flex">
            <div className="space-y-10 w-full">
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="h-6 w-6 text-blue-500"
                    />
                    <div className="flex-1">
                        <label
                            htmlFor="userName"
                            className="block text-sm font-medium text-gray-500"
                        >
                            Name
                        </label>
                        <h1>{userName}</h1>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon
                        icon={faMailBulk}
                        className="h-6 w-6 text-blue-500"
                    />
                    <div className="flex-1">
                        <label
                            htmlFor="Email"
                            className="block text-sm font-medium text-gray-500"
                        >
                            Email
                        </label>
                        <h1>{userEmail}</h1>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon
                        icon={faPhone}
                        className="h-6 w-6 text-blue-500"
                    />
                    <div className="flex-1">
                        <label
                            htmlFor="userPhone"
                            className="block text-sm font-medium text-gray-500"
                        >
                            Phone Number
                        </label>
                        <h1>{userPhone}</h1>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon
                        icon={faIndustry}
                        className="h-6 w-6 text-blue-500"
                    />
                    <div className="flex-1">
                        <label
                            htmlFor="company"
                            className="block text-sm font-medium text-gray-500"
                        >
                            Company Name
                        </label>
                        <h1>{company}</h1>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon
                        icon={faIdCardClip}
                        className="h-6 w-6 text-blue-500"
                    />
                    <div className="flex-1">
                        <label
                            htmlFor="userid"
                            className="block text-sm font-medium text-gray-500"
                        >
                            I D
                        </label>
                        <h1>{userid}</h1>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <FontAwesomeIcon
                        icon={faSignOut}
                        className="h-6 w-6 text-blue-500"
                    />
                    <div className="flex-1">
                        <Link href="/login" >
                            <h1>Log Out</h1>
                        </Link>

                    </div>
                </div>


            </div>
        </div>
    );
};

export default Account;
