import React, {createContext, ReactNode} from "react";
import axios from "axios";
import {DataContextProps} from "../types/dataTypes";

export const DataContext = createContext<DataContextProps>({
    getData: (): any => {},
    postData: (): any => {},
    putData: (): any => {},
    deleteData: (): any => {}
});

export const DataProvider = ({children}: { children: ReactNode }) => {
        const getData = async (url: string) => {
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND + url, {
                    withCredentials: true,
                    headers: {},
                });
                return response
            } catch (error) {
                console.log(error)
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
                console.log(error)
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
                console.log(error)
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
                console.log(error)
            }
        };


        return (
            <DataContext.Provider value={{getData, postData, putData, deleteData}}>
                {children}
            </DataContext.Provider>
        );
    }
;
