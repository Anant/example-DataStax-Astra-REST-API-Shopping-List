export const getAstraToken = async () => {
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/v1/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: process.env.REACT_APP_DBUSER,
                password: process.env.REACT_APP_DBPASS
            })
        })
        .then(res => {
            return res.json()
        })
        
        return response.authToken;
    }
   catch(e){
       console.log(e)
   }
}
