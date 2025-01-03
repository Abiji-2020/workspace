import {atom,useAtom} from "jotai";

const modalState=atom(false);

export const useCreateWorkspaceModel =()=>{
    return useAtom(modalState);
};
