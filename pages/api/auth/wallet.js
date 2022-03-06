import Supabase from "../../../lib/Supabase";
import jwt from 'jsonwebtoken';
import { ethers } from "ethers";

const walletApi = async (req, res) => {
    const { address, nounce, signature } = req.body;
    
    
    
    try{
        const signerAddress = ethers.utils.verifyMessage(nounce, signature);
        if(signerAddress !== address){
            throw new Error("Invalid signature");
        }
        const response = await Supabase.from("Users").select("*").eq("address", address).eq('nounce', nounce);
        res.status(200).json({data : [response.data[0]]})
    }
    catch(e){
        res.status(400).json({
            error: e.message
        })
    }
    
}

export default walletApi;