import { Button, Box, Container, Text, Heading} from "@chakra-ui/react";
import { ethers } from 'ethers';
import { useState } from 'react';
import Supabase from "../lib/Supabase";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState("NOT Started");
  let res;
  const login = async () => {
    setState('Connecting to metamask');
    if(!window.ethereum){
      window.alert("No Ethereum detcted");
      setState("Please install Metamask or similary wallet");
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer =  provider.getSigner();
    const address = await signer.getAddress();
      res = await fetch('/api/auth/nounce', {
      method: "POST",
      body: JSON.stringify(
        {
          address: address
        }
      ),
      headers: {
        "Content-Type": "application/json",
      }
    })
    setState('Connected');
    
    const data = await res.json();
    const { nounce } = data;
    const signature = await signer.signMessage(nounce);
    const walletRes = await fetch('api/auth/wallet', {
      method: "POST",
      body: JSON.stringify({
        address: address,
        nounce: nounce,
        signature: signature
       }
      ),
      headers: {
        "Content-Type": "application/json",
      }
    })

    const wall = await walletRes.json();
    console.log(wall);
    setState('Signed');
    // console.log( data);
    }

  return(
    <Box align = "center">
    {data}
    <Text>{state}</Text>
    <Button onClick = {login}> Sign in</Button>
    </Box>
  )
}

export default Homepage
