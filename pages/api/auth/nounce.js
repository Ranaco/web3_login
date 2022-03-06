import Supabase from '../../../lib/Supabase'
import { v4 } from 'uuid';

const nounceApi = async (req, res) => {

  const  nounce = v4();

  const { address } = req.body;
  const { data, error } = await Supabase.from("Users").select("nounce").eq('address', address);
  const date = null;
  // console.log(data, error);
  // console.log(address);


  if(data.length > 0){
    await Supabase.from("Users").update({nounce}).match({address});
  }else {
   let { error } = await Supabase.from("Users").insert({
      nounce: nounce,
      address: address,
      displayName: "Hello there",
    })
  }

  if (error) {
    res.status(500).json({
      error: error.message
    })
  } else {
    res.status(200).json({
      nounce
    })
  }

}

export default nounceApi;