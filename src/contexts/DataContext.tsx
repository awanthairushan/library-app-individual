import React, {createContext, ReactNode} from "react";
import axios from "axios";
import {DataContextProps} from "../types/dataTypes";
import Swal from "sweetalert2";

export const DataContext = createContext<DataContextProps>({
    getData: (): any => {},
    postData: (): any => {},
    putData: (): any => {},
    deleteData: (): any => {}
});

export const DataProvider = ({children}: { children: ReactNode }) => {
        const getData = async (url: string) => {
            try {
                return await axios.get(process.env.REACT_APP_BACKEND + url, {
                    withCredentials: true,
                    headers: {},
                })
            } catch (error) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: "Connection Failed",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        };

        const postData = async (url: string, body: any) => {
            try {
                return await axios.post(
                    process.env.REACT_APP_BACKEND + url,
                    body,
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                        },
                    }
                );
            } catch (error) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: "Connection Failed",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        };

        const putData = async (url: string, body: any) => {
            try {
                return await axios.put(
                    process.env.REACT_APP_BACKEND + url,
                    body,
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                        },
                    }
                );
            } catch (error) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: "Connection Failed",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        };

        const deleteData = async (url: string) => {
            try {
                return await axios.delete(
                    process.env.REACT_APP_BACKEND + url,
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                        },
                    }
                );
            } catch (error) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: "Connection Failed",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        };


        return (
            <DataContext.Provider value={{getData, postData, putData, deleteData}}>
                {children}
            </DataContext.Provider>
        );
    }
;
