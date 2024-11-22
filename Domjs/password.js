
function getpassword(e) {
    e.preventDefault();
    const email=document.getElementById('email').value;
    console.log("sending request to backend");
    axios.post('http://127.0.0.1:3000/password/forgotpassword', {email:email})
    .then(result =>{
        alert(result.data.message)
    })
    .catch(err => console.log(err));
}